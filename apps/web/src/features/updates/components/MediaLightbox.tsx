import { X } from "lucide-react";

interface LightboxMedia {
  url: string;
  type: "image" | "video";
  caption?: string;
}

interface Props {
  media: LightboxMedia | null;
  onClose: () => void;
}

export default function MediaLightbox({ media, onClose }: Props) {
  if (!media) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-6 top-6 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
      >
        <X size={20} />
      </button>

      <div
        className="w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        {media.type === "video" ? (
          <video
            src={media.url}
            controls
            autoPlay
            className="max-h-[85vh] w-full rounded-2xl bg-black"
          />
        ) : (
          <img
            src={media.url}
            alt={media.caption ?? ""}
            className="max-h-[85vh] w-full rounded-2xl object-contain"
          />
        )}

        {media.caption && (
          <p className="mt-4 text-center text-sm text-slate-300">
            {media.caption}
          </p>
        )}
      </div>
    </div>
  );
}