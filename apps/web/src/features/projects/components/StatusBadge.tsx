interface Props {
  status:
    | "Planning"
    | "Active"
    | "On Hold"
    | "Completed";
}

const colors = {
  Planning:
    "bg-amber-500/20 text-amber-400 border-amber-400/20",

  Active:
    "bg-cyan-500/20 text-cyan-300 border-cyan-400/20",

  "On Hold":
    "bg-red-500/20 text-red-400 border-red-400/20",

  Completed:
    "bg-emerald-500/20 text-emerald-400 border-emerald-400/20",
};

export default function StatusBadge({
  status,
}: Props) {
  return (
    <span
      className={`rounded-full border px-4 py-2 text-xs font-semibold ${colors[status]}`}
    >
      {status}
    </span>
  );
}