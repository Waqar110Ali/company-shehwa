import {
  Building2,
  UserCheck,
  UserMinus,
  Users,
} from "lucide-react";

import StatisticCard from "@/features/dashboard/components/StatisticCard";

import type { Employee } from "../types/employee";

interface Props {
  employees: Employee[];
}

export default function EmployeeStats({
  employees,
}: Props) {
  const total =
    employees.length;

  const active =
    employees.filter(
      (e) =>
        e.status ===
        "ACTIVE",
    ).length;

  const onLeave =
    employees.filter(
      (e) =>
        e.status ===
        "ON_LEAVE",
    ).length;

  const departments =
    new Set(
      employees.map(
        (e) =>
          e.department,
      ),
    ).size;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatisticCard
        title="Employees"
        value={String(total)}
        change="Total"
        icon={Users}
      />

      <StatisticCard
        title="Active"
        value={String(active)}
        change={`${Math.round(
          total
            ? (active /
                total) *
                100
            : 0,
        )}%`}
        icon={UserCheck}
      />

      <StatisticCard
        title="On Leave"
        value={String(
          onLeave,
        )}
        change="Leave"
        icon={UserMinus}
      />

      <StatisticCard
        title="Departments"
        value={String(
          departments,
        )}
        change="Company"
        icon={Building2}
      />
    </div>
  );
}