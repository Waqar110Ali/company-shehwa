import type { ChatMessage } from "../types/chat";

export const messages: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hello 👋 I'm your AI Company Assistant. How can I help you today?",

    createdAt: "09:00",
  },

  {
    id: "2",
    role: "user",
    content:
      "Show me today's attendance report.",

    createdAt: "09:01",
  },

  {
    id: "3",
    role: "assistant",
    content:
      "Today's attendance is 98%. Two employees are on leave.",

    createdAt: "09:02",
  },
];