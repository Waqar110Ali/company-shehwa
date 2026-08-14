import { motion } from "framer-motion";

interface Props {
  name: string;
}

export default function TypingIndicator({
  name,
}: Props) {
  return (
    <div className="flex items-center gap-3 px-6 py-3">

      <span className="text-sm text-slate-400">
        {name} is typing...
      </span>

      <div className="flex gap-1">

        {[0, 1, 2].map((dot) => (

          <motion.span
            key={dot}
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: dot * 0.15,
            }}
            className="h-2 w-2 rounded-full bg-cyan-400"
          />

        ))}

      </div>

    </div>
  );
}