import type { Employee } from "../types/employee";

import EmployeeActions from "./EmployeeActions";
import EmployeeStatus from "./EmployeeStatus";

interface Props {
  employee: Employee;
  onView: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

export default function EmployeeCard({
  employee,
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={
              employee.avatar ||
              `https://ui-avatars.com/api/?name=${employee.firstName}+${employee.lastName}`
            }
            alt={employee.name}
            className="h-12 w-12 shrink-0 rounded-full object-cover"
          />

          <div className="min-w-0">
            <p className="truncate font-semibold text-white">
              {employee.firstName} {employee.lastName}
            </p>
            <p className="truncate text-xs text-slate-400">
              {employee.email}
            </p>
          </div>
        </div>

        <EmployeeStatus status={employee.status} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-xs text-slate-500">Role</p>
          <span className="mt-1 inline-block rounded-lg bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-300">
            {employee.role || "-"}
          </span>
        </div>

        <div>
          <p className="text-xs text-slate-500">Department</p>
          <p className="mt-1 text-white">{employee.department}</p>
          <p className="text-xs text-slate-400">{employee.designation}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-1 flex items-center justify-between text-xs text-slate-500">
          <span>Performance</span>
          <span className="text-white">{employee.performance}%</span>
        </p>
        <div className="h-2 w-full rounded-full bg-white/10">
          <div
            className="h-2 rounded-full bg-cyan-400"
            style={{ width: `${employee.performance}%` }}
          />
        </div>
      </div>

      <div className="mt-5 flex justify-end border-t border-white/10 pt-4">
        <EmployeeActions
          onView={() => onView(employee)}
          onEdit={() => onEdit(employee)}
          onDelete={() => onDelete(employee.id)}
        />
      </div>
    </div>
  );
}
