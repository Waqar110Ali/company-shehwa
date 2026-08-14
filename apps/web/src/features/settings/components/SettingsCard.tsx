import type { ReactNode } from "react";

interface Props {
  title: string;

  description?: string;

  children: ReactNode;
}

export default function SettingsCard({
  title,
  description,
  children,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-white">
          {title}
        </h2>

        {description && (
          <p className="mt-2 text-slate-400">
            {description}
          </p>
        )}

      </div>

      {children}

    </div>
  );
}