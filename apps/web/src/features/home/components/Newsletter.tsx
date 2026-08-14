import { motion } from "framer-motion";
import {
  Sparkles,
  Send,
} from "lucide-react";

import AuroraBackground from "@/components/effects/AuroraBackground";

import Container from "@/components/common/Container";
import Section from "@/components/common/Section";

import FadeUp from "@/components/motion/FadeUp";

import GradientText from "@/components/premium/GradientText";
import GlassCard from "@/components/premium/GlassCard";
import PremiumButton from "@/components/premium/PremiumButton";

import { Input } from "@/components/ui/input";

export default function Newsletter() {
  return (
    <AuroraBackground>

      <Section className="relative py-32">

        <Container className="max-w-5xl">

          <FadeUp>

            <GlassCard className="relative overflow-hidden p-14">

              {/* Background Glow */}

              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-600/10" />

              <div className="relative z-10">

                <div className="flex justify-center">

                  <motion.div
                    whileHover={{
                      rotate: 15,
                      scale: 1.1,
                    }}
                    className="
                      flex
                      h-20
                      w-20
                      items-center
                      justify-center
                      rounded-3xl
                      border
                      border-cyan-400/20
                      bg-cyan-500/10
                      text-cyan-300
                    "
                  >
                    <Sparkles size={34} />
                  </motion.div>

                </div>

                <div className="mx-auto mt-10 max-w-3xl text-center">

                  <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl">
                    Stay Connected
                  </span>

                  <h2 className="mt-8 text-5xl font-black text-white lg:text-6xl">

                    Subscribe For

                    <GradientText>
                      {" "}Future Updates
                    </GradientText>

                  </h2>

                  <p className="mt-8 text-lg leading-8 text-slate-300">

                    Receive the latest AI innovations, software
                    engineering insights, product launches, and
                    technology articles directly in your inbox.

                  </p>

                </div>

                {/* Form */}

                <form className="mx-auto mt-14 flex max-w-3xl flex-col gap-5 md:flex-row">

                  <Input
                    type="email"
                    placeholder="Enter your email address..."
                    className="
                      h-14
                      rounded-2xl
                      border-white/10
                      bg-white/5
                      text-white
                      placeholder:text-slate-400
                      backdrop-blur-xl
                      focus-visible:ring-cyan-400
                    "
                  />

                  <PremiumButton
                    type="submit"
                    className="h-14 px-10"
                  >
                    <Send className="mr-2 h-5 w-5" />

                    Subscribe

                  </PremiumButton>

                </form>

                <p className="mt-8 text-center text-sm text-slate-400">

                  No spam • Unsubscribe anytime • Privacy First

                </p>

              </div>

            </GlassCard>

          </FadeUp>

        </Container>

      </Section>

    </AuroraBackground>
  );
}