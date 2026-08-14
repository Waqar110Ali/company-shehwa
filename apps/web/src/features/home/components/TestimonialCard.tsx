import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

import FadeUp from "@/components/motion/FadeUp";
import GlassCard from "@/components/premium/GlassCard";

interface TestimonialCardProps {
  name: string;
  company: string;
  image: string;
  review: string;
  rating: number;
}

export default function TestimonialCard({
  name,
  company,
  image,
  review,
  rating,
}: TestimonialCardProps) {
  return (
    <FadeUp>
      <GlassCard className="group h-full overflow-hidden p-8">

        <div className="mb-8 flex items-start justify-between">

          <img
            src={image}
            alt={name}
            className="h-16 w-16 rounded-2xl border border-cyan-400/20 object-cover"
          />

          <motion.div
            whileHover={{ rotate: 12 }}
            className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-3 text-cyan-300"
          >
            <Quote size={22} />
          </motion.div>

        </div>

        <div className="mb-6 flex">

          {Array.from({ length: rating }).map((_, index) => (
            <Star
              key={index}
              size={18}
              className="fill-yellow-400 text-yellow-400"
            />
          ))}

        </div>

        <p className="leading-8 text-slate-300">
          "{review}"
        </p>

        <div className="mt-8 border-t border-white/10 pt-6">

          <h3 className="text-lg font-bold text-white">
            {name}
          </h3>

          <p className="text-cyan-300">
            {company}
          </p>

        </div>

      </GlassCard>
    </FadeUp>
  );
}