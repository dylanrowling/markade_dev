

// ProtectedRoute.tsx
// Wraps private pages and redirects unauthenticated users to login
// 🕒 2025-08-06 — Initial auth route gating component

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return <>{user ? children : null}</>;
}