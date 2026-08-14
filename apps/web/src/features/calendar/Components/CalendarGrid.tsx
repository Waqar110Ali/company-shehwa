import EventCard from "./EventCard";

import type { CalendarEvent } from "../types/calendar";

interface Props {
  events: CalendarEvent[];

  onView: (event: CalendarEvent) => void;

  onEdit: (event: CalendarEvent) => void;

  onDelete: (id: string) => void;
}

export default function CalendarGrid({
  events,
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">

      {events.map((event) => (

        <EventCard
          key={event.id}
          event={event}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />

      ))}

    </div>
  );
}