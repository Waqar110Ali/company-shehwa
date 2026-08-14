import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import FadeUp from "@/components/motion/FadeUp";
import GlassCard from "@/components/premium/GlassCard";

interface Props {
  title: string;
  description: string;
}

export default function MissionCard({
  title,
  description,
}: Props) {
  return (
    <FadeUp>

      <GlassCard className="group relative overflow-hidden p-10">

        {/* Hover Glow */}

        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

        <div className="relative z-10">

          <motion.div
            whileHover={{
              rotate: 15,
              scale: 1.1,
            }}
            className="
              inline-flex
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
            <Sparkles size={28} />
          </motion.div>

          <h3 className="mt-8 text-3xl font-black text-white">
            {title}
          </h3>

          <div className="my-6 h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />

          <p className="leading-8 text-slate-300">
            {description}
          </p>

          <motion.div
            whileHover={{ x: 6 }}
            className="mt-8 inline-flex items-center gap-2 text-cyan-300"
          >
            Learn More

            <ArrowUpRight size={18} />
          </motion.div>

        </div>

      </GlassCard>

    </FadeUp>
  );
}