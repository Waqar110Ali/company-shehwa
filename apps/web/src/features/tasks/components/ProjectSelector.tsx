import { useMemo } from "react";

import { Check } from "lucide-react";

import { useProjects } from "@/features/projects/hooks/useProjects";
import { mapProjects } from "@/features/projects/mapper/project.mapper";

interface Props {
  value: string;

  onChange: (
    value: string,
  ) => void;
}

export default function ProjectSelector({
  value,
  onChange,
}: Props) {
  const {
    data,
    isLoading,
  } = useProjects({});

  const projects =
    useMemo(() => {
      if (!data) {
        return [];
      }

      return mapProjects(data)
        .items;
    }, [data]);

  if (isLoading) {
    return (
      <div className="rounded-xl border border-white/10 p-4 text-slate-400">
        Loading projects...
      </div>
    );
  }

  return (
    <div className="space-y-3">

      <label className="text-sm font-semibold text-slate-300">
        Project
      </label>

      <div className="overflow-hidden rounded-2xl border border-white/10">

        {projects.map(
          (project) => {
            const active =
              project.id ===
              value;

            return (
              <button
                key={
                  project.id
                }
                type="button"
                onClick={() =>
                  onChange(
                    project.id,
                  )
                }
                className={`flex w-full items-center justify-between border-b border-white/10 p-4 transition hover:bg-white/5 ${
                  active
                    ? "bg-cyan-500/10"
                    : ""
                }`}
              >
                <div>

                  <h4 className="font-semibold text-white">
                    {
                      project.name
                    }
                  </h4>

                  <p className="text-sm text-slate-400">
                    {
                      project.status
                    }
                  </p>

                </div>

                {active && (
                  <Check
                    size={20}
                    className="text-cyan-400"
                  />
                )}

              </button>
            );
          },
        )}

      </div>

    </div>
  );
}