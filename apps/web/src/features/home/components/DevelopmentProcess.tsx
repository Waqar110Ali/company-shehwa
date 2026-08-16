// features/home/components/DevelopmentProcess.tsx
import AuroraBackground from "@/components/effects/AuroraBackground";
import Container from "@/components/common/Container";
import Section from "@/components/common/Section";
import FadeUp from "@/components/motion/FadeUp";
import GradientText from "@/components/premium/GradientText";

import ProcessCard from "./ProcessCard";

import { useSectionContent } from "../hooks/useSectionContent";
import { getIcon } from "@/features/portfolio/utils/icon-map";
import { developmentProcess } from "../constants/process";

export default function DevelopmentProcess() {
  const steps = useSectionContent("developmentProcess", developmentProcess);

  return (
    <AuroraBackground>
      <Section className="py-32">
        <Container>
          <FadeUp>
            <div className="mx-auto max-w-4xl text-center">
              <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl">
                Development Workflow
              </span>

              <h2 className="mt-8 text-5xl font-black text-white lg:text-6xl">
                How We
                <GradientText> Build Software</GradientText>
              </h2>

              <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
                Every successful product follows a structured, transparent, and
                collaborative process—from strategy to deployment and long-term support.
              </p>
            </div>
          </FadeUp>

          <div className="relative mt-24">
            <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 xl:block" />

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {steps.map((process) => (
                <ProcessCard key={process.step} {...process} icon={getIcon(process.icon)} />
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </AuroraBackground>
  );
}