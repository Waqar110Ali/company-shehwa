import { Types } from "mongoose";

export class ProjectMapper {
  static toList(project: any) {
    return {
      id: project._id.toString(),

      name: project.name,

      description: project.description,

      status: project.status,

      priority: project.priority,

      progress: project.progress,

      totalTasks: project.totalTasks,

      completedTasks: project.completedTasks,

      startDate: project.startDate
        ? new Date(project.startDate)
            .toISOString()
            .split("T")[0]
        : "",

      dueDate: project.dueDate
        ? new Date(project.dueDate)
            .toISOString()
            .split("T")[0]
        : "",

      members:
        project.members?.map(
          (member: any) => ({
            id: member._id.toString(),

            name: `${member.firstName} ${member.lastName}`,

            avatar:
              member.avatar ?? "",

            role:
              member.designation,
          }),
        ) ?? [],
    };
  }

  static toDetails(project: any) {
    return this.toList(project);
  }

  static toCollection(projects: any[]) {
    return projects.map((project) =>
      this.toList(project),
    );
  }

  static statistics(stats: any) {
    return {
      total: stats.total,

      active: stats.active,

      completed: stats.completed,

      planning: stats.planning,
    };
  }
}