// apps/web/src/features/settings/api/settings.api.ts
import { api } from "@/lib/api";

import type { UserSettings } from "../types/settings";

export const settingsApi = {
  async getSettings() {
    const response = await api.get<{
      success: boolean;
      data: Partial<UserSettings> | null;
    }>("/settings");

    return response.data;
  },

  async updateSettings(settings: UserSettings) {
    const response = await api.put<{
      success: boolean;
      message: string;
      data: UserSettings;
    }>("/settings", settings);

    return response.data;
  },
};