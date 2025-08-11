// components/ProtectedRoute.tsx
// Purpose: Guard for private routes with loading fallback and redirect
// 2025-08-06 — Initial auth route gating component
// 2025-08-07 — Declarative <Navigate> redirect, preserved intended path via location state
// 2025-08-11 — Switched to Outlet-based guard for cleaner route grouping

import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}