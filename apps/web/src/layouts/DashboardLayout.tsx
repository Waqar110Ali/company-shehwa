import { useState } from "react";
import { Outlet } from "react-router-dom";

import AuroraBackground from "@/components/effects/AuroraBackground";
import MouseSpotlight from "@/components/effects/MouseSpotlight";

import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import Topbar from "./Topbar";
import { CallProvider } from "@/features/chat/call/context/CallProvider";
import { CallWindow } from "@/features/chat/call/components/CallWindow";
import { IncomingCallDialog } from "@/features/chat/call/components/IncomingCallDialog";

export default function DashboardLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const storedUser = localStorage.getItem("user");
  const employeeId = storedUser ? JSON.parse(storedUser).employeeId : "";

  return (
    <CallProvider employeeId={employeeId}>
      <AuroraBackground>
        <MouseSpotlight />

        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <MobileSidebar
            open={mobileSidebarOpen}
            onOpenChange={setMobileSidebarOpen}
          />

          <div className="flex flex-1 flex-col overflow-hidden">
            <Topbar onMenuClick={() => setMobileSidebarOpen(true)} />

            <main className="flex-1 overflow-y-auto">
              <div className="mx-auto max-w-[1800px] p-8">
                <Outlet />
              </div>
            </main>

            <IncomingCallDialog />
            <CallWindow />
          </div>
        </div>
      </AuroraBackground>
    </CallProvider>
  );
}