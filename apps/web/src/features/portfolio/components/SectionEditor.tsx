// apps/web/src/features/portfolio/components/SectionEditor.tsx
import { useState } from "react";
import { Upload } from "lucide-react";

import PremiumButton from "@/components/premium/PremiumButton";
import { appToast } from "@/lib/toast";

import { ICON_NAMES } from "../utils/icon-map";
import { portfolioApi } from "../api/portfolio.api";

interface Props {
  sectionKey: string;
  initialData: any;
  saving: boolean;
  onSave: (data: any) => void;
  onClose: () => void;
}

const ICON_FIELDS = ["icon"];
const IMAGE_FIELDS = ["image", "avatar", "thumbnail", "logo", "photo"];

function safeClone(value: any) {
  if (value === null || value === undefined) return {};
  try {
    return structuredClone(value);
  } catch {
    return JSON.parse(JSON.stringify(value));
  }
}

export default function SectionEditor({
  sectionKey,
  initialData,
  saving,
  onSave,
  onClose,
}: Props) {
  const [data, setData] = useState<any>(() => safeClone(initialData));

  // Tracks which specific field (by its joined path, e.g. "2.image")
  // is currently uploading, so only that one button shows a spinner.
  const [uploadingPath, setUploadingPath] = useState<string | null>(null);

  const isArrayData = Array.isArray(data);
  const isEmptyObject =
    !isArrayData && (!data || Object.keys(data).length === 0);

  function update(path: (string | number)[], value: any) {
    setData((prev: any) => {
      const clone = safeClone(prev);
      let node = clone;
      for (let i = 0; i < path.length - 1; i++) {
        node = node[path[i]];
      }
      node[path[path.length - 1]] = value;
      return clone;
    });
  }

  function addItem() {
    setData((prev: any[]) => {
      const list = Array.isArray(prev) ? prev : [];
      const template = list[0]
        ? Object.fromEntries(
            Object.keys(list[0]).map((k) => [
              k,
              Array.isArray(list[0][k]) ? [] : "",
            ]),
          )
        : { title: "", description: "" };
      return [...list, template];
    });
  }

  function removeItem(index: number) {
    setData((prev: any[]) => prev.filter((_, i) => i !== index));
  }

  function addField() {
    const fieldName = window.prompt("New field name (e.g. subtitle)");
    if (!fieldName) return;
    setData((prev: any) => ({ ...(prev ?? {}), [fieldName]: "" }));
  }

  async function handleImageSelect(
    path: (string | number)[],
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    const pathKey = path.join(".");
    setUploadingPath(pathKey);

    try {
      const url = await portfolioApi.uploadImage(file);
      // Replaces whatever URL/link was there before — old link is
      // simply overwritten by the new upload's URL.
      update(path, url);
      appToast.success("Photo uploaded.");
    } catch {
      appToast.error("Unable to upload photo.");
    } finally {
      setUploadingPath(null);
      e.target.value = "";
    }
  }

  function renderField(value: any, path: (string | number)[], label: string) {
    const key = String(path[path.length - 1]);
    if (key === "id") return null;

    if (Array.isArray(value)) {
      return (
        <div key={path.join(".")} className="space-y-2">
          <label className="text-sm text-slate-400">{label}</label>
          <input
            className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white"
            value={value.join(", ")}
            onChange={(e) =>
              update(
                path,
                e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
              )
            }
            placeholder="Comma-separated"
          />
        </div>
      );
    }

    if (ICON_FIELDS.includes(key)) {
      return (
        <div key={path.join(".")} className="space-y-2">
          <label className="text-sm text-slate-400">{label}</label>
          <select
            className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white"
            value={value ?? ""}
            onChange={(e) => update(path, e.target.value)}
          >
            <option value="">Select icon</option>
            {ICON_NAMES.map((name) => (
              <option key={name} value={name} className="bg-slate-900">
                {name}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (IMAGE_FIELDS.includes(key)) {
      const pathKey = path.join(".");
      const isUploading = uploadingPath === pathKey;

      return (
        <div key={pathKey} className="space-y-2">
          <label className="text-sm text-slate-400">{label}</label>

          {value && (
            <img
              src={value}
              alt=""
              className="mb-2 h-24 w-24 rounded-xl border border-white/10 object-cover"
            />
          )}

          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 py-4 text-sm text-slate-300 transition hover:border-cyan-400/40">
            <Upload size={16} />
            {isUploading
              ? "Uploading..."
              : value
                ? "Replace Photo"
                : "Upload Photo"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageSelect(path, e)}
              disabled={isUploading}
            />
          </label>
        </div>
      );
    }

    const long = typeof value === "string" && value.length > 80;

    return (
      <div key={path.join(".")} className="space-y-2">
        <label className="text-sm text-slate-400">{label}</label>
        {long ? (
          <textarea
            className="min-h-[100px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
            value={value ?? ""}
            onChange={(e) => update(path, e.target.value)}
          />
        ) : (
          <input
            className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white"
            value={value ?? ""}
            onChange={(e) => update(path, e.target.value)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
      <div className="max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-slate-950 p-8">
        <h2 className="text-2xl font-bold capitalize text-white">
          {sectionKey}
        </h2>

        <div className="mt-8 space-y-8">
          {isArrayData ? (
            <>
              {data.length === 0 && (
                <p className="text-sm text-slate-400">
                  No items yet. Add one below.
                </p>
              )}

              {data.map((item: any, index: number) => (
                <div
                  key={index}
                  className="space-y-4 rounded-2xl border border-white/10 p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-cyan-300">
                      Item {index + 1}
                    </span>
                    <button
                      onClick={() => removeItem(index)}
                      className="text-sm text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                  {Object.entries(item ?? {}).map(([k, v]) =>
                    renderField(v, [index, k], k),
                  )}
                </div>
              ))}

              <button onClick={addItem} className="text-sm text-cyan-300">
                + Add Item
              </button>
            </>
          ) : isEmptyObject ? (
            <div className="space-y-4">
              <p className="text-sm text-slate-400">
                This section has no content saved yet.
              </p>
              <button onClick={addField} className="text-sm text-cyan-300">
                + Add Field
              </button>
            </div>
          ) : (
            <>
              {Object.entries(data).map(([k, v]) => renderField(v, [k], k))}
              <button onClick={addField} className="text-sm text-cyan-300">
                + Add Field
              </button>
            </>
          )}
        </div>

        <div className="mt-10 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 px-5 py-3 text-white"
          >
            Cancel
          </button>
          <PremiumButton onClick={() => onSave(data)} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </PremiumButton>
        </div>
      </div>
    </div>
  );
}