// features/home/components/FAQPreview.tsx
import AuroraBackground from "@/components/effects/AuroraBackground";
import Container from "@/components/common/Container";
import Section from "@/components/common/Section";
import FadeUp from "@/components/motion/FadeUp";
import GradientText from "@/components/premium/GradientText";
import PremiumButton from "@/components/premium/PremiumButton";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useSectionContent } from "../hooks/useSectionContent";
import { faqs } from "../constants/faqs";

export default function FAQPreview() {
  const items = useSectionContent("faqs", faqs);

  return (
    <AuroraBackground>
      <Section className="relative py-32">
        <Container className="max-w-5xl">
          <FadeUp>
            <div className="mx-auto max-w-3xl text-center">
              <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl">
                Questions & Answers
              </span>

              <h2 className="mt-8 text-5xl font-black text-white lg:text-6xl">
                Frequently Asked
                <GradientText> Questions</GradientText>
              </h2>

              <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
                Find answers to the most common questions about our software
                development process, AI solutions, pricing, timelines, and long-term support.
              </p>
            </div>
          </FadeUp>

          <div className="mt-20">
            <Accordion type="single" collapsible className="space-y-6">
              {items.map((faq, index) => (
                <FadeUp key={faq.id} delay={index * 0.08}>
                  <AccordionItem
                    value={faq.id}
                    className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-8 backdrop-blur-2xl transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/10"
                  >
                    <AccordionTrigger className="py-8 text-left text-xl font-bold text-white hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>

                    <AccordionContent className="pb-8 text-lg leading-8 text-slate-300">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </FadeUp>
              ))}
            </Accordion>
          </div>

          <FadeUp delay={0.5}>
            <div className="mt-16 flex justify-center">
              <PremiumButton>View All FAQs</PremiumButton>
            </div>
          </FadeUp>
        </Container>
      </Section>
    </AuroraBackground>
  );
}