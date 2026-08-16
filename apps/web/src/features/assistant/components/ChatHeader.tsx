// import { Bot } from "lucide-react";

// export default function ChatHeader() {
//   return (
//     <div className="flex items-center justify-between border-b border-white/10 p-6">

//       <div className="flex items-center gap-4">

//         <div className="rounded-xl bg-cyan-500/20 p-3">

//           <Bot
//             className="text-cyan-400"
//             size={28}
//           />

//         </div>

//         <div>

//           <h2 className="text-xl font-bold text-white">
//             AI Company Assistant
//           </h2>

//           <p className="text-sm text-emerald-400">
//             Online
//           </p>

//         </div>

//       </div>

//     </div>
//   );
// }


import { Bot } from "lucide-react";

export default function ChatHeader() {
  return (
    <div className="flex items-center justify-between border-b border-white/10 p-6">

      <div className="flex items-center gap-4">

        <div className="rounded-xl bg-cyan-500/20 p-3">

          <Bot
            className="text-cyan-400"
            size={28}
          />

        </div>

        <div>

          <h2 className="text-xl font-bold text-white">
            AI Company Assistant
          </h2>

          <p className="text-sm text-emerald-400">
            Online
          </p>

        </div>

      </div>

    </div>
  );
}