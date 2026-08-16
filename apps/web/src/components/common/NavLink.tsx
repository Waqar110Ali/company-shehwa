import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

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
  const location = useLocation();

  const [path, hash] = href.split("#");
  const targetPath = path || "/";

  // react-router's built-in NavLink isActive only compares pathname,
  // which would mark every "/#..." link active at once since they
  // all share pathname "/". Compute the real active state ourselves
  // based on the current hash instead — hence plain Link below
  // rather than NavLink.
  const isActive = hash
    ? location.pathname === targetPath && location.hash === `#${hash}`
    : location.pathname === targetPath && !location.hash;

  function handleClick(e: React.MouseEvent) {
    if (!hash) {
      // Plain path link (e.g. "/") — if already there, scroll to top
      // instead of a no-op navigation.
      if (location.pathname === targetPath) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    // Already on the target page — scroll smoothly instead of
    // letting the browser hash-jump instantly.
    if (location.pathname === targetPath) {
      e.preventDefault();
      document
        .getElementById(hash)
        ?.scrollIntoView({ behavior: "smooth" });
    }
    // Otherwise navigate normally to "/#hash" — the destination
    // page's own scroll-to-hash effect (HomePage) takes over once it
    // mounts.
  }

  return (
    <Link to={href} onClick={handleClick}>
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
    </Link>
  );
}