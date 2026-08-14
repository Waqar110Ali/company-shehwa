import { api } from "@/lib/api";

import type {
  LoginDto,
  LoginResponse,
  AuthUser,
  RefreshTokenDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from "../types/auth";

// ======================================================
// Login
// ======================================================

export async function login(
  data: LoginDto,
): Promise<LoginResponse> {
  const response =
    await api.post<LoginResponse>(
      "/auth/login",
      data,
    );

  return response.data;
}

// ======================================================
// Current User
// ======================================================

export async function getCurrentUser(): Promise<{
  success: boolean;
  data: AuthUser;
}> {
  const response =
    await api.get("/auth/me");

  return response.data;
}

// ======================================================
// Refresh Token
// ======================================================

export async function refreshToken(
  data: RefreshTokenDto,
): Promise<LoginResponse> {
  const response =
    await api.post(
      "/auth/refresh",
      data,
    );

  return response.data;
}

// ======================================================
// Logout
// ======================================================

export async function logout() {
  const response =
    await api.post(
      "/auth/logout",
    );

  return response.data;
}

// ======================================================
// Forgot Password
// ======================================================

export async function forgotPassword(
  data: ForgotPasswordDto,
) {
  const response =
    await api.post(
      "/auth/forgot-password",
      data,
    );

  return response.data;
}

// ======================================================
// Reset Password
// ======================================================

export async function resetPassword(
  data: ResetPasswordDto,
) {
  const response =
    await api.post(
      "/auth/reset-password",
      data,
    );

  return response.data;
}

// ======================================================
// Verify Email
// ======================================================

export async function verifyEmail(
  token: string,
) {
  const response =
    await api.post(
      `/auth/verify-email/${token}`,
    );

  return response.data;
}