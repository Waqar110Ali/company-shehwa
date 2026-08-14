interface Props {
  department: string;

  status: string;

  onDepartmentChange: (value: string) => void;

  onStatusChange: (value: string) => void;
}

export default function AttendanceFilters({
  department,
  status,
  onDepartmentChange,
  onStatusChange,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">

      <select
        value={department}
        onChange={(e) =>
          onDepartmentChange(e.target.value)
        }
        className="rounded-xl border border-white/10 bg-slate-900 p-3 text-white"
      >
        <option value="">All Departments</option>
        <option>Management</option>
        <option>Backend</option>
        <option>Frontend</option>
        <option>Design</option>
        <option>HR</option>
      </select>

      <select
        value={status}
        onChange={(e) =>
          onStatusChange(e.target.value)
        }
        className="rounded-xl border border-white/10 bg-slate-900 p-3 text-white"
      >
        <option value="">All Status</option>
        <option>Present</option>
        <option>Late</option>
        <option>Absent</option>
        <option>Leave</option>
      </select>

    </div>
  );
}