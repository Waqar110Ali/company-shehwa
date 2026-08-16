// import { X } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";
// import type { ReactNode } from "react";

// interface TaskModalProps {
//   open: boolean;
//   title: string;
//   children: ReactNode;
//   onClose: () => void;
// }

// export default function TaskModal({
//   open,
//   title,
//   children,
//   onClose,
// }: TaskModalProps) {
//   return (
//     <AnimatePresence>

//       {open && (
//         <motion.div
//           initial={{
//             opacity: 0,
//           }}
//           animate={{
//             opacity: 1,
//           }}
//           exit={{
//             opacity: 0,
//           }}
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5 backdrop-blur-md"
//         >

//           <motion.div
//             initial={{
//               y: 60,
//               opacity: 0,
//               scale: 0.95,
//             }}
//             animate={{
//               y: 0,
//               opacity: 1,
//               scale: 1,
//             }}
//             exit={{
//               y: 40,
//               opacity: 0,
//             }}
//             transition={{
//               duration: 0.25,
//             }}
//             className="w-full max-w-2xl rounded-3xl border border-cyan-400/10 bg-slate-950 shadow-2xl"
//           >

//             <div className="flex items-center justify-between border-b border-white/10 p-6">

//               <h2 className="text-2xl font-bold text-white">
//                 {title}
//               </h2>

//               <button
//                 onClick={onClose}
//                 className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
//               >
//                 <X size={22} />
//               </button>

//             </div>

//             <div className="p-6">

//               {children}

//             </div>

//           </motion.div>

//         </motion.div>
//       )}

//     </AnimatePresence>
//   );
// }


// apps/web/src/features/tasks/components/TaskModal.tsx
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

interface TaskModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export default function TaskModal({
  open,
  title,
  children,
  onClose,
}: TaskModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5 backdrop-blur-md"
        >
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-3xl border border-cyan-400/10 bg-slate-950 shadow-2xl"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-white/10 p-6">
              <h2 className="text-xl font-bold text-white sm:text-2xl">
                {title}
              </h2>

              <button
                onClick={onClose}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <X size={22} />
              </button>
            </div>

            <div className="overflow-y-auto p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}