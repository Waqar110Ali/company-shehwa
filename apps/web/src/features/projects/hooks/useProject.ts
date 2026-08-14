import { useQuery } from "@tanstack/react-query";

import { projectsApi } from "../api/projects.api";

export function useProject(
  id: string,
) {
  return useQuery({
    queryKey: [
      "project",
      id,
    ],

    enabled: !!id,

    queryFn: async () => {
      const response =
        await projectsApi.getProject(
          id,
        );

      return response.data;
    },
  });
}