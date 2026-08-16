// apps/web/src/features/portfolio/types/portfolio-content.ts
export interface HeroContent { badge: string; title: string; description: string; primaryButton: string; secondaryButton: string; }
export interface HeroStat { value: string; label: string; }
export interface CompanyContent { title: string; subtitle: string; mission: string; vision: string; }
export interface CompanyValue { title: string; description: string; }
export interface ContactInfoItem { title: string; value: string; icon: string; }
export interface Faq { id: string; question: string; answer: string; }
export interface DevelopmentProcessItem { step: string; title: string; description: string; icon: string; }
export interface FeaturedProject { id: number; name: string; category: string; description: string; technologies: string[]; status: string; github: string; demo: string; }
export interface Service { title: string; description: string; technologies: string[]; icon: string; }
export interface StatisticItem { title: string; value: string; icon: string; }
export interface TeamMember { id: number; name: string; designation: string; department: string; skills: string[]; image: string; github: string; linkedin: string; }
export interface TechnologyCategory { title: string; items: string[]; }
export interface Testimonial { id: number; name: string; company: string; image: string; rating: number; review: string; }
export interface Technology { id: number; name: string; }
export interface WhyChooseUsItem { title: string; description: string; icon: string; }
export interface Achievement { value: string; label: string; }
export interface ClientReview { id: number; name: string; platform: string; rating: number; review: string; avatar: string; }

export interface PortfolioContent {
  heroContent: HeroContent;
  heroStats: HeroStat[];
  companyContent: CompanyContent;
  companyValues: CompanyValue[];
  contactInfo: ContactInfoItem[];
  faqs: Faq[];
  developmentProcess: DevelopmentProcessItem[];
  featuredProjects: FeaturedProject[];
  services: Service[];
  statistics: StatisticItem[];
  teamMembers: TeamMember[];
  technologyCategories: TechnologyCategory[];
  testimonials: Testimonial[];
  technologies: Technology[];
  whyChooseUs: WhyChooseUsItem[];
  achievements: Achievement[];
  clientReviews: ClientReview[];
}