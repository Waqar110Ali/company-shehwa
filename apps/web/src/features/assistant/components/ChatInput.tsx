import { useState } from "react";
import { Send } from "lucide-react";

interface Props {
  onSend: (message: string) => void;
}

export default function ChatInput({
  onSend,
}: Props) {

  const [text, setText] =
    useState("");

  function submit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    if (!text.trim())
      return;

    onSend(text);

    setText("");
  }

  return (
    <form
      onSubmit={submit}
      className="border-t border-white/10 p-5"
    >

      <div className="flex items-center gap-3">

        <input
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          placeholder="Ask anything..."
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none focus:border-cyan-400"
        />

        <button
          type="submit"
          className="rounded-xl bg-cyan-500 px-5 py-4 text-white transition hover:bg-cyan-600"
        >

          <Send size={20} />

        </button>

      </div>

    </form>
  );
}