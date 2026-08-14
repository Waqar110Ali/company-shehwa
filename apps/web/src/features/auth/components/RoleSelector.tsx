interface RoleSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const roles = [
  "ADMIN",
  "HR",
  "MANAGER",
  "EMPLOYEE",
  "AI",
  "CLIENT"
];

export default function RoleSelector({
  value,
  onChange,
}: RoleSelectorProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        Applying As
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-5 text-white backdrop-blur-xl outline-none focus:border-cyan-400/40"
      >
        <option value="">Select Role</option>

        {roles.map((role) => (
          <option
            key={role}
            value={role}
            className="bg-slate-900"
          >
            {role}
          </option>
        ))}
      </select>
    </div>
  );
}