// firebase.ts — Initializes Firebase App using Vite environment variables [2025-08-06]

import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// ✅ Warn in development if any env vars are missing
if (import.meta.env.MODE === "development") {
  for (const [key, value] of Object.entries(firebaseConfig)) {
    if (!value) {
      console.warn(`⚠️ Missing Firebase env var: ${key}`);
    }
  }
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Connect to local emulators in development (only if not already connected)
if (import.meta.env.MODE === "development") {
  try {
    // @ts-expect-error Firebase does not expose emulator connection state
    if (!auth._isEmulator) {
      connectAuthEmulator(auth, "http://127.0.0.1:9099");
    }
    // @ts-expect-error same for Firestore
    if (!db._settings?.host?.includes("127.0.0.1")) {
      connectFirestoreEmulator(db, "127.0.0.1", 8080);
    }
  } catch (err) {
    console.warn("⚠️ Emulator connection check failed:", err);
  }

  console.log("✅ Firebase initialized:", app.name);
}

export { app, auth, db };