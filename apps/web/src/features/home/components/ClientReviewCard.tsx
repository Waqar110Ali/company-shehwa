import { motion } from "framer-motion";
import {
  Quote,
  Star,
  ExternalLink,
} from "lucide-react";

import FadeUp from "@/components/motion/FadeUp";
import GlassCard from "@/components/premium/GlassCard";

interface ClientReviewCardProps {
  name: string;
  platform: string;
  avatar: string;
  review: string;
  rating: number;
}

export default function ClientReviewCard({
  name,
  platform,
  avatar,
  review,
  rating,
}: ClientReviewCardProps) {
  return (
    <FadeUp>
        <GlassCard className="group flex h-full flex-col p-8">

        {/* Header */}

        <div className="mb-6 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <img
              src={avatar}
              alt={name}
              className="h-16 w-16 rounded-2xl border border-cyan-400/20 object-cover"
            />

            <div>

              <h3 className="font-bold text-white">
                {name}
              </h3>

              <span className="text-sm text-cyan-300">
                {platform}
              </span>

            </div>

          </div>

          <motion.div
            whileHover={{
              rotate: 15,
            }}
            className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-3 text-cyan-300"
          >
            <Quote size={20} />
          </motion.div>

        </div>

        {/* Rating */}

        <div className="mb-6 flex">

          {Array.from({
            length: Math.max(0, Math.min(5, Number(rating) || 0)),
          }).map((_, index) => (
            <Star
              key={`star-${index}`}
              size={18}
              className="fill-yellow-400 text-yellow-400"
            />
          ))}

        </div>

                {/* Review */}
        <p className="line-clamp-5 leading-8 text-slate-300">
          "{review}"
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-6">

          <span className="text-sm text-slate-400">
            Verified Review
          </span>

          <ExternalLink
            size={18}
            className="text-cyan-300"
          />

        </div>

      </GlassCard>
    </FadeUp>
  );
}