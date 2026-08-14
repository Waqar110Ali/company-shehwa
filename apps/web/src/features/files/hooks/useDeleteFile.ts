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
// Delete File
// ======================================================

export function useDeleteFile() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      id: string,
    ) =>
      filesApi.delete(
        id,
      ),

    onSuccess: () => {
      toast.success(
        "File deleted successfully.",
      );

      queryClient.invalidateQueries({
        queryKey:
          filesKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey:
          filesKeys.storage,
      });
    },

    onError: (
      error: any,
    ) => {
      toast.error(
        error?.response?.data
          ?.message ??
          "Unable to delete file.",
      );
    },
  });
}