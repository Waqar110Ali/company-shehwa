import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  X,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import EventTypeBadge from "./EventTypeBadge";

import type { CalendarEvent } from "../types/calendar";

interface Props {
  open: boolean;

  event: CalendarEvent | null;

  onClose: () => void;
}

export default function EventDetailsDrawer({
  open,
  event,
  onClose,
}: Props) {
  if (!event) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          onClose();
        }
      }}
    >
      <DialogContent
 className="
 bg-slate-950/95
 backdrop-blur-xl
 border
 border-cyan-500/20
 rounded-3xl
 shadow-[0_0_80px_rgba(6,182,212,.18)]
 p-0
 overflow-hidden
 max-w-3xl
"
>

        <DialogHeader>

          <div className="flex items-center justify-between">

            <DialogTitle className="text-2xl">
              Event Details
            </DialogTitle>

            <button
              onClick={onClose}
              className="rounded-lg p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X size={18} />
            </button>

          </div>

        </DialogHeader>

        <div className="space-y-6">

          <div>

            <h2 className="text-3xl font-bold">
              {event.title}
            </h2>

            <div className="mt-3">

              <EventTypeBadge
                type={event.type}
              />

            </div>

          </div>

          <p className="leading-7 text-slate-500 dark:text-slate-400">
            {event.description}
          </p>

          <div className="space-y-4 rounded-xl border p-5">

            <div className="flex items-center gap-3">

              <CalendarDays
                size={18}
              />

              <span>
                {event.date}
              </span>

            </div>

            <div className="flex items-center gap-3">

              <Clock
                size={18}
              />

              <span>
                {event.startTime} –{" "}
                {event.endTime}
              </span>

            </div>

            <div className="flex items-center gap-3">

              <MapPin
                size={18}
              />

              <span>
                {event.location}
              </span>

            </div>

          </div>

          <div>

            <div className="mb-4 flex items-center gap-2">

              <Users
                size={18}
              />

              <h3 className="font-semibold">
                Attendees
              </h3>

            </div>

            {event.attendees.length ===
            0 ? (
              <p className="text-sm text-slate-500">
                No attendees assigned.
              </p>
            ) : (
              <div className="space-y-3">

                {event.attendees.map(
                  (
                    attendee,
                  ) => (
                    <div
                      key={
                        attendee.id
                      }
                      className="flex items-center gap-3 rounded-xl border p-3"
                    >
                      <img
                        src={
                          attendee.avatar ??
                          `https://i.pravatar.cc/150?u=${attendee.id}`
                        }
                        alt={
                          attendee.name
                        }
                        className="h-10 w-10 rounded-full object-cover"
                      />

                      <div>

                        <p className="font-medium">
                          {
                            attendee.name
                          }
                        </p>

                        <p className="text-sm text-slate-500">
                          {attendee.department ??
                            "Employee"}
                        </p>

                      </div>

                    </div>
                  ),
                )}

              </div>
            )}

          </div>

        </div>

      </DialogContent>
    </Dialog>
  );
}