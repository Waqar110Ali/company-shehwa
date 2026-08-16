// apps/web/src/features/updates/components/CeoMessageEditor.tsx
import { useState } from "react";
import { Upload, Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { appToast } from "@/lib/toast";
import PremiumButton from "@/components/premium/PremiumButton";

import { updatesApi } from "../api/updates.api";
import type { CeoMessage } from "../types/updates";

interface Props {
  initial: CeoMessage | null;
  onSaved: (message: CeoMessage | null) => void;
  onClose: () => void;
}

export default function CeoMessageEditor({
  initial,
  onSaved,
  onClose,
}: Props) {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<CeoMessage>(
    initial ?? {
      title: "",
      speakerName: "",
      speakerRole: "",
      description: "",
      videoUrl: "",
      postedAt: new Date().toISOString(),
    },
  );

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [removing, setRemoving] = useState(false);

  async function handleVideoSelect(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const url = await updatesApi.uploadVideo(file);
      setForm((prev) => ({ ...prev, videoUrl: url }));
      appToast.success("Video uploaded.");
    } catch {
      appToast.error("Unable to upload video.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    setSaving(true);

    try {
      await updatesApi.saveCeoMessage(form);
      await queryClient.invalidateQueries({ queryKey: ["updates"] });

      onSaved(form);
      appToast.success("Message saved — live on the site now.");
    } catch {
      appToast.error("Unable to save message.");
    } finally {
      setSaving(false);
    }
  }

  async function handleRemove() {
    const confirmed = window.confirm(
      "Remove the CEO/team message entirely? This can't be undone.",
    );

    if (!confirmed) return;

    setRemoving(true);

    try {
      await updatesApi.saveCeoMessage(null);
      await queryClient.invalidateQueries({ queryKey: ["updates"] });

      onSaved(null);
      appToast.success("Message removed.");
    } catch {
      appToast.error("Unable to remove message.");
    } finally {
      setRemoving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
      <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-slate-950 p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            CEO / Team Message
          </h2>

          {initial && (
            <button
              onClick={handleRemove}
              disabled={removing}
              className="flex items-center gap-2 rounded-xl border border-red-500/30 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
            >
              <Trash2 size={16} />
              {removing ? "Removing..." : "Remove Message"}
            </button>
          )}
        </div>

        <div className="mt-8 space-y-5">
          <div className="space-y-2">
            <label className="text-sm text-slate-400">Title</label>
            <input
              className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white"
              value={form.title}
              onChange={(e) =>
                setForm((p) => ({ ...p, title: e.target.value }))
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">
                Speaker Name
              </label>
              <input
                className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white"
                value={form.speakerName}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    speakerName: e.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-400">
                Speaker Role
              </label>
              <input
                className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white"
                value={form.speakerRole}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    speakerRole: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-400">
              Description
            </label>
            <textarea
              className="min-h-[100px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
              value={form.description}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  description: e.target.value,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-400">Video</label>

            {form.videoUrl && (
              <div className="mx-auto mb-3 max-w-sm">
                <video
                  src={form.videoUrl}
                  controls
                  className="aspect-video w-full rounded-xl object-cover"
                />
              </div>
            )}

            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 py-6 text-sm text-slate-300 transition hover:border-cyan-400/40">
              <Upload size={18} />
              {uploading
                ? "Uploading..."
                : form.videoUrl
                  ? "Replace Video"
                  : "Upload Video"}
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleVideoSelect}
                disabled={uploading}
              />
            </label>
          </div>
        </div>

        <div className="mt-10 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 px-5 py-3 text-white"
          >
            Cancel
          </button>
          <PremiumButton
            onClick={handleSave}
            disabled={saving || uploading || removing}
          >
            {saving ? "Saving..." : "Save Message"}
          </PremiumButton>
        </div>
      </div>
    </div>
  );
}