import { useQuery } from "@tanstack/react-query";

import { chatApi } from "../api/chat.api";
import { mapConversationList } from "../mapper/chat.mapper";

export function useConversations(
  search?: string,
) {
  return useQuery({
    queryKey: [
      "chat",
      "conversations",
      search,
    ],

    queryFn: async () => {
      const { data } =
        await chatApi.conversations({
          search,
        });

      return mapConversationList(
        data,
      );
    },
  });
}