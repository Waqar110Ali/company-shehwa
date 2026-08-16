// features/home/components/TrustedBy.tsx
import { motion } from "framer-motion";

import AuroraBackground from "@/components/effects/AuroraBackground";
import Container from "@/components/common/Container";
import Section from "@/components/common/Section";
import FadeUp from "@/components/motion/FadeUp";
import GradientText from "@/components/premium/GradientText";

import { useSectionContent } from "../hooks/useSectionContent";
import { technologies } from "../constants/trusted";

export default function TrustedBy() {
  const items = useSectionContent("technologies", technologies);

  return (
    <AuroraBackground>
      <Section className="py-28">
        <Container>
          <FadeUp>
            <div className="mx-auto max-w-4xl text-center">
              <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl">
                Our Ecosystem
              </span>

              <h2 className="mt-8 text-5xl font-black text-white lg:text-6xl">
                Technologies We
                <GradientText> Trust Every Day</GradientText>
              </h2>

              <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
                Every solution we build is powered by reliable, industry-proven
                technologies used by startups, enterprises, and global organizations.
              </p>
            </div>
          </FadeUp>

          <div className="mt-20 flex flex-wrap justify-center gap-5">
            {items.map((tech, index) => (
              <motion.div
                key={tech.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.08, y: -4 }}
                className="rounded-full border border-cyan-400/20 bg-white/5 px-7 py-4 font-semibold text-cyan-300 backdrop-blur-xl transition-all"
              >
                {tech.name}
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </AuroraBackground>
  );
}