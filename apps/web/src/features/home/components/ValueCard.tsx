import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import FadeUp from "@/components/motion/FadeUp";
import GlassCard from "@/components/premium/GlassCard";

interface Props {
  title: string;
  description: string;
}

export default function ValueCard({
  title,
  description,
}: Props) {
  return (
    <FadeUp>

      <GlassCard className="group relative h-full p-8">

        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 transition duration-500 group-hover:opacity-100" />

        <motion.div
          whileHover={{
            scale: 1.1,
            rotate: 15,
          }}
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-xl
            border
            border-cyan-400/20
            bg-cyan-500/10
            text-cyan-300
          "
        >
          <CheckCircle2 size={26} />
        </motion.div>

        <h4 className="mt-6 text-2xl font-bold text-white">
          {title}
        </h4>

        <p className="mt-4 leading-8 text-slate-300">
          {description}
        </p>

      </GlassCard>

    </FadeUp>
  );
}