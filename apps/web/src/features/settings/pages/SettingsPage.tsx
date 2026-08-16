// apps/web/src/features/settings/pages/SettingsPage.tsx
import { useEffect, useState } from "react";

import SectionHeading from "@/features/dashboard/components/SectionHeading";

import { Role } from "@/features/auth/types/role";
import { getUser } from "@/features/auth/utils/auth-storage";

import SettingsSidebar, {
  type SettingsTab,
} from "../components/SettingsSidebar";

import ProfileSettings from "../components/ProfileSettings";
import CompanySettings from "../components/CompanySettings";
import SecuritySettings from "../components/SecuritySettings";
import NotificationSettings from "../components/NotificationSettings";
import AppearanceSettings from "../components/AppearanceSettings";
import LanguageSettings from "../components/LanguageSettings";

import { useSettings } from "../hooks/useSettings";

const ADMIN_ONLY_TABS: SettingsTab[] = [
  "company",
  "security",
];

export default function SettingsPage() {
  const {
    settings,
    loading,
    saving,
    updateSettings,
    saveSettings,
  } = useSettings();

  const user = getUser();
  const isAdmin = user?.role === Role.ADMIN;

  const [activeTab, setActiveTab] =
    useState<SettingsTab>("profile");

  // Safety net: if a non-admin somehow ends up on an
  // admin-only tab, bounce back to Profile.
  useEffect(() => {
    if (
      !isAdmin &&
      ADMIN_ONLY_TABS.includes(activeTab)
    ) {
      setActiveTab("profile");
    }
  }, [isAdmin, activeTab]);

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400">
        Loading settings...
      </div>
    );
  }

  function renderContent() {
    switch (activeTab) {
      case "profile":
        return (
          <ProfileSettings
            settings={settings}
            onChange={updateSettings}
            onSave={saveSettings}
            saving={saving}
          />
        );

      case "company":
        if (!isAdmin) return null;

        return (
          <CompanySettings
            settings={settings}
            onChange={updateSettings}
            onSave={saveSettings}
            saving={saving}
          />
        );

      case "security":
        if (!isAdmin) return null;

        return <SecuritySettings />;

      case "notifications":
        return (
          <NotificationSettings
            settings={settings}
            onChange={updateSettings}
            onSave={saveSettings}
            saving={saving}
          />
        );

      case "appearance":
        return (
          <AppearanceSettings
            settings={settings}
            onChange={updateSettings}
            onSave={saveSettings}
            saving={saving}
          />
        );

      case "language":
        return (
          <LanguageSettings
            settings={settings}
            onChange={updateSettings}
            onSave={saveSettings}
            saving={saving}
          />
        );

      default:
        return null;
    }
  }

  return (
    <div className="space-y-8">

      <SectionHeading
        title="Settings"
        subtitle="Manage your account and company preferences."
      />

      <div className="grid gap-8 lg:grid-cols-12">

        <div className="lg:col-span-3">

          <SettingsSidebar
            active={activeTab}
            onChange={setActiveTab}
          />

        </div>

        <div className="lg:col-span-9">

          {renderContent()}

        </div>

      </div>

    </div>
  );
}