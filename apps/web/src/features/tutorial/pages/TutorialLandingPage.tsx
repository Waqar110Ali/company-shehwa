import { Link } from "react-router-dom";

import Container from "@/components/common/Container";
import Section from "@/components/common/Section";
import AuroraBackground from "@/components/effects/AuroraBackground";
import GradientBlob from "@/components/effects/GradientBlob";
import FadeUp from "@/components/motion/FadeUp";
import GlassCard from "@/components/premium/GlassCard";
import GradientText from "@/components/premium/GradientText";
import PremiumButton from "@/components/premium/PremiumButton";

export default function TutorialLandingPage() {
  const steps = [
    {
      title: "Register",
      text: "Create your learning profile and start your student journey.",
    },
    {
      title: "Enroll & Pay",
      text: "Choose a course and submit your Easypaisa payment proof for verification.",
    },
    {
      title: "Learn & Earn",
      text: "Use coins to unlock lectures and keep each course access protected and traceable.",
    },
  ];

  return (
    <AuroraBackground>
      <Section className="relative overflow-hidden py-20 lg:py-28">
        <GradientBlob className="left-[-150px] top-[-80px]" />
        <GradientBlob className="right-[-180px] bottom-[-120px]" />

        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <FadeUp>
              <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-200 backdrop-blur-xl">
                Shehwa Tutorials
              </span>
            </FadeUp>

            <FadeUp delay={0.12}>
              <h1 className="mt-8 text-5xl font-black leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
                <GradientText>Learn with structure.</GradientText>
                <span className="mt-2 block text-slate-200">Unlock with coins.</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.25}>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-300">
                A premium learning flow designed for verified students, secure course access, and coin-based lecture gating.
              </p>
            </FadeUp>

            <FadeUp delay={0.35}>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link to="/tutorial/register">
                  <PremiumButton>Join now</PremiumButton>
                </Link>
                <Link to="/tutorial/courses">
                  <PremiumButton variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white hover:text-slate-900">
                    Browse courses
                  </PremiumButton>
                </Link>
              </div>
            </FadeUp>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <FadeUp key={step.title} delay={0.12 + index * 0.12}>
                <GlassCard className="h-full p-6 text-left">
                  <div className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                    0{index + 1}
                  </div>
                  <h2 className="mb-3 text-2xl font-semibold text-white">{step.title}</h2>
                  <p className="text-base leading-7 text-slate-300">{step.text}</p>
                </GlassCard>
              </FadeUp>
            ))}
          </div>
        </Container>
      </Section>
    </AuroraBackground>
  );
}
