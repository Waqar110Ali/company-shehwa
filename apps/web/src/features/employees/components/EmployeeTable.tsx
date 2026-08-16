import type { Employee } from "../types/employee";

import EmployeeRow from "./EmployeeRow";
import EmployeeCard from "./EmployeeCard";

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
  if (employees.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-slate-400">
        No employees found.
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 md:hidden">
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-3xl border border-white/10 bg-white/5 md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-5 py-4 text-left text-slate-400">
                  Employee
                </th>
                <th className="px-5 py-4 text-left text-slate-400">Role</th>
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
      </div>
    </>
  );
}
