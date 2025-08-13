/****
 * Shell.tsx
 * Purpose: Global layout wrapper — ArcadeBanner + Navbar + page outlet
 * Updates:
 *  - 2025-08-12: Initial implementation with mobile-safe utilities
 *  - 2025-08-13: A11y + semantics — use bg-app/text-fg-default, add banner landmark, flex column shell
 */
import React from "react";
import { Outlet } from "react-router-dom";
import ArcadeBanner from "./ArcadeBanner";
import Navbar from "./Navbar";

const Shell: React.FC = () => {
  return (
    <div id="app-shell" className="safe-area min-h-dvh flex flex-col bg-app text-fg-default">
      {/* Site banner / marquee */}
      <header role="banner">
        <ArcadeBanner />
      </header>

      {/* Primary navigation (Navbar itself renders a <nav/>) */}
      <Navbar />

      {/* Main page content */}
      <main role="main" className="flex-1 max-w-6xl w-full mx-auto px-4 py-4 md:py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Shell;