import SettingsCard from "./SettingsCard";

import type { UserSettings } from "../types/settings";

interface Props {
  settings: UserSettings;

  onChange: (
    data: Partial<UserSettings>
  ) => void;
}

const themes = [
  {
    value: "dark",
    title: "Dark",
    description:
      "Ideal for low-light environments.",
  },
  {
    value: "light",
    title: "Light",
    description:
      "Clean and bright appearance.",
  },
  {
    value: "system",
    title: "System",
    description:
      "Follow your operating system.",
  },
] as const;

const colors = [
  "cyan",
  "blue",
  "emerald",
  "purple",
];

export default function AppearanceSettings({
  settings,
  onChange,
}: Props) {
  return (
    <SettingsCard
      title="Appearance"
      description="Customize the look and feel of your dashboard."
    >
      <div className="space-y-10">

        {/* Theme */}

        <div>

          <h3 className="mb-5 text-lg font-semibold text-white">
            Theme
          </h3>

          <div className="grid gap-5 md:grid-cols-3">

            {themes.map((theme) => (

              <button
                key={theme.value}
                onClick={() =>
                  onChange({
                    theme: theme.value,
                  })
                }
                className={`rounded-2xl border p-6 text-left transition ${
                  settings.theme ===
                  theme.value
                    ? "border-cyan-400 bg-cyan-500/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >

                <h4 className="font-semibold text-white">
                  {theme.title}
                </h4>

                <p className="mt-2 text-sm text-slate-400">
                  {theme.description}
                </p>

              </button>

            ))}

          </div>

        </div>

        {/* Accent Color */}

        <div>

          <h3 className="mb-5 text-lg font-semibold text-white">
            Accent Color
          </h3>

          <div className="flex gap-4">

            {colors.map((color) => (

              <button
                key={color}
                className={`h-12 w-12 rounded-full border-2 transition hover:scale-110 ${
                  color === "cyan"
                    ? "bg-cyan-500"
                    : color === "blue"
                    ? "bg-blue-500"
                    : color === "emerald"
                    ? "bg-emerald-500"
                    : "bg-purple-500"
                } border-white`}
              />

            ))}

          </div>

        </div>

        {/* Preferences */}

        <div>

          <h3 className="mb-5 text-lg font-semibold text-white">
            Preferences
          </h3>

          <div className="space-y-4">

            <label className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-5">

              <div>

                <p className="font-medium text-white">
                  Compact Mode
                </p>

                <p className="text-sm text-slate-400">
                  Reduce spacing throughout the interface.
                </p>

              </div>

              <input
                type="checkbox"
                className="h-5 w-5 accent-cyan-500"
              />

            </label>

            <label className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-5">

              <div>

                <p className="font-medium text-white">
                  Glass Effect
                </p>

                <p className="text-sm text-slate-400">
                  Enable glassmorphism across the dashboard.
                </p>

              </div>

              <input
                defaultChecked
                type="checkbox"
                className="h-5 w-5 accent-cyan-500"
              />

            </label>

            <label className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-5">

              <div>

                <p className="font-medium text-white">
                  Reduce Animations
                </p>

                <p className="text-sm text-slate-400">
                  Improve performance on slower devices.
                </p>

              </div>

              <input
                type="checkbox"
                className="h-5 w-5 accent-cyan-500"
              />

            </label>

          </div>

        </div>

      </div>

      <div className="mt-10 flex justify-end">

        <button className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-600">

          Save Appearance

        </button>

      </div>

    </SettingsCard>
  );
}