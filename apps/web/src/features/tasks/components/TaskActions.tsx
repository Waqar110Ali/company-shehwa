import { useState } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

export default function TaskActions({
  onEdit,
  onDelete,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg p-2 transition hover:bg-white/10"
      >
        <MoreVertical
          size={18}
          className="text-slate-400"
        />
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-50 w-40 overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-2xl">

          <button
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
            className="flex w-full items-center gap-3 px-4 py-3 text-white transition hover:bg-white/10"
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            className="flex w-full items-center gap-3 px-4 py-3 text-red-400 transition hover:bg-red-500/10"
          >
            <Trash2 size={16} />
            Delete
          </button>

        </div>
      )}
    </div>
  );
}