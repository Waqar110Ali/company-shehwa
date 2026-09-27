// features/home/components/FeaturedProjects.tsx
import { useState } from "react";

import AuroraBackground from "@/components/effects/AuroraBackground";
import Container from "@/components/common/Container";
import Section from "@/components/common/Section";
import FadeUp from "@/components/motion/FadeUp";
import GradientText from "@/components/premium/GradientText";
import PremiumButton from "@/components/premium/PremiumButton";
import ProjectCard from "./ProjectCard";
import { useSectionContent } from "../hooks/useSectionContent";
import { featuredProjects } from "../constants/projects";

const INITIAL_VISIBLE_COUNT = 3;

export default function FeaturedProjects() {
  const projects = useSectionContent("featuredProjects", featuredProjects);
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll
    ? projects
    : projects.slice(0, INITIAL_VISIBLE_COUNT);

  return (
    <AuroraBackground>
      <Section className="py-28">
        <Container>
          <FadeUp>
            <div className="mx-auto max-w-4xl text-center">
              <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl">
                Our Portfolio
              </span>
              <h2 className="mt-8 text-5xl font-black text-white lg:text-6xl">
                Featured
                <GradientText> Projects</GradientText>
              </h2>
              <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
                Explore a selection of AI platforms, SaaS products, enterprise software,
                and modern web applications we've built for clients around the world.
              </p>
            </div>
          </FadeUp>
          <div className="mt-20 grid gap-8 lg:grid-cols-3">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
          {projects.length > INITIAL_VISIBLE_COUNT && (
            <div className="mt-16 flex justify-center">
              <PremiumButton onClick={() => setShowAll((prev) => !prev)}>
                {showAll ? "Show Less" : "View Complete Portfolio"}
              </PremiumButton>
            </div>
          )}
        </Container>
      </Section>
    </AuroraBackground>
  );
}
