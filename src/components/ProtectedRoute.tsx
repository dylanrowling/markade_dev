// ProtectedRoute.tsx
// Wraps private pages and redirects unauthenticated users to login
// 2025-08-06 — Initial auth route gating component
// 2025-08-07 — Switched to declarative <Navigate> redirect, preserved intended path via location state, and used replace to avoid back-button bounce

import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // While auth state is resolving, show a minimal placeholder
  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  // If not authenticated, redirect to login and preserve the intended destination
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Authenticated, render the protected children
  return <>{children}</>;
}