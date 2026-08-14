import type {
  Project,
  TeamMember,
} from "../types/project";

export interface ProjectsResponse {
  items: Project[];

  pagination: {
    page: number;

    limit: number;

    total: number;

    totalPages: number;
  };
}

export interface ProjectStatistics {
  total: number;

  active: number;

  completed: number;

  planning: number;
}

function mapMember(
  member: any,
): TeamMember {
  const id =
    member?._id ??
    member?.id ??
    "";

  const name =
    member?.fullName ??
    `${member?.firstName ?? ""} ${member?.lastName ?? ""}`.trim();

  return {
    id,

    name,

    role:
      member?.designation ??
      member?.role ??
      "",

    avatar:
      member?.avatar ||
      `https://i.pravatar.cc/150?u=${id}`,
  };
}

function mapProject(
  project: any,
): Project {
  return {
    id:
      project?._id ??
      project?.id ??
      "",

    name:
      project?.name ??
      "",

    description:
      project?.description ??
      "",

    status:
      project?.status ??
      "Planning",

    priority:
      project?.priority ??
      "Medium",

    progress:
      project?.progress ??
      0,

    totalTasks:
      project?.totalTasks ??
      0,

    completedTasks:
      project?.completedTasks ??
      0,

    startDate:
      project?.startDate ??
      "",

    dueDate:
      project?.dueDate ??
      "",

    members: Array.isArray(
      project?.members,
    )
      ? project.members.map(
          mapMember,
        )
      : [],
  };
}

export function mapProjects(
  response: any,
): ProjectsResponse {
  const data =
    response?.data ??
    response;

  return {
    items: Array.isArray(
      data?.items,
    )
      ? data.items.map(
          mapProject,
        )
      : [],

    pagination:
      data?.pagination ?? {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
      },
  };
}

export function mapProjectDetails(
  response: any,
): Project {
  const data =
    response?.data ??
    response;

  return mapProject(data);
}

export function mapProjectStatistics(
  response: any,
): ProjectStatistics {
  const data =
    response?.data ??
    response;

  return {
    total:
      data?.total ??
      0,

    active:
      data?.active ??
      0,

    completed:
      data?.completed ??
      0,

    planning:
      data?.planning ??
      0,
  };
}