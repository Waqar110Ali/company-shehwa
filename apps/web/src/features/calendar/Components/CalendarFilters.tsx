interface Props {
  value: string;

  onChange: (value: string) => void;
}

const types = [
  "",
  "Meeting",
  "Project",
  "Holiday",
  "Birthday",
  "Leave",
  "Interview",
  "Deadline",
];

export default function CalendarFilters({
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="rounded-2xl border border-white/10 bg-slate-900 px-5 py-4 text-white outline-none"
    >
      <option value="">
        All Events
      </option>

      {types
        .filter((type) => type !== "")
        .map((type) => (
          <option
            key={type}
            value={type}
          >
            {type}
          </option>
        ))}
    </select>
  );
}