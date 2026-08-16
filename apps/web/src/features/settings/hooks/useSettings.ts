// apps/web/src/features/settings/hooks/useSettings.ts
import { useEffect, useState } from "react";

import { appToast } from "@/lib/toast";
import { api } from "@/lib/api";
import { Role } from "@/features/auth/types/role";
import { getUser } from "@/features/auth/utils/auth-storage";

import { defaultSettings } from "../data/settings";
import { settingsApi } from "../api/settings.api";

import type { UserSettings } from "../types/settings";

const ADMIN_ONLY_FIELDS: (keyof UserSettings)[] = [
  "company",
  "website",
  "address",
];

export function useSettings() {
  const [settings, setSettings] =
    useState<UserSettings>(defaultSettings);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        // 1. Start from static defaults (fallback for fields the
        //    account doesn't track, e.g. company address, theme).
        let merged: UserSettings = { ...defaultSettings };

        // 2. Layer in the real logged-in user's identity, so a
        //    brand-new employee always sees their own name/email —
        //    never a hardcoded placeholder. Use the cached copy
        //    immediately (no flash of wrong data), then refresh
        //    from the server in case it changed elsewhere.
        const cachedUser = getUser();

        if (cachedUser) {
          merged = {
            ...merged,
            name: `${cachedUser.firstName} ${cachedUser.lastName}`.trim(),
            email: cachedUser.email,
          };
        }

        try {
          const { data: freshUser } = await api.get("/auth/me");

          merged = {
            ...merged,
            name: `${freshUser.data.firstName} ${freshUser.data.lastName}`.trim(),
            email: freshUser.data.email,
          };
        } catch {
          // Non-fatal — fall back to the cached user above.
        }

        // 3. Layer in anything the user previously saved in
        //    Settings (phone, position, department, preferences,
        //    or a custom display name if they renamed themselves
        //    here) — this always wins since it's their latest
        //    explicit edit.
        const response = await settingsApi.getSettings();

        if (response.data) {
          merged = {
            ...merged,
            ...response.data,
          };
        }

        setSettings(merged);
      } catch {
        appToast.error("Unable to load your settings.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  function updateSettings(data: Partial<UserSettings>) {
    setSettings((prev) => ({
      ...prev,
      ...data,
    }));
  }

  async function saveSettings() {
    setSaving(true);

    try {
      const user = getUser();
      const isAdmin = user?.role === Role.ADMIN;

      // Non-admins never send company-only fields, even if they're
      // still sitting unchanged in local state — keeps the backend
      // guard from ever needing to reject a benign save.
      const payload = isAdmin
        ? settings
        : (Object.fromEntries(
            Object.entries(settings).filter(
              ([key]) =>
                !ADMIN_ONLY_FIELDS.includes(
                  key as keyof UserSettings,
                ),
            ),
          ) as UserSettings);

      await settingsApi.updateSettings(payload);
      appToast.success("Settings saved.");
    } catch {
      appToast.error("Unable to save settings.");
    } finally {
      setSaving(false);
    }
  }

  return {
    settings,
    loading,
    saving,
    updateSettings,
    saveSettings,
  };
}