import { CalendarDays } from "lucide-react";

import AuroraBackground from "@/components/effects/AuroraBackground";
import Container from "@/components/common/Container";
import Section from "@/components/common/Section";
import FadeUp from "@/components/motion/FadeUp";
import GradientText from "@/components/premium/GradientText";

import NativeCalBooker from "../components/NativeCalBooker";

export default function BookMeetingPage() {
  return (
    <AuroraBackground>
      <Section className="relative overflow-hidden pb-24 pt-32">
        <Container className="max-w-5xl">
          <FadeUp>
            <div className="mb-10 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl">
                <CalendarDays className="h-4 w-4" />
                Book a time
              </span>

              <h1 className="mt-8 text-4xl font-black text-white lg:text-5xl">
                Schedule a{" "}
                <GradientText>Meeting</GradientText>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                Pick a slot below. Booking stays on this site and is confirmed
                through Cal.com.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <NativeCalBooker />
          </FadeUp>
        </Container>
      </Section>
    </AuroraBackground>
  );
}
