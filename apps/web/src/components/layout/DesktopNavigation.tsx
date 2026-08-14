import { motion } from "framer-motion";

import NavigationLink from "@/components/common/NavLink";

import { navigation } from "@/constants/navigation";

interface DesktopNavigationProps {
  scrolled: boolean;
}

export default function DesktopNavigation({
  scrolled,
}: DesktopNavigationProps) {
  return (
    <motion.nav
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        delay: 0.2,
      }}
      className="hidden items-center gap-8 lg:flex"
    >
      {navigation.map((item) => (
        <NavigationLink
          key={item.href}
          href={item.href}
          label={item.label}
          scrolled={scrolled}
        />
      ))}
    </motion.nav>
  );
}