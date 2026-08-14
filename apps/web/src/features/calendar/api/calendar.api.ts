import { api } from "@/lib/api";

export interface CalendarQuery {
  search?: string;

  type?: string;

  date?: string;

  month?: string;

  year?: string;

  page?: number;

  limit?: number;
}

export interface CreateCalendarEventRequest {
  title: string;

  description: string;

  type:
    | "Meeting"
    | "Project"
    | "Holiday"
    | "Birthday"
    | "Leave"
    | "Interview"
    | "Deadline";

  date: string;

  startTime: string;

  endTime: string;

  location: string;

  attendees: string[];

  color: string;
}

export interface UpdateCalendarEventRequest
  extends Partial<CreateCalendarEventRequest> {}

export interface CalendarListResponse {
  items: any[];

  pagination: {
    page: number;

    limit: number;

    total: number;

    totalPages: number;
  };
}

export interface CalendarStatisticsResponse {
  total: number;

  today: number;

  meetings: number;

  birthdays: number;

  deadlines: number;
}

export const calendarApi = {
  async getAll(
    params?: CalendarQuery,
  ) {
    return api.get<CalendarListResponse>(
      "/calendar",
      {
        params,
      },
    );
  },

  async getById(
    id: string,
  ) {
    return api.get(
      `/calendar/${id}`,
    );
  },

  async create(
    data: CreateCalendarEventRequest,
  ) {
    return api.post(
      "/calendar",
      data,
    );
  },

  async update(
    id: string,
    data: UpdateCalendarEventRequest,
  ) {
    return api.patch(
      `/calendar/${id}`,
      data,
    );
  },

  async delete(
    id: string,
  ) {
    return api.delete(
      `/calendar/${id}`,
    );
  },

  async statistics() {
    return api.get<CalendarStatisticsResponse>(
      "/calendar/statistics",
    );
  },

  async upcoming() {
    return api.get(
      "/calendar/upcoming",
    );
  },
};