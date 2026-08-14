import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "@/layouts/PublicLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

// ==============================
// Public Pages
// ==============================

import HomePage from "@/pages/public/HomePage";

// ==============================
// Authentication
// ==============================

import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";

// ==============================
// Dashboard Pages
// ==============================

import DashboardHome from "@/pages/DashboardHome";
import ProjectsPage from "@/features/projects/pages/ProjectsPage";
import ProjectDetailsPage from "@/features/projects/pages/ProjectDetailsPage";

// ==============================
// Features
// ==============================

import EmployeesPage from "@/features/employees/pages/EmployeesPage";
import AttendancePage from "@/features/attendance/pages/AttendancePage";
import CalendarPage from "@/features/calendar/pages/CalendarPage";
import ChatPage from "@/features/chat/pages/ChatPage";
import FilesPage from "@/features/files/pages/FilesPage";
import ReportsPage from "@/features/reports/pages/ReportsPage";
import AIAssistantPage from "@/features/assistant/pages/AIAssistantPage";
import TasksPage from "@/features/tasks/pages/TasksPage";
import SettingsPage from "@/features/settings/pages/SettingsPage";
import ProtectedRoute from "@/routes/ProtectedRoute";
import ReportsAccess from "@/features/reports/components/ReportsAccess";
export const router = createBrowserRouter([
  // ==========================================================
  // Public Website
  // ==========================================================

  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },

  // ==========================================================
  // Authentication
  // ==========================================================

  {
    path: "/login",
    element: <LoginPage />,
  },

  // {
  //   path: "/register",
  //   element: <RegisterPage />,
  // },
  {
  path: "/dashboard",
  element: (
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  ),

  children: [
    {
      index: true,
      element: <DashboardHome />,
    },

    {
      path: "projects",
      element: <ProjectsPage />,
    },

    {
      path: "projects/:id",
      element: <ProjectDetailsPage />,
    },

    {
      path: "employees",
      element: <EmployeesPage />,
    },

    {
      path: "attendance",
      element: <AttendancePage />,
    },

    {
      path: "calendar",
      element: <CalendarPage />,
    },

    {
      path: "chat",
      element: <ChatPage />,
    },

    {
      path: "files",
      element: <FilesPage />,
    },

    {
  path: "reports",
  element: (
    <ReportsAccess>
      <ReportsPage />
    </ReportsAccess>
  ),
},

    {
      path: "assistant",
      element: <AIAssistantPage />,
    },

    {
      path: "tasks",
      element: <TasksPage />,
    },

    {
      path: "settings",
      element: <SettingsPage />,
    },
  ],
},])