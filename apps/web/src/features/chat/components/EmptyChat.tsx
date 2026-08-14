import { MessageCircle } from "lucide-react";

export default function EmptyChat() {
  return (
    <div className="flex h-full flex-col items-center justify-center">

      <div className="rounded-full bg-cyan-500/10 p-8">

        <MessageCircle
          size={70}
          className="text-cyan-400"
        />

      </div>

      <h2 className="mt-6 text-3xl font-bold text-white">
        Select a conversation
      </h2>

      <p className="mt-3 max-w-md text-center text-slate-400">

        Choose a conversation from the sidebar
        to start chatting with your team.

      </p>

    </div>
  );
}