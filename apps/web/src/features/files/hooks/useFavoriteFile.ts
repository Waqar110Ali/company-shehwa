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
// Favorite File
//
// The backend only exposes a single toggle endpoint
// (PATCH /files/:id/favorite) that flips whatever the
// current state is server-side — there is no separate
// add/remove endpoint. `favorite` is kept in the input
// type only so callers that already track optimistic
// intent don't need to change, but it isn't sent.
// ======================================================

export function useFavoriteFile() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
    }: {
      id: string;

      favorite: boolean;
    }) =>
      filesApi.toggleFavorite(
        id,
      ),

    onSuccess: () => {
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
          "Unable to update favorite.",
      );
    },
  });
}