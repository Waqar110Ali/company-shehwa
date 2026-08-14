import {
  Injectable,
} from "@nestjs/common";

import {
  InjectModel,
} from "@nestjs/mongoose";

import {
  FilterQuery,
  Model,
} from "mongoose";

import {
  CalendarEvent,
  CalendarEventDocument,
} from "../schemas/calendar-event.schema";

import {
  CalendarFilterDto,
} from "../dto/calendar-filter.dto";

@Injectable()
export class CalendarRepository {
  constructor(
    @InjectModel(
      CalendarEvent.name,
    )
    private readonly calendarModel: Model<CalendarEventDocument>,
  ) {}

  async create(
    data: Partial<CalendarEvent>,
  ) {
    return this.calendarModel.create(
      data,
    );
  }

  async findAll(
    filter: CalendarFilterDto,
  ) {
    const {
      search,
      type,
      page = "1",
      limit = "10",
      sortBy = "date",
      order = "asc",
    } = filter;

    const query: FilterQuery<CalendarEventDocument> =
      {};

    if (search) {
      query.$or = [
        {
          title: {
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
        {
          location: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (type) {
      query.type = type;
    }

    const currentPage =
      Number(page);

    const pageSize =
      Number(limit);

    const total =
      await this.calendarModel.countDocuments(
        query,
      );

    const items =
      await this.calendarModel
        .find(query)
        .populate(
          "attendees",
          "firstName lastName email avatar",
        )
        .sort({
          [sortBy]:
            order === "asc"
              ? 1
              : -1,
        })
        .skip(
          (currentPage - 1) *
            pageSize,
        )
        .limit(pageSize)
        .lean();

    return {
      items,
      pagination: {
        page:
          currentPage,
        limit:
          pageSize,
        total,
        totalPages:
          Math.ceil(
            total /
              pageSize,
          ),
      },
    };
  }

  async findById(
    id: string,
  ) {
    return this.calendarModel
      .findById(id)
      .populate(
        "attendees",
        "firstName lastName email avatar",
      );
  }

  async update(
    id: string,
    data: Partial<CalendarEvent>,
  ) {
    return this.calendarModel
      .findByIdAndUpdate(
        id,
        data,
        {
          new: true,
        },
      )
      .populate(
        "attendees",
        "firstName lastName email avatar",
      );
  }

  async remove(
    id: string,
  ) {
    return this.calendarModel.findByIdAndDelete(
      id,
    );
  }

  async statistics() {
    const today =
      new Date();

    today.setHours(
      0,
      0,
      0,
      0,
    );

    const tomorrow =
      new Date(
        today,
      );

    tomorrow.setDate(
      tomorrow.getDate() +
        1,
    );

    const [
      total,
      todayEvents,
      meetings,
      birthdays,
      deadlines,
    ] =
      await Promise.all([
        this.calendarModel.countDocuments(),
        this.calendarModel.countDocuments(
          {
            date: {
              $gte: today,
              $lt: tomorrow,
            },
          },
        ),
        this.calendarModel.countDocuments(
          {
            type: "Meeting",
          },
        ),
        this.calendarModel.countDocuments(
          {
            type: "Birthday",
          },
        ),
        this.calendarModel.countDocuments(
          {
            type: "Deadline",
          },
        ),
      ]);

    return {
      total,
      todayEvents,
      meetings,
      birthdays,
      deadlines,
    };
  }

  async upcoming(
    limit = 5,
  ) {
    return this.calendarModel
      .find({
        date: {
          $gte:
            new Date(),
        },
      })
      .populate(
        "attendees",
        "firstName lastName email avatar",
      )
      .sort({
        date: 1,
        startTime: 1,
      })
      .limit(limit)
      .lean();
  }
}