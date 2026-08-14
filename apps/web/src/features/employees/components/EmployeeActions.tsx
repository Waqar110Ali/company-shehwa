import { Eye, Pencil, Trash2 } from "lucide-react";

interface Props {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function EmployeeActions({
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="flex gap-2">

      <button
        onClick={onView}
        className="rounded-lg bg-cyan-500/10 p-2 text-cyan-300 hover:bg-cyan-500/20"
      >
        <Eye size={17} />
      </button>

      <button
        onClick={onEdit}
        className="rounded-lg bg-yellow-500/10 p-2 text-yellow-300 hover:bg-yellow-500/20"
      >
        <Pencil size={17} />
      </button>

      <button
        onClick={onDelete}
        className="rounded-lg bg-red-500/10 p-2 text-red-300 hover:bg-red-500/20"
      >
        <Trash2 size={17} />
      </button>

    </div>
  );
}