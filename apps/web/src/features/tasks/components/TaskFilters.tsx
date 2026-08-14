interface Props {
  value: string;

  onChange: (value: string) => void;
}

const filters = [
  "",
  "Todo",
  "In Progress",
  "Review",
  "Completed",
];

export default function TaskFilters({
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="w-full rounded-2xl border border-white/10 bg-slate-900 p-4 text-white outline-none focus:border-cyan-400"
    >
      {filters.map((filter) => (
        <option
          key={filter}
          value={filter}
        >
          {filter === ""
            ? "All Status"
            : filter}
        </option>
      ))}
    </select>
  );
}