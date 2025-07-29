// src/app/(onboarding)/onboarding/assessment/_components/assessment-form.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { userOnboarding } from '@/app/lib/api';
import { useAuthStore } from '@/app/stores/auth-store';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { OnboardingQuizAnswerDto } from '@/app/types';

// API'den gelecek soru formatı için bir tip tanımı
interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  subject: string;
}

// Form verilerini doğrulamak için Zod şeması
// DÜZELTME: z.record'a hem anahtar (key) hem de değer (value) tipi sağlandı.
const assessmentSchema = z.object({
  answers: z.record(z.string(), z.string().min(1, "Lütfen bir cevap seçin.")),
});

type AssessmentFormValues = z.infer<typeof assessmentSchema>;

export function AssessmentForm() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<AssessmentFormValues>({
    resolver: zodResolver(assessmentSchema),
  });

  // Sayfa yüklendiğinde yapay zeka destekli sınavı oluştur ve getir
  useEffect(() => {
    const generateAndFetchQuiz = async () => {
      try {
        console.log("AI tabanlı sınav oluşturma isteği gönderiliyor...");
        // Profilde belirtilen zayıf derslere göre sınav oluşturulacak.
        // Şimdilik varsayılan dersleri kullanıyoruz.
        const response = await userOnboarding.generateQuiz({ subjects: ['Matematik', 'Fizik'] });
        
        console.log("Sınav yanıtı:", response.data);
        if (response.data && Array.isArray(response.data)) {
            setQuestions(response.data);
        } else {
            setError("Sınav soruları beklenen formatta gelmedi.");
        }

      } catch (err: any) {
        console.error("Sınav oluşturulurken hata:", err);
        setError(err.response?.data?.message || "Sınav yüklenirken bir hata oluştu.");
      } finally {
        setIsLoading(false);
      }
    };

    generateAndFetchQuiz();
  }, []);

  const onSubmit = async (data: AssessmentFormValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      // DÜZELTME: 'answer' tipini 'unknown' yerine 'string' olarak belirtiyoruz.
      const answers: OnboardingQuizAnswerDto[] = questions.map(q => ({
        questionId: q.id,
        answer: data.answers[q.id] as string,
        subject: q.subject,
      }));

      await userOnboarding.submitQuiz({ answers });
      
      console.log("Sınav cevapları başarıyla gönderildi.");
      // Onboarding tamamlandı, dashboard'a yönlendir.
      router.push('/dashboard');
      
    } catch (err: any) {
      setError(err.response?.data?.message || "Cevaplar gönderilirken bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="p-8 text-center">
        <h1 className="text-2xl font-bold">Yapay Zeka Sizin İçin Hazırlanıyor...</h1>
        <p className="text-gray-500 mt-2">Bilgi seviyenizi ölçmek için kişiselleştirilmiş bir sınav oluşturuluyor. Lütfen bekleyin.</p>
        <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 animate-pulse w-full"></div>
        </div>
      </Card>
    );
  }
  
  if (error) {
     return (
        <Card className="p-8 text-center text-red-600">
            <h2 className="text-xl font-bold">Bir Hata Oluştu</h2>
            <p>{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">Yeniden Dene</Button>
        </Card>
     )
  }

  if (questions.length === 0) {
    return (
      <Card className="p-8 text-center">
        <h2 className="text-xl font-bold">Değerlendirme Atlandı</h2>
        <p>Görünüşe göre değerlendirilecek bir ders bulunamadı. Doğrudan panele yönlendirilebilirsiniz.</p>
        <Button onClick={() => router.push('/dashboard')} className="mt-4">Panele Git</Button>
      </Card>
    )
  }

  return (
    <Card className="w-full p-8 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Bilgi Seviyesi Değerlendirmesi</h1>
        <p className="text-gray-500">Yapay zeka tarafından hazırlanan bu kısa sınav, mevcut bilgi düzeyinizi anlamamıza yardımcı olacak.</p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {questions.map((q, index) => (
          <div key={q.id}>
            <p className="font-semibold">{index + 1}. {q.question}</p>
            <div className="mt-2 space-y-2">
              {q.options.map(option => (
                <label key={option} className="flex items-center gap-2 p-3 rounded-md border has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500">
                  <input type="radio" value={option} {...form.register(`answers.${q.id}`)} />
                  {option}
                </label>
              ))}
            </div>
            {form.formState.errors.answers?.[q.id] && <p className="text-red-500 text-sm mt-1">{form.formState.errors.answers[q.id]?.message}</p>}
          </div>
        ))}

        {error && <p className="text-red-500 text-center text-sm">{error}</p>}
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Analiz Ediliyor...' : 'Sınavı Tamamla ve Sonuçları Gör'}
        </Button>
      </form>
    </Card>
  );
}