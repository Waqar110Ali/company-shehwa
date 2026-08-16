// apps/web/src/features/assistant/hooks/useChat.ts
import { useState } from "react";

import { messages as initialMessages } from "../data/messages";
import { assistantApi } from "../api/assistant.api";
import type { ChatMessage } from "../types/chat";

import { appToast } from "@/lib/toast";

export function useChat() {
  const [chat, setChat] = useState<ChatMessage[]>(initialMessages);
  const [typing, setTyping] = useState(false);

  async function send(content: string) {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      createdAt: new Date().toLocaleTimeString(),
    };

    setChat((prev) => [...prev, userMessage]);
    setTyping(true);

    try {
      const { reply } = await assistantApi.sendMessage(content);

      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: reply,
        createdAt: new Date().toLocaleTimeString(),
      };

      setChat((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      const message =
        error?.response?.data?.detail ??
        "Unable to contact AI Assistant.";

      appToast.error(message);
    } finally {
      setTyping(false);
    }
  }

  return { chat, send, typing };
}