import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import AuroraBackground from "@/components/effects/AuroraBackground";

import Container from "@/components/common/Container";
import Section from "@/components/common/Section";

import FadeUp from "@/components/motion/FadeUp";

import GlassCard from "@/components/premium/GlassCard";
import GradientText from "@/components/premium/GradientText";
import PremiumButton from "@/components/premium/PremiumButton";

import { contactInfo } from "../constants/contact";

export default function ContactCTA() {
  return (
    <AuroraBackground>

      <Section className="relative overflow-hidden py-32">

        <Container>

          <div className="grid items-center gap-20 lg:grid-cols-2">

            {/* LEFT */}

            <div>

              <FadeUp>

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
                  Start Your Journey
                </span>

              </FadeUp>

              <FadeUp delay={0.15}>

                <h2 className="mt-8 text-5xl font-black leading-tight text-white lg:text-6xl">

                  Let's Build

                  <br />

                  <GradientText>
                    Something Incredible
                  </GradientText>

                </h2>

              </FadeUp>

              <FadeUp delay={0.3}>

                <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">

                  Whether you're launching a startup, building
                  enterprise software, or integrating Artificial
                  Intelligence into your business, our team is
                  ready to transform your ideas into reality.

                </p>

              </FadeUp>

              {/* Features */}

              <FadeUp delay={0.45}>

                <div className="mt-10 space-y-5">

                  {[
                    "Free project consultation",
                    "Enterprise-grade architecture",
                    "Modern AI-powered solutions",
                    "Long-term technical support",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-4"
                    >
                      <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-2 text-emerald-400">
                        <CheckCircle2 size={18} />
                      </div>

                      <span className="text-slate-300">
                        {item}
                      </span>
                    </div>
                  ))}

                </div>

              </FadeUp>

              {/* Buttons */}

              <FadeUp delay={0.6}>

                <div className="mt-12 flex flex-wrap gap-5">

                  <PremiumButton>

                    Start Your Project

                    <ArrowRight className="ml-2 h-5 w-5" />

                  </PremiumButton>

                  <PremiumButton
                    variant="outline"
                    className="border-white/20 bg-white/5 text-white hover:bg-white hover:text-slate-900"
                  >
                    Schedule Meeting
                  </PremiumButton>

                </div>

              </FadeUp>

            </div>

            {/* RIGHT */}

            <FadeUp delay={0.2}>

              <GlassCard className="p-10">

                <h3 className="text-3xl font-black text-white">

                  Contact Information

                </h3>

                <p className="mt-3 leading-7 text-slate-300">

                  We'd love to hear about your next project.

                </p>

                <div className="mt-10 space-y-6">

                  {contactInfo.map((item) => {
                    const Icon = item.icon;

                    return (

                      <motion.div
                        key={item.title}
                        whileHover={{
                          x: 8,
                        }}
                        className="
                          flex
                          items-center
                          gap-5
                          rounded-2xl
                          border
                          border-white/10
                          bg-white/5
                          p-5
                          backdrop-blur-xl
                        "
                      >

                        <div
                          className="
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-cyan-400/20
                            bg-cyan-500/10
                            text-cyan-300
                          "
                        >
                          <Icon size={24} />
                        </div>

                        <div>

                          <p className="text-sm text-slate-400">
                            {item.title}
                          </p>

                          <h4 className="mt-1 font-semibold text-white">
                            {item.value}
                          </h4>

                        </div>

                      </motion.div>

                    );
                  })}

                </div>

              </GlassCard>

            </FadeUp>

          </div>

        </Container>

      </Section>

    </AuroraBackground>
  );
}