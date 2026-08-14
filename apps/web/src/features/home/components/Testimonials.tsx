import AuroraBackground from "@/components/effects/AuroraBackground";

import Container from "@/components/common/Container";
import Section from "@/components/common/Section";

import FadeUp from "@/components/motion/FadeUp";

import GradientText from "@/components/premium/GradientText";
import PremiumButton from "@/components/premium/PremiumButton";

import TestimonialCard from "./TestimonialCard";

import { testimonials } from "../constants/testimonials";

export default function Testimonials() {
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
                Testimonials
              </span>

              <h2 className="mt-8 text-5xl font-black text-white lg:text-6xl">

                What Our

                <GradientText>
                  {" "}Clients Say
                </GradientText>

              </h2>

              <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">

                Every successful project begins with trust,
                transparency, and collaboration. Here is what
                our clients say about working with us.

              </p>

            </div>

          </FadeUp>

          <div className="mt-20 grid gap-8 lg:grid-cols-3">

            {testimonials.map((testimonial) => (

              <TestimonialCard
                key={testimonial.id}
                {...testimonial}
              />

            ))}

          </div>

          <div className="mt-16 flex justify-center">

            <PremiumButton>
              View More Reviews
            </PremiumButton>

          </div>

        </Container>

      </Section>

    </AuroraBackground>
  );
}