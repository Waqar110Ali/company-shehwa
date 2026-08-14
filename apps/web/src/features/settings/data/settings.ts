import type { UserSettings } from "../types/settings";

export const defaultSettings: UserSettings = {
  name: "Ahmed Khan",

  email: "ahmed@company.com",

  phone: "+92 300 1234567",

  position: "Project Manager",

  department: "Engineering",

  company: "AI Company",

  website: "https://company.com",

  address: "Karachi, Pakistan",

  timezone: "Asia/Karachi",

  language: "English",

  theme: "dark",

  notifications: {
    email: true,

    desktop: true,

    attendance: true,

    projects: true,

    ai: true,
  },
};