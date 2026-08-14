import { api } from "@/lib/api";

export const projectsApi = {
  getProjects(params?: {
    search?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) {
    return api.get("/projects", {
      params,
    });
  },

  getProject(id: string) {
    return api.get(`/projects/${id}`);
  },

  getStatistics() {
    return api.get("/projects/stats");
  },

  create(data: any) {
    return api.post("/projects", data);
  },

  update(
    id: string,
    data: any,
  ) {
    return api.patch(
      `/projects/${id}`,
      data,
    );
  },

  remove(id: string) {
    return api.delete(
      `/projects/${id}`,
    );
  },
};