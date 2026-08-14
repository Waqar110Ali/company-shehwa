import { motion } from "framer-motion";

interface Props {
  value: number;
}

export default function ProgressBar({
  value,
}: Props) {
  return (
    <div>

      <div className="mb-3 flex justify-between text-sm">

        <span className="text-slate-400">
          Progress
        </span>

        <span className="font-semibold text-cyan-300">
          {value}%
        </span>

      </div>

      <div className="h-3 overflow-hidden rounded-full bg-white/10">

        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: `${value}%`,
          }}
          transition={{
            duration: 1,
          }}
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500"
        />

      </div>

    </div>
  );
}