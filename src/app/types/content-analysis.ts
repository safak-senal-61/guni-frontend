export interface SummarizeContentDto {
    text: string;
    videoUrl?: string;
    title?: string;
  }
  
  export interface SummarizeFileDto {
    filePath: string;
    title?: string;
  }
  
  export interface GenerateQuizQuestionsDto {
    text: string;
    numberOfQuestions?: number;
  }
  
  export enum AnalysisType {
    SUMMARY = "summary",
    DETAILED = "detailed",
    EDUCATIONAL = "educational",
  }
  
  export interface AnalyzeContentWorkflowDto {
    text: string;
    analysisType?: AnalysisType;
  }