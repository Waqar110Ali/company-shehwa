import { useState } from "react";

import { Bell } from "lucide-react";

import NotificationBadge from "./NotificationBadge";
import NotificationDropdown from "./NotificationDropdown";

import { useNotifications } from "../hooks/useNotifications";

export default function NotificationBell() {
  const [open, setOpen] =
    useState(false);

  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearAll,
  } = useNotifications();

  return (
    <div className="relative">

      <button
        onClick={() =>
          setOpen((prev) => !prev)
        }
        className="relative rounded-xl p-3 transition hover:bg-white/10"
      >

        <Bell
          size={22}
          className="text-white"
        />

        <NotificationBadge
          count={unreadCount}
        />

      </button>

      {open && (

        <NotificationDropdown
          notifications={notifications}
          unreadCount={unreadCount}
          onRead={markAsRead}
          onReadAll={markAllAsRead}
          onClear={clearAll}
        />

      )}

    </div>
  );
}