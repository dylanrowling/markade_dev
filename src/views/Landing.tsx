

// Landing.tsx — Markade splash page with links to login/register [2025-08-06]

import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-4 text-fuchsia-500">🎮 Welcome to Markade</h1>
      <p className="mb-8 text-center max-w-md text-lg text-gray-300">
        Fantasy football meets stock market strategy. Join a league, draft stocks, and compete for glory.
      </p>
      <div className="flex gap-6">
        <Link
          to="/login"
          className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white font-semibold"
        >
          Log In
        </Link>
        <Link
          to="/register"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 px-6 py-2 rounded text-white font-semibold"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}