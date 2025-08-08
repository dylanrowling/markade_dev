// LoginPage.tsx — Auth login page for Markade users [2025-08-06 → promoted from test]
// 2025-08-07 — Refactored to use useAuth login, preserve "from" redirect, added pending state and input autocomplete

import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Button from "../components/Button";

const Login = () => {
  const { user, loading, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  if (loading) return <p className="text-white">Loading...</p>;
  if (user) return <Navigate to={from} replace />;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setPending(true);
    try {
      await login(email, password);
      console.log("✅ Logged in");
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error(err.message);
      if (err.code === "auth/user-not-found") {
        setError("No user found with that email.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <form onSubmit={handleLogin} className="space-y-4 text-center">
        <h1 className="text-xl font-market-header">Log in to Markade</h1>
        <input
          type="email"
          autoComplete="email"
          className="bg-gray-800 px-4 py-2 rounded font-market"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <br />
        <input
          type="password"
          autoComplete="current-password"
          className="bg-gray-800 px-4 py-2 rounded font-market"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <br />
        <Button type="submit" variant="default2" disabled={pending}>
          {pending ? "Logging In..." : "Log In"}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
      <Button variant="default1" onClick={() => navigate("/")}>Back to Landing</Button>
    </div>
  );
};

export default Login;