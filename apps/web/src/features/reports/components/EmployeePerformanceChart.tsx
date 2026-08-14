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

export default function EmployeePerformanceChart({
  report,
}: Props) {
  return (
    <GlassCard className="rounded-3xl border border-white/10 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Employee Performance
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <BarChart
          data={
            report.performance
          }
        >
          <CartesianGrid
            stroke="#334155"
          />

          <XAxis
            dataKey="employee"
          />

          <YAxis
            domain={[
              0,
              100,
            ]}
          />

          <Tooltip />

          <Bar
            dataKey="score"
            name="Performance"
            fill="#8b5cf6"
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