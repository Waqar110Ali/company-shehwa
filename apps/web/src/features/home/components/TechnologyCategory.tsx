import { motion } from "framer-motion";
import {
  Cpu,
  ArrowUpRight,
} from "lucide-react";

import FadeUp from "@/components/motion/FadeUp";
import GlassCard from "@/components/premium/GlassCard";

interface TechnologyCategoryProps {
  title: string;
  items: string[];
}

export default function TechnologyCategory({
  title,
  items,
}: TechnologyCategoryProps) {
  return (
    <FadeUp>

      <GlassCard className="group relative h-full overflow-hidden p-8">

        {/* Hover Glow */}

        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 transition duration-500 group-hover:opacity-100" />

        <div className="relative z-10">

          <motion.div
            whileHover={{
              rotate: 15,
              scale: 1.1,
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
            <Cpu size={30} />
          </motion.div>

          <div className="mt-8 flex items-center justify-between">

            <h3 className="text-2xl font-black text-white">
              {title}
            </h3>

            <ArrowUpRight
              size={20}
              className="text-cyan-300"
            />

          </div>

          <div className="my-6 h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />

          <div className="flex flex-wrap gap-3">

            {items.map((item) => (

              <motion.span
                key={item}
                whileHover={{
                  scale: 1.08,
                }}
                className="
                  rounded-full
                  border
                  border-cyan-400/20
                  bg-cyan-500/10
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-cyan-300
                "
              >
                {item}
              </motion.span>

            ))}

          </div>

        </div>

      </GlassCard>

    </FadeUp>
  );
}