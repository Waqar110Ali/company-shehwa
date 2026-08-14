import axios, {
  AxiosError,
  type AxiosRequestConfig,
} from "axios";

import {
  clearAuth,
  getAccessToken,
  getRefreshToken,
  saveAuth,
} from "@/features/auth/utils/auth-storage";

export const api = axios.create({
  baseURL:
    "http://localhost:5000/api/v1",

  withCredentials: true,
});

// ======================================================
// Request Interceptor
// ======================================================

api.interceptors.request.use(
  (config) => {
    const token =
      getAccessToken();

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
);

// ======================================================
// Refresh Queue
// ======================================================

let isRefreshing = false;

let failedQueue: {
  resolve: (
    token: string,
  ) => void;

  reject: (
    error: unknown,
  ) => void;
}[] = [];

function processQueue(
  error: unknown,
  token?: string,
) {
  failedQueue.forEach(
    (promise) => {
      if (error) {
        promise.reject(error);
      } else {
        promise.resolve(
          token!,
        );
      }
    },
  );

  failedQueue = [];
}

// ======================================================
// Response Interceptor
// ======================================================

api.interceptors.response.use(
  (response) => response,

  async (
    error: AxiosError,
  ) => {
    const originalRequest =
      error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };

    if (
      error.response?.status !==
        401 ||
      originalRequest._retry
    ) {
      return Promise.reject(
        error,
      );
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise(
        (
          resolve,
          reject,
        ) => {
          failedQueue.push({
            resolve: (
              token,
            ) => {
              if (
                originalRequest.headers
              ) {
                originalRequest.headers.Authorization =
                  `Bearer ${token}`;
              }

              resolve(
                api(
                  originalRequest,
                ),
              );
            },

            reject,
          });
        },
      );
    }

    isRefreshing = true;

    try {
      const refreshToken =
        getRefreshToken();

      if (!refreshToken) {
        throw new Error(
          "Refresh token not found.",
        );
      }

      const response =
        await axios.post(
          "http://localhost:5000/api/v1/auth/refresh",
          {
            refreshToken,
          },
        );

      const auth =
        response.data.data;

      saveAuth({
        accessToken:
          auth.accessToken,

        refreshToken:
          auth.refreshToken,

        user: auth.user,
      });

      processQueue(
        null,
        auth.accessToken,
      );

      if (
        originalRequest.headers
      ) {
        originalRequest.headers.Authorization =
          `Bearer ${auth.accessToken}`;
      }

      return api(
        originalRequest,
      );
    } catch (refreshError) {
      processQueue(
        refreshError,
      );

      clearAuth();

      window.location.href =
        "/login";

      return Promise.reject(
        refreshError,
      );
    } finally {
      isRefreshing = false;
    }
  },
);