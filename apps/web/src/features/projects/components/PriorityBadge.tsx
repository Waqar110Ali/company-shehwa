interface Props {
  priority:
    | "Low"
    | "Medium"
    | "High"
    | "Critical";
}

const colors = {
  Low:
    "bg-green-500/20 text-green-400 border-green-400/20",

  Medium:
    "bg-yellow-500/20 text-yellow-400 border-yellow-400/20",

  High:
    "bg-orange-500/20 text-orange-400 border-orange-400/20",

  Critical:
    "bg-red-500/20 text-red-400 border-red-400/20",
};

export default function PriorityBadge({
  priority,
}: Props) {
  return (
    <span
      className={`rounded-full border px-4 py-2 text-xs font-semibold ${colors[priority]}`}
    >
      {priority}
    </span>
  );
}