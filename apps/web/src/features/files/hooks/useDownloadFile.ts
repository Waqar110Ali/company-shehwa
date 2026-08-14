import {
  useMutation,
} from "@tanstack/react-query";

import { toast } from "sonner";

import {
  filesApi,
} from "../api/files.api";

// ======================================================
// Download File
//
// The backend's /files/:id/download endpoint returns JSON
// metadata (the Cloudinary URL, file name, mime type) — it
// does not stream raw file bytes. So this fetches that
// metadata first, then fetches the actual file content from
// the returned URL before triggering a browser download.
// ======================================================

export function useDownloadFile() {
  return useMutation({
    mutationFn: async ({
      id,
      fileName,
    }: {
      id: string;

      fileName: string;
    }) => {
      const info =
        await filesApi.download(
          id,
        );

      const response =
        await fetch(
          info.url,
        );

      if (
        !response.ok
      ) {
        throw new Error(
          "Failed to fetch file contents.",
        );
      }

      const blob =
        await response.blob();

      return {
        blob,

        fileName:
          fileName ||
          info.fileName,
      };
    },

    onSuccess: ({
      blob,
      fileName,
    }) => {
      const url =
        window.URL.createObjectURL(
          blob,
        );

      const link =
        document.createElement(
          "a",
        );

      link.href = url;

      link.download =
        fileName;

      document.body.appendChild(
        link,
      );

      link.click();

      link.remove();

      window.URL.revokeObjectURL(
        url,
      );
    },

    onError: (
      error: any,
    ) => {
      toast.error(
        error?.response?.data
          ?.message ??
          "Unable to download file.",
      );
    },
  });
}