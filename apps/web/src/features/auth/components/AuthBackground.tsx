import { motion } from "framer-motion";

export default function AuthBackground() {
  return (
    <>
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          duration: 40,
          ease: "linear",
        }}
        className="
absolute
-left-52
-top-52
h-[500px]
w-[500px]
rounded-full
bg-cyan-500/10
blur-[140px]
"
      />

      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          repeat: Infinity,
          duration: 55,
          ease: "linear",
        }}
        className="
absolute
-bottom-52
-right-52
h-[500px]
w-[500px]
rounded-full
bg-blue-600/10
blur-[150px]
"
      />
    </>
  );
}