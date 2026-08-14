import {
  MessageSquare,
  Pin,
  Star,
} from "lucide-react";

import type { Conversation } from "../types/chat";

interface Props {
  conversation: Conversation;

  active: boolean;

  onClick: () => void;
}

export default function ConversationItem({
  conversation,
  active,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl p-3 transition ${
        active
          ? "bg-cyan-500/20"
          : "hover:bg-white/5"
      }`}
    >
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <MessageSquare size={18} />

          <span className="text-white">
            {conversation.title}
          </span>

        </div>

        <div className="flex gap-2">

          {conversation.favorite && (
            <Star
              size={15}
              className="fill-yellow-400 text-yellow-400"
            />
          )}

          {conversation.pinned && (
            <Pin
              size={15}
              className="text-cyan-400"
            />
          )}

        </div>

      </div>

      <p className="mt-2 text-left text-xs text-slate-400">
        {conversation.updatedAt}
      </p>

    </button>
  );
}