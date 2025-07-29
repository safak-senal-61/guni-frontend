export enum QuizType {
    MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
    OPEN_ENDED = "OPEN_ENDED",
    DRAG_DROP = "DRAG_DROP",
  }
  
  export interface CreateQuizDto {
    lessonId?: string;
    title: string;
    description?: string;
    subject: string;
    topic?: string;
    difficulty: string;
    quizType: QuizType;
    questionCount: number;
    passingScore: number;
    questions: object; // JSON array of question objects
  }
  
  export interface UpdateQuizDto extends Partial<CreateQuizDto> {}