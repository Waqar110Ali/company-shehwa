// apps/web/src/pages/public/HomePage.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
  CompanyIntro,
  Hero,
  TrustedBy,
  ServicesSection,
  WhyChooseUs,
  TechnologiesSection,
  DevelopmentProcess,
  FeaturedProjects,
  CompanyStatistics,
  TeamPreview,
  Testimonials,
  ClientReviews,
  FAQPreview,
  ContactCTA,
  Newsletter,
} from "@/features/home";

import CompanyUpdates from "@/features/home/components/CompanyUpdates";

import AssistantLink from "@/features/assistant/components/AssistantLink";

export default function HomePage() {
  const location = useLocation();

  // Scrolls to the matching section whenever the URL has a hash —
  // covers both clicking a nav link while already on "/" and landing
  // on "/#section" fresh from another page.
  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.slice(1);

    // Give sections a tick to lay out before measuring scroll position.
    const timeout = setTimeout(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth" });
    }, 50);

    return () => clearTimeout(timeout);
  }, [location.hash]);

  return (
    <main className="pt-20">

      <div id="home">
        <Hero />
      </div>

      <CompanyUpdates />

      <TrustedBy />

      <div id="about">
        <CompanyIntro />
      </div>

      <div id="services">
        <ServicesSection />
      </div>

      <WhyChooseUs />

      <DevelopmentProcess />

      <div id="technologies">
        <TechnologiesSection />
      </div>

      {/* Shared anchor for both "Portfolio" and "Projects" nav items —
          only one work-showcase section currently exists. */}
      <div id="projects">
        <FeaturedProjects />
      </div>


      <CompanyStatistics />

      <Testimonials />

      <div id="team">
        <TeamPreview />
      </div>

      <ClientReviews />

      <FAQPreview />

      <Newsletter />

      <div id="contact">
        <ContactCTA />
      </div>

      <AssistantLink />

    </main>
  );
}