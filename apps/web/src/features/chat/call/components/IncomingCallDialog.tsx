import {
    Phone,
    PhoneOff,
    Video,
} from "lucide-react";

import { useCall } from "../hooks/useCall";

export function IncomingCallDialog() {

    const {
        status,
        incomingCall,
        acceptCall,
        rejectCall,
    } = useCall();

    if (
        status !== "ringing" ||
        !incomingCall
    ) {
        return null;
    }

    return (
        <div
            className="
fixed inset-0
z-[9999]
bg-black/60
backdrop-blur-md
flex
items-center
justify-center
"
        >

            <div
                className="
bg-white
dark:bg-zinc-900
rounded-3xl
shadow-2xl
p-10
w-[420px]
space-y-8
text-center
"
            >

                <div
                    className="
w-24
h-24
mx-auto
rounded-full
bg-blue-600
text-white
flex
items-center
justify-center
text-4xl
font-bold
"
                >
                    {incomingCall
                        .callerId
                        .slice(0, 2)
                        .toUpperCase()}
                </div>

                <div>

                    <h2
                        className="
text-2xl
font-bold
"
                    >
                        Incoming Call
                    </h2>

                    <p
                        className="
text-zinc-500
mt-2
"
                    >
                        {incomingCall.type ===
                        "video"
                            ? "Video Call"
                            : "Audio Call"}
                    </p>

                </div>

                <div
                    className="
flex
justify-center
gap-8
"
                >

                    <button
                        onClick={
                            rejectCall
                        }
                        className="
w-16
h-16
rounded-full
bg-red-600
text-white
flex
items-center
justify-center
hover:scale-110
transition
"
                    >
                        <PhoneOff />
                    </button>

                    <button
                        onClick={
                            acceptCall
                        }
                        className="
w-16
h-16
rounded-full
bg-green-600
text-white
flex
items-center
justify-center
hover:scale-110
transition
"
                    >
                        {incomingCall.type ===
                        "video"
                            ? <Video />
                            : <Phone />}
                    </button>

                </div>

            </div>

        </div>
    );
}