import { api } from "@/lib/api";

export const tasksApi = {
  getAll(params?: Record<string, any>) {
    const query: Record<string, any> = {};

    if (params?.search?.trim()) {
      query.search = params.search.trim();
    }

    if (params?.status) {
      query.status = params.status;
    }

    if (params?.priority) {
      query.priority = params.priority;
    }

    if (params?.project) {
      query.project = params.project;
    }

    if (params?.employee) {
      query.employee = params.employee;
    }

    return api.get("/tasks", {
      params: query,
    });
  },

  getById(id: string) {
    return api.get(`/tasks/${id}`);
  },

  create(data: any) {
    return api.post("/tasks", data);
  },

  update(id: string, data: any) {
    return api.patch(`/tasks/${id}`, data);
  },

  delete(id: string) {
    return api.delete(`/tasks/${id}`);
  },

  statistics() {
    return api.get("/tasks/statistics");
  },
};