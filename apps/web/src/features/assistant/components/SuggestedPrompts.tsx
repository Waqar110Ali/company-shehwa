interface Props {
  onSelect: (
    prompt: string
  ) => void;
}

const prompts = [
  "Show attendance report",
  "Summarize today's meetings",
  "Generate project report",
  "List delayed tasks",
];

export default function SuggestedPrompts({
  onSelect,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">

      {prompts.map((prompt) => (

        <button
          key={prompt}
          onClick={() =>
            onSelect(prompt)
          }
          className="rounded-xl bg-white/5 px-4 py-3 text-sm text-slate-300 transition hover:bg-cyan-500/20"
        >
          {prompt}
        </button>

      ))}

    </div>
  );
}