import { useQuery } from "@tanstack/react-query";

import { tasksApi } from "../api/tasks.api";

export function useTaskStatistics() {
  return useQuery({
    queryKey: [
      "task-statistics",
    ],

    queryFn: async () => {
      const response =
        await tasksApi.statistics();

      return response.data;
    },
  });
}