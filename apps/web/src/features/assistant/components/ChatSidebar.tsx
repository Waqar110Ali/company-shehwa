import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import SearchChats from "./SearchChats";
import ConversationItem from "./ConversationItem";

import type { Conversation } from "../types/chat";

interface Props {
  conversations: Conversation[];

  selectedConversation: Conversation | null;

  onSelect: (
    conversation: Conversation,
  ) => void;

  onNewConversation: () => void;
}

export default function ChatSidebar({
  conversations,
  selectedConversation,
  onSelect,
  onNewConversation,
}: Props) {
  const [search, setSearch] =
    useState("");

  const filtered =
    useMemo(() => {
      if (!search.trim()) {
        return conversations;
      }

      const keyword =
        search.toLowerCase();

      return conversations.filter(
        (conversation) =>
          conversation.title
            .toLowerCase()
            .includes(keyword),
      );
    }, [
      conversations,
      search,
    ]);

  return (
    <aside className="flex h-full flex-col bg-slate-950">

      {/* Header */}

      <div className="border-b border-white/10 p-5">

        <button
          type="button"
          onClick={
            onNewConversation
          }
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3 font-medium text-white transition hover:bg-cyan-600"
        >
          <Plus size={18} />

          New Chat
        </button>

      </div>

      {/* Search */}

      <div className="p-4">

        <SearchChats
          value={search}
          onChange={setSearch}
        />

      </div>

      {/* Conversations */}

      <div className="flex-1 overflow-y-auto px-4 pb-4">

        {filtered.length === 0 ? (

          <div className="flex h-full items-center justify-center text-center text-sm text-slate-500">

            No conversations found.

          </div>

        ) : (

          <div className="space-y-2">

            {filtered.map(
              (
                conversation,
              ) => (

                <ConversationItem
                  key={
                    conversation.id
                  }
                  conversation={
                    conversation
                  }
                  active={
                    selectedConversation?.id ===
                    conversation.id
                  }
                  onClick={() =>
                    onSelect(
                      conversation,
                    )
                  }
                />

              ),
            )}

          </div>

        )}

      </div>

    </aside>
  );
}