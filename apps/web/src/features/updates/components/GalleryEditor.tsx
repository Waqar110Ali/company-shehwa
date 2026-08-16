import { useState } from "react";
import { Plus, Upload, X, Play } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { appToast } from "@/lib/toast";
import PremiumButton from "@/components/premium/PremiumButton";

import { updatesApi } from "../api/updates.api";
import type { EventGallery, GalleryMedia } from "../types/updates";

interface Props {
  initial: EventGallery[];
  onSaved: (galleries: EventGallery[]) => void;
  onClose: () => void;
}

// Max upload size guard — Cloudinary free tier chokes on huge
// videos, and a silent multi-minute upload looks broken to the
// admin. Keep this in sync with your API's multer/body limits.
const MAX_VIDEO_MB = 50;

export default function GalleryEditor({
  initial,
  onSaved,
  onClose,
}: Props) {
  const queryClient = useQueryClient();

  const [galleries, setGalleries] = useState<EventGallery[]>(
    structuredClone(initial),
  );

  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function addGallery() {
    setGalleries((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        eventName: "",
        eventDate: "",
        description: "",
        photos: [],
      },
    ]);
  }

  function updateGallery(id: string, patch: Partial<EventGallery>) {
    setGalleries((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...patch } : g)),
    );
  }

  function removeGallery(id: string) {
    setGalleries((prev) => prev.filter((g) => g.id !== id));
  }

  function removeMedia(galleryId: string, index: number) {
    setGalleries((prev) =>
      prev.map((g) =>
        g.id === galleryId
          ? { ...g, photos: g.photos.filter((_, i) => i !== index) }
          : g,
      ),
    );
  }

  async function handleMediaSelect(
    galleryId: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith("video/");

    if (isVideo && file.size > MAX_VIDEO_MB * 1024 * 1024) {
      appToast.error(`Video must be under ${MAX_VIDEO_MB}MB.`);
      e.target.value = "";
      return;
    }

    setUploadingId(galleryId);

    try {
      const media = await updatesApi.uploadMedia(file);

      setGalleries((prev) =>
        prev.map((g) =>
          g.id === galleryId
            ? { ...g, photos: [...g.photos, media as GalleryMedia] }
            : g,
        ),
      );

      appToast.success(isVideo ? "Video uploaded." : "Photo uploaded.");
    } catch {
      appToast.error(`Unable to upload ${isVideo ? "video" : "photo"}.`);
    } finally {
      setUploadingId(null);
      e.target.value = "";
    }
  }

  async function handleSave() {
    setSaving(true);

    try {
      // Section-specific endpoint — this can never touch
      // the CEO message, no matter what.
      await updatesApi.saveGalleries(galleries);

      await queryClient.invalidateQueries({ queryKey: ["updates"] });

      onSaved(galleries);
      appToast.success("Galleries saved — live on the site now.");
    } catch {
      appToast.error("Unable to save galleries.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
      <div className="max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-slate-950 p-8">
        <h2 className="text-2xl font-bold text-white">Event Galleries</h2>

        <div className="mt-8 space-y-8">
          {galleries.length === 0 && (
            <p className="text-sm text-slate-400">
              No galleries yet. Add one below.
            </p>
          )}

          {galleries.map((gallery) => (
            <div
              key={gallery.id}
              className="space-y-4 rounded-2xl border border-white/10 p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-cyan-300">
                  Event
                </span>
                <button
                  onClick={() => removeGallery(gallery.id)}
                  className="text-sm text-red-400"
                >
                  Remove Event
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Event Name"
                  className="h-11 rounded-xl border border-white/10 bg-white/5 px-4 text-white"
                  value={gallery.eventName}
                  onChange={(e) =>
                    updateGallery(gallery.id, {
                      eventName: e.target.value,
                    })
                  }
                />
                <input
                  type="date"
                  className="h-11 rounded-xl border border-white/10 bg-white/5 px-4 text-white"
                  value={gallery.eventDate}
                  onChange={(e) =>
                    updateGallery(gallery.id, {
                      eventDate: e.target.value,
                    })
                  }
                />
              </div>

              <textarea
                placeholder="Description"
                className="min-h-[70px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
                value={gallery.description}
                onChange={(e) =>
                  updateGallery(gallery.id, {
                    description: e.target.value,
                  })
                }
              />

              {/* Uniform media grid — every tile (image or video)
                  shares the same box, radius, border and hover
                  treatment so nothing looks mismatched. */}
              <div className="grid grid-cols-4 gap-3">
                {gallery.photos.map((media, index) => {
                  const type = media.type ?? "image"; // old data safety net

                  return (
                    <div
                      key={index}
                      className="group relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-black/40"
                    >
                      {type === "video" ? (
                        <>
                          <video
                            src={media.url}
                            className="h-full w-full object-cover"
                            muted
                            playsInline
                            preload="metadata"
                          />
                          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60">
                              <Play
                                size={14}
                                className="ml-0.5 text-white"
                                fill="white"
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        <img
                          src={media.url}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      )}

                      <button
                        onClick={() => removeMedia(gallery.id, index)}
                        className="absolute right-1 top-1 rounded-full bg-black/60 p-1 opacity-0 transition group-hover:opacity-100"
                      >
                        <X size={14} className="text-white" />
                      </button>
                    </div>
                  );
                })}

                <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-white/20 text-xs text-slate-400 hover:border-cyan-400/40">
                  <Upload size={16} />
                  {uploadingId === gallery.id ? "..." : "Add Media"}
                  <input
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={(e) => handleMediaSelect(gallery.id, e)}
                    disabled={uploadingId === gallery.id}
                  />
                </label>
              </div>
            </div>
          ))}

          <button
            onClick={addGallery}
            className="flex items-center gap-2 text-sm text-cyan-300"
          >
            <Plus size={16} />
            Add Event Gallery
          </button>
        </div>

        <div className="mt-10 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 px-5 py-3 text-white"
          >
            Cancel
          </button>
          <PremiumButton onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Galleries"}
          </PremiumButton>
        </div>
      </div>
    </div>
  );
}