export interface CeoMessage {
  title: string;
  speakerName: string;
  speakerRole: string;
  description: string;
  videoUrl: string;
  postedAt: string;
}

export type GalleryMediaType = "image" | "video";

export interface GalleryMedia {
  url: string;
  type: GalleryMediaType;
  caption?: string;
}

export interface EventGallery {
  id: string;
  eventName: string;
  eventDate: string;
  description: string;
  // Field kept as "photos" for backward compatibility with data
  // already saved in Mongo — it now holds mixed image/video items.
  photos: GalleryMedia[];
}

export interface UpdatesContent {
  ceoMessage: CeoMessage | null;
  galleries: EventGallery[];
}