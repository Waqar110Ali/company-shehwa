// import {
//   useMemo,
//   useState,
// } from "react";

// import ProjectHeader from "@/features/projects/components/ProjectHeader";
// import ProjectGrid from "@/features/projects/components/ProjectGrid";
// import SearchBar from "@/features/projects/components/SearchBar";
// import FilterBar from "@/features/projects/components/FilterBar";
// import ProjectStats from "@/features/projects/components/ProjectStats";

// import { appToast } from "@/lib/toast";

// import { useProjects } from "@/features/projects/hooks/useProjects";
// import { useProjectStatistics } from "@/features/projects/hooks/useProjectStatistics";

// import {
//   mapProjects,
//   mapProjectStatistics,
// } from "@/features/projects/mapper/project.mapper";

// export default function ProjectsPage() {
//   const [search, setSearch] =
//     useState("");

//   const [status, setStatus] =
//     useState("All");

//   const {
//     data: projectsResponse,
//     isLoading: projectsLoading,
//   } = useProjects({
//     search,
//     status:
//       status === "All"
//         ? undefined
//         : status,
//   });

//   const {
//     data: statisticsResponse,
//     isLoading: statisticsLoading,
//   } = useProjectStatistics();

//   const projects = useMemo(() => {
//   console.log("================================");
//   console.log("Raw API Response:");
//   console.log(projectsResponse);

//   if (!projectsResponse) {
//     console.log("No response received");
//     return [];
//   }

//   const mapped = mapProjects(projectsResponse);

//   console.log("Mapped Response:");
//   console.log(mapped);

//   console.log("Mapped Projects:");
//   console.log(mapped.items);

//   console.log("Projects Count:", mapped.items.length);
//   console.log("================================");

//   return mapped.items;
// }, [projectsResponse]);

//   const statistics =
//     useMemo(() => {
//       if (!statisticsResponse) {
//         return {
//           total: 0,
//           active: 0,
//           completed: 0,
//           planning: 0,
//         };
//       }

//       return mapProjectStatistics(
//         statisticsResponse,
//       );
//     }, [statisticsResponse]);

//   function handleSearch(
//     value: string,
//   ) {
//     setSearch(value);

//     if (value.trim()) {
//       appToast.info(
//         `Searching "${value}"`,
//       );
//     }
//   }

//   function handleStatus(
//     value: string,
//   ) {
//     setStatus(value);

//     appToast.info(
//       `Filter: ${value}`,
//     );
//   }

//   if (
//     projectsLoading ||
//     statisticsLoading
//   ) {
//     return (
//       <div className="py-20 text-center text-slate-400">
//         Loading projects...
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       <ProjectHeader />

//       <ProjectStats
//         total={statistics.total}
//         active={statistics.active}
//         completed={
//           statistics.completed
//         }
//         planning={
//           statistics.planning
//         }
//       />

//       <SearchBar
//         value={search}
//         onChange={handleSearch}
//       />

//       <FilterBar
//         status={status}
//         setStatus={handleStatus}
//       />

//       <ProjectGrid
//         projects={projects}
//       />
//     </div>
//   );
// }


// apps/web/src/features/projects/pages/ProjectsPage.tsx
import { useMemo, useState } from "react";

import ProjectHeader from "@/features/projects/components/ProjectHeader";
import ProjectGrid from "@/features/projects/components/ProjectGrid";
import SearchBar from "@/features/projects/components/SearchBar";
import FilterBar from "@/features/projects/components/FilterBar";
import ProjectStats from "@/features/projects/components/ProjectStats";

import { appToast } from "@/lib/toast";

import { useProjects } from "@/features/projects/hooks/useProjects";
import { useProjectStatistics } from "@/features/projects/hooks/useProjectStatistics";

import {
  mapProjects,
  mapProjectStatistics,
} from "@/features/projects/mapper/project.mapper";

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const { data: projectsResponse, isLoading: projectsLoading } = useProjects({
    search,
    status: status === "All" ? undefined : status,
  });

  const { data: statisticsResponse, isLoading: statisticsLoading } =
    useProjectStatistics();

  const projects = useMemo(() => {
    if (!projectsResponse) {
      return [];
    }

    return mapProjects(projectsResponse).items;
  }, [projectsResponse]);

  const statistics = useMemo(() => {
    if (!statisticsResponse) {
      return { total: 0, active: 0, completed: 0, planning: 0 };
    }

    return mapProjectStatistics(statisticsResponse);
  }, [statisticsResponse]);

  function handleSearch(value: string) {
    setSearch(value);
  }

  function handleStatus(value: string) {
    setStatus(value);
  }

  if (projectsLoading || statisticsLoading) {
    return (
      <div className="py-20 text-center text-slate-400">
        Loading projects...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ProjectHeader />

      <ProjectStats
        total={statistics.total}
        active={statistics.active}
        completed={statistics.completed}
        planning={statistics.planning}
      />

      <SearchBar value={search} onChange={handleSearch} />

      <FilterBar status={status} setStatus={handleStatus} />

      <ProjectGrid projects={projects} />
    </div>
  );
}