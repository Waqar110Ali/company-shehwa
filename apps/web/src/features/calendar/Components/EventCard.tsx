import {
  CalendarDays,
  Clock,
  MapPin,
} from "lucide-react";

import GlassCard from "@/components/premium/GlassCard";

import EventTypeBadge from "./EventTypeBadge";
import EventActions from "./EventActions";

import type { CalendarEvent } from "../types/calendar";

interface Props {
  event: CalendarEvent;

  onView: (event: CalendarEvent) => void;

  onEdit: (event: CalendarEvent) => void;

  onDelete: (id: string) => void;
}

export default function EventCard({
  event,
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <GlassCard className="rounded-2xl border border-cyan-400/10 p-5 transition hover:border-cyan-400/30">

      <div className="flex items-start justify-between">

        <div className="flex-1">

          <h3 className="font-bold text-white">
            {event.title}
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            {event.description}
          </p>

        </div>

        <EventActions
          onView={() => onView(event)}
          onEdit={() => onEdit(event)}
          onDelete={() => onDelete(event.id)}
        />

      </div>

      <div className="mt-5 flex items-center justify-between">

        <EventTypeBadge type={event.type} />

      </div>

      <div className="mt-5 space-y-2 text-sm text-slate-400">

        <div className="flex items-center gap-2">

          <CalendarDays size={15} />

          {event.date}

        </div>

        <div className="flex items-center gap-2">

          <Clock size={15} />

          {event.startTime} - {event.endTime}

        </div>

        <div className="flex items-center gap-2">

          <MapPin size={15} />

          {event.location}

        </div>

      </div>

    </GlassCard>
  );
}