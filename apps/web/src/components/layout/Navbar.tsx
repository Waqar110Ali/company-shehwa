import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Container from "@/components/common/Container";
import Logo from "@/components/ui/Logo";
import PremiumButton from "@/components/premium/PremiumButton";

import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{
        y: -80,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.6,
      }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500
      ${
        scrolled
          ? "border-b border-white/10 bg-slate-950/75 backdrop-blur-3xl shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <Container className="max-w-[1440px]">
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled ? "h-[72px]" : "h-20"
          }`}
        >
          {/* Logo */}

          <Logo scrolled={scrolled} />

          {/* Navigation */}

          <DesktopNavigation scrolled={scrolled} />

          {/* Right Side */}

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden lg:block"
            >
              <PremiumButton
                variant="outline"
                className={
                  scrolled
                    ? "border-white/20 bg-white/5 text-white hover:bg-white hover:text-slate-900"
                    : ""
                }
              >
                Login
              </PremiumButton>
            </Link>

            <Link
              to="/register"
              className="hidden lg:block"
            >
              <PremiumButton>
                Register
              </PremiumButton>
            </Link>

            <MobileNavigation />
          </div>
        </div>
      </Container>
    </motion.header>
  );
}