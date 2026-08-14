import { useState } from "react";

import { messages } from "../data/messages";

import type { ChatMessage } from "../types/chat";

import { appToast } from "@/lib/toast";

export function useChat() {
  const [chat, setChat] =
    useState<ChatMessage[]>(messages);

  const [typing, setTyping] =
    useState(false);

  async function send(
    content: string
  ) {
    if (!content.trim()) return;

    const user: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      createdAt:
        new Date().toLocaleTimeString(),
    };

    setChat((prev) => [
      ...prev,
      user,
    ]);

    setTyping(true);

    try {

      // ==========================
      // Backend API Later
      // ==========================

      /*
      const { data } =
        await api.post(
          "/assistant/chat",
          {
            message: content,
          }
        );

      const ai: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply,
        createdAt:
          new Date().toLocaleTimeString(),
      };
      */

      await new Promise((resolve) =>
        setTimeout(resolve, 1500)
      );

      const ai: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Backend is not connected yet. This message will come from GPT later.",
        createdAt:
          new Date().toLocaleTimeString(),
      };

      setChat((prev) => [
        ...prev,
        ai,
      ]);

    } catch {

      appToast.error(
        "Unable to contact AI Assistant."
      );

    } finally {

      setTyping(false);

    }
  }

  return {
    chat,
    send,
    typing,
  };
}