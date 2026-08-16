// // import { useState } from "react";

// // import SectionHeading from "@/features/dashboard/components/SectionHeading";

// // import ChatHeader from "../components/ChatHeader";
// // import ChatSidebar from "../components/ChatSidebar";
// // import ChatWindow from "../components/ChatWindow";
// // import ChatInput from "../components/ChatInput";
// // import SuggestedPrompts from "../components/SuggestedPrompts";

// // import { useChat } from "../hooks/useChat";
// // import { conversations as mockConversations } from "../data/conversations";
// // import type { Conversation } from "../types/chat";

// // export default function AIAssistantPage() {
// //   const { chat, send, typing } = useChat();

// //   const [conversations] = useState<Conversation[]>(mockConversations);
// //   const [selectedConversation, setSelectedConversation] =
// //     useState<Conversation | null>(mockConversations[0] ?? null);

// //   function handleNewConversation() {
// //     setSelectedConversation(null);
// //   }

// //   return (
// //   <div className="flex h-[calc(100vh--05rem)] flex-col space-y-8">
// //       <SectionHeading
// //         title="AI Assistant"
// //         subtitle="Your intelligent company assistant."
// //       />

// //       <div className="grid min-h-0 flex-1 grid-cols-12 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
// //         <div className="col-span-3 min-h-0 border-r border-white/10">
// //           <ChatSidebar
// //             conversations={conversations}
// //             selectedConversation={selectedConversation}
// //             onSelect={setSelectedConversation}
// //             onNewConversation={handleNewConversation}
// //           />
// //         </div>

// //         <div className="col-span-9 flex min-h-0 flex-col">
// //           <ChatHeader />

// //           <div className="border-b border-white/10 p-5">
// //             <SuggestedPrompts onSelect={send} />
// //           </div>

// //           <div className="min-h-0 flex-1 overflow-hidden">
// //             <ChatWindow messages={chat} typing={typing} />
// //           </div>

// //           <ChatInput onSend={send} />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// // apps/web/src/features/assistant/pages/AIAssistantPage.tsx
// import { useState } from "react";

// import { ArrowLeft } from "lucide-react";

// import SectionHeading from "@/features/dashboard/components/SectionHeading";

// import ChatHeader from "../components/ChatHeader";
// import ChatSidebar from "../components/ChatSidebar";
// import ChatWindow from "../components/ChatWindow";
// import ChatInput from "../components/ChatInput";
// import SuggestedPrompts from "../components/SuggestedPrompts";

// import { useChat } from "../hooks/useChat";
// import { conversations as mockConversations } from "../data/conversations";
// import type { Conversation } from "../types/chat";

// export default function AIAssistantPage() {
//   const { chat, send, typing } = useChat();

//   const [conversations] = useState<Conversation[]>(mockConversations);
//   const [selectedConversation, setSelectedConversation] =
//     useState<Conversation | null>(mockConversations[0] ?? null);

//   // Mobile-only: which pane is visible. Desktop (lg+) always shows both,
//   // same pattern as Team Chat.
//   const [mobileView, setMobileView] = useState<"list" | "thread">("thread");

//   function handleNewConversation() {
//     setSelectedConversation(null);
//     setMobileView("thread");
//   }

//   function handleSelectConversation(conversation: Conversation) {
//     setSelectedConversation(conversation);
//     setMobileView("thread");
//   }

//   return (
//     <div className="flex h-full min-h-0 flex-col gap-4 md:gap-6">
//       <div className="shrink-0">
//         <SectionHeading
//           title="AI Assistant"
//           subtitle="Your intelligent company assistant."
//         />
//       </div>

//       <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:rounded-3xl lg:grid-cols-12">
//         <div
//           className={`min-h-0 border-white/10 lg:col-span-3 lg:block lg:border-r ${
//             mobileView === "list" ? "block" : "hidden"
//           }`}
//         >
//           <ChatSidebar
//             conversations={conversations}
//             selectedConversation={selectedConversation}
//             onSelect={handleSelectConversation}
//             onNewConversation={handleNewConversation}
//           />
//         </div>

//         <div
//           className={`min-h-0 flex-col lg:col-span-9 lg:flex ${
//             mobileView === "thread" ? "flex" : "hidden"
//           }`}
//         >
//           <div className="flex shrink-0 items-center gap-2 border-b border-white/10 px-2 lg:hidden">
//             <button
//               onClick={() => setMobileView("list")}
//               className="rounded-xl p-3 text-slate-400 transition hover:bg-white/10 hover:text-white"
//               aria-label="Back to conversations"
//             >
//               <ArrowLeft size={20} />
//             </button>
//           </div>

