import type { EmployeeStatus as Status } from "../types/employee";

interface Props {
  status: Status;
}

const statusStyles: Record<
  Status,
  string
> = {
  ACTIVE:
    "bg-green-500/20 text-green-400",

  ON_LEAVE:
    "bg-yellow-500/20 text-yellow-400",

  RESIGNED:
    "bg-blue-500/20 text-blue-400",

  TERMINATED:
    "bg-red-500/20 text-red-400",
};

export default function EmployeeStatus({
  status,
}: Props) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}