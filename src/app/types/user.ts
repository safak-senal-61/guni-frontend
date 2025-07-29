export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER",
    PREFER_NOT_TO_SAY = "PREFER_NOT_TO_SAY",
  }
  
  export enum GradeLevel {
    GRADE_1 = "GRADE_1",
    GRADE_2 = "GRADE_2",
    GRADE_3 = "GRADE_3",
    GRADE_4 = "GRADE_4",
    GRADE_5 = "GRADE_5",
    GRADE_6 = "GRADE_6",
    GRADE_7 = "GRADE_7",
    GRADE_8 = "GRADE_8",
    GRADE_9 = "GRADE_9",
    GRADE_10 = "GRADE_10",
    GRADE_11 = "GRADE_11",
    GRADE_12 = "GRADE_12",
  }
  
  export enum LearningStyle {
    VISUAL = "VISUAL",
    AUDITORY = "AUDITORY",
    KINESTHETIC = "KINESTHETIC",
    READ_WRITE = "READ_WRITE",
  }
  
  export interface UpdateUserProfileDto {
    age?: number;
    gender?: Gender;
    gradeLevel?: GradeLevel;
    learningStyle?: LearningStyle;
    interests?: string[];
    goals?: string[];
    studyHours?: number;
    difficultyPreference?: string;
    weakSubjects?: string[];
  }
  
  export interface OnboardingQuizDto {
    subjects: string[];
    questionsPerSubject?: number;
  }
  
  export interface OnboardingQuizAnswerDto {
    questionId: string;
    answer: string;
    subject: string;
  }
  
  export interface SubmitOnboardingQuizDto {
    answers: OnboardingQuizAnswerDto[];
  }
  
  export interface PersonalizedHomepageDto {
    lessonCount?: number;
    includeQuizzes?: boolean;
    includeProgress?: boolean;
  }