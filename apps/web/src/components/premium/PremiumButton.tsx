import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { ComponentProps } from "react";

type PremiumButtonProps = ComponentProps<typeof Button>;

export default function PremiumButton({
  children,
  className,
  ...props
}: PremiumButtonProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.95,
      }}
    >
      <Button
        className={`
          relative
          overflow-hidden
          rounded-xl
          bg-gradient-to-r
          from-blue-600
          via-cyan-500
          to-violet-600
          px-7
          py-6
          text-white
          shadow-lg
          transition-all
          duration-500
          hover:shadow-blue-500/50
          ${className ?? ""}
        `}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
}