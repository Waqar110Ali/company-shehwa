import { useQuery } from "@tanstack/react-query";

import { calendarApi } from "../api/calendar.api";

export function useCalendarStatistics() {
  return useQuery({
    queryKey: ["calendar-statistics"],

    queryFn: async () => {
      const response =
        await calendarApi.statistics();

      return response.data;
    },
  });
}