import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  calendarApi,
  type CreateCalendarEventRequest,
} from "../api/calendar.api";

export function useCreateCalendar() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      data: CreateCalendarEventRequest,
    ) =>
      calendarApi.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["calendar"],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "calendar-statistics",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "calendar-upcoming",
        ],
      });
    },
  });
}