import type { AuthUser } from "../types/auth";

// ======================================================
// Storage Keys
// ======================================================

const ACCESS_TOKEN_KEY = "token";

const REFRESH_TOKEN_KEY = "refreshToken";

const USER_KEY = "user";

// ======================================================
// Save Authentication
// ======================================================

export function saveAuth(data: {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}): void {
  localStorage.setItem(
    ACCESS_TOKEN_KEY,
    data.accessToken,
  );

  localStorage.setItem(
    REFRESH_TOKEN_KEY,
    data.refreshToken,
  );

  localStorage.setItem(
    USER_KEY,
    JSON.stringify(data.user),
  );
}

// ======================================================
// Access Token
// ======================================================

export function getAccessToken():
  | string
  | null {
  return localStorage.getItem(
    ACCESS_TOKEN_KEY,
  );
}

export function setAccessToken(
  token: string,
): void {
  localStorage.setItem(
    ACCESS_TOKEN_KEY,
    token,
  );
}

// ======================================================
// Refresh Token
// ======================================================

export function getRefreshToken():
  | string
  | null {
  return localStorage.getItem(
    REFRESH_TOKEN_KEY,
  );
}

export function setRefreshToken(
  token: string,
): void {
  localStorage.setItem(
    REFRESH_TOKEN_KEY,
    token,
  );
}

// ======================================================
// User
// ======================================================

export function getUser():
  | AuthUser
  | null {
  const value =
    localStorage.getItem(USER_KEY);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(
      value,
    ) as AuthUser;
  } catch {
    return null;
  }
}

export function setUser(
  user: AuthUser,
): void {
  localStorage.setItem(
    USER_KEY,
    JSON.stringify(user),
  );
}

// ======================================================
// Helpers
// ======================================================

export function isAuthenticated(): boolean {
  return !!getAccessToken();
}

export function clearAuth(): void {
  localStorage.removeItem(
    ACCESS_TOKEN_KEY,
  );

  localStorage.removeItem(
    REFRESH_TOKEN_KEY,
  );

  localStorage.removeItem(
    USER_KEY,
  );
}