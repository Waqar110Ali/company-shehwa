import SettingsCard from "./SettingsCard";

export default function SecuritySettings() {
  return (
    <SettingsCard
      title="Security"
      description="Manage your password and account security."
    >
      <div className="space-y-8">

        {/* Password */}

        <div>

          <h3 className="mb-5 text-lg font-semibold text-white">
            Change Password
          </h3>

          <div className="grid gap-5 md:grid-cols-3">

            <div>

              <label className="mb-2 block text-sm text-slate-300">
                Current Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm text-slate-300">
                New Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm text-slate-300">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              />

            </div>

          </div>

        </div>

        {/* Security Options */}

        <div>

          <h3 className="mb-5 text-lg font-semibold text-white">
            Security Options
          </h3>

          <div className="space-y-4">

            <label className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">

              <div>

                <p className="font-medium text-white">
                  Two-Factor Authentication
                </p>

                <p className="text-sm text-slate-400">
                  Protect your account with 2FA.
                </p>

              </div>

              <input
                type="checkbox"
                className="h-5 w-5 accent-cyan-500"
              />

            </label>

            <label className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">

              <div>

                <p className="font-medium text-white">
                  Login Notifications
                </p>

                <p className="text-sm text-slate-400">
                  Receive alerts when a new device signs in.
                </p>

              </div>

              <input
                defaultChecked
                type="checkbox"
                className="h-5 w-5 accent-cyan-500"
              />

            </label>

            <label className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">

              <div>

                <p className="font-medium text-white">
                  Remember Trusted Devices
                </p>

                <p className="text-sm text-slate-400">
                  Skip verification on trusted devices.
                </p>

              </div>

              <input
                defaultChecked
                type="checkbox"
                className="h-5 w-5 accent-cyan-500"
              />

            </label>

          </div>

        </div>

        {/* Active Sessions */}

        <div>

          <h3 className="mb-5 text-lg font-semibold text-white">
            Active Sessions
          </h3>

          <div className="space-y-4">

            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">

              <div className="flex items-center justify-between">

                <div>

                  <p className="font-medium text-white">
                    Chrome • Windows
                  </p>

                  <p className="text-sm text-slate-400">
                    Karachi, Pakistan
                  </p>

                </div>

                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400">
                  Current
                </span>

              </div>

            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">

              <div className="flex items-center justify-between">

                <div>

                  <p className="font-medium text-white">
                    Safari • iPhone
                  </p>

                  <p className="text-sm text-slate-400">
                    Active 2 hours ago
                  </p>

                </div>

                <button className="text-sm text-red-400 transition hover:text-red-300">
                  Logout
                </button>

              </div>

            </div>

          </div>

        </div>

        <div className="flex justify-end">

          <button className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-600">

            Save Security Settings

          </button>

        </div>

      </div>

    </SettingsCard>
  );
}