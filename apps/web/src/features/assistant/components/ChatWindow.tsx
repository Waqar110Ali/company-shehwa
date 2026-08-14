import { useEffect, useRef } from "react";

import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

import type { ChatMessage } from "../types/chat";

interface Props {
  messages: ChatMessage[];

  typing: boolean;
}

export default function ChatWindow({
  messages,
  typing,
}: Props) {

  const bottomRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  return (
    <div className="flex h-full flex-col overflow-y-auto p-6">

      <div className="flex flex-1 flex-col gap-5">

        {messages.map((message) => (

          <MessageBubble
            key={message.id}
            message={message}
          />

        ))}

        {typing && <TypingIndicator />}

        <div ref={bottomRef} />

      </div>

    </div>
  );
}