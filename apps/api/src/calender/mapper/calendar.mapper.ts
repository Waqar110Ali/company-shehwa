import { Injectable } from "@nestjs/common";

import { CalendarEvent } from "../schemas/calendar-event.schema";

@Injectable()
export class CalendarMapper {
  toResponse(
    event: any,
  ) {
    if (!event) {
      return null;
    }

    return {
      id:
        event._id?.toString() ??
        event.id,

      title:
        event.title,

      description:
        event.description,

      type:
        event.type,

      date:
        this.formatDate(
          event.date,
        ),

      startTime:
        event.startTime,

      endTime:
        event.endTime,

      location:
        event.location,

      attendees:
        this.mapAttendees(
          event.attendees,
        ),

      color:
        event.color,
    };
  }

  toList(
    events: CalendarEvent[],
  ) {
    return events.map(
      (event) =>
        this.toResponse(
          event,
        ),
    );
  }

  private mapAttendees(
    attendees: any[] = [],
  ) {
    return attendees.map(
      (employee) => {
        if (
          typeof employee ===
          "string"
        ) {
          return employee;
        }

        return (
          employee.fullName ??
          `${employee.firstName ?? ""} ${employee.lastName ?? ""}`.trim()
        );
      },
    );
  }

  private formatDate(
    value: Date | string,
  ) {
    if (!value) {
      return "";
    }

    return new Date(value)
      .toISOString()
      .split("T")[0];
  }
}