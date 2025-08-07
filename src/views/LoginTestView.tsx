

// Login.tsx — Simple login page for Firebase Auth [2025-08-06]

import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("test@trademarkade.com");
  const [password, setPassword] = useState("test1234");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Logged in");
    } catch (err: any) {
      console.error(err.message);
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      console.log("👋 Logged out");
    } catch (err: any) {
      console.error(err.message);
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      {user ? (
        <div className="text-center space-y-4">
          <p>✅ Logged in as: {user.email}</p>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-500 rounded hover:bg-red-600">
            Log Out
          </button>
        </div>
      ) : (
        <form onSubmit={handleLogin} className="space-y-4 text-center">
          <h1 className="text-xl font-bold">Log in to Markade</h1>
          <input
            type="email"
            className="bg-gray-800 px-4 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            className="bg-gray-800 px-4 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit" className="bg-fuchsia-600 px-6 py-2 rounded hover:bg-fuchsia-700">
            Log In
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default Login;