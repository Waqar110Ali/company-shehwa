import { api } from "@/lib/api";

export interface AttendanceQuery {
  search?: string;

  department?: string;

  status?: string;

  employee?: string;

  date?: string;
}

export const attendanceApi = {
  getAll(
    params?: AttendanceQuery,
  ) {
    return api.get(
      "/attendance",
      {
        params,
      },
    );
  },

  getById(
    id: string,
  ) {
    return api.get(
      `/attendance/${id}`,
    );
  },

  create(
    data: unknown,
  ) {
    return api.post(
      "/attendance",
      data,
    );
  },

  update(
    id: string,
    data: unknown,
  ) {
    return api.patch(
      `/attendance/${id}`,
      data,
    );
  },

  delete(
    id: string,
  ) {
    return api.delete(
      `/attendance/${id}`,
    );
  },

  statistics() {
    return api.get(
      "/attendance/statistics",
    );
  },
};