import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import EventForm from "./EventForm";

import type { CalendarEvent } from "../types/calendar";

interface Props {
  open: boolean;

  event?: CalendarEvent | null;

  onClose: () => void;

  onSubmit: (data: any) => void;
}

export default function EventModal({
  open,
  event,
  onClose,
  onSubmit,
}: Props) {
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
        max-h-[92vh]
        max-w-3xl
        overflow-y-auto
        border
        border-cyan-500/20
        bg-slate-950
        p-0
        shadow-[0_0_80px_rgba(6,182,212,.15)]
      "
      >
        <DialogHeader className="border-b border-slate-800 px-8 py-6">

          <DialogTitle className="text-2xl font-bold text-white">

            {event ? "Edit Event" : "Create Event"}

          </DialogTitle>

        </DialogHeader>

        <div className="p-8">

          <EventForm
            initialData={event ?? undefined}
            onSubmit={onSubmit}
          />

        </div>

      </DialogContent>
    </Dialog>
  );
}