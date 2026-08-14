import { motion } from "framer-motion";

import FadeUp from "@/components/motion/FadeUp";
import GlassCard from "@/components/premium/GlassCard";

interface AchievementCardProps {
  value: string;
  label: string;
}

export default function AchievementCard({
  value,
  label,
}: AchievementCardProps) {
  return (
    <FadeUp>

      <GlassCard className="overflow-hidden p-8 text-center">

        <motion.h3
          initial={{
            scale:.9,
          }}
          whileInView={{
            scale:1,
          }}
          transition={{
            duration:.5,
          }}
          className="
            bg-gradient-to-r
            from-cyan-300
            via-blue-400
            to-indigo-400
            bg-clip-text
            text-5xl
            font-black
            text-transparent
          "
        >
          {value}
        </motion.h3>

        <p className="mt-4 text-slate-300">
          {label}
        </p>

      </GlassCard>

    </FadeUp>
  );
}