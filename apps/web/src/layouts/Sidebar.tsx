import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  CalendarDays,
  ClipboardCheck,
  MessageSquare,
  Folder,
  BarChart3,
  Bot,
  Settings,
  LogOut,
} from "lucide-react";

import Logo from "@/components/ui/Logo";

const menu = [
  {
    section: "MAIN",
    items: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
      },
    ],
  },

  {
    section: "MANAGEMENT",
    items: [
      {
        label: "Employees",
        icon: Users,
        path: "/dashboard/employees",
      },
      {
        label: "Projects",
        icon: FolderKanban,
        path: "/dashboard/projects",
      },
      {
        label: "Tasks",
        icon: CheckSquare,
        path: "/dashboard/tasks",
      },
      {
        label: "Attendance",
        icon: ClipboardCheck,
        path: "/dashboard/attendance",
      },
      {
        label: "Calendar",
        icon: CalendarDays,
        path: "/dashboard/calendar",
      },
    ],
  },

  {
    section: "WORKSPACE",
    items: [
      {
        label: "Chat",
        icon: MessageSquare,
        path: "/dashboard/chat",
      },
      {
        label: "Files",
        icon: Folder,
        path: "/dashboard/files",
      },
      {
        label: "Reports",
        icon: BarChart3,
        path: "/dashboard/reports",
      },
      {
        label: "AI Assistant",
        icon: Bot,
        path: "/dashboard/assistant",
      },
    ],
  },

  {
    section: "SYSTEM",
    items: [
      {
        label: "Settings",
        icon: Settings,
        path: "/dashboard/settings",
      },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden h-screen w-72 flex-col border-r border-white/10 bg-slate-950/50 backdrop-blur-3xl lg:flex">

      {/* Logo */}

      <div className="flex h-20 items-center border-b border-white/10 px-8">

        <Logo />

      </div>

      {/* Navigation */}

      <div className="flex-1 overflow-y-auto px-5 py-8">

        <div className="space-y-8">

          {menu.map((section) => (

            <div key={section.section}>

              <h4 className="mb-3 px-5 text-xs font-semibold uppercase tracking-widest text-slate-500">

                {section.section}

              </h4>

              <div className="space-y-2">

                {section.items.map((item) => {

                  const Icon = item.icon;

                  return (

                    <NavLink
                      key={item.path}
                      to={item.path}
                    >

                      {({ isActive }) => (

                        <motion.div
                          whileHover={{
                            x: 6,
                          }}
                          whileTap={{
                            scale: 0.98,
                          }}
                          className={`group relative flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${isActive
                              ? "border border-cyan-400/20 bg-cyan-500/10"
                              : "hover:bg-white/5"
                            }`}
                        >

                          {isActive && (

                            <motion.div
                              layoutId="sidebar-active"
                              className="absolute bottom-3 left-0 top-3 w-1 rounded-full bg-cyan-400"
                            />

                          )}

                          <Icon
                            size={20}
                            className={
                              isActive
                                ? "text-cyan-300"
                                : "text-slate-400 transition group-hover:text-white"
                            }
                          />

                          <span
                            className={
                              isActive
                                ? "font-medium text-white"
                                : "font-medium text-slate-400 transition group-hover:text-white"
                            }
                          >
                            {item.label}
                          </span>

                        </motion.div>

                      )}

                    </NavLink>

                  );

                })}

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Footer */}

      <div className="border-t border-white/10 p-5">

        <button
          className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-slate-400 transition-all hover:bg-red-500/10 hover:text-red-400"
        >

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>
  );
}