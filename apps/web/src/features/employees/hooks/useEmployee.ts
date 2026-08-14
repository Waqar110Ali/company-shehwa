import { useQuery } from "@tanstack/react-query";

import { employeesApi } from "../api/employees.api";

export function useEmployee(
  id?: string,
) {
  return useQuery({
    queryKey: [
      "employee",
      id,
    ],

    queryFn: async () => {
      if (!id) {
        return null;
      }

      const response =
        await employeesApi.getById(
          id,
        );

      return response.data;
    },

    enabled: !!id,
  });
}