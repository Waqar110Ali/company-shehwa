import {
  useQuery,
} from "@tanstack/react-query";

import {
  filesApi,
} from "../api/files.api";

// ======================================================
// Query Key
// ======================================================

export const FILE_STORAGE_QUERY_KEY =
  ["files", "storage"] as const;

// ======================================================
// Hook
// ======================================================

export function useFileStorage() {
  return useQuery({
    queryKey:
      FILE_STORAGE_QUERY_KEY,

    queryFn:
      () =>
        filesApi.getStorage(),

    staleTime:
      30_000,
  });
}