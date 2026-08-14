interface Props {
  status:
    | "Todo"
    | "In Progress"
    | "Review"
    | "Completed";
}

export default function TaskStatus({
  status,
}: Props) {
  const styles = {
    Todo: "bg-slate-500/20 text-slate-300",

    "In Progress":
      "bg-cyan-500/20 text-cyan-300",

    Review:
      "bg-yellow-500/20 text-yellow-300",

    Completed:
      "bg-emerald-500/20 text-emerald-300",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}