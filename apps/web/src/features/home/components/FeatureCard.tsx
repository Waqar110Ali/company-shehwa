import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import FadeUp from "@/components/motion/FadeUp";
import GlassCard from "@/components/premium/GlassCard";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

export default function FeatureCard({
  title,
  description,
  icon: Icon,
}: FeatureCardProps) {
  return (
    <FadeUp>
      <GlassCard className="group h-full p-8">

        <div className="mb-8 flex items-center justify-between">

          <div
            className="
              flex h-16 w-16 items-center justify-center
              rounded-2xl
              border border-cyan-400/20
              bg-gradient-to-br
              from-cyan-500/20
              to-blue-600/20
              text-cyan-300
            "
          >
            <Icon size={30} />
          </div>

          <motion.div
            whileHover={{
              rotate:45,
            }}
            className="
              rounded-xl
              border border-white/10
              bg-white/5
              p-3
              text-cyan-300
            "
          >
            <ArrowUpRight size={20}/>
          </motion.div>

        </div>

        <h3 className="text-2xl font-black text-white">
          {title}
        </h3>

        <div className="my-6 h-px bg-gradient-to-r from-cyan-500/50 via-blue-500/20 to-transparent"/>

        <p className="leading-8 text-slate-300">
          {description}
        </p>

      </GlassCard>
    </FadeUp>
  );
}