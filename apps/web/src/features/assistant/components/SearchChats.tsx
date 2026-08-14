import { Search } from "lucide-react";

interface Props {
  value: string;

  onChange: (value: string) => void;
}

export default function SearchChats({
  value,
  onChange,
}: Props) {
  return (
    <div className="p-4">

      <div className="flex items-center rounded-xl bg-white/5 px-4">

        <Search
          size={18}
          className="text-slate-400"
        />

        <input
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder="Search chats..."
          className="w-full bg-transparent p-3 text-white outline-none"
        />

      </div>

    </div>
  );
}