import { Injectable, Inject } from "@nestjs/common";
import { FooterRepository } from "../repositories/footer.repository";

const DEFAULT_CONTENT = {
  description:
    "Building scalable web, mobile, AI and cloud solutions for startups, businesses and enterprises.",
  copyrightText: "AI Company Management Platform. All rights reserved.",
  socialLinks: [],
  sections: { company: [], services: [], legal: [] },
};

@Injectable()
export class FooterService {
  constructor(@Inject(FooterRepository) private readonly footerRepository: FooterRepository) {}

  async getFooter() {
    const doc = await this.footerRepository.get();
    return { success: true, data: doc?.content ?? DEFAULT_CONTENT };
  }

  async saveFooter(content: Record<string, any>) {
    const doc = await this.footerRepository.replace(content);
    return {
      success: true,
      message: "Footer saved successfully.",
      data: doc?.content,
    };
  }
}