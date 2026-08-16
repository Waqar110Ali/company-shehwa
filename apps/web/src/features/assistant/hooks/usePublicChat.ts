// apps/web/src/features/assistant/hooks/usePublicChat.ts
import { useState } from "react";

import { assistantPublicApi } from "../api/assistant-public.api";
import type { ChatMessage } from "../types/chat";

import { appToast } from "@/lib/toast";

export function usePublicChat() {
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);

  async function send(content: string) {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      createdAt: new Date().toLocaleTimeString(),
    };

    // Snapshot prior turns before appending the new message to state,
    // so the request carries exactly the history that led up to it.
    const history = chat;

    setChat((prev) => [...prev, userMessage]);
    setTyping(true);

    try {
      const { reply } = await assistantPublicApi.sendMessage(
        content,
        history,
      );

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
        error?.response?.data?.message ??
        "Unable to contact AI Assistant.";

      appToast.error(message);
    } finally {
      setTyping(false);
    }
  }

  return { chat, send, typing };
}