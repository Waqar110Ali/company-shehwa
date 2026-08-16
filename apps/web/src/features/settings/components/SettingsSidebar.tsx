// apps/web/src/features/settings/components/SettingsSidebar.tsx
import {
  Bell,
  Building2,
  Globe,
  Lock,
  Moon,
  User,
} from "lucide-react";

import { Role } from "@/features/auth/types/role";
import { getUser } from "@/features/auth/utils/auth-storage";

export type SettingsTab =
  | "profile"
  | "company"
  | "security"
  | "notifications"
  | "appearance"
  | "language";

interface Props {
  active: SettingsTab;

  onChange: (
    tab: SettingsTab
  ) => void;
}

const items = [
  {
    id: "profile",
    label: "Profile",
    icon: User,
  },
  {
    id: "company",
    label: "Company",
    icon: Building2,
    roles: [Role.ADMIN],
  },
  {
    id: "security",
    label: "Security",
    icon: Lock,
    roles: [Role.ADMIN],
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: Moon,
  },
  {
    id: "language",
    label: "Language",
    icon: Globe,
  },
] satisfies {
  id: SettingsTab;
  label: string;
  icon: React.ElementType;
  roles?: Role[];
}[];

export default function SettingsSidebar({
  active,
  onChange,
}: Props) {
  const user = getUser();

  const visibleItems = items.filter(
    (item) =>
      !item.roles ||
      (user && item.roles.includes(user.role)),
  );

  return (
    <aside className="rounded-3xl border border-white/10 bg-white/5 p-5">

      <div className="space-y-2">

        {visibleItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() =>
                onChange(item.id)
              }
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition ${
                active === item.id
                  ? "bg-cyan-500 text-white"
                  : "text-slate-300 hover:bg-white/10"
              }`}
            >
              <Icon size={18} />

              {item.label}
            </button>
          );
        })}

      </div>

    </aside>
  );
}