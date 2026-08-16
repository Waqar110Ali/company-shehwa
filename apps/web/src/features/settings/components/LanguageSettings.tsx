// apps/web/src/features/settings/components/LanguageSettings.tsx
import SettingsCard from "./SettingsCard";

import type { UserSettings } from "../types/settings";

interface Props {
  settings: UserSettings;

  onChange: (
    data: Partial<UserSettings>
  ) => void;

  onSave: () => void;

  saving: boolean;
}

export default function LanguageSettings({
  settings,
  onChange,
  onSave,
  saving,
}: Props) {
  return (
    <SettingsCard
      title="Language & Region"
      description="Configure language, date, and regional preferences."
    >
      <div className="grid gap-6 md:grid-cols-2">

        {/* Language */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Language
          </label>

          <select
            value={settings.language}
            onChange={(e) =>
              onChange({
                language: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none"
          >
            <option>English</option>
            <option>Urdu</option>
            <option>Arabic</option>
            <option>French</option>
          </select>

        </div>

        {/* Time Zone */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Time Zone
          </label>

          <select
            value={settings.timezone}
            onChange={(e) =>
              onChange({
                timezone: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none"
          >
            <option>Asia/Karachi</option>
            <option>Asia/Dubai</option>
            <option>Europe/London</option>
            <option>America/New_York</option>
          </select>

        </div>

        {/* Date Format */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Date Format
          </label>

          <select
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none"
          >
            <option>DD/MM/YYYY</option>
            <option>MM/DD/YYYY</option>
            <option>YYYY-MM-DD</option>
          </select>

        </div>

        {/* Time Format */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Time Format
          </label>

          <select
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none"
          >
            <option>24 Hour</option>
            <option>12 Hour</option>
          </select>

        </div>

        {/* Week Start */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Week Starts On
          </label>

          <select
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none"
          >
            <option>Monday</option>
            <option>Sunday</option>
          </select>

        </div>

      </div>

      <div className="mt-8 flex justify-end">

        <button
          onClick={onSave}
          disabled={saving}
          className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-600 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Language Settings"}
        </button>

      </div>

    </SettingsCard>
  );
}