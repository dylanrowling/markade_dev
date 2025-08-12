/**
 * Shell.tsx
 * Purpose: Global layout wrapper — ArcadeBanner + Navbar + page outlet
 * Updates:
 *  - 2025-08-12: Initial implementation with mobile-safe utilities
 */
import React from "react";
import { Outlet } from "react-router-dom";
import ArcadeBanner from "./ArcadeBanner";
import Navbar from "./Navbar";

const Shell: React.FC = () => {
  return (
    <div className="safe-area min-h-dvh bg-background text-white">
      <ArcadeBanner />
      <Navbar />
      <main role="main" className="max-w-6xl mx-auto px-4 py-4 md:py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Shell;