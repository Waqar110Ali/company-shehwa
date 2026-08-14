export type EventType =
  | "Meeting"
  | "Project"
  | "Holiday"
  | "Birthday"
  | "Leave"
  | "Interview"
  | "Deadline";

export interface EventAttendee {
  id: string;

  name: string;

  department?: string;

  avatar?: string;
}

export interface CalendarEvent {
  id: string;

  title: string;

  description: string;

  type: EventType;

  date: string;

  startTime: string;

  endTime: string;

  location: string;

  attendees: EventAttendee[];

  color: string;
}