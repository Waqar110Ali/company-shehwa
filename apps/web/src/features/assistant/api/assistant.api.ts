// apps/web/src/features/assistant/api/assistant.api.ts
import { aiApi } from "@/lib/aiApi";

interface ChatResponse {
  reply: string;
}

export const assistantApi = {
  async sendMessage(message: string) {
    const response = await aiApi.post<ChatResponse>("/assistant/chat", {
      message,
    });

    return response.data;
  },
};