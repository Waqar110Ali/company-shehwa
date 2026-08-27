import { useEffect, useMemo, useState } from "react";
import { format, addDays, parseISO, isSameDay } from "date-fns";
import { CalendarDays, CheckCircle2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import PremiumButton from "@/components/premium/PremiumButton";
import { appToast } from "@/lib/toast";

import {
  createCalBooking,
  fetchCalConfig,
  fetchCalSlots,
  type CalSlot,
} from "../api/calcom.api";

type BookingForm = {
  name: string;
  email: string;
  notes: string;
};

function toDateKey(d: Date) {
  return format(d, "yyyy-MM-dd");
}

export default function NativeCalBooker() {
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slots, setSlots] = useState<CalSlot[]>([]);
  const [timeZone, setTimeZone] = useState("Asia/Karachi");
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [booked, setBooked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingForm>({
    defaultValues: { name: "", email: "", notes: "" },
  });

  const dayOptions = useMemo(
    () => Array.from({ length: 14 }, (_, i) => addDays(new Date(), i)),
    [],
  );

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const config = await fetchCalConfig();
        if (cancelled) return;
        setConfigured(config.configured);
      } catch {
        if (!cancelled) setConfigured(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!configured) return;

    let cancelled = false;

    (async () => {
      setLoadingSlots(true);
      setSelectedSlot(null);

      try {
        const start = toDateKey(new Date());
        const end = toDateKey(addDays(new Date(), 13));
        const data = await fetchCalSlots(start, end);
        if (cancelled) return;
        setSlots(data.slots);
        setTimeZone(data.timeZone);
      } catch (error: any) {
        if (!cancelled) {
          appToast.error(
            error?.response?.data?.message ||
              "Could not load available times from Cal.com",
          );
          setSlots([]);
        }
      } finally {
        if (!cancelled) setLoadingSlots(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [configured]);

  const slotsForDay = useMemo(() => {
    return slots.filter((slot) =>
      isSameDay(parseISO(slot.start), selectedDate),
    );
  }, [slots, selectedDate]);

  async function onSubmit(values: BookingForm) {
    if (!selectedSlot) {
      appToast.error("Please select a time slot.");
      return;
    }

    setSubmitting(true);
    try {
      await createCalBooking({
        start: selectedSlot,
        name: values.name,
        email: values.email,
        timeZone,
        notes: values.notes || undefined,
      });

      setBooked(true);
      reset();
      setSelectedSlot(null);
      appToast.success("Meeting booked — check your email for confirmation.");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Could not book the meeting. Please try another time.";
      appToast.error(
        Array.isArray(message) ? message.join(", ") : String(message),
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (configured === null) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        Loading booking…
      </div>
    );
  }

  if (!configured) {
    return (
      <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 px-6 py-16 text-center">
        <p className="text-lg font-semibold text-white">
          Booking is not configured
        </p>
        <p className="mt-3 text-sm text-slate-400">
          Set{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-cyan-300">
            CALCOM_LINK=username/30min
          </code>{" "}
          in the API <code className="text-cyan-300">.env</code> and restart
          the API.
        </p>
      </div>
    );
  }

  if (booked) {
    return (
      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-6 py-16 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
        <h3 className="mt-4 text-2xl font-bold text-white">
          You&apos;re booked
        </h3>
        <p className="mt-3 text-slate-300">
          A confirmation email is on the way from Cal.com.
        </p>
        <div className="mt-8 flex justify-center">
          <PremiumButton
            variant="outline"
            className="border-white/20 bg-white/5 text-white"
            onClick={() => setBooked(false)}
          >
            Book another meeting
          </PremiumButton>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/50">
      <div className="border-b border-white/10 px-6 py-5">
        <div className="flex items-center gap-2 text-cyan-300">
          <CalendarDays className="h-5 w-5" />
          <span className="text-sm font-medium">Select a time · {timeZone}</span>
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[220px_1fr]">
        <div className="border-b border-white/10 p-4 lg:border-b-0 lg:border-r">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Date
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1 lg:max-h-[420px] lg:flex-col lg:overflow-y-auto">
            {dayOptions.map((day) => {
              const active = isSameDay(day, selectedDate);
              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  onClick={() => {
                    setSelectedDate(day);
                    setSelectedSlot(null);
                  }}
                  className={`shrink-0 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                    active
                      ? "bg-cyan-500 text-white"
                      : "bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  <div className="font-semibold">{format(day, "EEE")}</div>
                  <div className="text-xs opacity-80">
                    {format(day, "MMM d")}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Available times
          </p>

          {loadingSlots ? (
            <div className="flex items-center gap-2 py-10 text-slate-400">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading slots…
            </div>
          ) : slotsForDay.length === 0 ? (
            <p className="py-10 text-sm text-slate-400">
              No open slots on this day. Try another date.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {slotsForDay.map((slot) => {
                const active = selectedSlot === slot.start;
                return (
                  <button
                    key={slot.start}
                    type="button"
                    onClick={() => setSelectedSlot(slot.start)}
                    className={`rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      active
                        ? "bg-cyan-500 text-white"
                        : "border border-white/10 bg-white/5 text-slate-200 hover:border-cyan-400/40"
                    }`}
                  >
                    {format(parseISO(slot.start), "h:mm a")}
                  </button>
                );
              })}
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-4 border-t border-white/10 pt-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm text-slate-300">
                  Your name
                </label>
                <input
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-white outline-none focus:border-cyan-400/50"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm text-slate-300">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-white outline-none focus:border-cyan-400/50"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm text-slate-300">
                Notes (optional)
              </label>
              <textarea
                rows={3}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-white outline-none focus:border-cyan-400/50"
                {...register("notes")}
              />
            </div>

            <PremiumButton
              type="submit"
              disabled={submitting || !selectedSlot}
              className="w-full sm:w-auto"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Booking…
                </>
              ) : (
                "Confirm meeting"
              )}
            </PremiumButton>
          </form>
        </div>
      </div>
    </div>
  );
}
