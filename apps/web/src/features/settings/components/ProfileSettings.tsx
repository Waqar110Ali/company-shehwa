// apps/web/src/features/settings/components/ProfileSettings.tsx
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

export default function ProfileSettings({
  settings,
  onChange,
  onSave,
  saving,
}: Props) {
  return (
    <SettingsCard
      title="Profile Settings"
      description="Manage your personal information."
    >
      <div className="grid gap-6 md:grid-cols-2">

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Full Name
          </label>

          <input
            value={settings.name}
            onChange={(e) =>
              onChange({
                name: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Email
          </label>

          <input
            type="email"
            value={settings.email}
            onChange={(e) =>
              onChange({
                email: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Phone
          </label>

          <input
            value={settings.phone}
            onChange={(e) =>
              onChange({
                phone: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Position
          </label>

          <input
            value={settings.position}
            onChange={(e) =>
              onChange({
                position: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Department
          </label>

          <input
            value={settings.department}
            onChange={(e) =>
              onChange({
                department:
                  e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          />

        </div>

      </div>

      <div className="mt-8 flex justify-end">

        <button
          onClick={onSave}
          disabled={saving}
          className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-600 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

      </div>

    </SettingsCard>
  );
}