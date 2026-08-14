import NotificationEmpty from "./NotificationEmpty";
import NotificationItem from "./NotificationItem";

import type { Notification } from "../types/notification";

interface Props {
  notifications: Notification[];

  unreadCount: number;

  onRead: (id: string) => void;

  onReadAll: () => void;

  onClear: () => void;
}

export default function NotificationDropdown({
  notifications,
  unreadCount,
  onRead,
  onReadAll,
  onClear,
}: Props) {
  return (
    <div className="absolute right-0 top-14 z-50 w-[420px] overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-white/10 p-5">

        <div>

          <h2 className="text-lg font-bold text-white">
            Notifications
          </h2>

          <p className="text-sm text-slate-400">

            {unreadCount} unread notifications

          </p>

        </div>

        <div className="flex gap-2">

          <button
            onClick={onReadAll}
            className="rounded-lg px-3 py-2 text-sm text-cyan-400 transition hover:bg-white/10"
          >
            Read All
          </button>

          <button
            onClick={onClear}
            className="rounded-lg px-3 py-2 text-sm text-red-400 transition hover:bg-white/10"
          >
            Clear
          </button>

        </div>

      </div>

      {/* Content */}

      <div className="max-h-[520px] overflow-y-auto">

        {notifications.length === 0 ? (

          <NotificationEmpty />

        ) : (

          <div className="space-y-2 p-3">

            {notifications.map((notification) => (

              <NotificationItem
                key={notification.id}
                notification={notification}
                onRead={onRead}
              />

            ))}

          </div>

        )}

      </div>

    </div>
  );
}