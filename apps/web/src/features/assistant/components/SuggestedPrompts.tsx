// interface Props {
//   onSelect: (
//     prompt: string
//   ) => void;
// }

// const prompts = [
//   "Show attendance report",
//   "Summarize today's meetings",
//   "Generate project report",
//   "List delayed tasks",
// ];

// export default function SuggestedPrompts({
//   onSelect,
// }: Props) {
//   return (
//     <div className="flex flex-wrap gap-3">

//       {prompts.map((prompt) => (

//         <button
//           key={prompt}
//           onClick={() =>
//             onSelect(prompt)
//           }
//           className="rounded-xl bg-white/5 px-4 py-3 text-sm text-slate-300 transition hover:bg-cyan-500/20"
//         >
//           {prompt}
//         </button>

//       ))}

//     </div>
//   );
// }

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void;
}

const prompts: string[] = [
  "Show attendance report",
  "Summarize today's meetings",
  "Generate project report",
  "List delayed tasks",
];

export default function SuggestedPrompts({
  onSelect,
}: SuggestedPromptsProps) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          type="button"
          onClick={() => onSelect(prompt)}
          className="rounded-xl bg-white/5 px-3 py-2.5 text-xs text-slate-300 transition hover:bg-cyan-500/20 sm:px-4 sm:py-3 sm:text-sm"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
