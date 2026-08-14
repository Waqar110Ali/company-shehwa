import {
  BriefcaseBusiness,
  CheckCircle2,
  FolderKanban,
  Users,
} from "lucide-react";

import KPICard from "./KPICard";

import type {
  Reports,
} from "../types/report";

interface Props {
  report: Reports;
}

export default function KPISection({
  report,
}: Props) {
  const {
    statistics,
    taskStatistics,
  } = report;

  const kpis = [
    {
      title: "Employees",
      value:
        statistics.employees.toString(),
      change: 0,
      color: "#06b6d4",
      icon: Users,
    },

    {
      title: "Projects",
      value:
        statistics.projects.toString(),
      change: 0,
      color: "#8b5cf6",
      icon: FolderKanban,
    },

    {
      title: "Monthly Payroll",
      value:
        `$${statistics.monthlyPayroll.toLocaleString()}`,
      change: 0,
      color: "#f59e0b",
      icon: BriefcaseBusiness,
    },

    {
      title: "Task Completion",
      value:
        `${Math.round(
          taskStatistics.completionRate,
        )}%`,
      change: 0,
      color: "#22c55e",
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => (
        <KPICard
          key={kpi.title}
          kpi={kpi}
        />
      ))}
    </div>
  );
}