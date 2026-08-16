import {
  Bell,
  CalendarDays,
  ClipboardCheck,
  FolderKanban,
  Settings,
  Users,
} from "lucide-react";

import type { Notification } from "../types/notification";

interface Props {
  notification: Notification;

  onRead: (id: string) => void;
}

export default function NotificationItem({
  notification,
  onRead,
}: Props) {
  const Icon = getIcon(notification.type);

  return (
    <button
      onClick={() => onRead(notification._id)}
      className={`flex w-full items-start gap-4 rounded-2xl p-4 text-left transition hover:bg-white/10 ${
        !notification.read
          ? "bg-cyan-500/5"
          : ""
      }`}
    >
      <div className="rounded-xl bg-cyan-500/10 p-3">

        <Icon
          size={20}
          className="text-cyan-400"
        />

      </div>

      <div className="min-w-0 flex-1">

        <div className="flex items-center justify-between gap-3">

          <h4 className="truncate font-semibold text-white">

            {notification.title}

          </h4>

          {!notification.read && (
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
          )}

        </div>

        <p className="mt-1 text-sm text-slate-400">

          {notification.description}

        </p>

        <p className="mt-3 text-xs text-slate-500">

          {notification.createdAt}

        </p>

      </div>

    </button>
  );
}

function getIcon(type: Notification["type"]) {
  switch (type) {
    case "employee":
      return Users;

    case "project":
      return FolderKanban;

    case "attendance":
      return ClipboardCheck;

    case "calendar":
      return CalendarDays;

    case "system":
      return Settings;

    default:
      return Bell;
  }
}