// Navbar.tsx — Top nav for auth actions
// 2025-08-07 Initial creation
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-surface border-b border-borderDim">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-3 sm:px-4 py-2">
        <div className="font-arcade-bold text-casinoYellow text-xl cursor-pointer" onClick={() => navigate('/dashboard')}>
          MARKADE
        </div>
        {import.meta.env.VITE_SHOW_PLAYGROUND === '1' && (
          <div className="flex items-center gap-4">
            <button className="underline text-neonBlue text-sm" onClick={() => navigate('/playground')}>
              Playground
            </button>
          </div>
        )}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="text-textDim text-sm hidden sm:inline">{user.email}</span>
              <button className="underline text-neonBlue text-sm" onClick={() => logout()}>Logout</button>
            </>
          ) : (
            <>
              <button className="underline text-neonBlue text-sm" onClick={() => navigate('/login')}>Login</button>
              <button className="underline text-neonBlue text-sm" onClick={() => navigate('/register')}>Register</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
