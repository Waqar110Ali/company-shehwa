import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function EmployeeSearch({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative">

      <Search
        size={18}
        className="absolute left-4 top-4 text-slate-500"
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search employee..."
        className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white outline-none"
      />

    </div>
  );
}