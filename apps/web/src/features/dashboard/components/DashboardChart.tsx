import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
} from "recharts";

import type { DashboardAnalytics } from "../types/dashboard";

interface Props {
  data: DashboardAnalytics[];
}

export default function DashboardChart({
  data,
}: Props) {
  return (
    <div className="rounded-3xl border border-cyan-400/10 bg-white/5 p-6 backdrop-blur-3xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">
          Company Analytics
        </h2>

        <p className="mt-2 text-slate-400">
          Employee growth and company revenue.
        </p>
      </div>

      <div className="h-96">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="employeeGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#22d3ee"
                  stopOpacity={0.6}
                />

                <stop
                  offset="95%"
                  stopColor="#22d3ee"
                  stopOpacity={0}
                />
              </linearGradient>

              <linearGradient
                id="revenueGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#3b82f6"
                  stopOpacity={0.5}
                />

                <stop
                  offset="95%"
                  stopColor="#3b82f6"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
            />

            <XAxis
              dataKey="month"
              stroke="#94a3b8"
            />

            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: 12,
              }}
            />

            <Area
              type="monotone"
              dataKey="employees"
              stroke="#22d3ee"
              fillOpacity={1}
              fill="url(#employeeGradient)"
              strokeWidth={3}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#revenueGradient)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}