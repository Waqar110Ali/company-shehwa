interface Props {
  department: string;

  status: string;

  onDepartmentChange: (
    value: string,
  ) => void;

  onStatusChange: (
    value: string,
  ) => void;
}

export default function EmployeeFilters({
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
          onDepartmentChange(
            e.target.value,
          )
        }
        className="rounded-xl border border-white/10 bg-slate-900 p-3 text-white outline-none"
      >
        <option value="">
          All Departments
        </option>

        <option value="Engineering">
          Engineering
        </option>

        <option value="Design">
          Design
        </option>

        <option value="HR">
          HR
        </option>

        <option value="Management">
          Management
        </option>

        <option value="Marketing">
          Marketing
        </option>

        <option value="Sales">
          Sales
        </option>
      </select>

      <select
        value={status}
        onChange={(e) =>
          onStatusChange(
            e.target.value,
          )
        }
        className="rounded-xl border border-white/10 bg-slate-900 p-3 text-white outline-none"
      >
        <option value="">
          All Status
        </option>

        <option value="ACTIVE">
          Active
        </option>

        <option value="ON_LEAVE">
          On Leave
        </option>

        <option value="RESIGNED">
          Resigned
        </option>

        <option value="TERMINATED">
          Terminated
        </option>
      </select>
    </div>
  );
}