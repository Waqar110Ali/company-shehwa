import {
  Check,
  CheckCheck,
  Download,
  ExternalLink,
  FileText,
  Play,
  Pause,
  Phone,
  PhoneMissed,
  Video,
  VideoOff,
} from "lucide-react";
import {
  useRef,
  useState,
} from "react";

import type { Message } from "../types/chat";

interface Props {
  message: Message;
}

function formatCallDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function MessageBubble({
  message,
}: Props) {
  console.log("MessageBubble Props");
  console.log(message);
  console.log("======================");

  const mine = message.isMine;

  const audioRef =
    useRef<HTMLAudioElement>(null);

  const [playing, setPlaying] =
    useState(false);

  function toggleAudio() {
    if (!audioRef.current) {
      return;
    }

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlaying(!playing);
  }

  const messageType = (
    message.type ?? ""
  ).toUpperCase();

  const fileSize =
    message.fileSize && message.fileSize > 0
      ? `${(
        message.fileSize /
        1024 /
        1024
      ).toFixed(2)} MB`
      : "";

  const isMissedOrDeclined =
    message.callStatus === "MISSED" ||
    message.callStatus === "DECLINED";

  return (
    <div
      className={`flex w-full ${mine
          ? "justify-end"
          : "justify-start"
        }`}
    >
      <div
        className={`flex max-w-[78%] items-end gap-3 ${mine
            ? "flex-row-reverse"
            : ""
          }`}
      >
        {/* Avatar */}

        <img
          src={
            message.sender?.avatar ||
            "/images/avatar.png"
          }
          alt={
            message.sender?.fullName ||
            "User"
          }
          className="h-10 w-10 shrink-0 rounded-full border border-white/10 object-cover"
        />

        <div
          className={`flex flex-col ${mine
              ? "items-end"
              : "items-start"
            }`}
        >
          {!mine && (
            <p className="mb-1 text-xs font-medium text-zinc-400">
              {message.sender?.fullName ||
                "Unknown User"}
            </p>
          )}

          <div
            className={`overflow-hidden rounded-2xl shadow-lg ${mine
                ? "rounded-br-md bg-blue-600 text-white"
                : "rounded-bl-md border border-white/10 bg-[#1A2236] text-white"
              }`}
          >
            {message.deleted ? (
              <div className="px-4 py-3">
                <p className="italic text-zinc-400">
                  This message was deleted
                </p>
              </div>
            ) : (
              <>
                {/* ===================================== */}
                {/* TEXT */}
                {/* ===================================== */}

                {messageType ===
                  "TEXT" && (
                    <div className="px-4 py-3">
                      <p className="whitespace-pre-wrap break-words text-sm leading-6">
                        {message.content}
                      </p>
                    </div>
                  )}

                {/* ===================================== */}
                {/* IMAGE */}
                {/* ===================================== */}

                {messageType ===
                  "IMAGE" && (
                    <div className="max-w-md">
                      {message.attachment && (
                        <a
                          href={
                            message.attachment
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src={
                              message.attachment
                            }
                            alt="Image"
                            className="max-h-[380px] w-full object-cover"
                          />
                        </a>
                      )}

                      {message.content && (
                        <div className="px-4 py-3">
                          <p className="text-sm leading-6">
                            {
                              message.content
                            }
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                {/* ===================================== */}
                {/* FILE */}
                {/* ===================================== */}

                {messageType ===
                  "FILE" && (
                    <div className="w-[330px] p-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-red-600">

                          <FileText
                            size={28}
                            className="text-white"
                          />

                        </div>

                        <div className="min-w-0 flex-1">

                          <p className="break-words text-sm font-semibold leading-5">
                            {message.fileName ||
                              "Document"}
                          </p>

                          {fileSize && (
                            <p className="mt-1 text-xs text-zinc-400">
                              {fileSize}
                            </p>
                          )}

                        </div>

                      </div>

                      {message.attachment && (
                        <div className="mt-4 flex gap-2">

                          <a
                            href={
                              message.attachment
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
                          >
                            <ExternalLink
                              size={16}
                            />
                            Open
                          </a>

                          <a
                            href={
                              message.attachment
                            }
                            download={
                              message.fileName
                            }
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/10"
                          >
                            <Download
                              size={16}
                            />
                            Download
                          </a>

                        </div>
                      )}
                    </div>
                  )}

                {messageType === "VOICE" && (
                  <div className="w-[320px] p-4">

                    <div className="flex items-center gap-3">

                      <button
                        onClick={toggleAudio}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 transition hover:bg-blue-500"
                      >
                        {playing ? (
                          <Pause
                            size={18}
                            className="text-white"
                          />
                        ) : (
                          <Play
                            size={18}
                            className="ml-1 text-white"
                          />
                        )}
                      </button>

                      <div className="flex-1">

                        <audio
                          ref={audioRef}
                          src={
                            message.attachment
                          }
                          onEnded={() =>
                            setPlaying(false)
                          }
                          controls
                          className="w-full"
                        />

                      </div>

                    </div>

                  </div>
                )}

                {/* ===================================== */}
                {/* CALL LOG (AUDIO_CALL / VIDEO_CALL) */}
                {/* ===================================== */}

                {(messageType === "AUDIO_CALL" ||
                  messageType === "VIDEO_CALL") && (
                  <div className="flex items-center gap-3 px-4 py-3">

                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                        isMissedOrDeclined
                          ? "bg-red-500/20 text-red-400"
                          : "bg-emerald-500/20 text-emerald-400"
                      }`}
                    >
                      {messageType === "VIDEO_CALL" ? (
                        isMissedOrDeclined ? (
                          <VideoOff size={16} />
                        ) : (
                          <Video size={16} />
                        )
                      ) : isMissedOrDeclined ? (
                        <PhoneMissed size={16} />
                      ) : (
                        <Phone size={16} />
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-medium">
                        {messageType === "VIDEO_CALL"
                          ? "Video call"
                          : "Audio call"}
                        {message.callStatus === "MISSED" &&
                          " · Missed"}
                        {message.callStatus === "DECLINED" &&
                          " · Declined"}
                      </p>

                      {message.callStatus === "COMPLETED" && (
                        <p className="text-xs text-zinc-400">
                          {formatCallDuration(
                            message.callDuration ?? 0,
                          )}
                        </p>
                      )}
                    </div>

                  </div>
                )}

              </>
            )}
          </div>

          <div
            className={`mt-1 flex items-center gap-1 text-[11px] text-zinc-500 ${mine
                ? "justify-end"
                : "justify-start"
              }`}
          >
            <span>
              {message.createdAt
                ? new Date(
                  message.createdAt,
                ).toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute:
                      "2-digit",
                  },
                )
                : ""}
            </span>

            {message.edited && (
              <span>
                • edited
              </span>
            )}

            {mine &&
              (message.read ? (
                <CheckCheck
                  size={13}
                />
              ) : (
                <Check
                  size={13}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}