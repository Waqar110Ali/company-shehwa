import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import {
  filesApi,
} from "../api/files.api";

import {
  filesKeys,
} from "./useFiles";

// ======================================================
// Move File
// ======================================================

export function useMoveFile() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      parentFolder,
    }: {
      id: string;

      parentFolder:
        | string
        | null;
    }) =>
      filesApi.move(
        id,
        {
          parentFolder,
        },
      ),

    onSuccess: () => {
      toast.success(
        "File moved successfully.",
      );

      queryClient.invalidateQueries({
        queryKey:
          filesKeys.all,
      });
    },

    onError: (
      error: any,
    ) => {
      toast.error(
        error?.response?.data
          ?.message ??
          "Unable to move file.",
      );
    },
  });
}