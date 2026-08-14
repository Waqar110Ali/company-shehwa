import { Mic, Square } from "lucide-react";

import { useVoiceRecorder } from "../hooks/useVoiceRecorder";

interface Props {
  disabled?: boolean;

  onRecorded(
    blob: Blob,
  ): Promise<void>;
}

function formatTime(
  seconds: number,
) {
  const minutes = Math.floor(
    seconds / 60,
  );

  const remaining =
    seconds % 60;

  return `${minutes}:${remaining
    .toString()
    .padStart(2, "0")}`;
}

export default function VoiceRecorder({
  disabled = false,
  onRecorded,
}: Props) {
  const {
    recording,
    duration,
    supported,
    startRecording,
    stopRecording,
  } = useVoiceRecorder();

  async function handleClick() {
    if (!supported) {
      alert(
        "Voice recording is not supported in this browser.",
      );

      return;
    }

    if (!recording) {
      await startRecording();

      return;
    }

    const blob =
      await stopRecording();

    if (!blob) {
      return;
    }

    await onRecorded(blob);
  }

  return (
    <div className="flex items-center gap-2">

      {recording && (
        <span className="rounded-full bg-red-500/10 px-2 py-1 text-xs font-medium text-red-400">
          ● {formatTime(duration)}
        </span>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={handleClick}
        className={`rounded-xl p-2 transition ${
          recording
            ? "bg-red-600 text-white hover:bg-red-500"
            : "text-zinc-400 hover:bg-white/10 hover:text-white"
        } disabled:cursor-not-allowed disabled:opacity-50`}
      >
        {recording ? (
          <Square size={18} />
        ) : (
          <Mic size={20} />
        )}
      </button>

    </div>
  );
}