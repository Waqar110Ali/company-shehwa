import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { Types } from "mongoose";

import { CalendarRepository } from "../repository/calendar.repository";
import { CalendarMapper } from "../mapper/calendar.mapper";

import { CreateCalendarEventDto } from "../dto/create-calendar-event.dto";
import { UpdateCalendarEventDto } from "../dto/update-calendar-event.dto";
import { CalendarFilterDto } from "../dto/calendar-filter.dto";

@Injectable()
export class CalendarService {
  constructor(
    private readonly calendarRepository: CalendarRepository,
    private readonly calendarMapper: CalendarMapper,
  ) {}

  async create(
    dto: CreateCalendarEventDto,
  ) {
    const event =
      await this.calendarRepository.create({
        title: dto.title,
        description: dto.description,
        type: dto.type,
        date: new Date(dto.date),
        startTime: dto.startTime,
        endTime: dto.endTime,
        location: dto.location,
        attendees:
          dto.attendees?.map(
            (id) =>
              new Types.ObjectId(id),
          ) ?? [],
        color: dto.color,
      });

    return this.calendarMapper.toResponse(
      event,
    );
  }

  async findAll(
    filter: CalendarFilterDto,
  ) {
    const result =
      await this.calendarRepository.findAll(
        filter,
      );

    return {
      items:
        this.calendarMapper.toList(
          result.items,
        ),
      pagination:
        result.pagination,
    };
  }

  async findOne(
    id: string,
  ) {
    const event =
      await this.calendarRepository.findById(
        id,
      );

    if (!event) {
      throw new NotFoundException(
        "Calendar event not found.",
      );
    }

    return this.calendarMapper.toResponse(
      event,
    );
  }

  async update(
    id: string,
    dto: UpdateCalendarEventDto,
  ) {
    const updateData: any = {};

    if (dto.title !== undefined) {
      updateData.title = dto.title;
    }

    if (
      dto.description !== undefined
    ) {
      updateData.description =
        dto.description;
    }

    if (dto.type !== undefined) {
      updateData.type = dto.type;
    }

    if (dto.date !== undefined) {
      updateData.date = new Date(
        dto.date,
      );
    }

    if (
      dto.startTime !== undefined
    ) {
      updateData.startTime =
        dto.startTime;
    }

    if (dto.endTime !== undefined) {
      updateData.endTime =
        dto.endTime;
    }

    if (
      dto.location !== undefined
    ) {
      updateData.location =
        dto.location;
    }

    if (
      dto.attendees !== undefined
    ) {
      updateData.attendees =
        dto.attendees.map(
          (id) =>
            new Types.ObjectId(id),
        );
    }

    if (dto.color !== undefined) {
      updateData.color = dto.color;
    }

    const event =
      await this.calendarRepository.update(
        id,
        updateData,
      );

    if (!event) {
      throw new NotFoundException(
        "Calendar event not found.",
      );
    }

    return this.calendarMapper.toResponse(
      event,
    );
  }

  async remove(
    id: string,
  ) {
    const event =
      await this.calendarRepository.remove(
        id,
      );

    if (!event) {
      throw new NotFoundException(
        "Calendar event not found.",
      );
    }

    return {
      message:
        "Calendar event deleted successfully.",
    };
  }

  async statistics() {
    return this.calendarRepository.statistics();
  }

  async upcoming() {
    const events =
      await this.calendarRepository.upcoming();

    return this.calendarMapper.toList(
      events,
    );
  }
}