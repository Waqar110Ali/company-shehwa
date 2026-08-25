import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Globe,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";

import FadeUp from "@/components/motion/FadeUp";
import GlassCard from "@/components/premium/GlassCard";
import PremiumButton from "@/components/premium/PremiumButton";

interface ProjectCardProps {
  name: string;
  category: string;
  description: string;
  technologies: string[];
  status: string;
  github: string;
  demo: string;
}

export default function ProjectCard({
  name,
  category,
  description,
  technologies,
  status,
  github,
  demo,
}: ProjectCardProps) {
  return (
    <FadeUp>
      <GlassCard className="group overflow-hidden p-0">

        {/* Preview */}

        <div className="relative h-64 overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-600/10 to-indigo-600/20" />

          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4 }}
            className="flex h-full items-center justify-center"
          >
            <div className="rounded-3xl border border-cyan-400/20 bg-white/5 px-10 py-8 backdrop-blur-xl">

              <span className="text-xl font-bold text-cyan-300">
                {name}
              </span>

            </div>
          </motion.div>

          <div className="absolute left-6 top-6 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl">
            {category}
          </div>

        </div>

        <div className="p-8">

          <div className="flex items-center justify-between">

            <h3 className="text-2xl font-black text-white">
              {name}
            </h3>

            <ArrowUpRight
              size={22}
              className="text-cyan-300"
            />

          </div>

          <div className="my-6 h-px bg-gradient-to-r from-cyan-500/50 via-blue-500/20 to-transparent" />

          <p className="leading-8 text-slate-300">
            {description}
          </p>

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
                  transition-all
                  duration-300
                  hover:bg-cyan-500/20
                "
              >
                {tech}
              </span>
            ))}

          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">

            <span className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-400">
              {status}
            </span>

            <div className="flex gap-3">

             <PremiumButton
  variant="outline"
  nativeButton={false}
  render={
    <a href={github} target="_blank" rel="noopener noreferrer" />
  }
>
  <FaGithub className="mr-2 h-4 w-4" />
  GitHub
</PremiumButton>

             <PremiumButton
  nativeButton={false}
  render={
    <a href={demo} target="_blank" rel="noopener noreferrer" />
  }
>
  <Globe className="mr-2 h-4 w-4" />
  Live Demo
</PremiumButton>

            </div>

          </div>

        </div>

      </GlassCard>
    </FadeUp>
  );
}