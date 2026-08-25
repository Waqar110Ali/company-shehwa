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

        <GlassCard className="group flex h-full flex-col overflow-hidden p-0">

        {/* IMAGE */}

        <div className="relative overflow-hidden">

          <motion.img
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5 }}
            src={image}
            alt={name}
            className="h-80 w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

          {/* Social Icons */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-5 right-5 flex gap-3"
          >
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/10 bg-white/10 p-3 text-white backdrop-blur-xl transition hover:bg-cyan-500"
            >
              <FaGithub />
            </a>

            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/10 bg-white/10 p-3 text-white backdrop-blur-xl transition hover:bg-cyan-500"
            >
              <FaLinkedin />
            </a>
          </motion.div>

        </div>

        {/* CONTENT */}

        <div className="flex flex-1 flex-col p-8">

          <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-300">
            {department}
          </span>

          <h3 className="mt-6 text-2xl font-black text-white">
            {name}
          </h3>

          <p className="mt-2 text-cyan-300">
            {designation}
          </p>

         <div className="my-6 h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />

          <div className="mb-8 flex flex-wrap gap-3">

            {skills.map((skill) => (

              <motion.span
                key={skill}
                whileHover={{ scale: 1.05 }}
                className="
                  rounded-full
                  border
                  border-cyan-400/20
                  bg-cyan-500/10
                  px-4
                  py-2
                  text-sm
                  text-cyan-300
                "
              >
                {skill}
              </motion.span>

            ))}

          </div>

        <PremiumButton
            className="mt-auto w-full pt-8"
            variant="outline"
          >
            View Profile

            <ArrowUpRight className="ml-2 h-4 w-4" />

          </PremiumButton>

        </div>

      </GlassCard>

    </FadeUp>
  );
}