//           <div className="shrink-0">
//             <ChatHeader />
//           </div>

//           <div className="shrink-0 overflow-x-auto border-b border-white/10 p-4 md:p-5">
//             <SuggestedPrompts onSelect={send} />
//           </div>

//           <div className="min-h-0 flex-1 overflow-hidden">
//             <ChatWindow messages={chat} typing={typing} />
//           </div>

//           <div className="shrink-0">
//             <ChatInput onSend={send} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";

import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";

import SectionHeading from "@/features/dashboard/components/SectionHeading";

import ChatHeader from "../components/ChatHeader";
import ChatSidebar from "../components/ChatSidebar";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";
import SuggestedPrompts from "../components/SuggestedPrompts";

import { useChat } from "../hooks/useChat";
import { conversations as mockConversations } from "../data/conversations";
import type { Conversation } from "../types/chat";

export default function AIAssistantPage() {
  const { chat, send, typing } = useChat();

  const [conversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(mockConversations[0] ?? null);

  // Mobile-only: which pane is visible.
  // Desktop (lg+) always shows both.
  const [mobileView, setMobileView] = useState<"list" | "thread">("thread");

  // Mobile-only: whether suggested prompts are visible.
  // Desktop always keeps them visible through md:block.
  const [showSuggestions, setShowSuggestions] = useState(true);

  function handleNewConversation() {
    setSelectedConversation(null);
    setMobileView("thread");
  }

  function handleSelectConversation(conversation: Conversation) {
    setSelectedConversation(conversation);
    setMobileView("thread");
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-col gap-3 overflow-hidden md:gap-6">
      {/* Page heading */}
      <div className="shrink-0">
        <SectionHeading
          title="AI Assistant"
          subtitle="Your intelligent company assistant."
        />
      </div>

      {/* Main assistant container */}
      <div className="grid min-h-0 min-w-0 flex-1 grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:rounded-3xl lg:grid-cols-12">
        {/* ======================================================
            Conversation Sidebar
            ====================================================== */}
        <div
          className={`min-h-0 min-w-0 border-white/10 lg:col-span-3 lg:block lg:border-r ${
            mobileView === "list" ? "block" : "hidden"
          }`}
        >
          <ChatSidebar
            conversations={conversations}
            selectedConversation={selectedConversation}
            onSelect={handleSelectConversation}
            onNewConversation={handleNewConversation}
          />
        </div>

        {/* ======================================================
            Chat Thread
            ====================================================== */}
        <div
          className={`min-h-0 min-w-0 flex-col lg:col-span-9 lg:flex ${
            mobileView === "thread" ? "flex" : "hidden"
          }`}
        >
          {/* Mobile back button */}
          <div className="flex shrink-0 items-center gap-2 border-b border-white/10 px-2 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileView("list")}
              className="rounded-xl p-3 text-slate-400 transition hover:bg-white/10 hover:text-white"
              aria-label="Back to conversations"
            >
              <ArrowLeft size={20} />
            </button>
          </div>

          {/* Chat header */}
          <div className="shrink-0">
            <ChatHeader />
          </div>

          {/* ====================================================
              Suggested Prompts
              ==================================================== */}

          {/* Mobile toggle */}
          <div className="shrink-0 border-b border-white/10 md:hidden">
            <button
              type="button"
              onClick={() => setShowSuggestions((current) => !current)}
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-slate-300 transition hover:bg-white/5"
              aria-expanded={showSuggestions}
            >
              <span>Suggested prompts</span>

              {showSuggestions ? (
                <ChevronUp size={18} className="text-slate-400" />
              ) : (
                <ChevronDown size={18} className="text-slate-400" />
              )}
            </button>
          </div>

          {/* Suggestions */}
          <div
            className={`shrink-0 border-b border-white/10 ${
              showSuggestions ? "block" : "hidden"
            } md:block`}
          >
            <div className="max-h-32 overflow-y-auto p-3 sm:max-h-none sm:p-4 md:p-5">
              <SuggestedPrompts onSelect={send} />
            </div>
          </div>

          {/* ====================================================
              Messages
              ==================================================== */}
          <div className="min-h-0 flex-1 overflow-hidden">
            <ChatWindow messages={chat} typing={typing} />
          </div>

          {/* ====================================================
              Chat Input
              ==================================================== */}
          <div className="shrink-0">
            <ChatInput onSend={send} />
          </div>
        </div>
      </div>
    </div>
  );
}
