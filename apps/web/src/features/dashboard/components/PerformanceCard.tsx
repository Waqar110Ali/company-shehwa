import {
  Trophy,
  TrendingUp,
} from "lucide-react";

import { motion } from "framer-motion";

import type {
  DashboardPerformance,
} from "../types/dashboard";

interface Props {
  employees: DashboardPerformance[];
}

function progressColor(
  value: number,
) {
  if (value >= 90)
    return "bg-emerald-500";

  if (value >= 75)
    return "bg-cyan-500";

  return "bg-yellow-500";
}

export default function PerformanceCard({
  employees,
}: Props) {
  return (
    <div className="rounded-3xl border border-cyan-400/10 bg-white/5 p-6 backdrop-blur-3xl">
      <div className="mb-8 flex items-center gap-3">
        <TrendingUp className="text-cyan-400" />

        <div>
          <h2 className="text-2xl font-bold text-white">
            Team Performance
          </h2>

          <p className="text-slate-400">
            Top performers this month
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {employees.length === 0 ? (
          <p className="text-slate-400">
            No performance data available.
          </p>
        ) : (
          employees.map(
            (employee) => (
              <motion.div
                key={employee.id}
                whileHover={{
                  scale: 1.01,
                }}
                className="rounded-2xl border border-white/10 bg-slate-900/40 p-5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white">
                      {employee.name}
                    </h3>

                    <p className="text-sm text-slate-400">
                      {employee.role}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Trophy
                      size={18}
                      className="text-yellow-400"
                    />

                    <span className="font-bold text-white">
                      {employee.performance}%
                    </span>
                  </div>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: `${employee.performance}%`,
                    }}
                    transition={{
                      duration: 1,
                    }}
                    className={`h-full rounded-full ${progressColor(
                      employee.performance,
                    )}`}
                  />
                </div>
              </motion.div>
            ),
          )
        )}
      </div>
    </div>
  );
}