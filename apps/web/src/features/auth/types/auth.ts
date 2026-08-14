import { Role } from "./role";

// ======================================================
// Login
// ======================================================

export interface LoginDto {
  email: string;

  password: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

// ======================================================
// Forgot Password
// ======================================================

export interface ForgotPasswordDto {
  email: string;
}

// ======================================================
// Reset Password
// ======================================================

export interface ResetPasswordDto {
  token: string;

  password: string;

  confirmPassword: string;
}

// ======================================================
// Change Password
// ======================================================

export interface ChangePasswordDto {
  currentPassword: string;

  newPassword: string;

  confirmPassword: string;
}

// ======================================================
// Auth User
// ======================================================

export interface AuthUser {
  id: string;

  /**
   * Mongo Employee _id
   * Used by Chat, Calls, Calendar,
   * Attendance and other employee modules.
   */
  employeeId: string;

  firstName: string;

  lastName: string;

  email: string;

  avatar: string;

  role: Role;

  isVerified: boolean;

  mustChangePassword: boolean;
}

// ======================================================
// Login Response
// ======================================================

export interface LoginResponse {
  success: boolean;

  message?: string;

  data: {
    accessToken: string;

    refreshToken: string;

    user: AuthUser;
  };
}

// ======================================================
// Generic Response
// ======================================================

export interface AuthResponse<T = unknown> {
  success: boolean;

  message?: string;

  data: T;
}