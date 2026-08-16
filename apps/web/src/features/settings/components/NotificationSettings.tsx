// apps/web/src/features/settings/components/NotificationSettings.tsx
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

export default function NotificationSettings({
  settings,
  onChange,
  onSave,
  saving,
}: Props) {
  function updateNotification(
    key: keyof UserSettings["notifications"]
  ) {
    onChange({
      notifications: {
        ...settings.notifications,
        [key]:
          !settings.notifications[key],
      },
    });
  }

  return (
    <SettingsCard
      title="Notifications"
      description="Choose which notifications you want to receive."
    >
      <div className="space-y-5">

        <NotificationRow
          title="Email Notifications"
          description="Receive important updates via email."
          checked={
            settings.notifications.email
          }
          onToggle={() =>
            updateNotification("email")
          }
        />

        <NotificationRow
          title="Desktop Notifications"
          description="Receive browser notifications."
          checked={
            settings.notifications.desktop
          }
          onToggle={() =>
            updateNotification("desktop")
          }
        />

        <NotificationRow
          title="Attendance Alerts"
          description="Get notified about attendance activities."
          checked={
            settings.notifications.attendance
          }
          onToggle={() =>
            updateNotification("attendance")
          }
        />

        <NotificationRow
          title="Project Updates"
          description="Receive updates when projects change."
          checked={
            settings.notifications.projects
          }
          onToggle={() =>
            updateNotification("projects")
          }
        />

        <NotificationRow
          title="AI Assistant Suggestions"
          description="Receive AI recommendations and insights."
          checked={
            settings.notifications.ai
          }
          onToggle={() =>
            updateNotification("ai")
          }
        />

      </div>

      <div className="mt-8 flex justify-end">

        <button
          onClick={onSave}
          disabled={saving}
          className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-600 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Notification Settings"}
        </button>

      </div>

    </SettingsCard>
  );
}

interface RowProps {
  title: string;

  description: string;

  checked: boolean;

  onToggle: () => void;
}

function NotificationRow({
  title,
  description,
  checked,
  onToggle,
}: RowProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5">

      <div>

        <h3 className="font-semibold text-white">
          {title}
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          {description}
        </p>

      </div>

      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="h-5 w-5 accent-cyan-500"
      />

    </div>
  );
}