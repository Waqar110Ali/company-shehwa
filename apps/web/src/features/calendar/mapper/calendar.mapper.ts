import type { CalendarEvent } from "../types/calendar";

export interface CalendarResponse {
  items: any[];

  pagination: {
    page: number;

    limit: number;

    total: number;

    totalPages: number;
  };
}

export interface CalendarStatistics {
  total: number;

  meetings: number;

  birthdays: number;

  deadlines: number;

  today: number;
}

export function mapCalendarEvent(
  event: any,
): CalendarEvent {
  return {
    id:
      event.id ??
      event._id,

    title:
      event.title ?? "",

    description:
      event.description ??
      "",

    type:
      event.type,

    date: event.date
      ? new Date(event.date)
          .toISOString()
          .split("T")[0]
      : "",

    startTime:
      event.startTime ??
      "",

    endTime:
      event.endTime ??
      "",

    location:
      event.location ??
      "",

   attendees:
  event.attendees?.map(
    (employee: any) => ({
      id:
        employee._id ??
        employee.id,

      name:
        employee.fullName ??
        `${employee.firstName ?? ""} ${employee.lastName ?? ""}`.trim(),

      department:
        employee.department,

      avatar:
        employee.avatar,
    }),
  ) ?? [],

    color:
      event.color ??
      "#06b6d4",
  };
}

export function mapCalendarEvents(
  response: CalendarResponse,
) {
  return {
    items:
      response.items.map(
        mapCalendarEvent,
      ),

    pagination:
      response.pagination,
  };
}

export function mapUpcomingEvents(
  response: any[],
) {
  return response.map(
    mapCalendarEvent,
  );
}

export function mapCalendarStatistics(
  statistics: any,
): CalendarStatistics {
  return {
    total:
      statistics.total ?? 0,

    meetings:
      statistics.meetings ??
      0,

    birthdays:
      statistics.birthdays ??
      0,

    deadlines:
      statistics.deadlines ??
      0,

    today:
      statistics.today ?? 0,
  };
}