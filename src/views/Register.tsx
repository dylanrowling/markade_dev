// Register.tsx — User registration page for Markade [2025-08-06]
// 2025-08-07 — Use useAuth().register, preserve "from" redirect, add pending state and input autocomplete

import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import useAuth from "../hooks/useAuth";
import Button from "../components/Button";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/dashboard";

  const { user, loading, register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  if (loading) return <p className="font-market text-fg-default">Loading...</p>;
  if (user) return <Navigate to={from} replace />;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setPending(true);

    try {
      // Create auth user via centralized provider
      await register(email, password);

      // Ensure current user is available before continuing
      const current = auth.currentUser;
      if (!current) {
        throw new Error(
          "Registration completed, but user session not available yet. Please try logging in."
        );
      }

      // Update display name on the current user
      if (displayName.trim()) {
        await updateProfile(current, { displayName });
      }

      // Create a user profile document in Firestore
      await setDoc(doc(db, "users", current.uid), {
        displayName,
        email,
        createdAt: serverTimestamp(),
        role: "player",
        leagueId: null,
      });

      console.log("✅ User registered");
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error("❌ Registration failed:", err);
      // AuthProvider normalizes to a plain Error with a message
      setError(err?.message ?? "Registration failed. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-panel text-fg-default">
      <h1 className="font-market text-3xl font-bold mb-6 text-accent-pink">Create your Markade Account</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-4 w-80">
        <input
          type="text"
          placeholder="Display Name"
          autoComplete="nickname"
          className="p-2 border border-divider bg-panel text-fg-default rounded-none font-market"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          autoComplete="email"
          className="p-2 border border-divider bg-panel text-fg-default rounded-none font-market"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          className="p-2 border border-divider bg-panel text-fg-default rounded-none font-market"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="default" disabled={pending}>
          {pending ? "Registering..." : "Register"}
        </Button>
        {error && <p className="text-state-error text-sm font-market">{error}</p>}
      </form>
      <Button variant="default" onClick={() => navigate("/login")}>
        Back to Login
      </Button>
    </div>
  );
}