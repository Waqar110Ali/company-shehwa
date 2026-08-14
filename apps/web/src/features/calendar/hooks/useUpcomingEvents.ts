import { useQuery } from "@tanstack/react-query";

import { calendarApi } from "../api/calendar.api";

export function useUpcomingEvents() {
  return useQuery({
    queryKey: ["calendar-upcoming"],

    queryFn: async () => {
      const response =
        await calendarApi.upcoming();

      return response.data;
    },
  });
}