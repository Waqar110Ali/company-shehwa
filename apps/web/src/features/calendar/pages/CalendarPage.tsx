import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Plus } from "lucide-react";

import { appToast } from "@/lib/toast";
import { isCalConfigured } from "@/features/booking";

import CalendarHeader from "../Components/CalendarHeader";
import CalendarStats from "../Components/CalendarStats";
import CalendarSearch from "../Components/CalendarSearch";
import CalendarFilters from "../Components/CalendarFilters";
import CalendarGrid from "../Components/CalendarGrid";
import UpcomingEvents from "../Components/UpcomingEvents";
import EventModal from "../Components/EventModal";
import EventDetailsDrawer from "../Components/EventDetailsDrawer";

import type { CalendarEvent } from "../types/calendar";

import { useCalendar } from "../hooks/useCalendar";
import { useCalendarStatistics } from "../hooks/useCalendarStatistics";
import { useUpcomingEvents } from "../hooks/useUpcomingEvents";
import { useCreateCalendar } from "../hooks/useCreateCalendar";
import { useUpdateCalendar } from "../hooks/useUpdateCalendar";
import { useDeleteCalendar } from "../hooks/useDeleteCalendar";

import {
  mapCalendarEvents,
  mapCalendarStatistics,
  mapUpcomingEvents,
} from "../mapper/calendar.mapper";

export default function CalendarPage() {
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("");

  const [modalOpen, setModalOpen] =
    useState(false);

  const [editingEvent, setEditingEvent] =
    useState<CalendarEvent | null>(null);

  const [selectedEvent, setSelectedEvent] =
    useState<CalendarEvent | null>(null);

  const {
    data: eventsResponse,
    isLoading,
  } = useCalendar({
    search,
    type: filter,
  });

  const {
    data: statisticsResponse,
  } = useCalendarStatistics();

  const {
    data: upcomingResponse,
  } = useUpcomingEvents();

  const createMutation =
    useCreateCalendar();

  const updateMutation =
    useUpdateCalendar();

  const deleteMutation =
    useDeleteCalendar();

  const events = useMemo(() => {
    if (!eventsResponse) {
      return [];
    }

    return mapCalendarEvents(
      eventsResponse,
    ).items;
  }, [eventsResponse]);

  const statistics = useMemo(() => {
    if (!statisticsResponse) {
      return {
        total: 0,
        today: 0,
        meetings: 0,
        birthdays: 0,
        deadlines: 0,
      };
    }

    return mapCalendarStatistics(
      statisticsResponse,
    );
  }, [statisticsResponse]);

  const upcomingEvents = useMemo(() => {
    if (!upcomingResponse) {
      return [];
    }

    return mapUpcomingEvents(
      upcomingResponse,
    );
  }, [upcomingResponse]);

  async function saveEvent(
    event: CalendarEvent,
  ) {
    try {
      if (editingEvent) {
        await updateMutation.mutateAsync({
          id: editingEvent.id,
          data: {
            title: event.title,
            description:
              event.description,
            type: event.type,
            date: event.date,
            startTime:
              event.startTime,
            endTime: event.endTime,
            location:
              event.location,
            attendees:
              event.attendees,
            color: event.color,
          },
        });

        appToast.success(
          "Event updated successfully.",
        );
      } else {
        await createMutation.mutateAsync({
          title: event.title,
          description:
            event.description,
          type: event.type,
          date: event.date,
          startTime:
            event.startTime,
          endTime: event.endTime,
          location:
            event.location,
          attendees:
            event.attendees,
          color: event.color,
        });

        appToast.success(
          "Event created successfully.",
        );
      }

      setModalOpen(false);
      setEditingEvent(null);
    } catch (error) {
      console.error(error);

      appToast.error(
        "Unable to save event.",
      );
    }
  }

  async function handleDelete(
    id: string,
  ) {
    if (
      !window.confirm(
        "Delete this event?",
      )
    ) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(id);

      appToast.success(
        "Event deleted successfully.",
      );

      if (
        selectedEvent?.id === id
      ) {
        setSelectedEvent(null);
      }
    } catch (error) {
      console.error(error);

      appToast.error(
        "Unable to delete event.",
      );
    }
  }

  function handleEdit(
    event: CalendarEvent,
  ) {
    setEditingEvent(event);
    setModalOpen(true);
  }

  if (isLoading) {
    return (
      <div className="py-20 text-center text-slate-400">
        Loading Calendar...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <CalendarHeader
          currentMonth={new Date().toLocaleString(
            "default",
            {
              month: "long",
              year: "numeric",
            },
          )}
        />

        <div className="flex flex-wrap items-center gap-3">
          {isCalConfigured() && (
            <Link
              to="/book"
              className="flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-5 py-3 font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
            >
              <CalendarDays size={18} />
              Book Meeting
            </Link>
          )}

          <button
            onClick={() => {
              setEditingEvent(null);
              setModalOpen(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-white transition hover:bg-cyan-600"
          >
            <Plus size={18} />
            Add Event
          </button>
        </div>
      </div>

      <CalendarStats
        statistics={statistics}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <CalendarSearch
          value={search}
          onChange={setSearch}
        />

        <CalendarFilters
          value={filter}
          onChange={setFilter}
        />
      </div>

      <div className="grid gap-8 xl:grid-cols-3">
        <div className="space-y-8 xl:col-span-2">
          <CalendarGrid
            events={events}
            onView={
              setSelectedEvent
            }
            onEdit={
              handleEdit
            }
            onDelete={
              handleDelete
            }
          />
        </div>

        <UpcomingEvents
          events={upcomingEvents}
          onView={
            setSelectedEvent
          }
          onEdit={
            handleEdit
          }
          onDelete={
            handleDelete
          }
        />
      </div>

      <EventModal
        open={modalOpen}
        event={editingEvent}
        onClose={() => {
          setModalOpen(false);
          setEditingEvent(null);
        }}
        onSubmit={saveEvent}
      />

      <EventDetailsDrawer
        open={
          selectedEvent !==
          null
        }
        event={selectedEvent}
        onClose={() =>
          setSelectedEvent(null)
        }
      />
    </div>
  );
}