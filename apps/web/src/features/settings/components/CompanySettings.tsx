import SettingsCard from "./SettingsCard";

import type { UserSettings } from "../types/settings";

interface Props {
  settings: UserSettings;

  onChange: (
    data: Partial<UserSettings>
  ) => void;
}

export default function CompanySettings({
  settings,
  onChange,
}: Props) {
  return (
    <SettingsCard
      title="Company Settings"
      description="Manage your company information."
    >
      <div className="grid gap-6 md:grid-cols-2">

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Company Name
          </label>

          <input
            value={settings.company}
            onChange={(e) =>
              onChange({
                company: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Website
          </label>

          <input
            value={settings.website}
            onChange={(e) =>
              onChange({
                website: e.target.value,
              })
            }
            placeholder="https://company.com"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          />

        </div>

        <div className="md:col-span-2">

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Company Address
          </label>

          <textarea
            rows={4}
            value={settings.address}
            onChange={(e) =>
              onChange({
                address: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          />

        </div>

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
            <option value="Asia/Karachi">
              Asia / Karachi
            </option>

            <option value="Asia/Dubai">
              Asia / Dubai
            </option>

            <option value="Europe/London">
              Europe / London
            </option>

            <option value="America/New_York">
              America / New York
            </option>
          </select>

        </div>

      </div>

      <div className="mt-8 flex justify-end">

        <button
          className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-600"
        >
          Save Changes
        </button>

      </div>

    </SettingsCard>
  );
}