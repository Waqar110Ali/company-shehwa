// apps/web/src/features/portfolio/api/portfolio.api.ts
import { api } from "@/lib/api";
import type { PortfolioContent } from "../types/portfolio-content";

export const portfolioApi = {
  async getPortfolio() {
    const response = await api.get("/portfolio");
    return response.data as { success: boolean; data: PortfolioContent };
  },
  async updateSection<K extends keyof PortfolioContent>(key: K, data: PortfolioContent[K]) {
    const response = await api.put(`/portfolio/${key}`, data);
    return response.data;
  },
  async uploadImage(file: File) {
    const form = new FormData();
    form.append("file", file);

    const response = await api.post<{
      success: boolean;
      data: { url: string };
    }>("/portfolio/upload-image", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.data.url;
  },
};