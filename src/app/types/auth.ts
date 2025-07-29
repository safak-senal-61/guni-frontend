export interface SignupDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }
  
  export interface AuthDto {
    email: string;
    password: string;
  }
  
  export interface VerifyEmailDto {
    token: string;
  }
  
  export interface ResendVerificationDto {
    email: string;
  }
  
  export interface ForgotPasswordDto {
    email: string;
  }
  
  export interface ResetPasswordDto {
    token: string;
    newPassword: string;
  }
  
  export interface ChangePasswordDto {
    currentPassword: string;
    newPassword: string;
  }