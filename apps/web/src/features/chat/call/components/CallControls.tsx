import {
    Mic,
    MicOff,
    MonitorUp,
    PhoneOff,
    Video,
    VideoOff,
} from "lucide-react";

import { useState } from "react";

import { useCall } from "../hooks/useCall";

export function CallControls() {
    const {
        callType,
        endCall,
        toggleMute,
        toggleCamera,
        toggleScreenShare,
    } = useCall();

    const [muted, setMuted] =
        useState(false);

    const [cameraOff, setCameraOff] =
        useState(false);

    const [sharing, setSharing] =
        useState(false);

    const handleMute = () => {
        toggleMute();

        setMuted((previous) => !previous);
    };

    const handleCamera = () => {
        toggleCamera();

        setCameraOff((previous) => !previous);
    };

    const handleShare =
        async () => {
            await toggleScreenShare();

            setSharing((previous) => !previous);
        };

    return (
        <div
            className="
absolute
bottom-8
left-1/2
-translate-x-1/2
flex
items-center
gap-5
rounded-full
bg-zinc-900/90
px-7
py-4
shadow-2xl
backdrop-blur-xl
"
        >
            {/* Mute */}

            <button
                type="button"
                onClick={handleMute}
                className={`
w-14
h-14
rounded-full
transition
flex
items-center
justify-center
text-white
${
    muted
        ? "bg-red-600 hover:bg-red-700"
        : "bg-zinc-700 hover:bg-zinc-600"
}
`}
            >
                {muted ? (
                    <MicOff size={22} />
                ) : (
                    <Mic size={22} />
                )}
            </button>

            {/* Camera */}

            {callType ===
                "video" && (
                <button
                    type="button"
                    onClick={
                        handleCamera
                    }
                    className={`
w-14
h-14
rounded-full
transition
flex
items-center
justify-center
text-white
${
    cameraOff
        ? "bg-red-600 hover:bg-red-700"
        : "bg-zinc-700 hover:bg-zinc-600"
}
`}
                >
                    {cameraOff ? (
                        <VideoOff
                            size={22}
                        />
                    ) : (
                        <Video
                            size={22}
                        />
                    )}
                </button>
            )}

            {/* Screen Share */}

            {callType ===
                "video" && (
                <button
                    type="button"
                    onClick={
                        handleShare
                    }
                    className={`
w-14
h-14
rounded-full
transition
flex
items-center
justify-center
text-white
${
    sharing
        ? "bg-blue-600 hover:bg-blue-700"
        : "bg-zinc-700 hover:bg-zinc-600"
}
`}
                >
                    <MonitorUp
                        size={22}
                    />
                </button>
            )}

            {/* End Call */}

            <button
                type="button"
                onClick={endCall}
                className="
flex
h-16
w-16
items-center
justify-center
rounded-full
bg-red-600
text-white
transition
hover:bg-red-700
"
            >
                <PhoneOff
                    size={26}
                />
            </button>
        </div>
    );
}