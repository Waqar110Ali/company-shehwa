import { useMemo, useState } from "react";

import { notifications as initialNotifications } from "../data/notifications";

export function useNotifications() {
  const [notifications, setNotifications] =
    useState(initialNotifications);

  const unreadCount =
    useMemo(() => {
      return notifications.filter(
        (item) => !item.read
      ).length;
    }, [notifications]);

  function markAsRead(id: string) {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              read: true,
            }
          : item
      )
    );
  }

  function markAllAsRead() {
    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        read: true,
      }))
    );
  }

  function clearAll() {
    setNotifications([]);
  }

  return {
    notifications,

    unreadCount,

    markAsRead,

    markAllAsRead,

    clearAll,
  };
}