import type { ReactNode } from "react";

import AuroraBackground from "@/components/effects/AuroraBackground";
import MouseSpotlight from "@/components/effects/MouseSpotlight";

import AuthLeftPanel from "../components/AuthLeftPanel";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <AuroraBackground>
      <MouseSpotlight />

      <main className="relative min-h-screen overflow-hidden">
        <div className="grid min-h-screen lg:grid-cols-2">

          {/* Left */}

          <AuthLeftPanel />

          {/* Right */}

          <div className="relative flex items-center justify-center px-6 py-20 lg:px-16">
            {children}
          </div>

        </div>
      </main>
    </AuroraBackground>
  );
}