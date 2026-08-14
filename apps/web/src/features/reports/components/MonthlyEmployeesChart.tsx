import {
  Area,
  AreaChart,
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

export default function MonthlyEmployeesChart({
  report,
}: Props) {
  return (
    <GlassCard className="rounded-3xl border border-white/10 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Employee Growth
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <AreaChart
          data={
            report.monthlyEmployees
          }
        >
          <CartesianGrid
            stroke="#334155"
          />

          <XAxis
            dataKey="month"
          />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="employees"
            name="New Employees"
            stroke="#06b6d4"
            fill="#06b6d4"
            fillOpacity={0.15}
          />
        </AreaChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}