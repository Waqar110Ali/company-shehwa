import { Bot } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Public equivalent of the Bot icon next to NotificationBell in
 * Topbar.tsx — same idea, just a Link, no auth guard on its target
 * route, and floating so it's visible on every section of the
 * public site without needing to touch a navbar component.
 */
export default function AssistantLink() {
  return (
    <Link
      to="/assistant"
      className="fixed bottom-6 right-6 z-[999] flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500 text-white shadow-[0_10px_40px_rgba(6,182,212,.5)] transition hover:scale-105 hover:bg-cyan-600"
    >
      <Bot size={26} />
    </Link>
  );
}