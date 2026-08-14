import { useEffect, useRef } from "react";
import EmojiPickerReact, {
  Theme,
  type EmojiClickData,
} from "emoji-picker-react";

interface Props {
  open: boolean;
  onClose(): void;
  onSelect(emoji: string): void;
}

export default function EmojiPicker({
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

  function handleEmoji(
    emoji: EmojiClickData,
  ) {
    onSelect(emoji.emoji);
  }

  return (
    <div
      ref={wrapperRef}
      className="absolute bottom-16 left-0 z-50"
    >
      <EmojiPickerReact
        theme={Theme.DARK}
        lazyLoadEmojis
        searchDisabled={false}
        skinTonesDisabled={false}
        previewConfig={{
          showPreview: false,
        }}
        onEmojiClick={handleEmoji}
      />
    </div>
  );
}