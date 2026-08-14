import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative">

      <Search
        size={20}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search projects..."
        className="
w-full
rounded-2xl
border
border-cyan-400/10
bg-white/5
py-4
pl-14
pr-5
text-white
backdrop-blur-xl
outline-none
transition
focus:border-cyan-400/40
"
      />

    </div>
  );
}