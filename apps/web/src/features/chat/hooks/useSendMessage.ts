import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  chatApi,
  type SendMessageRequest,
} from "../api/chat.api";

export function useSendMessage() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      dto: SendMessageRequest,
    ) =>
      chatApi.send(dto),

    onSuccess: (
      _,
      variables,
    ) => {
      queryClient.invalidateQueries({
        queryKey: [
          "chat",
          "messages",
          variables.conversationId,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "chat",
          "conversations",
        ],
      });
    },
  });
}