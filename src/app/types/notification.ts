export interface CreateNotificationDto {
    // Bu DTO'nun içeriği boş, gerektiğinde doldurulabilir.
  }
  
  export enum NotificationType {
    ACHIEVEMENT = "achievement",
    PROGRESS = "progress",
    QUIZ_COMPLETED = "quiz_completed",
    LESSON_COMPLETED = "lesson_completed",
    PARENT_REQUEST = "parent_request",
    ENCOURAGEMENT = "encouragement",
  }
  
  export interface SendNotificationDto {
    receiverId: string;
    title: string;
    message: string;
    type: NotificationType;
    data?: object;
  }