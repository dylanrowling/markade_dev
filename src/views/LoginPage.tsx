// LoginPage.tsx — Auth login page for Markade users [2025-08-06 → promoted from test]

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import useAuth from "../hooks/useAuth";
import Button from "../components/Button";

const Login = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
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
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err.message);
      if (err.code === "auth/user-not-found") {
        setError("No user found with that email.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else {
        setError("Login failed. Please try again.");
      }
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

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  if (user) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <form onSubmit={handleLogin} className="space-y-4 text-center">
        <h1 className="text-xl font-market-header">Log in to Markade</h1>
        <input
          type="email"
          className="bg-gray-800 px-4 py-2 rounded font-market"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          className="bg-gray-800 px-4 py-2 rounded font-market"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <Button type="submit" variant="default2">
          Log In
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
      <Button variant="default1" onClick={() => navigate("/")}>
        Back to Landing
      </Button>
    </div>
  );
};

export default Login;