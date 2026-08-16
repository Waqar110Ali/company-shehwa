// apps/web/src/features/updates/api/updates.api.ts
import { api } from "@/lib/api";

import type {
  CeoMessage,
  EventGallery,
  UpdatesContent,
} from "../types/updates";

export const updatesApi = {
  async getUpdates() {
    const { data } = await api.get<{
      success: boolean;
      data: UpdatesContent;
    }>("/updates");

    return data;
  },

  async saveCeoMessage(ceoMessage: CeoMessage | null) {
    const { data } = await api.put(
      "/updates/ceo-message",
      ceoMessage,
    );

    return data;
  },

  async saveGalleries(galleries: EventGallery[]) {
    const { data } = await api.put("/updates/galleries", {
      galleries,
    });

    return data;
  },

  async uploadVideo(file: File) {
    const form = new FormData();
    form.append("file", file);

    const { data } = await api.post<{
      success: boolean;
      data: { url: string };
    }>("/updates/upload-video", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return data.data.url;
  },

  async uploadImage(file: File) {
    const form = new FormData();
    form.append("file", file);

    const { data } = await api.post<{
      success: boolean;
      data: { url: string };
    }>("/updates/upload-image", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return data.data.url;
  },
  async uploadMedia(file: File): Promise<{ url: string; type: "image" | "video" }> {
  const isVideo = file.type.startsWith("video/");
  const url = isVideo
    ? await this.uploadVideo(file)
    : await this.uploadImage(file);

  return { url, type: isVideo ? "video" : "image" };
},
};