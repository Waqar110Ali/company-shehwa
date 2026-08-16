import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { appToast } from "@/lib/toast";
import PremiumButton from "@/components/premium/PremiumButton";

import { footerApi } from "../api/footer.api";
import { FOOTER_ICON_MAP, FOOTER_ICON_OPTIONS } from "../utils/footer-icons";
import type {
  FooterContent,
  FooterLink,
  FooterSocialLink,
} from "../types/footer";

interface Props {
  initial: FooterContent;
  onSaved: (content: FooterContent) => void;
  onClose: () => void;
}

type LinkSectionKey = keyof FooterContent["sections"];

const SECTION_TITLES: Record<LinkSectionKey, string> = {
  company: "Company Links",
  services: "Services Links",
  legal: "Legal Links",
};

export default function FooterEditor({ initial, onSaved, onClose }: Props) {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<FooterContent>(
    structuredClone(initial),
  );

  const [saving, setSaving] = useState(false);

  // ---- social links ----

  function addSocialLink() {
    setForm((prev) => ({
      ...prev,
      socialLinks: [
        ...prev.socialLinks,
        { name: "", href: "", icon: "facebook" as const },
      ],
    }));
  }

  function updateSocialLink(index: number, patch: Partial<FooterSocialLink>) {
    setForm((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link, i) =>
        i === index ? { ...link, ...patch } : link,
      ),
    }));
  }

  function removeSocialLink(index: number) {
    setForm((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));
  }

  // ---- link sections (company / services / legal) ----

  function addSectionLink(section: LinkSectionKey) {
    setForm((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: [...prev.sections[section], { title: "", href: "" }],
      },
    }));
  }

  function updateSectionLink(
    section: LinkSectionKey,
    index: number,
    patch: Partial<FooterLink>,
  ) {
    setForm((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: prev.sections[section].map((link, i) =>
          i === index ? { ...link, ...patch } : link,
        ),
      },
    }));
  }

  function removeSectionLink(section: LinkSectionKey, index: number) {
    setForm((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: prev.sections[section].filter((_, i) => i !== index),
      },
    }));
  }

  async function handleSave() {
    setSaving(true);

    try {
      await footerApi.saveFooter(form);
      await queryClient.invalidateQueries({ queryKey: ["footer"] });

      onSaved(form);
      appToast.success("Footer saved — live on the site now.");
    } catch {
      appToast.error("Unable to save footer.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
      <div className="max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-slate-950 p-8">
        <h2 className="text-2xl font-bold text-white">Footer</h2>

        <div className="mt-8 space-y-10">
          {/* Description + copyright */}
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">
                Company Description
              </label>
              <textarea
                className="min-h-[90px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-400">
                Copyright Text
              </label>
              <input
                className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white"
                placeholder="AI Company Management Platform. All rights reserved."
                value={form.copyrightText}
                onChange={(e) =>
                  setForm((p) => ({ ...p, copyrightText: e.target.value }))
                }
              />
              <p className="text-xs text-slate-500">
                The current year is added automatically on the site — don't
                include it here.
              </p>
            </div>
          </div>

          {/* Social links */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-cyan-300">
                Social Links
              </span>
              <button
                onClick={addSocialLink}
                className="flex items-center gap-2 text-sm text-cyan-300"
              >
                <Plus size={16} />
                Add Social Link
              </button>
            </div>

            {form.socialLinks.length === 0 && (
              <p className="text-sm text-slate-400">No social links yet.</p>
            )}

            <div className="space-y-3">
              {form.socialLinks.map((link, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-xl border border-white/10 p-4"
                >
                  <select
                    value={link.icon}
                    onChange={(e) =>
                      updateSocialLink(index, {
                        icon: e.target.value as FooterSocialLink["icon"],
                      })
                    }
                    className="h-11 rounded-xl border border-white/10 bg-white/5 px-3 text-white capitalize"
                  >
                    {FOOTER_ICON_OPTIONS.map((icon) => (
                      <option key={icon} value={icon} className="capitalize">
                        {icon}
                      </option>
                    ))}
                  </select>

                  <input
                    placeholder="Label (e.g. Twitter)"
                    className="h-11 w-40 rounded-xl border border-white/10 bg-white/5 px-3 text-white"
                    value={link.name}
                    onChange={(e) =>
                      updateSocialLink(index, { name: e.target.value })
                    }
                  />

                  <input
                    placeholder="https://..."
                    className="h-11 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 text-white"
                    value={link.href}
                    onChange={(e) =>
                      updateSocialLink(index, { href: e.target.value })
                    }
                  />

                  <button
                    onClick={() => removeSocialLink(index)}
                    className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Company / Services / Legal link sections */}
          {(Object.keys(SECTION_TITLES) as LinkSectionKey[]).map((section) => (
            <div key={section} className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-cyan-300">
                  {SECTION_TITLES[section]}
                </span>
                <button
                  onClick={() => addSectionLink(section)}
                  className="flex items-center gap-2 text-sm text-cyan-300"
                >
                  <Plus size={16} />
                  Add Link
                </button>
              </div>

              {form.sections[section].length === 0 && (
                <p className="text-sm text-slate-400">No links yet.</p>
              )}

              <div className="space-y-3">
                {form.sections[section].map((link, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-xl border border-white/10 p-4"
                  >
                    <input
                      placeholder="Title (e.g. About Us)"
                      className="h-11 w-48 rounded-xl border border-white/10 bg-white/5 px-3 text-white"
                      value={link.title}
                      onChange={(e) =>
                        updateSectionLink(section, index, {
                          title: e.target.value,
                        })
                      }
                    />

                    <input
                      placeholder="/about"
                      className="h-11 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 text-white"
                      value={link.href}
                      onChange={(e) =>
                        updateSectionLink(section, index, {
                          href: e.target.value,
                        })
                      }
                    />

                    <button
                      onClick={() => removeSectionLink(section, index)}
                      className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Live preview of social icons chosen above */}
          {form.socialLinks.length > 0 && (
            <div className="space-y-2">
              <span className="text-sm text-slate-400">Preview</span>
              <div className="flex gap-4">
                {form.socialLinks.map((link, index) => {
                  const Icon = FOOTER_ICON_MAP[link.icon];
                  return (
                    <div
                      key={index}
                      className="rounded-lg bg-slate-800 p-2 text-white"
                    >
                      <Icon size={18} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 px-5 py-3 text-white"
          >
            Cancel
          </button>
          <PremiumButton onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Footer"}
          </PremiumButton>
        </div>
      </div>
    </div>
  );
}