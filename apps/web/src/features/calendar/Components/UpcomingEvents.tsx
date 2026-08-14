import EventCard from "./EventCard";

import type { CalendarEvent } from "../types/calendar";

interface Props {
  events: CalendarEvent[];

  onView: (
    event: CalendarEvent,
  ) => void;

  onEdit: (
    event: CalendarEvent,
  ) => void;

  onDelete: (
    id: string,
  ) => void;
}

export default function UpcomingEvents({
  events,
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Upcoming Events
      </h2>

      {events.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 py-10 text-center text-slate-500">
          No upcoming events.
        </div>
      ) : (
        <div className="space-y-5">

          {events.map(
            (event) => (
              <EventCard
                key={event.id}
                event={event}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ),
          )}

        </div>
      )}

    </div>
  );
}