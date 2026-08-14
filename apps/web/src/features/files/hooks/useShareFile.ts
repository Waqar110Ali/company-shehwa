import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import {
  filesApi,
  type ShareFileDto,
} from "../api/files.api";

import {
  filesKeys,
} from "./useFiles";

// ======================================================
// Share File
// ======================================================

export function useShareFile() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      dto,
    }: {
      id: string;

      dto: ShareFileDto;
    }) =>
      filesApi.share(
        id,
        dto,
      ),

    onSuccess: () => {
      toast.success(
        "File shared successfully.",
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
          "Unable to share file.",
      );
    },
  });
}