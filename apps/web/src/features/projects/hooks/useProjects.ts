import { useQuery } from "@tanstack/react-query";

import { projectsApi } from "../api/projects.api";

interface UseProjectsParams {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export function useProjects(
  params: UseProjectsParams,
) {
  return useQuery({
    queryKey: [
      "projects",
      params,
    ],

    queryFn: async () => {
      const response =
        await projectsApi.getProjects(
          params,
        );

      return response.data;
    },
  });
}