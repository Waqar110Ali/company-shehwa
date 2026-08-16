// import { useEffect, useRef, useState } from "react";
// import { ArrowLeft, Bot, Send } from "lucide-react";
// import { Link } from "react-router-dom";

// import { usePublicChat } from "@/features/assistant/hooks/usePublicChat";

// export default function AssistantPage() {
//   const [input, setInput] = useState("");

//   const { chat, send, typing } = usePublicChat();

//   const scrollRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     scrollRef.current?.scrollTo({
//       top: scrollRef.current.scrollHeight,
//       behavior: "smooth",
//     });
//   }, [chat, typing]);

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     if (!input.trim()) {
//       return;
//     }

//     send(input);
//     setInput("");
//   }

//   function handleKeyDown(
//     e: React.KeyboardEvent<HTMLTextAreaElement>,
//   ) {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit(e as unknown as React.FormEvent);
//     }
//   }

//   return (
//     <main className="flex min-h-screen flex-col bg-slate-950 pt-20">

//       <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-10">

//         {/* Header */}
//         <div className="mb-8 flex items-center justify-between">
//           <Link
//             to="/"
//             className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
//           >
//             <ArrowLeft size={16} />
//             Back to home
//           </Link>

//           <div className="flex items-center gap-3">
//             <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-300">
//               <Bot size={20} />
//             </div>
//             <div>
//               <p className="font-semibold text-white">AI Assistant</p>
//               <p className="text-xs text-slate-400">Ask us anything</p>
//             </div>
//           </div>
//         </div>

//         {/* Messages */}
//         <div
//           ref={scrollRef}
//           className="flex-1 space-y-5 overflow-y-auto rounded-3xl border border-white/10 bg-white/5 p-6"
//         >
//           {chat.length === 0 && (
//             <p className="text-slate-400">
//               👋 Hi! Ask me about our services, projects, or how to
//               get in touch — no account needed.
//             </p>
//           )}

//           {chat.map((message) => (
//             <div
//               key={message.id}
//               className={`flex ${
//                 message.role === "user"
//                   ? "justify-end"
//                   : "justify-start"
//               }`}
//             >
//               <div
//                 className={`max-w-[75%] rounded-2xl px-5 py-3 leading-7 ${
//                   message.role === "user"
//                     ? "bg-cyan-500 text-white"
//                     : "border border-white/10 bg-white/5 text-slate-200"
//                 }`}
//               >
//                 {message.content}
//               </div>
//             </div>
//           ))}

//           {typing && (
//             <div className="flex justify-start">
//               <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-slate-400">
//                 Typing...
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Input */}
//         <form
//           onSubmit={handleSubmit}
//           className="mt-6 flex items-end gap-3"
//         >
//           <textarea
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Type a message..."
//             rows={2}
//             className="max-h-32 flex-1 resize-none rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/40"
//           />

//           <button
//             type="submit"
//             disabled={typing || !input.trim()}
//             className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-500 text-white transition hover:bg-cyan-600 disabled:opacity-50"
//           >
//             <Send size={20} />
//           </button>
//         </form>

//       </div>

//     </main>
//   );
// }



// apps/web/src/features/assistant/pages/AIAssistantPage.tsx
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

import SectionHeading from "@/features/dashboard/components/SectionHeading";

import ChatHeader from "../features/assistant/components/ChatHeader";
import ChatSidebar from "../features/assistant/components/ChatSidebar";
import ChatWindow from "../features/assistant/components/ChatWindow";
import ChatInput from "../features/assistant/components/ChatInput";
import SuggestedPrompts from "../features/assistant/components/SuggestedPrompts";

import { useChat } from "../features/assistant/hooks/useChat";
import { conversations as mockConversations } from "../features/assistant/data/conversations";
import type { Conversation } from "../features/assistant/types/chat";

export default function AIAssistantPage() {
  const { chat, send, typing } = useChat();

  const [conversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(mockConversations[0] ?? null);

  const [mobileView, setMobileView] = useState<"list" | "thread">("thread");

  function handleNewConversation() {
    setSelectedConversation(null);
    setMobileView("thread");
  }

  function handleSelectConversation(conversation: Conversation) {
    setSelectedConversation(conversation);
    setMobileView("thread");
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 md:gap-6">
      <div className="shrink-0">
        <SectionHeading
          title="AI Assistant"
          subtitle="Your intelligent company assistant."
        />
      </div>

      {/* flex, not grid — CSS Grid's implicit rows auto-size to
          content and won't stretch to fill flex-1 the way a flex
          row reliably does, which is why ChatWindow was collapsing
          to zero height below. */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:rounded-3xl lg:flex-row">
        <div
          className={`min-h-0 flex-col border-white/10 lg:flex lg:w-72 lg:shrink-0 lg:border-r ${
            mobileView === "list" ? "flex" : "hidden"
          }`}
        >
          <ChatSidebar
            conversations={conversations}
            selectedConversation={selectedConversation}
            onSelect={handleSelectConversation}
            onNewConversation={handleNewConversation}
          />
        </div>

        <div
          className={`min-h-0 flex-1 flex-col lg:flex ${
            mobileView === "thread" ? "flex" : "hidden"
          }`}
        >
          <div className="flex shrink-0 items-center gap-2 border-b border-white/10 px-2 lg:hidden">
            <button
              onClick={() => setMobileView("list")}
              className="rounded-xl p-3 text-slate-400 transition hover:bg-white/10 hover:text-white"
              aria-label="Back to conversations"
            >
              <ArrowLeft size={20} />
            </button>
          </div>

          <div className="shrink-0">
            <ChatHeader />
          </div>

          <div className="shrink-0 overflow-x-auto border-b border-white/10 p-4 md:p-5">
            <SuggestedPrompts onSelect={send} />
          </div>

          <div className="min-h-0 flex-1 overflow-hidden">
            <ChatWindow messages={chat} typing={typing} />
          </div>

          <div className="shrink-0">
            <ChatInput onSend={send} />
          </div>
        </div>
      </div>
    </div>
  );
}