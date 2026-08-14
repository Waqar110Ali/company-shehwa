import { useQuery } from "@tanstack/react-query";

import { tasksApi } from "../api/tasks.api";

interface TaskFilters {
  search?: string;

  status?: string;

  priority?: string;

  project?: string;

  employee?: string;
}

export function useTasks(
  filters?: TaskFilters,
) {
  return useQuery({
    queryKey: [
      "tasks",
      filters,
    ],

    queryFn: async () => {
      const response =
        await tasksApi.getAll(
          filters,
        );

      return response.data;
    },
  });
}