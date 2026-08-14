import { useQuery } from "@tanstack/react-query";

import { calendarApi } from "../api/calendar.api";

interface CalendarFilters {
  search?: string;

  type?: string;

  date?: string;

  month?: string;

  year?: string;

  page?: number;

  limit?: number;
}

export function useCalendar(
  filters?: CalendarFilters,
) {
  return useQuery({
    queryKey: [
      "calendar",
      filters,
    ],

    queryFn: async () => {
      const params: Record<
        string,
        string | number
      > = {};

      if (
        filters?.search?.trim()
      ) {
        params.search =
          filters.search.trim();
      }

      if (
        filters?.type?.trim()
      ) {
        params.type =
          filters.type.trim();
      }

      if (
        filters?.date?.trim()
      ) {
        params.date =
          filters.date.trim();
      }

      if (
        filters?.month?.trim()
      ) {
        params.month =
          filters.month.trim();
      }

      if (
        filters?.year?.trim()
      ) {
        params.year =
          filters.year.trim();
      }

      if (filters?.page) {
        params.page =
          filters.page;
      }

      if (filters?.limit) {
        params.limit =
          filters.limit;
      }

      const response =
        await calendarApi.getAll(
          params,
        );

      return response.data;
    },
  });
}