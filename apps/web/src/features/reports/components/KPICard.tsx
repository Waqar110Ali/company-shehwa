import {
  ArrowUpRight,
} from "lucide-react";

import GlassCard from "@/components/premium/GlassCard";

interface KPI {
  title: string;
  value: string;
  change?: number;
  color?: string;
  icon?: React.ElementType;
}

interface Props {
  kpi: KPI;
}

export default function KPICard({
  kpi,
}: Props) {
  const Icon =
    kpi.icon;

  return (
    <GlassCard className="rounded-3xl border border-white/10 p-6">
      <div className="flex items-start justify-between">
        <p className="text-sm text-slate-400">
          {kpi.title}
        </p>

        {Icon && (
          <Icon
            size={22}
            className="text-cyan-400"
          />
        )}
      </div>

      <h2 className="mt-3 text-4xl font-bold text-white">
        {kpi.value}
      </h2>

      {kpi.change !== undefined &&
        kpi.change !== 0 && (
          <div className="mt-5 flex items-center gap-2">
            <ArrowUpRight
              className="text-emerald-400"
              size={18}
            />

            <span className="font-semibold text-emerald-400">
              {Math.abs(
                kpi.change,
              )}
              %
            </span>

            <span className="text-slate-400">
              vs last month
            </span>
          </div>
        )}
    </GlassCard>
  );
}