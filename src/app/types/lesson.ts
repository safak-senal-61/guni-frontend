export enum ContentType {
    LESSON = "LESSON",
    VIDEO = "VIDEO",
    QUIZ = "QUIZ",
    EXERCISE = "EXERCISE",
    INTERACTIVE = "INTERACTIVE",
  }
  
  export interface CreateLessonDto {
    title: string;
    description?: string;
    subject: string;
    topic?: string;
    difficulty: string;
    type: ContentType;
    duration?: number;
    thumbnail?: string;
    tags?: string[];
    prerequisites?: string[];
    learningObjectives?: string[];
  }
  
  export interface UpdateLessonDto extends Partial<CreateLessonDto> {}