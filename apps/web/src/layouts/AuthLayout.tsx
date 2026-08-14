import { Outlet } from "react-router-dom";

import AuroraBackground from "@/components/effects/AuroraBackground";
import MouseSpotlight from "@/components/effects/MouseSpotlight";

export default function AuthLayout() {
  return (
    <AuroraBackground>
      <MouseSpotlight />

      <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
        <Outlet />
      </main>
    </AuroraBackground>
  );
}