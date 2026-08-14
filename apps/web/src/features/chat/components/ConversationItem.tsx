import { motion } from "framer-motion";

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
    <motion.button
      whileHover={{
        scale: 1.01,
      }}
      whileTap={{
        scale: 0.98,
      }}
      onClick={onClick}
      className={`w-full rounded-2xl p-4 text-left transition ${
        active
          ? "border border-cyan-400/20 bg-cyan-500/10"
          : "hover:bg-white/5"
      }`}
    >

      <div className="flex items-center gap-4">

        {/* Avatar */}

        <div className="relative">

          <img
            src={conversation.participant.avatar}
            alt={conversation.participant.fullName}
            className="h-12 w-12 rounded-full object-cover"
          />

          {conversation.participant.online && (

            <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-slate-950 bg-green-500" />

          )}

        </div>

        {/* Info */}

        <div className="min-w-0 flex-1">

          <div className="flex items-center justify-between">

            <h3 className="truncate font-semibold text-white">
              {conversation.participant.fullName}
            </h3>

            <span className="text-xs text-slate-500">
              {conversation.lastMessageAt
  ? new Date(
      conversation.lastMessageAt,
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  : ""}
            </span>

          </div>

          <p className="text-xs text-cyan-300">
            {conversation.participant.designation}
          </p>

          <p className="mt-1 truncate text-sm text-slate-400">
            {conversation.lastMessage}
          </p>

        </div>

        {/* Unread */}

        {conversation.unread > 0 && (

          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500 text-xs font-bold text-white">

            {conversation.unread}

          </div>

        )}

      </div>

    </motion.button>
  );
}