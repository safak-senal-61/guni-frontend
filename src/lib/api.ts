// API Base Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// API Response Types
export interface ApiResponse<T = unknown> {
  data?: T;
  message?: string;
  error?: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

// DTO Types based on backend schemas
export interface AuthDto {
  email: string;
  password: string;
}

export interface SignupDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  newPassword: string;
}

export interface VerifyEmailDto {
  token: string;
}

export interface ResendVerificationDto {
  email: string;
}

// API Helper Functions
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = this.getToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      console.log('API Request:', { url, method: config.method || 'GET', headers: config.headers });
      const response = await fetch(url, config);
      
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error('JSON parse error:', jsonError);
        data = { message: 'Invalid JSON response' };
      }

      console.log('API Response:', { status: response.status, statusText: response.statusText, data });

      if (!response.ok) {
        // Handle 401 Unauthorized - try to refresh token
        if (response.status === 401 && endpoint !== '/auth/refresh' && endpoint !== '/auth/signin') {
          const refreshResult = await this.refreshToken();
          if (refreshResult.data) {
            // Retry the original request with new token
            const retryConfig = { ...config };
            retryConfig.headers = {
              ...retryConfig.headers,
              Authorization: `Bearer ${this.getToken()}`,
            };
            
            const retryResponse = await fetch(url, retryConfig);
            let retryData;
            try {
              retryData = await retryResponse.json();
            } catch {
              retryData = { message: 'Invalid JSON response' };
            }
            
            if (retryResponse.ok) {
              return { data: retryData };
            }
          }
          // If refresh failed or retry failed, remove tokens and redirect to login
          this.removeTokens();
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
        
        // If we get here and it's still 401, remove tokens and redirect
        if (response.status === 401) {
          this.removeTokens();
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
        
        const errorMessage = data.message || `HTTP error! status: ${response.status}`;
        console.error('API Error:', errorMessage);
        return {
          error: errorMessage,
        };
      }

      return { data };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Network error occurred';
      console.error('Network Error:', error);
      return {
        error: errorMessage,
      };
    }
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  private setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
    }
  }

  private setRefreshToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('refresh_token', token);
    }
  }

  private removeTokens(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }

  // Auth API Methods
  async signin(credentials: AuthDto): Promise<ApiResponse<AuthResponse>> {
    const response = await this.request<AuthResponse>('/auth/signin', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.data) {
      this.setToken(response.data.access_token);
      this.setRefreshToken(response.data.refresh_token);
    }

    return response;
  }

  async signup(userData: SignupDto): Promise<ApiResponse<AuthResponse>> {
    const response = await this.request<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.data) {
      this.setToken(response.data.access_token);
      this.setRefreshToken(response.data.refresh_token);
    }

    return response;
  }

  async logout(): Promise<ApiResponse<void>> {
    const response = await this.request<void>('/auth/logout', {
      method: 'POST',
    });

    this.removeTokens();
    return response;
  }

  async getMe(): Promise<ApiResponse<User>> {
    return this.request<User>('/auth/me');
  }

  async refreshToken(): Promise<ApiResponse<{ access_token: string }>> {
    const refreshToken = typeof window !== 'undefined' 
      ? localStorage.getItem('refresh_token') 
      : null;

    if (!refreshToken) {
      return { error: 'No refresh token available' };
    }

    const response = await this.request<{ access_token: string }>('/auth/refresh', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (response.data) {
      this.setToken(response.data.access_token);
    }

    return response;
  }

  async forgotPassword(email: ForgotPasswordDto): Promise<ApiResponse<void>> {
    return this.request<void>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(email),
    });
  }

  async resetPassword(resetData: ResetPasswordDto): Promise<ApiResponse<void>> {
    return this.request<void>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(resetData),
    });
  }

  async verifyEmail(verificationData: VerifyEmailDto): Promise<ApiResponse<void>> {
    return this.request<void>('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify(verificationData),
    });
  }

  async resendVerification(email: ResendVerificationDto): Promise<ApiResponse<void>> {
    return this.request<void>('/auth/resend-verification', {
      method: 'POST',
      body: JSON.stringify(email),
    });
  }

  // Utility Methods
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentToken(): string | null {
    return this.getToken();
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export individual methods for convenience
export const signin = (credentials: AuthDto) => apiClient.signin(credentials);
export const signup = (userData: SignupDto) => apiClient.signup(userData);
export const logout = () => apiClient.logout();
export const getMe = () => apiClient.getMe();
export const refreshToken = () => apiClient.refreshToken();
export const forgotPassword = (email: ForgotPasswordDto) => apiClient.forgotPassword(email);
export const resetPassword = (resetData: ResetPasswordDto) => apiClient.resetPassword(resetData);
export const verifyEmail = (verificationData: VerifyEmailDto) => apiClient.verifyEmail(verificationData);
export const resendVerification = (email: ResendVerificationDto) => apiClient.resendVerification(email);
export const isAuthenticated = () => apiClient.isAuthenticated();
export const getCurrentToken = () => apiClient.getCurrentToken();