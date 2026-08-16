// apps/api/src/settings/repositories/settings.repository.ts
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
  UserSettingsDoc,
  UserSettingsDocument,
} from "../schemas/user-settings.schema";

@Injectable()
export class SettingsRepository {

  constructor(
    @InjectModel(UserSettingsDoc.name)
    private readonly settingsModel:
      Model<UserSettingsDocument>,
  ) {}

  async getByUserId(userId: string) {
    return this.settingsModel
      .findOne({ userId })
      .lean();
  }

  async upsert(
    userId: string,
    content: Record<string, any>,
  ) {
    return this.settingsModel.findOneAndUpdate(
      { userId },
      { userId, content },
      {
        new: true,
        upsert: true,
      },
    ).lean();
  }
}