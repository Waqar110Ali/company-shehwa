import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import FadeUp from "@/components/motion/FadeUp";
import GlassCard from "@/components/premium/GlassCard";

interface ProcessCardProps {
  step: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

export default function ProcessCard({
  step,
  title,
  description,
  icon: Icon,
}: ProcessCardProps) {
  return (
    <FadeUp>
      <GlassCard className="group relative h-full overflow-hidden p-8">

        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 transition duration-500 group-hover:opacity-100" />

        {/* Step */}
        <div className="flex items-center justify-between">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-300">
            <Icon size={30} />
          </div>

          <span className="text-5xl font-black text-white/10">
            {step}
          </span>

        </div>

        <div className="my-8 h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />

        <h3 className="text-2xl font-black text-white">
          {title}
        </h3>

        <p className="mt-5 leading-8 text-slate-300">
          {description}
        </p>

        <motion.div
          whileHover={{ x: 6 }}
          className="mt-8 flex items-center gap-2 text-cyan-300"
        >
          <span className="font-medium">
            Learn More
          </span>

          <ArrowRight size={18} />
        </motion.div>

      </GlassCard>
    </FadeUp>
  );
}