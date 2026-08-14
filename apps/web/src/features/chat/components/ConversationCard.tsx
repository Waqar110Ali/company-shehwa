import {
  Check,
  CheckCheck,
} from "lucide-react";

import type { Conversation } from "../types/chat";

interface Props {
  conversation: Conversation;
  active: boolean;
  onClick(): void;
}

export default function ConversationCard({
  conversation,
  active,
  onClick,
}: Props) {
  const participant =
    conversation.participant;

  const lastTime =
    conversation.lastMessageAt
      ? new Date(
          conversation.lastMessageAt,
        ).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

  return (
    <button
      onClick={onClick}
      className={`group flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-all duration-200 ${
        active
          ? "bg-blue-600/20 ring-1 ring-blue-500/50"
          : "hover:bg-white/5"
      }`}
    >
      {/* Avatar */}

      <div className="relative shrink-0">

        <img
          src={
            participant.avatar ||
            "/images/avatar.png"
          }
          alt={
            participant.fullName
          }
          className="h-14 w-14 rounded-full border border-white/10 object-cover"
        />

        <span
          className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#111827] ${
            participant.online
              ? "bg-emerald-500"
              : "bg-zinc-500"
          }`}
        />

      </div>

      {/* Content */}

      <div className="min-w-0 flex-1">

        <div className="flex items-center justify-between">

          <h3
            className={`truncate font-semibold ${
              active
                ? "text-white"
                : "text-zinc-200"
            }`}
          >
            {participant.fullName}
          </h3>

          {lastTime && (
            <span className="text-[11px] text-zinc-500">
              {lastTime}
            </span>
          )}

        </div>

        <p className="mt-0.5 truncate text-xs text-zinc-500">
          {participant.designation}
          {participant.department &&
            ` • ${participant.department}`}
        </p>

        <div className="mt-1 flex items-center justify-between">

          <p className="truncate pr-2 text-sm text-zinc-400">
            {conversation.lastMessage ||
              "No messages yet"}
          </p>

          <div className="flex items-center gap-2">

            {conversation.unread >
              0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-blue-600 px-1.5 text-[11px] font-semibold text-white">
                {conversation.unread}
              </span>
            )}

            {conversation.unread ===
              0 &&
              conversation.lastMessage && (
                <CheckCheck
                  size={15}
                  className="text-blue-500"
                />
              )}

          </div>

        </div>

      </div>

    </button>
  );
}