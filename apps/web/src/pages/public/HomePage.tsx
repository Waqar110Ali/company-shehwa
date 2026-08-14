import { CompanyIntro,Hero,TrustedBy,ServicesSection, WhyChooseUs, TechnologiesSection, DevelopmentProcess, FeaturedProjects, CompanyStatistics, TeamPreview, Testimonials, ClientReviews, FAQPreview, ContactCTA, Newsletter } from "@/features/home";

export default function HomePage() {
  return (
    <main className="pt-20">

      <Hero />

      <TrustedBy />

      <CompanyIntro />

      <ServicesSection />

      <WhyChooseUs />

      <DevelopmentProcess />

      <TechnologiesSection />

      <FeaturedProjects />

      <CompanyStatistics />

      <Testimonials />

      <TeamPreview />

      <ClientReviews />

      <FAQPreview />

      <Newsletter />

      <ContactCTA />

    </main>
  );
}