import { useQuery } from "@tanstack/react-query";

import { tasksApi } from "../api/tasks.api";

export function useTask(
  id: string,
) {
  return useQuery({
    queryKey: [
      "task",
      id,
    ],

    enabled: !!id,

    queryFn: async () => {
      const response =
        await tasksApi.getById(
          id,
        );

      return response.data;
    },
  });
}