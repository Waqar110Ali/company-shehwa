import type { Employee } from "../types/employee";

import EmployeeActions from "./EmployeeActions";
import EmployeeStatus from "./EmployeeStatus";

interface Props {
  employee: Employee;

  onView: (employee: Employee) => void;

  onEdit: (employee: Employee) => void;

  onDelete: (id: string) => void;
}

export default function EmployeeRow({
  employee,
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <tr className="border-b border-white/10 transition hover:bg-white/5">

      {/* ===================================== */}
      {/* Employee */}
      {/* ===================================== */}

      <td className="px-5 py-4">

        <div className="flex items-center gap-4">

          <img
            src={
              employee.avatar ||
              `https://ui-avatars.com/api/?name=${employee.firstName}+${employee.lastName}`
            }
            alt={employee.name}
            className="h-11 w-11 rounded-full object-cover"
          />

          <div>

            <p className="font-semibold text-white">

              {employee.firstName} {employee.lastName}

            </p>

            <p className="text-xs text-slate-400">

              {employee.email}

            </p>

          </div>

        </div>

      </td>

      {/* ===================================== */}
      {/* Role */}
      {/* ===================================== */}

      <td className="px-5 py-4">

        <span className="rounded-lg bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-300">

          {employee.role || "-"}

        </span>

      </td>

      {/* ===================================== */}
      {/* Department */}
      {/* ===================================== */}

      <td className="px-5 py-4">

        <div>

          <p className="text-white">

            {employee.department}

          </p>

          <p className="text-xs text-slate-400">

            {employee.designation}

          </p>

        </div>

      </td>

      {/* ===================================== */}
      {/* Performance */}
      {/* ===================================== */}

      <td className="px-5 py-4">

        <div className="flex items-center gap-3">

          <div className="h-2 w-24 rounded-full bg-white/10">

            <div
              className="h-2 rounded-full bg-cyan-400"
              style={{
                width: `${employee.performance}%`,
              }}
            />

          </div>

          <span className="text-sm text-white">

            {employee.performance}%

          </span>

        </div>

      </td>

      {/* ===================================== */}
      {/* Status */}
      {/* ===================================== */}

      <td className="px-5 py-4">

        <EmployeeStatus
          status={employee.status}
        />

      </td>

      {/* ===================================== */}
      {/* Actions */}
      {/* ===================================== */}

      <td className="px-5 py-4">

        <EmployeeActions
          onView={() => onView(employee)}
          onEdit={() => onEdit(employee)}
          onDelete={() => onDelete(employee.id)}
        />

      </td>

    </tr>
  );
}