import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { chatApi } from "../api/chat.api";

export function useMarkConversationRead() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      chatApi.markAsRead,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "chat",
          "conversations",
        ],
      });
    },
  });
}