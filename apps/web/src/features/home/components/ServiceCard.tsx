import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import FadeUp from "@/components/motion/FadeUp";
import GlassCard from "@/components/premium/GlassCard";
import PremiumButton from "@/components/premium/PremiumButton";

interface ServiceCardProps {
  title: string;
  description: string;
  technologies: string[];
  icon: React.ElementType;
}

export default function ServiceCard({
  title,
  description,
  technologies,
  icon: Icon,
}: ServiceCardProps) {
  return (
    <FadeUp>
      <GlassCard className="group h-full p-8 lg:p-10">

        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-300">

            <Icon size={30} />

          </div>

          <motion.div
            whileHover={{ rotate: 45 }}
            transition={{ duration: .25 }}
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-cyan-300"
          >
            <ArrowUpRight size={20} />
          </motion.div>

        </div>

        {/* Title */}

        <h3 className="text-2xl font-black text-white">
          {title}
        </h3>

        {/* Divider */}

        <div className="my-6 h-px bg-gradient-to-r from-cyan-500/50 via-blue-500/20 to-transparent" />

        {/* Description */}

        <p className="leading-8 text-slate-300">
          {description}
        </p>

        {/* Technologies */}

        <div className="mt-8 flex flex-wrap gap-3">

          {technologies.map((tech) => (

            <span
              key={tech}
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
                backdrop-blur-xl
              "
            >
              {tech}
            </span>

          ))}

        </div>

        <div className="mt-10">

          <PremiumButton variant="outline">
            Learn More
          </PremiumButton>

        </div>

      </GlassCard>
    </FadeUp>
  );
}