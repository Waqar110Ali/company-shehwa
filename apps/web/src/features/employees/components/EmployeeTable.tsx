import type { Employee } from "../types/employee";

import EmployeeRow from "./EmployeeRow";

interface Props {
  employees: Employee[];

  onView: (employee: Employee) => void;

  onEdit: (employee: Employee) => void;

  onDelete: (id: string) => void;
}

export default function EmployeeTable({
  employees,
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
              Role
            </th>

            <th className="px-5 py-4 text-left text-slate-400">
              Department
            </th>

            <th className="px-5 py-4 text-left text-slate-400">
              Performance
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

          {employees.map((employee) => (

            <EmployeeRow
              key={employee.id}
              employee={employee}
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