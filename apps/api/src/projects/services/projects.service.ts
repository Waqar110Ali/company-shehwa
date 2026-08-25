import { Injectable, Inject } from "@nestjs/common";

import { CreateProjectDto } from "../dto/create-project.dto";
import { UpdateProjectDto } from "../dto/update-project.dto";
import { ProjectQueryDto } from "../dto/project-query.dto";

import { ProjectMapper } from "../mappers/project.mapper";
import { ProjectsRepository } from "../repositories/projects.repository";

@Injectable()
export class ProjectsService {
  constructor(
    @Inject(ProjectsRepository) private readonly repository: ProjectsRepository,
  ) {}

  async create(
    dto: CreateProjectDto,
  ) {
    const project =
      await this.repository.create(dto);

    return ProjectMapper.toDetails(
      project,
    );
  }

  async findAll(
    query: ProjectQueryDto,
  ) {
    const result =
      await this.repository.findAll(
        query,
      );

    return {
      items:
        ProjectMapper.toCollection(
          result.items,
        ),

      pagination:
        result.pagination,
    };
  }

  async findById(
    id: string,
  ) {
    const project =
      await this.repository.findById(
        id,
      );

    return ProjectMapper.toDetails(
      project,
    );
  }

  async update(
    id: string,
    dto: UpdateProjectDto,
  ) {
    const project =
      await this.repository.update(
        id,
        dto,
      );

    return ProjectMapper.toDetails(
      project,
    );
  }

  async remove(
    id: string,
  ) {
    await this.repository.remove(
      id,
    );

    return {
      message:
        "Project deleted successfully.",
    };
  }

  async getStatistics() {
    const statistics =
      await this.repository.getStatistics();

    return ProjectMapper.statistics(
      statistics,
    );
  }
}