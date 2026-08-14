import AuroraBackground from "@/components/effects/AuroraBackground";

import Container from "@/components/common/Container";
import Section from "@/components/common/Section";

import FadeUp from "@/components/motion/FadeUp";

import GradientText from "@/components/premium/GradientText";

import StatisticCard from "./StatisticCard";

import { statistics } from "../constants/statistics";

export default function CompanyStatistics() {
  return (
    <AuroraBackground>

      <Section className="relative py-32">

        <Container>

          <FadeUp>

            <div className="mx-auto max-w-4xl text-center">

              <span
                className="
                  rounded-full
                  border
                  border-cyan-400/20
                  bg-cyan-500/10
                  px-5
                  py-2
                  text-sm
                  font-medium
                  text-cyan-300
                  backdrop-blur-xl
                "
              >
                Company Growth
              </span>

              <h2 className="mt-8 text-5xl font-black text-white lg:text-6xl">

                Numbers That

                <GradientText>
                  {" "}Speak for Themselves
                </GradientText>

              </h2>

              <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">

                We measure our success by delivering real value,
                building long-term partnerships, and helping
                businesses grow through modern technology.

              </p>

            </div>

          </FadeUp>

          <div className="mt-24 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">

            {statistics.map((item) => (

              <StatisticCard
                key={item.title}
                title={item.title}
                value={item.value}
                icon={item.icon}
              />

            ))}

          </div>

        </Container>

      </Section>

    </AuroraBackground>
  );
}