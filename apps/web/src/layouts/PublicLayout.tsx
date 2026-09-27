import { Outlet } from "react-router-dom";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function PublicLayout() {
  return (
    // Public/marketing site is always dark by design — the theme
    // toggle only applies inside the dashboard. Wrapping in "dark"
    // here scopes all the CSS variables to dark regardless of what
    // the user picked in the app.
    <div className="dark">
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}