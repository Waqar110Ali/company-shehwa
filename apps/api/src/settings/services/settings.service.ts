// apps/api/src/settings/services/settings.service.ts
import {
  Injectable,
} from "@nestjs/common";

import {
  SettingsRepository,
} from "../repositories/settings.repository";

@Injectable()
export class SettingsService {

  constructor(
    private readonly settingsRepository:
      SettingsRepository,
  ) {}

  async getSettings(userId: string) {

    const settings =
      await this.settingsRepository.getByUserId(
        userId,
      );

    // No saved settings yet is normal for a new user —
    // return null data so the frontend falls back to its
    // local defaults, rather than throwing a 404.
    return {
      success: true,
      data: settings?.content ?? null,
    };
  }

  async updateSettings(
    userId: string,
    content: Record<string, any>,
  ) {

    const settings =
      await this.settingsRepository.upsert(
        userId,
        content,
      );

    return {
      success: true,
      message: "Settings updated successfully.",
      data: settings?.content,
    };
  }
}