// apps/web/src/features/notifications/api/notifications.api.ts
import { api } from "@/lib/api";

import type { Notification } from "../types/notification";

export const notificationsApi = {
  async getMine() {
    const response = await api.get<{
      success: boolean;
      data: Notification[];
    }>("/notifications");

    return response.data;
  },

  async markAsRead(id: string) {
    return api.patch(`/notifications/${id}/read`);
  },

  async markAllAsRead() {
    return api.patch("/notifications/read-all");
  },

  async clearAll() {
    return api.delete("/notifications");
  },
};