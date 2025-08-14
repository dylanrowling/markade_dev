// components/ProtectedRoute.tsx
// Purpose: Guard for private routes with loading fallback and redirect
// 2025-08-06 — Initial auth route gating component
// 2025-08-07 — Declarative <Navigate> redirect, preserved intended path via location state
// 2025-08-11 — Switched to Outlet-based guard for cleaner route grouping

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ColorPanel from './ColorPanel';

export default function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center px-4">
        <ColorPanel tone="white" label="AUTH">
          <h3 className="mk-arcade-display">LOADING</h3>
          <p className="font-market text-fg-default">Checking your session…</p>
        </ColorPanel>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}