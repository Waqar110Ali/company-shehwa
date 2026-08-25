import { Injectable, Inject } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { FooterContentDoc, FooterContentDocument } from "../schemas/footer-content.schema";

@Injectable()
export class FooterRepository {
  constructor(
    @InjectModel(FooterContentDoc.name) @Inject(Model<FooterContentDocument>)
    private readonly footerModel: Model<FooterContentDocument>,
  ) {}

  async get() {
    return this.footerModel.findOne().lean();
  }

  async replace(content: Record<string, any>) {
    return this.footerModel
      .findOneAndUpdate(
        {},
        { $set: { content } },
        { new: true, upsert: true },
      )
      .lean();
  }
}