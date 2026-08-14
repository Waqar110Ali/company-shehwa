import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import {
  filesApi,
  type RenameFileDto,
} from "../api/files.api";

import {
  filesKeys,
} from "./useFiles";

// ======================================================
// Rename File
// ======================================================

export function useRenameFile() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      dto,
    }: {
      id: string;

      dto: RenameFileDto;
    }) =>
      filesApi.rename(
        id,
        dto,
      ),

    onSuccess: () => {
      toast.success(
        "File renamed successfully.",
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
          "Unable to rename file.",
      );
    },
  });
}