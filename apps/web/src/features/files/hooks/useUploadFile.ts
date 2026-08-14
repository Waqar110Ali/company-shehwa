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
// Upload File
// ======================================================

export function useUploadFile() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      file,
      parentFolder,
    }: {
      file: File;

      parentFolder?: string;
    }) =>
      filesApi.upload(
        file,
        parentFolder,
      ),

    onSuccess: () => {
      toast.success(
        "File uploaded successfully.",
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
          "Unable to upload file.",
      );
    },
  });
}