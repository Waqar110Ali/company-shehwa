import AuroraBackground from "@/components/effects/AuroraBackground";
import Container from "@/components/common/Container";
import Section from "@/components/common/Section";

import FadeUp from "@/components/motion/FadeUp";
import GradientText from "@/components/premium/GradientText";

import FeatureCard from "./FeatureCard";
import AchievementCard from "./AchievementCard";

import {
  achievements,
  whyChooseUs,
} from "../constants/why-choose-us";

export default function WhyChooseUs() {
  return (
    <AuroraBackground>

      <Section className="relative py-28">

        <Container>

          <FadeUp>

            <div className="mx-auto max-w-4xl text-center">

              <span
                className="
                  rounded-full
                  border border-cyan-400/20
                  bg-cyan-500/10
                  px-5
                  py-2
                  text-sm
                  font-medium
                  text-cyan-300
                  backdrop-blur-xl
                "
              >
                Why Companies Choose Us
              </span>

              <h2 className="mt-8 text-5xl font-black text-white lg:text-6xl">

                Why

                <GradientText>
                  {" "}Choose Our Team
                </GradientText>

              </h2>

              <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">

                We combine AI expertise, enterprise engineering,
                scalable architecture, and modern technologies
                to deliver world-class digital solutions.

              </p>

            </div>

          </FadeUp>

          <div className="mt-20 grid gap-8 lg:grid-cols-3">

            {whyChooseUs.map((feature)=>(
              <FeatureCard
                key={feature.title}
                {...feature}
              />
            ))}

          </div>

          <div className="mt-20 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">

            {achievements.map((item)=>(
              <AchievementCard
                key={item.label}
                value={item.value}
                label={item.label}
              />
            ))}

          </div>

        </Container>

      </Section>

    </AuroraBackground>
  );
}