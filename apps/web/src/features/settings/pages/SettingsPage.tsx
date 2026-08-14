import { useState } from "react";

import SectionHeading from "@/features/dashboard/components/SectionHeading";

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

export default function SettingsPage() {
  const {
    settings,
    updateSettings,
  } = useSettings();

  const [activeTab, setActiveTab] =
    useState<SettingsTab>("profile");

  function renderContent() {
    switch (activeTab) {
      case "profile":
        return (
          <ProfileSettings
            settings={settings}
            onChange={updateSettings}
          />
        );

      case "company":
        return (
          <CompanySettings
            settings={settings}
            onChange={updateSettings}
          />
        );

      case "security":
        return <SecuritySettings />;

      case "notifications":
        return (
          <NotificationSettings
            settings={settings}
            onChange={updateSettings}
          />
        );

      case "appearance":
        return (
          <AppearanceSettings
            settings={settings}
            onChange={updateSettings}
          />
        );

      case "language":
        return (
          <LanguageSettings
            settings={settings}
            onChange={updateSettings}
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