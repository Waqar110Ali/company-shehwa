import { useQuery } from "@tanstack/react-query";

import { projectsApi } from "../api/projects.api";

export function useProjectStatistics() {
  return useQuery({
    queryKey: [
      "project-statistics",
    ],

    queryFn: async () => {
      const response =
        await projectsApi.getStatistics();

      return response.data;
    },
  });
}