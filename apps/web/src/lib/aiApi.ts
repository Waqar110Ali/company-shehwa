// apps/web/src/lib/aiApi.ts
import axios from "axios";

import { getAccessToken } from "@/features/auth/utils/auth-storage";

export const aiApi = axios.create({
  baseURL: import.meta.env.VITE_AI_SERVICE_URL || "http://localhost:8000",
});

aiApi.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});