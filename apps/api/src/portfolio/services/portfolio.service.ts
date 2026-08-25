import {
  Injectable,
  NotFoundException, Inject } from "@nestjs/common";

import {
  PortfolioRepository,
} from "../repositories/portfolio.repository";

@Injectable()
export class PortfolioService {

  constructor(
    @Inject(PortfolioRepository) private readonly portfolioRepository:
      PortfolioRepository,
  ) {}

  async getPortfolio() {

    const portfolio =
      await this.portfolioRepository.get();

    if (!portfolio) {
      throw new NotFoundException(
        "Portfolio content not found.",
      );
    }

    return {
      success: true,
      data: portfolio.content,
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