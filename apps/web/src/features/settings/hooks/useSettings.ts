import { useState } from "react";

import { defaultSettings } from "../data/settings";

import type { UserSettings } from "../types/settings";

export function useSettings() {
  const [settings, setSettings] =
    useState<UserSettings>(
      defaultSettings
    );

  function updateSettings(
    data: Partial<UserSettings>
  ) {
    setSettings((prev) => ({
      ...prev,
      ...data,
    }));
  }

  return {
    settings,

    updateSettings,
  };
}