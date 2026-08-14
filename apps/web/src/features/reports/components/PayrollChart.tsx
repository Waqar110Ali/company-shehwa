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

export default function PayrollChart({
  report,
}: Props) {
  return (
    <GlassCard className="rounded-3xl border border-white/10 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Payroll by Department
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <BarChart
          data={
            report.payroll
              .byDepartment
          }
        >
          <CartesianGrid
            stroke="#334155"
          />

          <XAxis
            dataKey="department"
          />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="payroll"
            name="Payroll"
            fill="#06b6d4"
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