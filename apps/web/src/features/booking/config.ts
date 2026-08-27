import env from "@/config/env";

/**
 * Normalize a Cal booking path from env.
 * Accepts `user`, `user/30min`, or a full `https://cal.com/...` URL.
 *
 * Cal.com usernames/slugs are lowercase — mixed case (e.g. waqar-Ali)
 * can load the embed UI but fail at booking with
 * "Something went wrong while booking".
 */
export function getCalLink(): string {
  let raw = env.calComLink.trim();
  if (!raw) return "";

  raw = raw.replace(/^@/, "");

  try {
    if (/^https?:\/\//i.test(raw)) {
      const url = new URL(raw);
      raw = url.pathname.replace(/^\/+|\/+$/g, "");
    }
  } catch {
    // keep raw
  }

  raw = raw.replace(/\/embed$/i, "");
  raw = raw.replace(/^\/+|\/+$/g, "");

  // Critical: API booking requires lowercase username/slug
  return raw.toLowerCase();
}

export function isCalConfigured(): boolean {
  return getCalLink().length > 0;
}

export function getCalOrigin(): string {
  const origin = env.calComOrigin.trim() || "https://cal.com";
  return origin.replace(/\/+$/, "");
}

/** Direct booking URL (opens outside the embed iframe). */
export function getCalBookingUrl(): string {
  const link = getCalLink();
  if (!link) return "";
  return `${getCalOrigin()}/${link}`;
}
