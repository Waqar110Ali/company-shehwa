import { motion } from "framer-motion";

import FadeUp from "@/components/motion/FadeUp";
import GlassCard from "@/components/premium/GlassCard";

interface StatisticCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
}

export default function StatisticCard({
  title,
  value,
  icon: Icon,
}: StatisticCardProps) {
  return (
    <FadeUp>

      <GlassCard className="group relative overflow-hidden p-8">

        {/* Hover Glow */}

        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 transition duration-500 group-hover:opacity-100" />

        {/* Icon */}

        <motion.div
          whileHover={{
            rotate: 15,
            scale: 1.1,
          }}
          transition={{
            duration: 0.3,
          }}
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            border
            border-cyan-400/20
            bg-cyan-500/10
            text-cyan-300
          "
        >
          <Icon size={30} />
        </motion.div>

        <div className="mt-8">

          <motion.h3
            whileHover={{ scale: 1.05 }}
            className="text-5xl font-black text-white"
          >
            {value}
          </motion.h3>

          <p className="mt-4 leading-7 text-slate-300">
            {title}
          </p>

        </div>

        <div className="mt-8 h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />

        <div className="mt-6 flex items-center justify-between">

          <span className="text-sm text-slate-400">
            Updated Live
          </span>

          <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_20px_#34d399]" />

        </div>

      </GlassCard>

    </FadeUp>
  );
}