// apps/web/src/features/notifications/hooks/useNotifications.ts
import { useEffect, useMemo, useState } from "react";

import { notificationsApi } from "../api/notifications.api";

import type { Notification } from "../types/notification";

export function useNotifications() {
  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const response = await notificationsApi.getMine();
        setNotifications(response.data);
      } catch {
        // Fail quietly — an empty bell is a fine fallback state.
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const unreadCount = useMemo(() => {
    return notifications.filter((item) => !item.read).length;
  }, [notifications]);

  async function markAsRead(id: string) {
    // Optimistic update — reflects instantly, no waiting on the request.
    setNotifications((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, read: true } : item,
      ),
    );

    try {
      await notificationsApi.markAsRead(id);
    } catch {
      // Leave the optimistic state as-is even on failure —
      // next full reload will resync from the server anyway.
    }
  }

  async function markAllAsRead() {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, read: true })),
    );

    try {
      await notificationsApi.markAllAsRead();
    } catch {
      // See note above.
    }
  }

  async function clearAll() {
    setNotifications([]);

    try {
      await notificationsApi.clearAll();
    } catch {
      // See note above.
    }
  }

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    clearAll,
  };
}