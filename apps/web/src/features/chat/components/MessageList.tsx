import {
  useEffect,
  useRef,
} from "react";

import { MessageCircle } from "lucide-react";

import MessageBubble from "./MessageBubble";

import type { Message } from "../types/chat";

interface Props {
  messages: Message[];

  loading?: boolean;
}

export default function MessageList({
  messages,
  loading = false,
}: Props) {
  const bottomRef =
    useRef<HTMLDivElement>(null);

  console.log(
    "==============================",
  );
  console.log(
    "MessageList Render",
  );
  console.log(
    "Loading:",
    loading,
  );
  console.log(
    "Messages:",
    messages,
  );
  console.log(
    "Messages Length:",
    messages.length,
  );
  console.log(
    "==============================",
  );

  useEffect(() => {
    console.log(
      "Messages changed:",
      messages,
    );

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  if (loading) {
    console.log(
      "Rendering Loader",
    );

    return (
      <div className="flex h-full items-center justify-center">

        <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />

      </div>
    );
  }

  if (!messages.length) {
    console.log(
      "Rendering Empty State",
    );

    return (
      <div className="flex h-full flex-col items-center justify-center px-8 text-center">

        <MessageCircle
          size={56}
          className="mb-5 text-zinc-600"
        />

        <h3 className="text-xl font-semibold text-white">
          No Messages
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">
          Start the conversation by
          sending your first message.
        </p>

      </div>
    );
  }

  console.log(
    "Rendering",
    messages.length,
    "messages",
  );

  return (
    <div className="flex min-h-full flex-col justify-end">

      <div className="space-y-4 p-6">

        {messages.map(
          (
            message,
            index,
          ) => {
            console.log(
              `Message ${index}:`,
              message,
            );

            return (
              <MessageBubble
                key={message.id}
                message={message}
              />
            );
          },
        )}

        <div
          ref={bottomRef}
          className="h-2"
        />

      </div>

    </div>
  );
}