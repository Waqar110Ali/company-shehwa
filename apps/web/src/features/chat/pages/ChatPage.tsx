// apps/web/src/features/chat/pages/ChatPage.tsx
import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { ArrowLeft } from "lucide-react";

import SectionHeading from "@/features/dashboard/components/SectionHeading";

import ChatSidebar from "../components/ChatSidebar";
import ChatHeader from "../components/ChatHeader";
import EmptyChat from "../components/EmptyChat";
import MessageInput from "../components/MessageInput";
import MessageList from "../components/MessageList";
import NewConversationDialog from "../components/NewConversationDialog";

import { useChatSocket } from "../hooks/useChatSocket";
import { useConversations } from "../hooks/useConversations";
import { useMessages } from "../hooks/useMessages";
import { useSendMessage } from "../hooks/useSendMessage";

import { mapConversationList } from "../mapper/chat.mapper";

import { CallContext } from "../call/context/CallContext";

import { MessageType } from "../types/message-type";
import type { Conversation } from "../types/chat";

import { getUser } from "@/features/auth/utils/auth-storage";

interface SendPayload {
  content: string;
  type: MessageType;
  attachment?: string;
  fileName?: string;
  fileSize?: number;
}

export default function ChatPage() {
  const call = useContext(CallContext);

  if (!call) {
    return null;
  }

  const currentUser = getUser();

  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  const [newConversationOpen, setNewConversationOpen] = useState(false);

  const [mobileView, setMobileView] = useState<"list" | "thread">("list");

  const { data: conversationsResponse } = useConversations();

  const conversations = useMemo(() => {
    if (!conversationsResponse) return [];
    return mapConversationList(conversationsResponse);
  }, [conversationsResponse]);

  useEffect(() => {
    if (!selectedConversation && conversations.length) {
      setSelectedConversation(conversations[0]);
    }
  }, [conversations, selectedConversation]);

  const { data: messages = [], isLoading: messagesLoading } = useMessages(
    selectedConversation?.id,
  );

  const sendMutation = useSendMessage();

  async function sendMessage(payload: SendPayload) {
    if (!selectedConversation) return;

    await sendMutation.mutateAsync({
      conversationId: selectedConversation.id,
      content: payload.content,
      type: payload.type,
      attachment: payload.attachment,
      fileName: payload.fileName,
      fileSize: payload.fileSize,
    });
  }

  useChatSocket({
    employeeId: currentUser?.employeeId,
    conversationId: selectedConversation?.id,
  });

  function handleConversationCreated(conversationId: string) {
    setNewConversationOpen(false);

    const conversation = conversations.find(
      (item) => item.id === conversationId,
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setMobileView("thread");
    }
  }

  function handleSelectConversation(conversation: Conversation) {
    setSelectedConversation(conversation);
    setMobileView("thread");
  }

  function handleAudioCall() {
    if (!selectedConversation) return;

    call.startAudioCall(
      selectedConversation.id,
      selectedConversation.participant.employeeId,
    );
  }

  function handleVideoCall() {
    if (!selectedConversation) return;

    call.startVideoCall(
      selectedConversation.id,
      selectedConversation.participant.employeeId,
    );
  }

  return (
    <>
      <div className="flex h-180 min-h-0 flex-col gap-4 md:gap-6">
        <div className="shrink-0">
          <SectionHeading
            title="Team Chat"
            subtitle="Collaborate with your team in real time."
          />
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-[#0F172A]/70 shadow-2xl backdrop-blur-xl md:rounded-3xl lg:grid-cols-12">
          <div
            className={`min-h-0 border-white/10 lg:col-span-3 lg:block lg:border-r ${
              mobileView === "list" ? "block" : "hidden"
            }`}
          >
            <ChatSidebar
              conversations={conversations}
              selectedConversation={selectedConversation}
              onSelect={handleSelectConversation}
              onNewConversation={() => setNewConversationOpen(true)}
            />
          </div>

          <div
            className={`min-h-0 flex-col lg:col-span-9 lg:flex ${
              mobileView === "thread" ? "flex" : "hidden"
            }`}
          >
            {!selectedConversation ? (
              <EmptyChat />
            ) : (
              <>
                <div className="flex shrink-0 items-center gap-2 border-b border-white/10 px-2 lg:hidden">
                  <button
                    onClick={() => setMobileView("list")}
                    className="rounded-xl p-3 text-zinc-400 transition hover:bg-white/10 hover:text-white"
                    aria-label="Back to conversations"
                  >
                    <ArrowLeft size={20} />
                  </button>
                </div>

                <div className="shrink-0">
                  <ChatHeader
                    conversation={selectedConversation}
                    onAudioCall={handleAudioCall}
                    onVideoCall={handleVideoCall}
                  />
                </div>

                <div className="min-h-0 flex-1 overflow-hidden">
                  <div className="h-full overflow-y-auto">
                    <MessageList messages={messages} loading={messagesLoading} />
                  </div>
                </div>

                <div className="shrink-0">
                  <MessageInput onSend={sendMessage} loading={sendMutation.isPending} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <NewConversationDialog
        open={newConversationOpen}
        onOpenChange={setNewConversationOpen}
        onCreated={handleConversationCreated}
      />
    </>
  );
}