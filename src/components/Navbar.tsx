// Navbar.tsx — Top nav for auth actions
// 2025-08-07 Initial creation
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Button from './Button';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-surface border-b border-borderDim">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-3 sm:px-4 py-2">
        <div className="mk-arcade-display text-xl cursor-pointer" onClick={() => navigate('/dashboard')}>
          MARKADE
        </div>
        {import.meta.env.VITE_SHOW_PLAYGROUND === '1' && (
          <div className="flex items-center gap-4">
            <Button as="a" href="/playground" variant="default1" size="sm">
              Playground
            </Button>
          </div>
        )}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button as="a" href="/logout" variant="default1" size="sm">
                {user.displayName || user.email}
              </Button>
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
