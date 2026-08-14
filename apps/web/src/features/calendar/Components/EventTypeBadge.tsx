interface Props {
  type:
    | "Meeting"
    | "Project"
    | "Holiday"
    | "Birthday"
    | "Leave"
    | "Interview"
    | "Deadline";
}

const colors = {
  Meeting: "bg-cyan-500/20 text-cyan-300",
  Project: "bg-indigo-500/20 text-indigo-300",
  Holiday: "bg-green-500/20 text-green-300",
  Birthday: "bg-pink-500/20 text-pink-300",
  Leave: "bg-yellow-500/20 text-yellow-300",
  Interview: "bg-orange-500/20 text-orange-300",
  Deadline: "bg-red-500/20 text-red-300",
};

export default function EventTypeBadge({
  type,
}: Props) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${colors[type]}`}
    >
      {type}
    </span>
  );
}