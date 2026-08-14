import type { CalendarEvent } from "../types/calendar";

export const events: CalendarEvent[] = [
  {
    id: "1",

    title: "Weekly Team Meeting",

    description:
      "Discuss weekly project progress and blockers.",

    type: "Meeting",

    date: "2026-07-20",

    startTime: "10:00",

    endTime: "11:00",

    location: "Conference Room",

    attendees: [
      "Waqar Ali",
      "Ahmed",
      "Sara",
    ],

    color: "#06b6d4",
  },

  {
    id: "2",

    title: "AI Dashboard Deadline",

    description:
      "Final frontend completion deadline.",

    type: "Deadline",

    date: "2026-07-23",

    startTime: "17:00",

    endTime: "18:00",

    location: "Remote",

    attendees: [
      "Development Team",
    ],

    color: "#ef4444",
  },

  {
    id: "3",

    title: "Sara Birthday",

    description:
      "Celebrate Sara's birthday.",

    type: "Birthday",

    date: "2026-07-25",

    startTime: "13:00",

    endTime: "14:00",

    location: "Office",

    attendees: [
      "All Employees",
    ],

    color: "#ec4899",
  },
];