// apps/api/src/updates/repositories/updates.repository.ts
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
  UpdatesContent,
  UpdatesContentDocument,
} from "../schemas/updates-content.schema";

@Injectable()
export class UpdatesRepository {

  constructor(
    @InjectModel(UpdatesContent.name)
    private readonly updatesModel:
      Model<UpdatesContentDocument>,
  ) {}

  async get() {
    return this.updatesModel.findOne().lean();
  }

  // Merge-safe: only touches the one key given, leaves the rest
  // of the content document untouched — this is what prevents
  // saving the CEO message from wiping galleries, or vice versa.
  async updateSection(
    key: "ceoMessage" | "galleries",
    value: any,
  ) {
    return this.updatesModel.findOneAndUpdate(
      {},
      { $set: { [`content.${key}`]: value } },
      {
        new: true,
        upsert: true,
      },
    ).lean();
  }
}