import SectionHeading from "@/features/dashboard/components/SectionHeading";

import ChatHeader from "../components/ChatHeader";
import ChatSidebar from "../components/ChatSidebar";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";
import SuggestedPrompts from "../components/SuggestedPrompts";

import { useChat } from "../hooks/useChat";

export default function AIAssistantPage() {
  const {
    chat,
    send,
    typing,
  } = useChat();

  return (
    <div className="space-y-8">

      <SectionHeading
        title="AI Assistant"
        subtitle="Your intelligent company assistant."
      />

      <div className="grid h-[78vh] grid-cols-12 overflow-hidden rounded-3xl border border-white/10 bg-white/5">

        {/* Sidebar */}

        <div className="col-span-3 border-r border-white/10">

          <ChatSidebar />

        </div>

        {/* Chat */}

        <div className="col-span-9 flex h-full flex-col">

          <ChatHeader />

          <div className="border-b border-white/10 p-5">

            <SuggestedPrompts
              onSelect={send}
            />

          </div>

          <div className="flex-1 overflow-hidden">

            <ChatWindow
              messages={chat}
              typing={typing}
            />

          </div>

          <ChatInput
            onSend={send}
          />

        </div>

      </div>

    </div>
  );
}