import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import AuroraBackground from "@/components/effects/AuroraBackground";
import Container from "@/components/common/Container";
import Section from "@/components/common/Section";
import FadeUp from "@/components/motion/FadeUp";
import GradientText from "@/components/premium/GradientText";
import GlassCard from "@/components/premium/GlassCard";

import { updatesApi } from "@/features/updates/api/updates.api";
import MediaLightbox from "@/features/updates/components/MediaLightbox";
import type { GalleryMedia } from "@/features/updates/types/updates";
import GallerySlider from "@/features/updates/components/GallerySlider";

export default function CompanyUpdates() {
    const { data } = useQuery({
        queryKey: ["updates"],
        queryFn: async () => (await updatesApi.getUpdates()).data,
    });

    const [activeMedia, setActiveMedia] = useState<GalleryMedia | null>(null);

    const hasContent =
        data?.ceoMessage || (data?.galleries && data.galleries.length > 0);

    if (!hasContent) return null;

    return (
        <AuroraBackground>
            <Section className="py-28">
                <Container>
                    {data?.ceoMessage && (
                        <FadeUp>
                            <div className="mx-auto max-w-4xl text-center">
                                <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl">
                                    From Our Team
                                </span>

                                <h2 className="mt-8 text-5xl font-black text-white lg:text-6xl">
                                    {data.ceoMessage.title.includes(" ") ? (
                                        <>
                                            {data.ceoMessage.title.split(" ").slice(0, -1).join(" ")}
                                            <GradientText>
                                                {" "}
                                                {data.ceoMessage.title.split(" ").slice(-1)}
                                            </GradientText>
                                        </>
                                    ) : (
                                        data.ceoMessage.title
                                    )}
                                </h2>

                                <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
                                    {data.ceoMessage.description}
                                </p>
                            </div>

                            <div className="mx-auto mt-14 max-w-xl">
                                <GlassCard className="overflow-hidden p-0">
                                    <video
                                        src={data.ceoMessage.videoUrl}
                                        controls
                                        preload="metadata"
                                        className="aspect-video w-full object-cover"
                                    />

                                    <div className="p-6 text-center">
                                        <p className="font-semibold text-white">
                                            {data.ceoMessage.speakerName}
                                        </p>
                                        <p className="text-sm text-cyan-300">
                                            {data.ceoMessage.speakerRole}
                                        </p>
                                    </div>
                                </GlassCard>
                            </div>
                        </FadeUp>
                    )}

                    {data?.galleries && data.galleries.length > 0 && (
                        <div className="mt-24 space-y-16">
                            {data.galleries.map((gallery) => (
                                <FadeUp key={gallery.id}>
                                    <div className="mx-auto max-w-3xl text-center">
                                        <h3 className="text-3xl font-black text-white">
                                            {gallery.eventName}
                                        </h3>

                                        {gallery.eventDate && (
                                            <p className="mt-2 text-sm text-slate-400">
                                                {new Date(gallery.eventDate).toLocaleDateString(
                                                    "en-US",
                                                    { day: "numeric", month: "long", year: "numeric" },
                                                )}
                                            </p>
                                        )}

                                        {gallery.description && (
                                            <p className="mt-4 text-slate-300">
                                                {gallery.description}
                                            </p>
                                        )}
                                    </div>

                                    <div className="mt-8">
                                        <GallerySlider
                                            gallery={gallery}
                                            onSelect={(media) => setActiveMedia(media)}
                                        />
                                    </div>
                                </FadeUp>
                            ))}
                        </div>
                    )}
                </Container>
            </Section>

            <MediaLightbox
                media={activeMedia}
                onClose={() => setActiveMedia(null)}
            />
        </AuroraBackground>
    );
}