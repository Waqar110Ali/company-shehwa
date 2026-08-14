import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;

  title: string;

  description: string;

  to?: string;
}

export default function QuickActionCard({
  icon: Icon,
  title,
  description,
  to,
}: Props) {
  const content = (
    <motion.div
      whileHover={{
        y: -4,
      }}
      whileTap={{
        scale: 0.98,
      }}
      className="
group
rounded-3xl
border
border-white/10
bg-white/5
p-6
text-left
backdrop-blur-xl
transition-all
hover:border-cyan-400/30
hover:bg-cyan-500/10
hover:shadow-lg
hover:shadow-cyan-500/10
cursor-pointer
"
    >
      <div className="mb-5 inline-flex rounded-2xl bg-cyan-500/10 p-4">

        <Icon
          size={26}
          className="text-cyan-300"
        />

      </div>

      <h3 className="text-xl font-bold text-white">

        {title}

      </h3>

      <p className="mt-3 leading-7 text-slate-400">

        {description}

      </p>

    </motion.div>
  );

  if (to) {
    return (
      <Link to={to}>
        {content}
      </Link>
    );
  }

  return content;
}