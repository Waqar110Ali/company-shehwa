import {
  Injectable,
  Inject,
} from "@nestjs/common";

import {
  PortfolioRepository,
} from "../repositories/portfolio.repository";

/** Empty shell so public GET never 404s before admin seeds content. */
const DEFAULT_PORTFOLIO_CONTENT: Record<string, unknown> = {
  heroContent: {
    badge: "",
    title: "",
    description: "",
    primaryButton: "",
    secondaryButton: "",
  },
  heroStats: [],
  companyContent: {
    title: "",
    subtitle: "",
    mission: "",
    vision: "",
  },
  companyValues: [],
  contactInfo: [],
  faqs: [],
  developmentProcess: [],
  featuredProjects: [],
  services: [],
  statistics: [],
  teamMembers: [],
  technologyCategories: [],
  testimonials: [],
  technologies: [],
  whyChooseUs: [],
  achievements: [],
  clientReviews: [],
};

@Injectable()
export class PortfolioService {

  constructor(
    @Inject(PortfolioRepository) private readonly portfolioRepository:
      PortfolioRepository,
  ) {}

  async getPortfolio() {

    const portfolio =
      await this.portfolioRepository.get();

    return {
      success: true,
      data: portfolio?.content ?? DEFAULT_PORTFOLIO_CONTENT,
    };
  }

  async updatePortfolio(
    content: Record<string, any>,
  ) {

    const portfolio =
      await this.portfolioRepository.update(
        content,
      );

    return {
      success: true,
      message:
        "Portfolio updated successfully.",
      data: portfolio?.content,
    };
  }


  // portfolio.service.ts
async updateSection(key: string, data: Record<string, any>) {
  const portfolio = await this.portfolioRepository.updateSection(key, data);
  return { success: true, message: `${key} updated successfully.`, data: portfolio?.content };
}
}
