import ReportsHeader from "../components/ReportsHeader";
import KPISection from "../components/KPISection";
import PayrollChart from "../components/PayrollChart";
import AttendanceChart from "../components/AttendanceChart";
import EmployeePerformanceChart from "../components/EmployeePerformanceChart";
import ProjectProgressChart from "../components/ProjectProgressChart";
import DepartmentChart from "../components/DepartmentChart";
import MonthlyEmployeesChart from "../components/MonthlyEmployeesChart";
import AIInsightCard from "../components/AIInsightCard";
import ExportButtons from "../components/ExportButtons";

import { useReports } from "../hooks/useReports";

export default function ReportsPage() {
  const {
    data,
    isLoading,
    isError,
  } = useReports();

  if (isLoading) {
    return (
      <div className="py-20 text-center text-slate-400">
        Loading reports...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center">
        <h2 className="text-xl font-semibold text-red-400">
          Unable to load reports
        </h2>

        <p className="mt-2 text-slate-400">
          You may not have permission to access this report or the report service is unavailable.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <ReportsHeader />

        <ExportButtons />
      </div>

      <KPISection
        report={data}
      />

      <div className="grid gap-8 xl:grid-cols-2">
        <PayrollChart
          report={data}
        />

        <AttendanceChart
          report={data}
        />
      </div>

      <div className="grid gap-8 xl:grid-cols-2">
        <EmployeePerformanceChart
          report={data}
        />

        <ProjectProgressChart
          report={data}
        />
      </div>

      <div className="grid gap-8 xl:grid-cols-2">
        <DepartmentChart
          report={data}
        />

        <MonthlyEmployeesChart
          report={data}
        />
      </div>

      <AIInsightCard
        report={data}
      />
    </div>
  );
}