import type { Attendance } from "../types/attendance";

import AttendanceRow from "./AttendanceRow";

interface Props {
  attendance: Attendance[];

  onView: (attendance: Attendance) => void;

  onEdit: (attendance: Attendance) => void;

  onDelete: (id: string) => void;
}

export default function AttendanceTable({
  attendance,
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">

      <table className="w-full">

        <thead className="bg-white/5">

          <tr>

            <th className="px-5 py-4 text-left text-slate-400">
              Employee
            </th>

            <th className="px-5 py-4 text-left text-slate-400">
              Department
            </th>

            <th className="px-5 py-4 text-left text-slate-400">
              Date
            </th>

            <th className="px-5 py-4 text-left text-slate-400">
              Check In
            </th>

            <th className="px-5 py-4 text-left text-slate-400">
              Check Out
            </th>

            <th className="px-5 py-4 text-left text-slate-400">
              Hours
            </th>

            <th className="px-5 py-4 text-left text-slate-400">
              Status
            </th>

            <th className="px-5 py-4 text-left text-slate-400">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {attendance.map((record) => (

            <AttendanceRow
              key={record.id}
              attendance={record}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />

          ))}

        </tbody>

      </table>

    </div>
  );
}