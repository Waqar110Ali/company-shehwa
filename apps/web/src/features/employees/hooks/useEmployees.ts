import { useQuery } from "@tanstack/react-query";

import { employeesApi } from "../api/employees.api";

export function useEmployees(
  search?: string,
  department?: string,
  status?: string,
) {
  return useQuery({
    queryKey: [
      "employees",
      search,
      department,
      status,
    ],

    queryFn: async () => {
      const params: Record<
        string,
        string | number
      > = {};

      if (search?.trim()) {
        params.search = search.trim();
      }

      if (department?.trim()) {
        params.department =
          department.trim();
      }

      if (status?.trim()) {
        params.status =
          status.trim();
      }

      const response =
        await employeesApi.getAll(
          params,
        );

      return response.data;
    },
  });
}