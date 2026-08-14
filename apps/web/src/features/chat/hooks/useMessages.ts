import { useQuery } from "@tanstack/react-query";

import { chatApi } from "../api/chat.api";
import { mapMessageList } from "../mapper/chat.mapper";

export function useMessages(
  conversationId?: string,
) {
  return useQuery({
    queryKey: [
      "chat",
      "messages",
      conversationId,
    ],

    enabled: !!conversationId,

    queryFn: async () => {
      const { data } =
        await chatApi.messages(
          conversationId!,
        );

      console.log(
        "Raw API:",
        data,
      );

      const messages =
        mapMessageList(data);

      console.log(
        "Mapped:",
        messages,
      );

      return messages;
    },
  });
}