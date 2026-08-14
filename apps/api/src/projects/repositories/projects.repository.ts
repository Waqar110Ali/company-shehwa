import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import {
  InjectModel,
} from "@nestjs/mongoose";

import {
  FilterQuery,
  Model,
} from "mongoose";

import {
  Project,
  ProjectDocument,
} from "../schemas/project.schema";

import { CreateProjectDto } from "../dto/create-project.dto";
import { UpdateProjectDto } from "../dto/update-project.dto";
import { ProjectQueryDto } from "../dto/project-query.dto";

@Injectable()
export class ProjectsRepository {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  private readonly memberPopulate = {
    path: "members",
    select:
      "firstName lastName fullName designation avatar email",
  };

  async create(
    dto: CreateProjectDto,
  ) {
    const created =
      await this.projectModel.create({
        ...dto,

        startDate: new Date(
          dto.startDate,
        ),

        dueDate: new Date(
          dto.dueDate,
        ),
      });

    const project =
      await this.projectModel
        .findById(created._id)
        .populate(
          this.memberPopulate,
        )
        .lean();

    return project!;
  }

  async findAll(
    query: ProjectQueryDto,
  ) {
    const {
      page = 1,
      limit = 10,
      search,
      status,
      priority,
      sortBy = "createdAt",
      order = "desc",
    } = query;

    const filter: FilterQuery<Project> =
      {};

    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    const total =
      await this.projectModel.countDocuments(
        filter,
      );

    const projects =
      await this.projectModel
        .find(filter)
        .populate(
          this.memberPopulate,
        )
        .sort({
          [sortBy]:
            order === "asc"
              ? 1
              : -1,
        })
        .skip(
          (page - 1) * limit,
        )
        .limit(limit)
        .lean();

    return {
      items: projects,

      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(
          total / limit,
        ),
      },
    };
  }

  async findById(
    id: string,
  ) {
    const project =
      await this.projectModel
        .findById(id)
        .populate(
          this.memberPopulate,
        )
        .lean();

    if (!project) {
      throw new NotFoundException(
        "Project not found.",
      );
    }

    return project;
  }

  async update(
    id: string,
    dto: UpdateProjectDto,
  ) {
    const updated =
      await this.projectModel.findByIdAndUpdate(
        id,
        {
          ...dto,

          ...(dto.startDate && {
            startDate:
              new Date(
                dto.startDate,
              ),
          }),

          ...(dto.dueDate && {
            dueDate:
              new Date(
                dto.dueDate,
              ),
          }),
        },
        {
          new: true,
          runValidators: true,
        },
      );

    if (!updated) {
      throw new NotFoundException(
        "Project not found.",
      );
    }

    const project =
      await this.projectModel
        .findById(updated._id)
        .populate(
          this.memberPopulate,
        )
        .lean();

    return project!;
  }

  async remove(
    id: string,
  ) {
    const deleted =
      await this.projectModel.findByIdAndDelete(
        id,
      );

    if (!deleted) {
      throw new NotFoundException(
        "Project not found.",
      );
    }
  }

  async getStatistics() {
    const [
      total,
      active,
      completed,
      planning,
    ] = await Promise.all([
      this.projectModel.countDocuments(),

      this.projectModel.countDocuments({
        status: "Active",
      }),

      this.projectModel.countDocuments({
        status:
          "Completed",
      }),

      this.projectModel.countDocuments({
        status:
          "Planning",
      }),
    ]);

    return {
      total,
      active,
      completed,
      planning,
    };
  }
}