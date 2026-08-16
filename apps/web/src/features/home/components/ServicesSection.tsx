// features/home/components/ServicesSection.tsx
import AuroraBackground from "@/components/effects/AuroraBackground";
import Container from "@/components/common/Container";
import Section from "@/components/common/Section";
import FadeUp from "@/components/motion/FadeUp";
import GradientText from "@/components/premium/GradientText";

import ServiceCard from "./ServiceCard";

import { useSectionContent } from "../hooks/useSectionContent";
import { getIcon } from "@/features/portfolio/utils/icon-map";
import { services } from "../constants/services";

export default function ServicesSection() {
  const items = useSectionContent("services", services);

  return (
    <AuroraBackground>
      <Section className="relative py-28">
        <Container>
          <FadeUp>
            <div className="mx-auto max-w-4xl text-center">
              <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl">
                What We Offer
              </span>

              <h2 className="mt-8 text-5xl font-black leading-tight text-white lg:text-6xl">
                Premium
                <GradientText> Software Services</GradientText>
              </h2>

              <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
                We build scalable digital products using AI, cloud technologies,
                enterprise architecture, mobile development, and modern web technologies.
              </p>
            </div>
          </FadeUp>

          <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {items.map((service) => (
              <ServiceCard key={service.title} {...service} icon={getIcon(service.icon)} />
            ))}
          </div>
        </Container>
      </Section>
    </AuroraBackground>
  );
}