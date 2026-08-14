import { useMemo, useState } from "react";

import {
  MessageCirclePlus,
  Search,
} from "lucide-react";

import ConversationCard from "./ConversationCard";
import NewConversationDialog from "./NewConversationDialog";

import { useCreateConversation } from "../hooks/useCreateConversation";

import type { Conversation } from "../types/chat";

interface Props {
  conversations: Conversation[];

  selectedConversation: Conversation | null;

  onSelect: (
    conversation: Conversation,
  ) => void;
}

export default function ChatSidebar({
  conversations,
  selectedConversation,
  onSelect,
}: Props) {
  const [search, setSearch] =
    useState("");

  const [openDialog, setOpenDialog] =
    useState(false);

  const createConversation =
    useCreateConversation();

  const filtered = useMemo(() => {
    if (!search.trim()) {
      return conversations;
    }

    const keyword =
      search.toLowerCase();

    return conversations.filter(
      (conversation) =>
        conversation.participant.fullName
          .toLowerCase()
          .includes(keyword),
    );
  }, [
    conversations,
    search,
  ]);

  async function handleCreate(
    employeeId: string,
  ) {
    try {
      const conversation =
        await createConversation.mutateAsync({
          participantId:
            employeeId,
        });

      onSelect(conversation);
    } catch (error) {
      console.error(error);
    }
  }

  console.log(
    "Sidebar conversations:",
    conversations,
  );

  return (
    <>
      <aside className="flex h-full min-h-0 flex-col bg-[#0F172A]">

        {/* ================================================= */}
        {/* Header */}
        {/* ================================================= */}

        <div className="shrink-0 border-b border-white/10 bg-[#0F172A] p-5">

          <div className="mb-5 flex items-center justify-between">

            <h2 className="text-xl font-semibold text-white">
              Chats
            </h2>

            <button
              onClick={() =>
                setOpenDialog(true)
              }
              className="rounded-xl bg-blue-600 p-2 transition hover:bg-blue-500"
            >
              <MessageCirclePlus
                size={18}
                className="text-white"
              />
            </button>

          </div>

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value,
                )
              }
              placeholder="Search conversations..."
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

          </div>

        </div>

        {/* ================================================= */}
        {/* Conversation List */}
        {/* ================================================= */}

        <div className="min-h-0 flex-1 overflow-y-auto p-3">

          {filtered.length ===
          0 ? (
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">

              <MessageCirclePlus
                size={48}
                className="mb-4 text-zinc-600"
              />

              <h3 className="text-lg font-semibold text-white">
                No Conversations
              </h3>

              <p className="mt-2 text-sm text-zinc-500">
                Start chatting with
                your teammates.
              </p>

            </div>
          ) : (
            <div className="space-y-2">

              {filtered.map(
                (
                  conversation,
                ) => (
                  <ConversationCard
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

      <NewConversationDialog
  open={openDialog}
  onOpenChange={setOpenDialog}
  onCreated={(conversationId) => {
    console.log("Conversation Created:", conversationId);

    setOpenDialog(false);

    // optionally refetch conversations here
  }}
/>
    </>
  );
}