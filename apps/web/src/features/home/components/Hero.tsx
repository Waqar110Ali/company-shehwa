import { motion } from "framer-motion";

import Container from "@/components/common/Container";
import Section from "@/components/common/Section";

import AuroraBackground from "@/components/effects/AuroraBackground";
import GradientBlob from "@/components/effects/GradientBlob";
import MouseSpotlight from "@/components/effects/MouseSpotlight";

import FadeUp from "@/components/motion/FadeUp";

import GlassCard from "@/components/premium/GlassCard";
import GradientText from "@/components/premium/GradientText";
import PremiumButton from "@/components/premium/PremiumButton";

import SphereCanvas from "@/components/three/SphereCanvas";

import HeroStats from "./HeroStats";
import {
  heroContent,
  heroStats,
} from "../constants/hero";

export default function Hero() {
  return (
    <AuroraBackground>
      <MouseSpotlight />

      <Section className="relative overflow-hidden py-28 lg:py-36">
        <GradientBlob className="left-[-150px] top-[-80px]" />

        <GradientBlob className="right-[-150px] bottom-[-120px]" />

        <Container>
          <div className="grid items-center gap-24 lg:grid-cols-2">
            {/* LEFT */}

            <div className="relative z-10">
              <FadeUp>
                <span className="inline-flex rounded-full border border-blue-400/30 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-300 backdrop-blur-xl">
                  {heroContent.badge}
                </span>
              </FadeUp>

              <FadeUp delay={0.15}>
                <h1 className="mt-8 text-6xl font-black leading-[0.9] tracking-tight text-white lg:text-7xl xl:text-8xl">
                  Building
                  <br />

                  <GradientText>
                    Modern AI
                  </GradientText>

                  <br />

                  Solutions
                </h1>
              </FadeUp>

              <FadeUp delay={0.3}>
                <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
                  {heroContent.description}
                </p>
              </FadeUp>

              <FadeUp delay={0.45}>
                <div className="mt-12 flex flex-wrap gap-5">
                  <PremiumButton>
                    {heroContent.primaryButton}
                  </PremiumButton>

                  <PremiumButton
                    variant="outline"
                    className="border-white/20 bg-white/5 text-white hover:bg-white hover:text-slate-900"
                  >
                    {heroContent.secondaryButton}
                  </PremiumButton>
                </div>
              </FadeUp>
            </div>

            {/* RIGHT */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                x: 40,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
              }}
              transition={{
                duration: 1,
              }}
              className="relative flex justify-center"
            >
              {/* Decorative Ring */}

              <div className="absolute top-1/2 left-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

              <div className="absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/20" />

              {/* 3D Sphere */}

              <SphereCanvas />

              {/* Floating Statistics */}

              <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 gap-5">
                {heroStats.map((item, index) => (
                  <FadeUp
                    key={item.label}
                    delay={0.5 + index * 0.1}
                  >
                    <GlassCard className="p-6">
                      <HeroStats
                        value={item.value}
                        label={item.label}
                      />
                    </GlassCard>
                  </FadeUp>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>
    </AuroraBackground>
  );
}