import {
  useQuery,
} from "@tanstack/react-query";

import {
  reportsApi,
} from "../api/reports.api";

import type {
  Reports,
} from "../types/report";

export function useReports() {
  return useQuery<Reports>({
    queryKey: [
      "reports",
    ],

    queryFn:
      reportsApi.getReports,

    staleTime:
      1000 * 60 * 2,

    refetchOnWindowFocus:
      false,

    retry: false,
  });
}