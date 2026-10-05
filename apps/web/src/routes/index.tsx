
// apps/web/src/routes/router.tsx

import { createBrowserRouter, Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import PublicLayout from "@/layouts/PublicLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import TutorialDashboardLayout from "@/layouts/TutorialDashboardLayout";

// Public
import HomePage from "@/pages/public/HomePage";
import { BookMeetingPage } from "@/features/booking";

// Auth
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import VerifyEmailPage from "@/features/pages/auth/VerifyEmailPage";
import { Role } from "@/features/auth/types/role";
import { getUser } from "@/features/auth/utils/auth-storage";

// Dashboard
import DashboardHome from "@/pages/DashboardHome";
import ProjectsPage from "@/features/projects/pages/ProjectsPage";
import ProjectDetailsPage from "@/features/projects/pages/ProjectDetailsPage";
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

// Portfolio Admin
import PortfolioAdminPage from "@/features/portfolio/pages/PortfolioAdminPage";
import AuroraBackground from "@/components/effects/AuroraBackground";

import TutorialLandingPage from "@/features/tutorial/pages/TutorialLandingPage";
import TutorialRegisterPage from "@/features/tutorial/pages/TutorialRegisterPage";
import TutorialCoursesPage from "@/features/tutorial/pages/TutorialCoursesPage";
import TutorialPaymentPage from "@/features/tutorial/pages/TutorialPaymentPage";
import TutorialLearningPage from "@/features/tutorial/pages/TutorialLearningPage";
import TutorialCourseLearnPage from "@/features/tutorial/pages/TutorialCourseLearnPage";
import TutorialWalletPage from "@/features/tutorial/pages/TutorialWalletPage";

// ==============================================================
// Admin-only guard (mirrors ReportsAccess pattern)
// ==============================================================

function AdminOnly({ children }: { children: ReactNode }) {
  const user = getUser();

  if (!user || user.role !== Role.ADMIN) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

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
      {
        path: "book",
        element: <BookMeetingPage />,
      },
    ],
  },

  // ==========================================================
  // Public Assistant
  // ==========================================================
  {
    path: "/assistant",
    element: (
      <AuroraBackground>
        <div className="flex h-dvh flex-col overflow-hidden">
          <AIAssistantPage />
        </div>
      </AuroraBackground>
    ),
  },

  // ==========================================================
  // Tutorial Flow
  // ==========================================================
  {
    path: "/tutorial",
    element: <TutorialLandingPage />,
  },
  {
    path: "/tutorial/register",
    element: <TutorialRegisterPage />,
  },
  {
    // Public catalog browsing — no login required. Enrolling from
    // here sends an unauthenticated visitor to /login first.
    path: "/tutorial/courses",
    element: <TutorialCoursesPage />,
  },
  {
    path: "/tutorial/admin",
    element: (
      <AdminOnly>
        <Navigate to="/dashboard/portfolio" replace />
      </AdminOnly>
    ),
  },
  {
    path: "/admin",
    element: (
      <AdminOnly>
        <Navigate to="/dashboard/portfolio" replace />
      </AdminOnly>
    ),
  },
  {
    // Separate, secure, per-student dashboard — completely apart
    // from the company admin dashboard. Everything below requires
    // a logged-in session (ProtectedRoute) and only ever shows the
    // signed-in student's own data.
    path: "/tutorial/dashboard",
    element: (
      <ProtectedRoute>
        <TutorialDashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="courses" replace /> },
      { path: "courses", element: <TutorialCoursesPage /> },
      { path: "payment/:courseId", element: <TutorialPaymentPage /> },
      { path: "my-courses", element: <TutorialLearningPage /> },
      { path: "my-courses/:courseId", element: <TutorialCourseLearnPage /> },
      { path: "wallet", element: <TutorialWalletPage /> },
    ],
  },

  // ==========================================================
  // Authentication
  // ==========================================================
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/register",
    element: <RegisterPage />,
  },

  {
    path: "/verify-email/:token",
    element: <VerifyEmailPage />,
  },

  // ==========================================================
  // Dashboard
  // ==========================================================
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
        path: "portfolio",
        element: (
          <AdminOnly>
            <PortfolioAdminPage />
          </AdminOnly>
        ),
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
]);

