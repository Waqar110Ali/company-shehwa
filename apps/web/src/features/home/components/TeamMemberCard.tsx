import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

import { ArrowUpRight } from "lucide-react";

import FadeUp from "@/components/motion/FadeUp";
import GlassCard from "@/components/premium/GlassCard";
import PremiumButton from "@/components/premium/PremiumButton";

interface TeamMemberCardProps {
  image: string;
  name: string;
  designation: string;
  department: string;
  skills: string[];
  github: string;
  linkedin: string;
}

// Cycled by index so any number of skills stays visually varied
// without ever breaking layout (no absolute positioning here).
const SKILL_ACCENTS = [
  "border-cyan-400/30 bg-cyan-500/10 text-cyan-300",
  "border-blue-400/30 bg-blue-500/10 text-blue-300",
  "border-violet-400/30 bg-violet-500/10 text-violet-300",
];

export default function TeamMemberCard({
  image,
  name,
  designation,
  department,
  skills,
  github,
  linkedin,
}: TeamMemberCardProps) {
  return (
    <FadeUp>

      <div className="group flex h-full flex-col">

        {/* ================================================
            STAGE — floating cutout portrait in front of two
            vertically-stacked glass panels, centered behind
            the person for a compact, layered "badge" look.
            ================================================ */}

        <div className="relative flex h-56 items-end justify-center">

          {/* Back panel — long, centered, set slightly higher */}
          <div
            className="
              absolute
              left-1/2
              top-3
              h-32
              w-36
              -translate-x-1/2
              -rotate-3
              rounded-3xl
              border
              border-white/10
              bg-gradient-to-b
              from-cyan-500/10
              via-white/5
              to-transparent
              backdrop-blur-xl
              transition-transform
              duration-500
              group-hover:-rotate-1
            "
          />

          {/* Front panel — narrower, set slightly lower */}
          <div
            className="
              absolute
              left-1/2
              top-9
              h-24
              w-32
              -translate-x-1/2
              rotate-3
              rounded-3xl
              border
              border-white/10
              bg-gradient-to-b
              from-blue-500/10
              via-white/5
              to-transparent
              backdrop-blur-xl
              transition-transform
              duration-500
              group-hover:rotate-1
            "
          />

          {/* Ground glow */}
          <div className="absolute bottom-1 h-3 w-24 rounded-full bg-cyan-400/30 blur-xl" />

          {/* Floating cutout — object-contain, no border/frame */}
          <motion.img
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4 }}
            src={image}
            alt={name}
            className="
              relative
              z-10
              h-56
              w-auto
              object-contain
              drop-shadow-[0_20px_28px_rgba(6,182,212,0.25)]
            "
          />

          {/* Social Icons — appear on hover, top-right of the stage */}

          <motion.div
            initial={{ opacity: 0, y: -8 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute right-2 top-2 z-20 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/10 bg-white/10 p-2.5 text-white backdrop-blur-xl transition hover:bg-cyan-500"
            >
              <FaGithub size={14} />
            </a>

            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/10 bg-white/10 p-2.5 text-white backdrop-blur-xl transition hover:bg-cyan-500"
            >
              <FaLinkedin size={14} />
            </a>
          </motion.div>

        </div>

        {/* ================================================
            CONTENT — overlaps the stage slightly so the two
            zones read as one composition.
            ================================================ */}

        <GlassCard className="relative z-10 -mt-5 flex flex-1 flex-col items-center rounded-3xl p-5 text-center">

          <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-300">
            {department}
          </span>

          <h3 className="mt-4 text-2xl font-black text-white">
            {name}
          </h3>

          <p className="mt-1 text-cyan-300">
            {designation}
          </p>

          <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

          {/* Skills — scattered jewel-toned chip cluster */}

          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                whileHover={{ y: -3, scale: 1.05 }}
                className={`
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  backdrop-blur-xl
                  ${SKILL_ACCENTS[index % SKILL_ACCENTS.length]}
                  ${index % 2 === 0 ? "-translate-y-0.5" : "translate-y-0.5"}
                `}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {skill}
              </motion.span>
            ))}
          </div>

          <PremiumButton
            className="mt-auto w-full"
            variant="outline"
          >
            View Profile

            <ArrowUpRight className="ml-2 h-4 w-4" />

          </PremiumButton>

        </GlassCard>

      </div>

    </FadeUp>
  );
}