import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import GlassCard from "@/components/premium/GlassCard";

import type {
  Reports,
} from "../types/report";

interface Props {
  report: Reports;
}

export default function AttendanceChart({
  report,
}: Props) {
  return (
    <GlassCard className="rounded-3xl border border-white/10 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Attendance
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Overall:{" "}
            {Math.round(
              report.attendance
                .overall,
            )}
            %
          </p>
        </div>
      </div>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <BarChart
          data={
            report.attendance
              .byDepartment
          }
        >
          <CartesianGrid
            stroke="#334155"
          />

          <XAxis
            dataKey="department"
          />

          <YAxis
            domain={[
              0,
              100,
            ]}
          />

          <Tooltip />

          <Bar
            dataKey="attendance"
            name="Attendance %"
            fill="#22c55e"
            radius={[
              8,
              8,
              0,
              0,
            ]}
          />
        </BarChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}