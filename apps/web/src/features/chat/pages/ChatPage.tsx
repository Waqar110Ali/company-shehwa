import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

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
  // =====================================================
  // Call Context
  // =====================================================

  const call =
    useContext(CallContext);

  if (!call) {
    return null;
  }

  // =====================================================
  // Current User
  // =====================================================

  const currentUser =
    getUser();

  // =====================================================
  // State
  // =====================================================

  const [
    selectedConversation,
    setSelectedConversation,
  ] =
    useState<Conversation | null>(
      null,
    );

  const [
    newConversationOpen,
    setNewConversationOpen,
  ] = useState(false);

  // =====================================================
  // Conversations
  // =====================================================

  const {
    data: conversationsResponse,
  } = useConversations();

  const conversations =
    useMemo(() => {
      if (!conversationsResponse) {
        return [];
      }

      return mapConversationList(
        conversationsResponse,
      );
    }, [conversationsResponse]);

  useEffect(() => {
    if (
      !selectedConversation &&
      conversations.length
    ) {
      setSelectedConversation(
        conversations[0],
      );
    }
  }, [
    conversations,
    selectedConversation,
  ]);

  // =====================================================
  // Messages
  // =====================================================

  const {
    data: messages = [],
    isLoading: messagesLoading,
  } = useMessages(
    selectedConversation?.id,
  );

  // =====================================================
  // Send Message
  // =====================================================

  const sendMutation =
    useSendMessage();

  async function sendMessage(
    payload: SendPayload,
  ) {
    if (!selectedConversation) {
      return;
    }

    await sendMutation.mutateAsync({
      conversationId:
        selectedConversation.id,

      content:
        payload.content,

      type:
        payload.type,

      attachment:
        payload.attachment,

      fileName:
        payload.fileName,

      fileSize:
        payload.fileSize,
    });
  }

  // =====================================================
  // Socket
  // =====================================================

  useChatSocket({
    employeeId:
      currentUser?.employeeId,
    conversationId:
      selectedConversation?.id,
  });

  // =====================================================
  // Conversation Created
  // =====================================================

  function handleConversationCreated(
    conversationId: string,
  ) {
    setNewConversationOpen(
      false,
    );

    const conversation =
      conversations.find(
        (item) =>
          item.id ===
          conversationId,
      );

    if (conversation) {
      setSelectedConversation(
        conversation,
      );
    }
  }

  // =====================================================
  // Audio Call
  // =====================================================

  function handleAudioCall() {
    if (
      !selectedConversation
    ) {
      return;
    }

    console.log(
      "Starting Audio Call",
    );

    console.log("================================");
console.log("Selected Conversation");
console.log(selectedConversation);
console.log("Participant");
console.log(selectedConversation.participant);
console.log("Participant ID:", selectedConversation.participant.id);
console.log("Participant USER ID:", selectedConversation.participant.userId);
console.log("================================");

    call.startAudioCall(
      selectedConversation.id,
      selectedConversation.participant.employeeId,
    );
  }



  // =====================================================
// Video Call
// =====================================================

function handleVideoCall() {
  if (!selectedConversation) {
    return;
  }

  console.log("Starting Video Call");

  console.log(
    "Receiver Employee Id:",
    selectedConversation.participant.employeeId,
  );

  call.startVideoCall(
    selectedConversation.id,
    selectedConversation.participant.employeeId, // ✅ fixed: was userId
  );
}

  // =====================================================
  // Render
  // =====================================================

  return (
    <>
      <div className="flex h-full flex-col gap-6">

        <SectionHeading
          title="Team Chat"
          subtitle="Collaborate with your team in real time."
        />

        <div className="grid h-[calc(100vh-220px)] min-h-0 grid-cols-12 overflow-hidden rounded-3xl border border-white/10 bg-[#0F172A]/70 shadow-2xl backdrop-blur-xl">

          <div className="col-span-3 min-h-0 border-r border-white/10">

            <ChatSidebar
              conversations={
                conversations
              }
              selectedConversation={
                selectedConversation
              }
              onSelect={
                setSelectedConversation
              }
              onNewConversation={() =>
                setNewConversationOpen(
                  true,
                )
              }
            />

          </div>

          <div className="col-span-9 flex min-h-0 flex-col">

            {!selectedConversation ? (
              <EmptyChat />
            ) : (
              <>
                <div className="shrink-0">

                  <ChatHeader
                    conversation={
                      selectedConversation
                    }
                    onAudioCall={
                      handleAudioCall
                    }
                    onVideoCall={
                      handleVideoCall
                    }
                  />

                </div>

                <div className="min-h-0 flex-1 overflow-hidden">

                  <div className="h-full overflow-y-auto">

                    <MessageList
                      messages={
                        messages
                      }
                      loading={
                        messagesLoading
                      }
                    />

                  </div>

                </div>

                <div className="shrink-0">

                  <MessageInput
                    onSend={
                      sendMessage
                    }
                    loading={
                      sendMutation.isPending
                    }
                  />

                </div>

              </>
            )}

          </div>

        </div>

      </div>

      <NewConversationDialog
        open={
          newConversationOpen
        }
        onOpenChange={
          setNewConversationOpen
        }
        onCreated={
          handleConversationCreated
        }
      />
    </>
  );
}