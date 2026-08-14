import type { AttendanceStatus as Status } from "../types/attendance";

interface Props {
  status: Status;
}

const colors = {
  Present: "bg-green-500/20 text-green-400",

  Late: "bg-yellow-500/20 text-yellow-400",

  Absent: "bg-red-500/20 text-red-400",

  Leave: "bg-blue-500/20 text-blue-400",
};

export default function AttendanceStatus({
  status,
}: Props) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${colors[status]}`}
    >
      {status}
    </span>
  );
}