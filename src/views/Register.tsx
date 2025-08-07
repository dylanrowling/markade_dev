

// Register.tsx — User registration page for Markade [2025-08-06]

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import Button from "../components/Button";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Set display name in Firebase Auth
      await updateProfile(user, { displayName });

      // Write to Firestore users collection
      await setDoc(doc(db, "users", user.uid), {
        displayName,
        email,
        createdAt: serverTimestamp(),
        role: "player",
        leagueId: null,
      });

      console.log("✅ User registered:", user.uid);
      navigate("/dashboard");
    } catch (err: any) {
      console.error("❌ Registration failed:", err.message);
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Try logging in.");
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-3xl font-market-header mb-6 text-fuchsia-500">Create your Markade Account</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-4 w-80">
        <input
          type="text"
          placeholder="Display Name"
          className="p-2 text-black rounded font-market"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="p-2 text-black rounded font-market"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 text-black rounded font-market"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="default2">
          Register
        </Button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
      <Button variant="default1" onClick={() => navigate("/login")}>
        Back to Login
      </Button>
    </div>
  );
}