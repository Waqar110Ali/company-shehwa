import { api } from "@/lib/api";

export type CalSlot = {
  date: string;
  start: string;
};

export type CalSlotsResponse = {
  timeZone: string;
  username: string;
  eventSlug: string;
  slots: CalSlot[];
};

export type CalConfigResponse = {
  configured: boolean;
  username: string | null;
  eventSlug: string | null;
  durationMinutes: number;
};

export type CreateCalBookingPayload = {
  start: string;
  name: string;
  email: string;
  timeZone?: string;
  notes?: string;
};

export async function fetchCalConfig() {
  const { data } = await api.get<CalConfigResponse>("/calcom/config");
  return data;
}

export async function fetchCalSlots(start: string, end: string) {
  const { data } = await api.get<CalSlotsResponse>("/calcom/slots", {
    params: { start, end },
  });
  return data;
}

export async function createCalBooking(payload: CreateCalBookingPayload) {
  const { data } = await api.post("/calcom/bookings", payload);
  return data;
}
