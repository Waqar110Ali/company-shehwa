import { X } from "lucide-react";

import type { Attendance } from "../types/attendance";

interface Props {
  open: boolean;

  attendance: Attendance | null;

  onClose: () => void;
}

export default function AttendanceProfileDrawer({
  open,
  attendance,
  onClose,
}: Props) {
  if (!open || !attendance) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">

      <div className="h-full w-full max-w-md overflow-y-auto border-l border-white/10 bg-slate-950 p-8 shadow-2xl">

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-2xl font-bold text-white">
            Attendance Details
          </h2>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-white/10"
          >
            <X
              size={22}
              className="text-white"
            />
          </button>

        </div>

        <div className="flex flex-col items-center">

          <img
            src={
              attendance.avatar ||
              "https://ui-avatars.com/api/?name=Employee"
            }
            alt={attendance.employeeName}
            className="mb-5 h-24 w-24 rounded-full border-2 border-cyan-500 object-cover"
          />

          <h3 className="text-xl font-bold text-white">
            {attendance.employeeName}
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Employee ID: {attendance.employeeId}
          </p>

        </div>

        <div className="mt-10 space-y-6">

          <Info
            label="Department"
            value={
              attendance.department ||
              "-"
            }
          />

          <Info
            label="Date"
            value={
              attendance.date ||
              "-"
            }
          />

          <Info
            label="Check In"
            value={
              attendance.checkIn ||
              "--:--"
            }
          />

          <Info
            label="Check Out"
            value={
              attendance.checkOut ||
              "--:--"
            }
          />

          <Info
            label="Working Hours"
            value={`${attendance.workingHours ?? 0} hrs`}
          />

          <Info
            label="Status"
            value={
              attendance.status
            }
          />

        </div>

      </div>

    </div>
  );
}

interface InfoProps {
  label: string;

  value: string | number;
}

function Info({
  label,
  value,
}: InfoProps) {
  return (
    <div className="border-b border-white/5 pb-4 last:border-none">

      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-lg font-medium text-white">
        {value}
      </p>

    </div>
  );
}