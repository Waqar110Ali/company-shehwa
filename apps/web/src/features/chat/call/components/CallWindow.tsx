import { Phone } from "lucide-react";

import { CallControls } from "./CallControls";
import { VideoPlayer } from "./VideoPlayer";

import { useCall } from "../hooks/useCall";

export function CallWindow() {
    const {
        status,
        callType,
        localStream,
        remoteStream,

        endCall,
        toggleMute,
        toggleCamera,
        toggleScreenShare,
    } = useCall();

    if (status === "idle" || status === "ringing") {
        return null;
    }

    const isVideo = callType === "video";

    return (
        <div className="fixed inset-0 z-[999] bg-black overflow-hidden">
            {/* ===========================================
                Remote Video (video calls)
            =========================================== */}

            {isVideo && remoteStream ? (
                <VideoPlayer stream={remoteStream} className="w-full h-full" />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
                    <div className="flex flex-col items-center gap-6">
                        <div className="w-36 h-36 rounded-full bg-zinc-800 flex items-center justify-center">
                            <Phone size={60} className="text-white" />
                        </div>

                        <h2 className="text-white text-2xl font-semibold">
                            Audio Call
                        </h2>
                    </div>
                </div>
            )}

            {/* ===========================================
                Remote audio playback.

                This is the fix for "no voice on audio calls": the
                remote MediaStream was previously never attached to
                any playable element when callType === "audio", so
                audio tracks arrived over WebRTC but were never sent
                to the speakers. This hidden <audio> element plays the
                remote stream regardless of call type. For video calls
                the audio track is already carried by the <video>
                element above, but playing it here too is harmless
                since it's the same MediaStream (browsers don't
                double-play audio just because two elements reference
                the same stream object... actually they would, so we
                only mount this for audio-only calls).
            =========================================== */}

            {!isVideo && remoteStream && (
                <audio
                    autoPlay
                    playsInline
                    // eslint-disable-next-line react/no-unknown-property
                    ref={(el) => {
                        if (el) {
                            el.srcObject = remoteStream;
                            el.play().catch((error) => {
                                console.error(
                                    "Remote audio autoplay failed:",
                                    error,
                                );
                            });
                        }
                    }}
                    className="hidden"
                />
            )}

            {/* ===========================================
                Connecting Overlay
            =========================================== */}

            {status === "connecting" && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-white text-xl font-medium animate-pulse">
                        Connecting...
                    </div>
                </div>
            )}

            {/* ===========================================
                Calling Overlay
            =========================================== */}

            {status === "calling" && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-white text-xl font-medium animate-pulse">
                        Calling...
                    </div>
                </div>
            )}

            {/* ===========================================
                Local Preview
            =========================================== */}

            {isVideo && localStream && (
                <div className="absolute right-6 top-6 w-72 h-48 rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                    <VideoPlayer
                        stream={localStream}
                        muted
                        mirrored
                        className="w-full h-full"
                    />
                </div>
            )}

            {/* ===========================================
                Bottom Controls
            =========================================== */}

            <CallControls
                isVideo={isVideo}
                onMute={toggleMute}
                onCamera={toggleCamera}
                onScreenShare={toggleScreenShare}
                onEnd={endCall}
            />
        </div>
    );
}