import type { Attendance } from "../types/attendance";

import AttendanceStatus from "./AttendanceStatus";
import AttendanceActions from "./AttendanceActions";

interface Props {
  attendance: Attendance;

  onView: (attendance: Attendance) => void;

  onEdit: (attendance: Attendance) => void;

  onDelete: (id: string) => void;
}

export default function AttendanceRow({
  attendance,
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <tr className="border-b border-white/10 transition hover:bg-white/5">

      <td className="px-5 py-4">

        <div className="flex items-center gap-4">

          <img
            src={attendance.avatar}
            alt={attendance.employeeName}
            className="h-11 w-11 rounded-full object-cover"
          />

          <div>

            <p className="font-semibold text-white">
              {attendance.employeeName}
            </p>

            <p className="text-xs text-slate-400">
              {attendance.employeeId}
            </p>

          </div>

        </div>

      </td>

      <td className="px-5 py-4 text-slate-300">
        {attendance.department}
      </td>

      <td className="px-5 py-4 text-slate-300">
        {attendance.date}
      </td>

      <td className="px-5 py-4 text-slate-300">
        {attendance.checkIn}
      </td>

      <td className="px-5 py-4 text-slate-300">
        {attendance.checkOut}
      </td>

      <td className="px-5 py-4 text-slate-300">
        {attendance.workingHours} hrs
      </td>

      <td className="px-5 py-4">

        <AttendanceStatus
          status={attendance.status}
        />

      </td>

      <td className="px-5 py-4">

        <AttendanceActions
          onView={() => onView(attendance)}
          onEdit={() => onEdit(attendance)}
          onDelete={() => onDelete(attendance.id)}
        />

      </td>

    </tr>
  );
}