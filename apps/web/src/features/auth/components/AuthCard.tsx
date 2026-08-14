import type { ReactNode } from "react";

import { motion } from "framer-motion";

interface AuthCardProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthCard({
  children,
  title,
  subtitle,
}: AuthCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className="
relative
w-full
max-w-xl
overflow-hidden
rounded-[32px]
border
border-cyan-400/20
bg-white/5
p-10
backdrop-blur-3xl
shadow-[0_10px_60px_rgba(0,0,0,.35)]
"
    >
      {/* Glow */}

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/10" />

      {/* Content */}

      <div className="relative z-10">
        <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">
          Secure Authentication
        </span>

        <h2 className="mt-8 text-4xl font-black text-white">
          {title}
        </h2>

        <p className="mt-4 text-lg leading-8 text-slate-300">
          {subtitle}
        </p>

        <div className="mt-10">
          {children}
        </div>
      </div>
    </motion.div>
  );
}