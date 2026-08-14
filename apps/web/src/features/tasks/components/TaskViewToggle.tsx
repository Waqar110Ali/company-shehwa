import {
  LayoutGrid,
  List,
} from "lucide-react";

interface Props {
  view: "board" | "list";

  onChange: (
    view: "board" | "list"
  ) => void;
}

export default function TaskViewToggle({
  view,
  onChange,
}: Props) {
  return (
    <div className="flex rounded-2xl border border-white/10 bg-white/5 p-1">

      <button
        onClick={() =>
          onChange("board")
        }
        className={`flex items-center gap-2 rounded-xl px-5 py-2 transition ${
          view === "board"
            ? "bg-cyan-500 text-white"
            : "text-slate-400"
        }`}
      >
        <LayoutGrid size={18} />

        Board

      </button>

      <button
        onClick={() =>
          onChange("list")
        }
        className={`flex items-center gap-2 rounded-xl px-5 py-2 transition ${
          view === "list"
            ? "bg-cyan-500 text-white"
            : "text-slate-400"
        }`}
      >
        <List size={18} />

        List

      </button>

    </div>
  );
}