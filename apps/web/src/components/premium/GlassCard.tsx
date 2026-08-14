import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

export default function GlassCard({
  children,
  className,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 18,
      }}
      className={cn(
        "relative overflow-hidden rounded-3xl",
        "border border-white/10",
        "bg-white/5",
        "backdrop-blur-2xl",
        "shadow-[0_8px_40px_rgba(0,0,0,.25)]",
        "transition-all duration-500",
        "hover:border-blue-400/40",
        "hover:shadow-[0_0_60px_rgba(37,99,235,.25)]",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}