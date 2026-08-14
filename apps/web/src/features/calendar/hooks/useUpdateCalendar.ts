import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  calendarApi,
  type UpdateCalendarEventRequest,
} from "../api/calendar.api";

interface UpdateCalendarInput {
  id: string;

  data: UpdateCalendarEventRequest;
}

export function useUpdateCalendar() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: UpdateCalendarInput) =>
      calendarApi.update(
        id,
        data,
      ),

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