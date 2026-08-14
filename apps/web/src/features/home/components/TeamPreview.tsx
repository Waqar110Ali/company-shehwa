import AuroraBackground from "@/components/effects/AuroraBackground";

import Container from "@/components/common/Container";
import Section from "@/components/common/Section";

import FadeUp from "@/components/motion/FadeUp";

import GradientText from "@/components/premium/GradientText";
import PremiumButton from "@/components/premium/PremiumButton";

import TeamMemberCard from "./TeamMemberCard";

import { teamMembers } from "../constants/team";

export default function TeamPreview() {
  return (
    <AuroraBackground>

      <Section className="relative py-32">

        <Container>

          <FadeUp>

            <div className="mx-auto max-w-4xl text-center">

              <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl">
                Our Experts
              </span>

              <h2 className="mt-8 text-5xl font-black text-white lg:text-6xl">

                Meet The

                <GradientText>
                  {" "}Team
                </GradientText>

              </h2>

              <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">

                Behind every successful product is a passionate
                team of engineers, designers, AI specialists,
                and innovators dedicated to building exceptional
                digital experiences.

              </p>

            </div>

          </FadeUp>

          <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

            {teamMembers.map((member) => (

              <TeamMemberCard
                key={member.id}
                image={member.image}
                name={member.name}
                designation={member.designation}
                department={member.department}
                skills={member.skills}
                github={member.github}
                linkedin={member.linkedin}
              />

            ))}

          </div>

          <div className="mt-16 flex justify-center">

            <PremiumButton>
              View Complete Team
            </PremiumButton>

          </div>

        </Container>

      </Section>

    </AuroraBackground>
  );
}