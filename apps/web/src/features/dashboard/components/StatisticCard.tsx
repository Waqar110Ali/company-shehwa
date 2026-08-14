import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import GlassCard from "@/components/premium/GlassCard";

interface StatisticCardProps {
  title: string;
  value: string;
  change: string;
  positive?: boolean;
  icon: LucideIcon;
}

export default function StatisticCard({
  title,
  value,
  change,
  positive = true,
  icon: Icon,
}: StatisticCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      <GlassCard className="group relative overflow-hidden p-6">

        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

        <div className="relative z-10 flex items-start justify-between">

          <div>

            <p className="text-sm text-slate-400">
              {title}
            </p>

            <h2 className="mt-3 text-4xl font-black text-white">
              {value}
            </h2>

            <p
              className={`mt-3 text-sm font-semibold ${
                positive
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {change}
            </p>

          </div>

          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4">
            <Icon
              size={28}
              className="text-cyan-300"
            />
          </div>

        </div>

      </GlassCard>
    </motion.div>
  );
}