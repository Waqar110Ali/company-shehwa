import { api } from "@/lib/api";
import type { FooterContent } from "../types/footer";

export const footerApi = {
  async getFooter() {
    const { data } = await api.get<{
      success: boolean;
      data: FooterContent;
    }>("/footer");

    return data;
  },

  async saveFooter(content: FooterContent) {
    const { data } = await api.put("/footer", content);
    return data;
  },
};