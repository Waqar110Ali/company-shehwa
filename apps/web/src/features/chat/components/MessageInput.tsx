import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Image,
  Paperclip,
  SendHorizonal,
  Smile,
} from "lucide-react";

import { chatApi } from "../api/chat.api";
import { MessageType } from "../types/message-type";

import EmojiPicker from "./EmojiPicker";
import StickerPicker from "./StickerPicker";
import VoiceRecorder from "./VoiceRecorder";

interface Props {
  onSend(payload: {
    content: string;
    type: MessageType;
    attachment?: string;
    fileName?: string;
    fileSize?: number;
  }): Promise<void>;

  loading?: boolean;
}

export default function MessageInput({
  onSend,
  loading = false,
}: Props) {
  const [message, setMessage] =
    useState("");

  const [uploading, setUploading] =
    useState(false);

  const [showEmojiPicker, setShowEmojiPicker] =
    useState(false);

  const [showStickerPicker, setShowStickerPicker] =
    useState(false);

  const textareaRef =
    useRef<HTMLTextAreaElement>(null);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  useEffect(() => {
    const textarea =
      textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = "0px";

    textarea.style.height = `${Math.min(
      textarea.scrollHeight,
      140,
    )}px`;
  }, [message]);

  async function sendText() {
    const value =
      message.trim();

    if (
      !value ||
      loading ||
      uploading
    ) {
      return;
    }

    await onSend({
      content: value,
      type: MessageType.TEXT,
    });

    setMessage("");
  }

  async function handleKeyDown(
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      await sendText();
    }
  }

  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setUploading(true);

      const response =
        await chatApi.upload(file);

      const uploaded =
        response.data;

      await onSend({
        content: "",
        attachment:
          uploaded.url,
        fileName:
          uploaded.fileName,
        fileSize:
          uploaded.fileSize,
        type:
          uploaded.type ===
          "IMAGE"
            ? MessageType.IMAGE
            : MessageType.FILE,
      });
    } catch (error) {
      console.error(
        "Upload failed:",
        error,
      );
    } finally {
      setUploading(false);

      event.target.value = "";
    }
  }

  function insertEmoji(
    emoji: string,
  ) {
    const textarea =
      textareaRef.current;

    if (!textarea) {
      return;
    }

    const start =
      textarea.selectionStart;

    const end =
      textarea.selectionEnd;

    const newValue =
      message.slice(0, start) +
      emoji +
      message.slice(end);

    setMessage(newValue);

    requestAnimationFrame(() => {
      textarea.focus();

      const cursor =
        start + emoji.length;

      textarea.setSelectionRange(
        cursor,
        cursor,
      );
    });

    setShowEmojiPicker(false);
  }

  async function sendSticker(
    stickerUrl: string,
  ) {
    if (
      loading ||
      uploading
    ) {
      return;
    }

    await onSend({
      content: "",
      type: MessageType.IMAGE,
      attachment: stickerUrl,
      fileName: "sticker.webp",
    });

    setShowStickerPicker(false);
  }

  async function sendVoice(
    blob: Blob,
  ) {
    try {
      setUploading(true);

      const file = new File(
        [blob],
        `voice-${Date.now()}.webm`,
        {
          type:
            "audio/webm",
        },
      );

      const response =
        await chatApi.upload(file);

      const uploaded =
        response.data;

      await onSend({
        content: "",
        type: MessageType.VOICE,
        attachment:
          uploaded.url,
        fileName:
          uploaded.fileName,
        fileSize:
          uploaded.fileSize,
      });
    } catch (error) {
      console.error(
        "Voice upload failed:",
        error,
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="border-t border-white/10 bg-[#111827]/95 px-6 py-4 backdrop-blur-xl">

      <input
        hidden
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar,.txt"
        onChange={
          handleFileChange
        }
      />

      <div className="relative flex items-end gap-3 rounded-2xl border border-white/10 bg-[#1A2236] p-3 shadow-lg">

        {/* Emoji */}

        <button
          type="button"
          onClick={() =>
            setShowEmojiPicker(
              (
                previous,
              ) =>
                !previous,
            )
          }
          className="rounded-xl p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
        >
          <Smile
            size={20}
          />
        </button>

        <EmojiPicker
          open={
            showEmojiPicker
          }
          onClose={() =>
            setShowEmojiPicker(
              false,
            )
          }
          onSelect={
            insertEmoji
          }
        />

        {/* Stickers */}

        <button
          type="button"
          onClick={() =>
            setShowStickerPicker(
              (
                previous,
              ) =>
                !previous,
            )
          }
          className="rounded-xl p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
        >
          <Image
            size={20}
          />
        </button>

        <StickerPicker
          open={
            showStickerPicker
          }
          onClose={() =>
            setShowStickerPicker(
              false,
            )
          }
          onSelect={
            sendSticker
          }
        />

        {/* Upload */}

        <button
          type="button"
          onClick={() =>
            fileInputRef.current?.click()
          }
          className="rounded-xl p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
        >
          <Paperclip
            size={20}
          />
        </button>

        {/* Text */}

        <textarea
          ref={textareaRef}
          rows={1}
          value={message}
          onChange={(
            e,
          ) =>
            setMessage(
              e.target.value,
            )
          }
          onKeyDown={
            handleKeyDown
          }
          placeholder="Write a message..."
          className="max-h-36 min-h-[26px] flex-1 resize-none overflow-y-auto bg-transparent py-2 text-sm text-white outline-none placeholder:text-zinc-500"
        />

        {/* Voice */}

        <VoiceRecorder
          disabled={
            loading ||
            uploading
          }
          onRecorded={
            sendVoice
          }
        />

        {/* Send */}

        <button
          type="button"
          disabled={
            loading ||
            uploading ||
            !message.trim()
          }
          onClick={
            sendText
          }
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <SendHorizonal
              size={18}
            />
          )}
        </button>

      </div>

      <p className="mt-2 text-center text-xs text-zinc-500">
        Press{" "}
        <kbd className="rounded bg-white/10 px-1.5 py-0.5">
          Enter
        </kbd>{" "}
        to send •{" "}
        <kbd className="rounded bg-white/10 px-1.5 py-0.5">
          Shift + Enter
        </kbd>{" "}
        for a new line
      </p>

    </div>
  );
}