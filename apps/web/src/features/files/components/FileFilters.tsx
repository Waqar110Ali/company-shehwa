interface Props {
  value: string;

  onChange: (
    value: string,
  ) => void;
}

const options = [
  "",
  "folder",
  "image",
  "document",
  "pdf",
  "video",
  "spreadsheet",
];

export default function FileFilters({
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(
          e.target.value,
        )
      }
      className="w-full rounded-2xl border border-white/10 bg-slate-900 p-4 text-white outline-none"
    >
      <option value="">
        All Files
      </option>

      {options
        .slice(1)
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