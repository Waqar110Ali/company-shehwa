import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Minus,
} from "lucide-react";

import GlassCard from "@/components/premium/GlassCard";

import type {
  Reports,
} from "../types/report";

interface Props {
  report: Reports;
}

export default function AIInsightCard({
  report,
}: Props) {
  return (
    <GlassCard className="rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-6">
      <div className="mb-5 flex items-center gap-3">
        <Brain
          className="text-cyan-400"
          size={30}
        />

        <h2 className="text-2xl font-bold text-white">
          Insights
        </h2>
      </div>

      <div className="space-y-5">
        {report.insights.map(
          (insight, index) => {
            const Icon =
              insight.type ===
              "positive"
                ? TrendingUp
                : insight.type ===
                  "warning"
                ? AlertTriangle
                : Minus;

            return (
              <div
                key={`${insight.title}-${index}`}
                className="flex gap-3"
              >
                <Icon
                  className={
                    insight.type ===
                    "positive"
                      ? "text-emerald-400"
                      : insight.type ===
                        "warning"
                      ? "text-yellow-400"
                      : "text-cyan-400"
                  }
                />

                <div>
                  <p className="font-semibold text-white">
                    {insight.title}
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    {
                      insight.message
                    }
                  </p>
                </div>
              </div>
            );
          },
        )}
      </div>
    </GlassCard>
  );
}