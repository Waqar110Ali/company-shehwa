import {
  useQuery,
} from "@tanstack/react-query";

import {
  filesApi,
  type FileQuery,
} from "../api/files.api";

// ======================================================
// Query Keys
// ======================================================

export const filesKeys = {
  all: ["files"] as const,

  list: (
    query: FileQuery,
  ) =>
    [
      "files",
      query,
    ] as const,

  storage: [
    "files",
    "storage",
  ] as const,
};

// ======================================================
// Files
// ======================================================

export function useFiles(
  query: FileQuery = {},
) {
  return useQuery({
    queryKey:
      filesKeys.list(
        query,
      ),

    queryFn: () =>
      filesApi.getFiles(
        query,
      ),

    staleTime:
      1000 * 60,

    refetchOnWindowFocus:
      false,
  });
}

// ======================================================
// Storage
// ======================================================

export function useStorage() {
  return useQuery({
    queryKey:
      filesKeys.storage,

    queryFn: () =>
      filesApi.getStorage(),

    staleTime:
      1000 * 60 * 5,

    refetchOnWindowFocus:
      false,
  });
}