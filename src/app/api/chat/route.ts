// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage, AIMessage, BaseMessage } from '@langchain/core/messages';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnableSequence } from '@langchain/core/runnables';
import { StateGraph, END, Annotation } from '@langchain/langgraph';

// Gemini API anahtarınızı .env.local dosyasından alın
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
if (!GOOGLE_API_KEY) {
  throw new Error('GOOGLE_API_KEY environment variable is not set.');
}

const model = new ChatGoogleGenerativeAI({
  model: 'gemini-1.5-flash-latest', // Gemini 1.5 Flash modelini kullanıyoruz
  apiKey: GOOGLE_API_KEY,
  temperature: 0.7, // Yaratıcılık seviyesi
});

// LangChain Runnable ile basit bir özetleme zinciri
const summarizationChain = RunnableSequence.from([
  PromptTemplate.fromTemplate(
    `Aşağıdaki metni Türkçe olarak özetle. Eğitimle alakalı olmayan kısımları atla ve özeti 50 kelimeyi geçme.
    Metin: {text}`
  ),
  model,
  new StringOutputParser(),
]);

// LangGraph için yeni durum tanımlaması (Annotation kullanarak)
const State = Annotation.Root({
  chat_history: Annotation.ArrayOf(Annotation<BaseMessage>(), {
    reducer: (left: BaseMessage[], right: BaseMessage[]) => left.concat(right),
    default: () => [],
  }),
  user_question: Annotation<string>(),
  response: Annotation<string>({ default: () => '' }),
  action: Annotation<'summarize' | 'answer_education' | 'reject'>(),
});
type AgentState = typeof State.Type;

// LangGraph düğümleri
async function decideAction(state: AgentState): Promise<Partial<AgentState>> {
  const { user_question } = state;
  const lowerCaseQuestion = user_question.toLowerCase();

  const educationKeywords = [
    'eğitim', 'ders', 'kurs', 'okul', 'üniversite', 'akademi', 'öğrenim',
    'sınav', 'sertifika', 'müfredat', 'kayıt', 'program', 'yazılım', 'geliştirme',
    'yapay zeka', 'veri bilimi', 'bilişim', 'kodlama', 'programlama', 'mezuniyet',
    'kariyer', 'bölüm', 'eğitmen', 'öğrenci', 'bilgi', 'kılavuz', 'rehber'
  ];

  const summarizeKeywords = ['özetle', 'kısaca anlat', 'toparla', 'ana fikir'];

  if (summarizeKeywords.some(keyword => lowerCaseQuestion.includes(keyword)) && user_question.length > 100) {
    return { action: 'summarize' };
  }

  if (educationKeywords.some(keyword => lowerCaseQuestion.includes(keyword)) || user_question.length < 50) {
    return { action: 'answer_education' };
  }

  return { action: 'reject' };
}

async function handleEducationQuestion(state: AgentState): Promise<Partial<AgentState>> {
  const { chat_history, user_question } = state;

  const prompt = PromptTemplate.fromTemplate(`
    Sen GÜNÜBİRLİK DOZ web sitesinin eğitim odaklı yapay zeka asistanısın. Kullanıcının eğitimle ilgili sorularına doğru ve yardımcı yanıtlar ver.
    Cevapların kısa ve öz olsun. Yanıtların 150 kelimeyi geçmemesine dikkat et.
    Eğitim dışı konulara kesinlikle cevap verme, bu tür sorulara "Ben sadece eğitimle ilgili konularda yardımcı olabilirim." şeklinde kibarca yanıt ver.

    Sohbet Geçmişi:
    {chat_history}

    Kullanıcının Sorusu: {user_question}

    Yanıtın:
  `);

  const chain = prompt.pipe(model).pipe(new StringOutputParser());
  const response = await chain.invoke({
    chat_history: chat_history,
    user_question: user_question,
  });

  return { response };
}

async function handleSummarization(state: AgentState): Promise<Partial<AgentState>> {
  const { user_question } = state;
  const summarizedText = await summarizationChain.invoke({ text: user_question });
  return { response: `İşte isteğiniz üzerine özet: ${summarizedText}` };
}

async function handleRejection(): Promise<Partial<AgentState>> {
  return { response: 'Üzgünüm, ben sadece eğitimle ilgili konularda yardımcı olabilirim.' };
}

// LangGraph grafiğini yeni durum tanımı ile oluşturma
const workflow = new StateGraph({
  channels: State
});

workflow.addNode('decide_action', decideAction);
workflow.addNode('answer_education_question', handleEducationQuestion);
workflow.addNode('summarize_content', handleSummarization);
workflow.addNode('reject_question', handleRejection);

workflow.setEntryPoint('decide_action'); // Başlangıç düğümü

workflow.addConditionalEdges(
  'decide_action',
  (state: AgentState) => state.action!,
  {
    'answer_education': 'answer_education_question',
    'summarize': 'summarize_content',
    'reject': 'reject_question',
  }
);

workflow.addEdge('answer_education_question', END);
workflow.addEdge('summarize_content', END);
workflow.addEdge('reject_question', END);

const app = workflow.compile();

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Mesajlar boş olamaz.' }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1].content;
    const chatHistory = messages.slice(0, -1).map((msg: any) =>
      msg.role === 'user' ? new HumanMessage(msg.content) : new AIMessage(msg.content)
    );

    // Yeni invoke çağrısı, Annotation yapısına uygun olarak
    const result = await app.invoke({
      chat_history: chatHistory,
      user_question: lastMessage,
    });

    const aiResponse = result.response; 
    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Sohbet sırasında bir hata oluştu.' }, { status: 500 });
  }
}
