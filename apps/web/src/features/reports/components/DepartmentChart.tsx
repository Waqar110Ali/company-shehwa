import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

import GlassCard from "@/components/premium/GlassCard";

import type {
  Reports,
} from "../types/report";

interface Props {
  report: Reports;
}

const colors = [
  "#06b6d4",
  "#22c55e",
  "#8b5cf6",
  "#f59e0b",
  "#ef4444",
];

export default function DepartmentChart({
  report,
}: Props) {
  return (
    <GlassCard className="rounded-3xl border border-white/10 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Employees by Department
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <PieChart>
          <Pie
            data={
              report.departments
            }
            dataKey="employees"
            nameKey="name"
            outerRadius={120}
          >
            {report.departments.map(
              (_, index) => (
                <Cell
                  key={
                    index
                  }
                  fill={
                    colors[
                      index %
                        colors.length
                    ]
                  }
                />
              ),
            )}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}