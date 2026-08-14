import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { dashboardApi } from "../api/dashboard.api";
import type { Dashboard } from "../types/dashboard";

export function useDashboard() {
  console.log("📊 useDashboard Hook Initialized");

  return useQuery<Dashboard>({
    queryKey: ["dashboard"],

    queryFn: async () => {
      console.log("🚀 Fetching dashboard...");

      try {
        const response =
          await dashboardApi.getDashboard();

        console.log(
          "✅ Dashboard API Response:",
          response.data,
        );

        return response.data;
      } catch (error) {
        const err =
          error as AxiosError;

        console.error(
          "❌ Dashboard API Error:",
          {
            message: err.message,
            status: err.response?.status,
            data: err.response?.data,
          },
        );

        throw error;
      }
    },

    retry: false,

    staleTime: 1000 * 60 * 5,

    refetchOnWindowFocus: false,
  });
}