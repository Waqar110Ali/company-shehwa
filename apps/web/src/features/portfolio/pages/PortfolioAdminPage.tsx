// apps/web/src/features/portfolio/pages/PortfolioAdminPage.tsx
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import SectionHeading from "@/features/dashboard/components/SectionHeading";
import { appToast } from "@/lib/toast";

import { usePortfolioContent } from "../hooks/usePortfolioContent";
import { portfolioApi } from "../api/portfolio.api";
import SectionEditor from "../components/SectionEditor";
import type { PortfolioContent } from "../types/portfolio-content";

import CeoMessageEditor from "@/features/updates/components/CeoMessageEditor";
import GalleryEditor from "@/features/updates/components/GalleryEditor";
import { updatesApi } from "@/features/updates/api/updates.api";

import FooterEditor from "@/features/footer/components/FooterEditor";
import { footerApi } from "@/features/footer/api/footer.api";
import { DEFAULT_FOOTER_CONTENT } from "@/features/footer/types/footer";

const SECTION_LABELS: Record<keyof PortfolioContent, string> = {
  heroContent: "Hero",
  heroStats: "Hero Stats",
  companyContent: "Company Intro",
  companyValues: "Company Values",
  contactInfo: "Contact Info",
  faqs: "FAQs",
  developmentProcess: "Development Process",
  featuredProjects: "Featured Projects",
  services: "Services",
  statistics: "Company Statistics",
  teamMembers: "Team Members",
  technologyCategories: "Technology Categories",
  testimonials: "Testimonials",
  technologies: "Trusted By (Tech Logos)",
  whyChooseUs: "Why Choose Us",
  achievements: "Achievements",
  clientReviews: "Client Reviews",
};

export default function PortfolioAdminPage() {
  const { data, isLoading, isError, error } = usePortfolioContent();

  const [activeKey, setActiveKey] = useState<keyof PortfolioContent | null>(
    null,
  );

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      key,
      value,
    }: {
      key: keyof PortfolioContent;
      value: any;
    }) => portfolioApi.updateSection(key, value),
    onSuccess: () => {
      appToast.success("Section updated — live on the site now.");
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      setActiveKey(null);
    },
    onError: () => appToast.error("Failed to update section."),
  });

  // ==========================================================
  // CEO Message / Event Galleries ("Updates")
  // ==========================================================

  const { data: updatesData, isLoading: updatesLoading } = useQuery({
    queryKey: ["updates"],
    queryFn: async () => (await updatesApi.getUpdates()).data,
  });

  const [editingCeoMessage, setEditingCeoMessage] = useState(false);
  const [editingGalleries, setEditingGalleries] = useState(false);

  // ==========================================================
  // Footer
  // ==========================================================

  const { data: footerData, isLoading: footerLoading } = useQuery({
    queryKey: ["footer"],
    queryFn: async () => (await footerApi.getFooter()).data,
  });

  const [editingFooter, setEditingFooter] = useState(false);

  if (isLoading) {
    return (
      <div className="py-20 text-center text-slate-400">
        Loading portfolio content...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-20 text-center text-red-400">
        Failed to load portfolio content
        {error instanceof Error ? `: ${error.message}` : "."}
      </div>
    );
  }

  const content = data ?? ({} as Partial<PortfolioContent>);

  return (
    <div className="space-y-8">
      <SectionHeading
        title="Portfolio Content"
        subtitle="Edit every section of the public website. Changes go live immediately."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {(Object.keys(SECTION_LABELS) as (keyof PortfolioContent)[]).map(
          (key) => {
            const sectionData = content[key];
            const isArray = Array.isArray(sectionData);
            const hasData = isArray
              ? sectionData.length > 0
              : sectionData && Object.keys(sectionData).length > 0;

            return (
              <button
                key={key}
                onClick={() => setActiveKey(key)}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition hover:border-cyan-400/40"
              >
                <h3 className="font-semibold text-white">
                  {SECTION_LABELS[key]}
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  {isArray
                    ? `${sectionData.length} items`
                    : hasData
                      ? "Edit content"
                      : "Not set yet"}
                </p>
              </button>
            );
          },
        )}

        {/* CEO / Team Message — disabled until updates data has
            actually loaded, so the editor never opens with empty
            defaults and accidentally overwrites real content. */}
        <button
          onClick={() => setEditingCeoMessage(true)}
          disabled={updatesLoading}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition hover:border-cyan-400/40 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <h3 className="font-semibold text-white">CEO / Team Message</h3>
          <p className="mt-2 text-sm text-slate-400">
            {updatesLoading
              ? "Loading..."
              : updatesData?.ceoMessage
                ? "Edit message"
                : "Not set yet"}
          </p>
        </button>

        {/* Event Galleries — same gating. */}
        <button
          onClick={() => setEditingGalleries(true)}
          disabled={updatesLoading}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition hover:border-cyan-400/40 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <h3 className="font-semibold text-white">Event Galleries</h3>
          <p className="mt-2 text-sm text-slate-400">
            {updatesLoading
              ? "Loading..."
              : `${updatesData?.galleries?.length ?? 0} events`}
          </p>
        </button>

        {/* Footer — same gating as the two above. */}
        <button
          onClick={() => setEditingFooter(true)}
          disabled={footerLoading}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition hover:border-cyan-400/40 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <h3 className="font-semibold text-white">Footer</h3>
          <p className="mt-2 text-sm text-slate-400">
            {footerLoading ? "Loading..." : "Edit footer content"}
          </p>
        </button>
      </div>

      {activeKey && (
        <SectionEditor
          sectionKey={activeKey}
          initialData={content[activeKey] ?? {}}
          saving={mutation.isPending}
          onClose={() => setActiveKey(null)}
          onSave={(value) => mutation.mutate({ key: activeKey, value })}
        />
      )}

      {editingCeoMessage && (
        <CeoMessageEditor
          initial={updatesData?.ceoMessage ?? null}
          onClose={() => setEditingCeoMessage(false)}
          onSaved={() => setEditingCeoMessage(false)}
        />
      )}

      {editingGalleries && (
        <GalleryEditor
          initial={updatesData?.galleries ?? []}
          onClose={() => setEditingGalleries(false)}
          onSaved={() => setEditingGalleries(false)}
        />
      )}

      {editingFooter && (
        <FooterEditor
          initial={footerData ?? DEFAULT_FOOTER_CONTENT}
          onClose={() => setEditingFooter(false)}
          onSaved={() => setEditingFooter(false)}
        />
      )}
    </div>
  );
}