import {
  Injectable,
} from "@nestjs/common";

import {
  InjectModel,
} from "@nestjs/mongoose";

import {
  Model,
} from "mongoose";

import {
  PortfolioContent,
  PortfolioContentDocument,
} from "../schemas/portfolio.schema";

@Injectable()
export class PortfolioRepository {

  constructor(
    @InjectModel(PortfolioContent.name)
    private readonly portfolioModel:
      Model<PortfolioContentDocument>,
  ) {}

  async get() {
    return this.portfolioModel.findOne().lean();
  }

  async create(content: Record<string, any>) {
    return this.portfolioModel.create({
      content,
    });
  }

  async update(content: Record<string, any>) {
    return this.portfolioModel.findOneAndUpdate(
      {},
      {
        content,
      },
      {
        new: true,
        upsert: true,
      },
    ).lean();
  }

  // portfolio.repository.ts
async updateSection(key: string, data: Record<string, any>) {
  return this.portfolioModel.findOneAndUpdate(
    {},
    { $set: { [`content.${key}`]: data } },
    { new: true, upsert: true },
  ).lean();
}
}