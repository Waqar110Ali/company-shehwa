import type { ChatMessage as Message } from "../types/chat";

interface Props {
  message: Message;
}

export default function ChatMessage({
  message,
}: Props) {
  const user =
    message.role === "user";

  return (
    <div
      className={`flex ${
        user
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-xl rounded-2xl px-5 py-4 ${
          user
            ? "bg-cyan-500 text-white"
            : "bg-white/10 text-slate-200"
        }`}
      >
        <p>{message.content}</p>

        <span className="mt-2 block text-right text-xs opacity-60">
          {message.createdAt}
        </span>

      </div>

    </div>
  );
}