export interface UserSettings {
  name: string;

  email: string;

  phone: string;

  position: string;

  department: string;

  company: string;

  website: string;

  address: string;

  timezone: string;

  language: string;

  theme: "dark" | "light" | "system";

  notifications: {
    email: boolean;

    desktop: boolean;

    attendance: boolean;

    projects: boolean;

    ai: boolean;
  };
}