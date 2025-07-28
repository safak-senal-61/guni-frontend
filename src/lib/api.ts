// API Base Configuration
const API_BASE_URL = 'http://localhost:3000';

// API Response Types
export interface ApiResponse<T = any> {
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
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        return {
          error: data.message || `HTTP error! status: ${response.status}`,
        };
      }

      return { data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Network error occurred',
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
export const {
  signin,
  signup,
  logout,
  getMe,
  refreshToken,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerification,
  isAuthenticated,
  getCurrentToken,
} = apiClient;