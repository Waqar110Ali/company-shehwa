import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";

interface NavigationLinkProps {
  href: string;
  label: string;
  scrolled: boolean;
}

export default function NavigationLink({
  href,
  label,
  scrolled,
}: NavigationLinkProps) {
  return (
    <NavLink to={href}>
      {({ isActive }) => (
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <span
            className={cn(
              "relative text-sm font-semibold tracking-wide transition-all duration-300",
              isActive
                ? "text-cyan-400"
                : scrolled
                  ? "text-white hover:text-cyan-300"
                  : "text-slate-800 hover:text-cyan-600"
            )}
          >
            {label}
          </span>

          {/* Animated Underline */}

          <motion.span
            initial={false}
            animate={{
              width: isActive ? "100%" : "0%",
            }}
            whileHover={{
              width: "100%",
            }}
            transition={{
              duration: 0.3,
            }}
            className="absolute -bottom-2 left-0 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500"
          />
        </motion.div>
      )}
    </NavLink>
  );
}