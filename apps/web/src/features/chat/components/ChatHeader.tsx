import {
  MoreVertical,
  Phone,
  Search,
  Video,
} from "lucide-react";

import type { Conversation } from "../types/chat";

interface Props {
  conversation: Conversation;

  onAudioCall?: () => void;

  onVideoCall?: () => void;
}

export default function ChatHeader({
  conversation,
  onAudioCall,
  onVideoCall,
}: Props) {
  const participant =
    conversation.participant;
  console.log("ChatHeader Participant", participant);

  function handleAudioClick() {
    console.log(
      "==============================",
    );

    console.log(
      "Audio Call Button Clicked",
    );

    console.log(
      "onAudioCall:",
      onAudioCall,
    );

    console.log(
      "==============================",
    );

    console.log("Participant:", participant);
    console.log("Employee Id:", participant.employeeId);
    console.log("User Id:", participant.userId);

    onAudioCall?.();
  }

  function handleVideoClick() {
    console.log(
      "==============================",
    );

    console.log(
      "Video Call Button Clicked",
    );

    console.log(
      "onVideoCall:",
      onVideoCall,
    );

    console.log(
      "==============================",
    );

    onVideoCall?.();
  }

  return (
    <header className="flex h-20 shrink-0 items-center justify-between border-b border-white/10 bg-[#111827]/90 px-6 backdrop-blur-xl">

      {/* Left */}

      <div className="flex min-w-0 items-center gap-4">

        <div className="relative shrink-0">

          <img
            src={
              participant.avatar ??
              "/images/avatar.png"
            }
            alt={
              participant.fullName
            }
            className="h-12 w-12 rounded-full border border-white/10 object-cover"
          />

          <span
            className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#111827] ${participant.online
              ? "bg-emerald-500"
              : "bg-zinc-500"
              }`}
          />

        </div>

        <div className="min-w-0">

          <h2 className="truncate text-lg font-semibold text-white">
            {participant.fullName}
          </h2>

          <p className="truncate text-sm text-zinc-400">

            {participant.designation ??
              "Employee"}

            {participant.department &&
              ` • ${participant.department}`}

          </p>

        </div>

      </div>

      {/* Right */}

      <div className="flex shrink-0 items-center gap-1">

        <button
          type="button"
          className="rounded-xl p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
        >
          <Search size={20} />
        </button>

        <button
          type="button"
          onClick={
            handleAudioClick
          }
          className="rounded-xl p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
        >
          <Phone size={20} />
        </button>

        <button
          type="button"
          onClick={
            handleVideoClick
          }
          className="rounded-xl p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
        >
          <Video size={20} />
        </button>

        <button
          type="button"
          className="rounded-xl p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
        >
          <MoreVertical size={20} />
        </button>

      </div>

    </header>
  );
}