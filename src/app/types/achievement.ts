export enum AchievementCategory {
    PROGRESS = "PROGRESS",
    SUBJECT_MASTERY = "SUBJECT_MASTERY",
    SOCIAL = "SOCIAL",
    GAMIFICATION = "GAMIFICATION",
    SPECIAL = "SPECIAL",
  }
  
  export interface CreateAchievementDto {
    title: string;
    description: string;
    category: AchievementCategory;
    points: number;
    icon?: string;
    requirement: number;
  }