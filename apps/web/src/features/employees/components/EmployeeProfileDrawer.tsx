import type { Employee } from "../types/employee";

interface Props {
  employee: Employee | null;

  open: boolean;

  onClose: () => void;
}

export default function EmployeeProfileDrawer({
  employee,
  open,
  onClose,
}: Props) {
  if (!open || !employee) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
      <div className="h-full w-[420px] bg-slate-950 p-8">
        <img
          src={employee.avatar}
          alt={`${employee.firstName} ${employee.lastName}`}
          className="mx-auto h-28 w-28 rounded-full object-cover"
        />

        <h2 className="mt-6 text-center text-2xl font-bold text-white">
          {employee.firstName} {employee.lastName}
        </h2>

        <p className="text-center text-slate-400">
          {employee.designation}
        </p>

        <div className="mt-8 space-y-4">
          <p className="text-slate-300">
            <strong>Email:</strong>{" "}
            {employee.email}
          </p>

          <p className="text-slate-300">
            <strong>Phone:</strong>{" "}
            {employee.phone}
          </p>

          <p className="text-slate-300">
            <strong>Department:</strong>{" "}
            {employee.department}
          </p>

          <p className="text-slate-300">
            <strong>Status:</strong>{" "}
            {employee.status}
          </p>

          <p className="text-slate-300">
            <strong>Attendance:</strong>{" "}
            {employee.attendance}%
          </p>

          <p className="text-slate-300">
            <strong>Performance:</strong>{" "}
            {employee.performance}%
          </p>

          <p className="text-slate-300">
            <strong>Joined:</strong>{" "}
            {employee.joinedAt}
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-10 w-full rounded-xl bg-cyan-500 py-3 text-white transition hover:bg-cyan-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}