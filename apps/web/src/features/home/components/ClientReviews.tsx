// features/home/components/ClientReviews.tsx
import AuroraBackground from "@/components/effects/AuroraBackground";
import Container from "@/components/common/Container";
import Section from "@/components/common/Section";
import FadeUp from "@/components/motion/FadeUp";
import GradientText from "@/components/premium/GradientText";
import PremiumButton from "@/components/premium/PremiumButton";

import ClientReviewCard from "./ClientReviewCard";

import { useSectionContent } from "../hooks/useSectionContent";
import { clientReviews } from "../constants/client-reviews";

export default function ClientReviews() {
  const reviews = useSectionContent("clientReviews", clientReviews);

  return (
    <AuroraBackground>
      <Section className="py-28">
        <Container>
          <FadeUp>
            <div className="mx-auto max-w-4xl text-center">
              <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl">
                Global Reputation
              </span>

              <h2 className="mt-8 text-5xl font-black text-white lg:text-6xl">
                Trusted Across
                <GradientText> Multiple Platforms</GradientText>
              </h2>

              <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
                Businesses worldwide continue to choose us because we consistently
                deliver reliable, scalable and high-quality software solutions.
              </p>
            </div>
          </FadeUp>

          <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {reviews.map((review) => (
              <ClientReviewCard key={review.id} {...review} />
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <PremiumButton>View All Reviews</PremiumButton>
          </div>
        </Container>
      </Section>
    </AuroraBackground>
  );
}