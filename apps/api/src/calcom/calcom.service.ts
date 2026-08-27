import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { CreateCalBookingDto } from "./dto/create-cal-booking.dto";

type CalSlotsResponse = {
  status: string;
  data?: Record<string, Array<{ start: string }>>;
  error?: { message?: string };
};

type CalBookingResponse = {
  status: string;
  data?: Record<string, unknown>;
  error?: { message?: string };
};

@Injectable()
export class CalcomService {
  private readonly apiBase = "https://api.cal.com/v2";

  constructor(
    private readonly config: ConfigService,
  ) {}

  isConfigured(): boolean {
    return Boolean(this.getUsername() && this.getEventSlug());
  }

  getPublicConfig() {
    return {
      configured: this.isConfigured(),
      username: this.getUsername() || null,
      eventSlug: this.getEventSlug() || null,
      durationMinutes: 30,
    };
  }

  async getSlots(start: string, end: string) {
    this.assertConfigured();

    const username = this.getUsername();
    const eventSlug = this.getEventSlug();
    const timeZone =
      this.config.get<string>("CALCOM_TIMEZONE") ||
      "Asia/Karachi";

    const url = new URL(`${this.apiBase}/slots`);
    url.searchParams.set("username", username);
    url.searchParams.set("eventTypeSlug", eventSlug);
    url.searchParams.set("start", start);
    url.searchParams.set("end", end);
    url.searchParams.set("timeZone", timeZone);

    const json = await this.calFetch<CalSlotsResponse>(
      url.toString(),
      { method: "GET" },
      "2024-09-04",
    );

    if (json.status !== "success") {
      throw new BadRequestException(
        json.error?.message || "Unable to load available slots from Cal.com",
      );
    }

    const days = json.data ?? {};
    const slots = Object.entries(days).flatMap(
      ([date, items]) =>
        (items ?? []).map((item) => ({
          date,
          start: item.start,
        })),
    );

    return {
      timeZone,
      username,
      eventSlug,
      slots,
    };
  }

  async createBooking(dto: CreateCalBookingDto) {
    this.assertConfigured();

    const username = this.getUsername();
    const eventSlug = this.getEventSlug();
    const timeZone =
      dto.timeZone ||
      this.config.get<string>("CALCOM_TIMEZONE") ||
      "Asia/Karachi";

    const body: Record<string, unknown> = {
      start: this.toUtcIso(dto.start),
      eventTypeSlug: eventSlug,
      username,
      attendee: {
        name: dto.name.trim(),
        email: dto.email.trim().toLowerCase(),
        timeZone,
        language: "en",
      },
      metadata: {},
    };

    if (dto.notes?.trim()) {
      body.bookingFieldsResponses = {
        notes: dto.notes.trim(),
      };
    }

    const json = await this.calFetch<CalBookingResponse>(
      `${this.apiBase}/bookings`,
      {
        method: "POST",
        body: JSON.stringify(body),
      },
      "2024-08-13",
    );

    if (json.status !== "success") {
      throw new BadRequestException(
        json.error?.message ||
          "Cal.com could not create the booking. Please try another time.",
      );
    }

    return {
      success: true,
      booking: json.data,
    };
  }

  private getUsername(): string {
    const fromParts = this.config.get<string>("CALCOM_USERNAME");
    if (fromParts?.trim()) {
      return fromParts.trim().toLowerCase();
    }

    const link = this.parseLink();
    return link?.username ?? "";
  }

  private getEventSlug(): string {
    const fromParts = this.config.get<string>("CALCOM_EVENT_SLUG");
    if (fromParts?.trim()) {
      return fromParts.trim().toLowerCase();
    }

    const link = this.parseLink();
    return link?.eventSlug ?? "";
  }

  private parseLink(): {
    username: string;
    eventSlug: string;
  } | null {
    let raw = (
      this.config.get<string>("CALCOM_LINK") || ""
    )
      .trim()
      .replace(/^@/, "");

    if (!raw) return null;

    try {
      if (/^https?:\/\//i.test(raw)) {
        raw = new URL(raw).pathname.replace(/^\/+|\/+$/g, "");
      }
    } catch {
      // keep raw
    }

    const parts = raw
      .replace(/\/embed$/i, "")
      .replace(/^\/+|\/+$/g, "")
      .toLowerCase()
      .split("/")
      .filter(Boolean);

    if (parts.length < 2) return null;

    return {
      username: parts[0],
      eventSlug: parts[1],
    };
  }

  private assertConfigured() {
    if (!this.isConfigured()) {
      throw new ServiceUnavailableException(
        "Cal.com is not configured. Set CALCOM_LINK=username/event-slug in the API env.",
      );
    }
  }

  /** Ensure start is UTC ISO without timezone offset suffix issues. */
  private toUtcIso(start: string): string {
    const date = new Date(start);
    if (Number.isNaN(date.getTime())) {
      throw new BadRequestException("Invalid start time");
    }
    return date.toISOString().replace(/\.\d{3}Z$/, "Z");
  }

  private async calFetch<T>(
    url: string,
    init: RequestInit,
    apiVersion: string,
  ): Promise<T> {
    const headers: Record<string, string> = {
      Accept: "application/json",
      "cal-api-version": apiVersion,
      ...(init.headers as Record<string, string> | undefined),
    };

    if (init.body) {
      headers["Content-Type"] = "application/json";
    }

    const apiKey = this.config.get<string>("CALCOM_API_KEY");
    if (apiKey?.trim()) {
      headers.Authorization = `Bearer ${apiKey.trim()}`;
    }

    let response: Response;
    try {
      response = await fetch(url, {
        ...init,
        headers,
      });
    } catch (error) {
      console.error("[CALCOM] Network error:", error);
      throw new ServiceUnavailableException(
        "Unable to reach Cal.com. Please try again shortly.",
      );
    }

    const text = await response.text();
    let json: T & { error?: { message?: string }; message?: string };
    try {
      json = text ? JSON.parse(text) : ({} as T);
    } catch {
      console.error(
        "[CALCOM] Non-JSON response",
        response.status,
        text.slice(0, 300),
      );
      throw new ServiceUnavailableException(
        "Unexpected response from Cal.com",
      );
    }

    if (!response.ok) {
      const message =
        json?.error?.message ||
        json?.message ||
        `Cal.com request failed (${response.status})`;
      console.error("[CALCOM] Error", response.status, message);
      throw new BadRequestException(message);
    }

    return json;
  }
}
