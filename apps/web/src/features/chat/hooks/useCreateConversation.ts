import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  chatApi,
  type CreateConversationDto,
} from "../api/chat.api";

export function useCreateConversation() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: async (
      dto: CreateConversationDto,
    ) => {
      const response =
        await chatApi.createConversation(
          dto,
        );

      return response.data;
    },

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
