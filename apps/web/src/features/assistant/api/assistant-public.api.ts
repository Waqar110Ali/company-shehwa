// apps/web/src/features/assistant/api/assistant-public.api.ts
import { api } from "@/lib/api";

import type { ChatMessage } from "../types/chat";

export const assistantPublicApi = {
  async sendMessage(content: string, history: ChatMessage[]) {
    // Unlike assistantApi.sendMessage, there's no authenticated user
    // here for the backend to hang a conversation thread off of, so
    // we send the prior turns along with each request instead.
    const messages = [
      ...history.map((m) => ({
        role: m.role,
        content: m.content,
      })),
      { role: "user" as const, content },
    ];

    const response = await api.post<{ reply: string }>(
      "/public/assistant/chat",
      { messages },
    );

    return response.data;
  },
};