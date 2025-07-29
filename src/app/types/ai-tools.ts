// src/types/ai-tools.ts

export interface SummarizeTextDto {
    text: string;
  }
  
  export interface GenerateQuestionsDto {
    text: string;
    questionCount: number;
  }
  
  export interface AnalyzeSentimentDto {
    text: string;
  }