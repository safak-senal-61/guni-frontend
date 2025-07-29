import axios from 'axios';
import * as t from '@/app/types';
import { useAuthStore } from '@/app/stores/auth-store';

const API_BASE_URL = 'https://3001-firebase-guni-backendgit-1753783845707.cluster-3gc7bglotjgwuxlqpiut7yyqt4.cloudworkstations.dev';

interface RefreshTokenResponse {
  accessToken: string;
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  console.log(`[API Interceptor - Request] İstek gönderiliyor: ${config.url}`);
  
  if (!config.headers) {
    config.headers = {};
  }

  if (token) {
    console.log('[API Interceptor - Request] Token isteğe eklendi.');
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn('[API Interceptor - Request] Gönderilecek token bulunamadı.');
  }
  
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { logout, setUserAndToken, user } = useAuthStore.getState();

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.warn('[API Interceptor - Response] 401 Hatası alındı. Token yenileme işlemi başlatılıyor...');
      originalRequest._retry = true;

      try {
        const response = await apiClient.post('/auth/refresh');
        const { accessToken } = response.data as RefreshTokenResponse;
        console.log('[API Interceptor - Response] Yeni accessToken başarıyla alındı.');

        if (user && accessToken) {
            setUserAndToken(user, accessToken);
            console.log('[API Interceptor - Response] Store ve localStorage yeni token ile güncellendi.');
        }

        apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        
        console.log('[API Interceptor - Response] Başarısız olan orijinal istek yeni token ile tekrar deneniyor...');
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('[API Interceptor - Response] Token yenileme işlemi başarısız oldu. Kullanıcı sistemden atılıyor.', refreshError);
        logout();
        if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// --- API Modülleri ---
// ... (Tüm API modülleriniz burada yer alacak, önceki yanıttaki gibi eksiksiz olduğundan emin olun)
// ...

export const app = {
    getHello: () => apiClient.get('/'),
};

export const auth = {
  signup: (data: t.SignupDto) => apiClient.post('/auth/signup', data),
  signin: (data: t.AuthDto) => apiClient.post('/auth/signin', data),
  logout: () => apiClient.post('/auth/logout'),
  refresh: () => apiClient.post('/auth/refresh'),
  me: () => apiClient.get('/auth/me'),
  verifyEmail: (data: t.VerifyEmailDto) => apiClient.post('/auth/verify-email', data),
  resendVerification: (data: t.ResendVerificationDto) => apiClient.post('/auth/resend-verification', data),
  forgotPassword: (data: t.ForgotPasswordDto) => apiClient.post('/auth/forgot-password', data),
  resetPassword: (data: t.ResetPasswordDto) => apiClient.post('/auth/reset-password', data),
  changePassword: (data: t.ChangePasswordDto) => apiClient.post('/auth/change-password', data),
};

export const lessons = {
  create: (data: t.CreateLessonDto) => apiClient.post('/lessons', data),
  findAll: () => apiClient.get('/lessons'),
  findOne: (id: string) => apiClient.get(`/lessons/${id}`),
  update: (id: string, data: t.UpdateLessonDto) => apiClient.patch(`/lessons/${id}`, data),
  remove: (id: string) => apiClient.delete(`/lessons/${id}`),
};

export const quizzes = {
  create: (data: t.CreateQuizDto) => apiClient.post('/quizzes', data),
  findAll: () => apiClient.get('/quizzes'),
  findOne: (id: string) => apiClient.get(`/quizzes/${id}`),
  update: (id: string, data: t.UpdateQuizDto) => apiClient.patch(`/quizzes/${id}`, data),
  remove: (id: string) => apiClient.delete(`/quizzes/${id}`),
};

export const contentAnalysis = {
  summarize: (data: t.SummarizeContentDto) => apiClient.post('/content-analysis/summarize', data),
  summarizeFile: (data: t.SummarizeFileDto) => apiClient.post('/content-analysis/summarize-file', data),
  generateQuizQuestions: (data: t.GenerateQuizQuestionsDto) => apiClient.post('/content-analysis/generate-quiz-questions', data),
  analyzeWorkflow: (data: t.AnalyzeContentWorkflowDto) => apiClient.post('/content-analysis/analyze-workflow', data),
};

export const aiTools = {
  summarizeText: (data: t.SummarizeTextDto) => apiClient.post('/ai-tools/summarize-text', data),
  generateQuestions: (data: t.GenerateQuestionsDto) => apiClient.post('/ai-tools/generate-questions', data),
  analyzeSentiment: (data: t.AnalyzeSentimentDto) => apiClient.post('/ai-tools/analyze-sentiment', data),
};

export const achievements = {
    create: (data: t.CreateAchievementDto) => apiClient.post('/achievements', data),
    getAll: () => apiClient.get('/achievements'),
    getMyAchievements: () => apiClient.get('/achievements/my-achievements'),
    checkUnlocks: () => apiClient.post('/achievements/check-unlocks'),
    getLeaderboard: (limit: number) => apiClient.get(`/achievements/leaderboard?limit=${limit}`),
    unlock: (achievementId: string) => apiClient.post(`/achievements/unlock/${achievementId}`),
};

export const userOnboarding = {
    updateProfile: (data: t.UpdateUserProfileDto) => apiClient.put('/user-onboarding/profile', data),
    generateQuiz: (data: t.OnboardingQuizDto) => apiClient.post('/user-onboarding/quiz/generate', data),
    submitQuiz: (data: t.SubmitOnboardingQuizDto) => apiClient.post('/user-onboarding/quiz/submit', data),
    generatePersonalizedHomepage: (data: t.PersonalizedHomepageDto) => apiClient.post('/user-onboarding/homepage/personalized', data),
    getPersonalizedHomepage: () => apiClient.get('/user-onboarding/homepage/personalized'),
    getUserProfile: (userId: string) => apiClient.get(`/user-onboarding/profile/${userId}`),
    refreshRecommendations: () => apiClient.post('/user-onboarding/recommendations/refresh'),
    getWeakSubjectsAnalysis: () => apiClient.get('/user-onboarding/analytics/weak-subjects'),
    getParentRequests: () => apiClient.get('/user-onboarding/parent-requests'),
    approveParentRequest: (connectionId: string) => apiClient.put(`/user-onboarding/parent-requests/${connectionId}/approve`),
    rejectParentRequest: (connectionId: string) => apiClient.put(`/user-onboarding/parent-requests/${connectionId}/reject`),
    getConnectedParents: () => apiClient.get('/user-onboarding/connected-parents'),
};

export const parentPanel = {
    getProfile: () => apiClient.get('/parent-panel/profile'),
    connectStudent: (data: t.ConnectStudentDto) => apiClient.post('/parent-panel/connect-student', data),
    getPendingConnections: () => apiClient.get('/parent-panel/pending-connections'),
    getConnectedStudents: () => apiClient.get('/parent-panel/connected-students'),
    getStudentDetailedProgress: (studentId: string, params: { subject: string, page: string, limit: string }) => 
        apiClient.get(`/parent-panel/student-progress/${studentId}`, { params }),
    getStudentAnalytics: (studentId: string) => apiClient.get(`/parent-panel/student-analytics/${studentId}`),
    sendMessageToStudent: (data: any) => apiClient.post('/parent-panel/send-message', data),
    getDashboardSummary: () => apiClient.get('/parent-panel/dashboard-summary'),
    getStudentSchedule: (studentId: string) => apiClient.get(`/parent-panel/student-schedule/${studentId}`),
    setStudyGoals: (data: any) => apiClient.post('/parent-panel/set-study-goals', data),
    sendNotification: (data: t.SendNotificationDto) => apiClient.post('/parent-panel/send-notification', data),
    getNotifications: (params: { page: string, limit: string }) => apiClient.get('/parent-panel/notifications', { params }),
    markNotificationAsRead: (notificationId: string) => apiClient.put(`/parent-panel/notifications/${notificationId}/read`),
    generateWeeklySummary: (studentId: string) => apiClient.post(`/parent-panel/weekly-summary/${studentId}`),
    getStudentProgressSummary: (studentId: string, params: { period: string }) => 
        apiClient.get(`/parent-panel/student-summary/${studentId}`, { params }),
    getDashboardStats: () => apiClient.get('/parent-panel/dashboard-stats'),
};

export const studentPanel = {
    getDashboard: () => apiClient.get('/student-panel/dashboard'),
    getProgress: () => apiClient.get('/student-panel/progress'),
    getStats: () => apiClient.get('/student-panel/stats'),
    getUpcomingLessons: (limit: string) => apiClient.get(`/student-panel/upcoming-lessons?limit=${limit}`),
    getRecommendedQuizzes: (limit: string) => apiClient.get(`/student-panel/recommended-quizzes?limit=${limit}`),
    getRecentQuizResults: (limit: string) => apiClient.get(`/student-panel/recent-quiz-results?limit=${limit}`),
};

export const analytics = {
    getOverview: () => apiClient.get('/analytics/overview'),
    getUserEngagement: () => apiClient.get('/analytics/engagement'),
    getLearningProgress: () => apiClient.get('/analytics/learning-progress'),
    getContentAnalytics: () => apiClient.get('/analytics/content'),
    getActivityTimeline: () => apiClient.get('/analytics/timeline'),
    getParentEngagement: () => apiClient.get('/analytics/parent-engagement'),
    getAchievementStats: () => apiClient.get('/analytics/achievements'),
    getTopPerformers: () => apiClient.get('/analytics/top-performers'),
    getPopularContent: () => apiClient.get('/analytics/popular-content'),
};

export const notifications = {
    create: (data: t.CreateNotificationDto) => apiClient.post('/notifications', data),
    getUserNotifications: () => apiClient.get('/notifications'),
    getUnreadCount: () => apiClient.get('/notifications/unread-count'),
    markAsRead: (id: string) => apiClient.patch(`/notifications/${id}/read`),
    markAllAsRead: () => apiClient.patch('/notifications/mark-all-read'),
    delete: (id: string) => apiClient.delete(`/notifications/${id}`),
};

export const messages = {
    sendMessage: (data: any) => apiClient.post('/messages', data),
    getUserConversations: () => apiClient.get('/messages/conversations'),
    getConversation: (userId: string) => apiClient.get(`/messages/conversation/${userId}`),
    getUnreadCount: () => apiClient.get('/messages/unread-count'),
    markAsRead: (senderId: string) => apiClient.post(`/messages/mark-read/${senderId}`),
    delete: (messageId: string) => apiClient.delete(`/messages/${messageId}`),
};

export const uploads = {
    uploadFile: (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        return apiClient.post('/uploads/file', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
};

export default apiClient;