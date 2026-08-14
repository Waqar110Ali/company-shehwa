import { Search } from "lucide-react";

interface Props {
  value: string;

  onChange: (value: string) => void;
}

export default function TaskSearch({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative">

      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Search tasks..."
        className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white outline-none transition focus:border-cyan-400"
      />

    </div>
  );
}