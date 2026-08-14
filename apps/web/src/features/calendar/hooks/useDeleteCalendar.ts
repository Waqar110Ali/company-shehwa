import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { calendarApi } from "../api/calendar.api";

export function useDeleteCalendar() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      id: string,
    ) =>
      calendarApi.delete(id),

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