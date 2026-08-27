const env = {
  apiUrl: import.meta.env.VITE_API_URL ?? "http://localhost:5000/api/v1",
  /** Cal.com path: `username` or `username/event-slug` (no leading slash) */
  calComLink: (import.meta.env.VITE_CALCOM_LINK as string | undefined) ?? "",
  /** Override for self-hosted Cal.com; defaults to https://cal.com */
  calComOrigin:
    (import.meta.env.VITE_CALCOM_ORIGIN as string | undefined) ??
    "https://cal.com",
};

export default env;