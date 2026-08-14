import { motion } from "framer-motion";

interface Props {
  className?: string;
}

export default function GradientBlob({
  className = "",
}: Props) {
  return (
    <motion.div
      animate={{
        x: [0, 60, -40, 0],
        y: [0, -40, 50, 0],
        scale: [1, 1.15, 0.95, 1],
      }}
      transition={{
        repeat: Infinity,
        duration: 12,
        ease: "easeInOut",
      }}
      className={`
        absolute
        h-72
        w-72
        rounded-full
        bg-gradient-to-br
        from-blue-500/25
        via-cyan-400/20
        to-violet-500/20
        blur-[90px]
        ${className}
      `}
    />
  );
}