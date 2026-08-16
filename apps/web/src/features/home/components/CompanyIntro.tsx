// features/home/components/CompanyIntro.tsx
import AuroraBackground from "@/components/effects/AuroraBackground";
import Container from "@/components/common/Container";
import Section from "@/components/common/Section";
import FadeUp from "@/components/motion/FadeUp";
import GradientText from "@/components/premium/GradientText";

import MissionCard from "./MissionCard";
import ValueCard from "./ValueCard";

import { useSectionContent } from "../hooks/useSectionContent";
import { companyContent, companyValues } from "../constants/company";

export default function CompanyIntro() {
  const content = useSectionContent("companyContent", companyContent);
  const values = useSectionContent("companyValues", companyValues);

  return (
    <AuroraBackground>
      <Section className="relative py-32">
        <Container>
          <FadeUp>
            <div className="mx-auto max-w-4xl text-center">
              <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl">
                About Our Company
              </span>

              <h2 className="mt-8 text-5xl font-black text-white lg:text-6xl">
                Creating Digital
                <GradientText> Excellence</GradientText>
              </h2>

              <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
                {content.subtitle}
              </p>
            </div>
          </FadeUp>

          <div className="mt-20 grid gap-8 lg:grid-cols-2">
            <MissionCard title="Our Mission" description={content.mission} />
            <MissionCard title="Our Vision" description={content.vision} />
          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {values.map((value) => (
              <ValueCard
                key={value.title}
                title={value.title}
                description={value.description}
              />
            ))}
          </div>
        </Container>
      </Section>
    </AuroraBackground>
  );
}