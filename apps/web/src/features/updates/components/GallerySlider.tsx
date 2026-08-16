import { useRef } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

import type { EventGallery, GalleryMedia } from "../types/updates";

interface Props {
  gallery: EventGallery;
  onSelect: (media: GalleryMedia) => void;
}

export default function GallerySlider({ gallery, onSelect }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: 1 | -1) {
    const el = scrollRef.current;
    if (!el) return;

    // scroll roughly two tiles at a time
    const tile = el.querySelector("[data-tile]") as HTMLElement | null;
    const amount = (tile?.offsetWidth ?? 300) * 2 + 32;

    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <div className="group/slider relative">
      {/* edge fades so the cut-off tile doesn't look like a bug */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#05070f] to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#05070f] to-transparent sm:w-16" />

      <button
        onClick={() => scroll(-1)}
        aria-label="Previous"
        className="absolute left-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition hover:bg-black/80 sm:flex"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={() => scroll(1)}
        aria-label="Next"
        className="absolute right-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition hover:bg-black/80 sm:flex"
      >
        <ChevronRight size={20} />
      </button>

      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {gallery.photos.map((media, index) => {
          const type = media.type ?? "image"; // legacy data safety net

          return (
            <button
              key={index}
              data-tile
              onClick={() => onSelect({ ...media, type })}
              className="group relative h-72 w-64 flex-none snap-start overflow-hidden rounded-2xl border border-white/10 text-left sm:h-80 sm:w-72 lg:h-96 lg:w-80"
            >
              {type === "video" ? (
                <>
                  <video
                    src={media.url}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    muted
                    playsInline
                    preload="metadata"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition group-hover:bg-black/40">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm transition group-hover:scale-110">
                      <Play size={20} className="ml-0.5 text-white" fill="white" />
                    </div>
                  </div>
                </>
              ) : (
                <img
                  src={media.url}
                  alt={media.caption ?? gallery.eventName}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}