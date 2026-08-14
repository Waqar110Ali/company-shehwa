import {
  useEffect,
  useRef,
} from "react";

import {
  stickers,
} from "../data/stickers";

interface Props {
  open: boolean;

  onClose(): void;

  onSelect(
    sticker: string,
  ): void;
}

export default function StickerPicker({
  open,
  onClose,
  onSelect,
}: Props) {
  const wrapperRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(
      event: MouseEvent,
    ) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          event.target as Node,
        )
      ) {
        onClose();
      }
    }

    document.addEventListener(
      "mousedown",
      handleClick,
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick,
      );
  }, [onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      ref={wrapperRef}
      className="absolute bottom-16 left-16 z-50 w-80 rounded-2xl border border-white/10 bg-[#1A2236] p-4 shadow-2xl"
    >
      <div className="grid grid-cols-4 gap-3">

        {stickers.map(
          (sticker) => (
            <button
              key={sticker.id}
              type="button"
              onClick={() => {
                onSelect(
                  sticker.url,
                );
                onClose();
              }}
              className="rounded-xl p-2 transition hover:bg-white/10"
            >
              <img
                src={sticker.url}
                alt={sticker.name}
                className="h-16 w-16 object-contain"
              />
            </button>
          ),
        )}

      </div>
    </div>
  );
}