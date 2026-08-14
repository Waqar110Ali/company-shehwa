import {
    useEffect,
    useRef,
} from "react";

interface Props {
    stream?: MediaStream;

    muted?: boolean;

    mirrored?: boolean;

    className?: string;
}

export function VideoPlayer({
    stream,
    muted = false,
    mirrored = false,
    className = "",
}: Props) {

    const videoRef =
        useRef<HTMLVideoElement>(null);

    useEffect(() => {
    if (!videoRef.current) {
        return;
    }

    videoRef.current.srcObject = stream ?? null;

    videoRef.current
        .play()
        .catch((error) => {
            console.error(
                "Video autoplay failed:",
                error,
            );
        });

}, [stream]);

    return (
        <video
            ref={videoRef}
            autoPlay
            playsInline
            muted={muted}
            className={`
object-cover
rounded-2xl
bg-black
${mirrored ? "scale-x-[-1]" : ""}
${className}
`}
        />
    );
}