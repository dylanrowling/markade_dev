// Profile.tsx — user account hub
// 2025-09-12 initial scaffold: shows identity + logout
import { useAuthContext } from "../providers/AuthProvider";
import Button from "../components/Button";

export default function Profile() {
  const { user, logout } = useAuthContext();
  const name = user?.displayName || user?.email || "User";

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <h1 className="font-arcade font-bold text-2xl text-accent-yellow mb-4">PROFILE</h1>

      <div className="space-y-6">
        <section className="border border-divider p-4 bg-bg-panel">
          <h2 className="font-arcade text-accent-blue text-xl mb-2">Identity</h2>
          <p className="font-market text-fg-default">
            Signed in as <span className="font-bold">{name}</span>
          </p>
        </section>

        <section className="border border-divider p-4 bg-bg-panel">
          <h2 className="font-arcade text-accent-pink text-xl mb-2">Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="arcadewhite" onClick={logout}>Log Out</Button>
            {/* Room for: Change Password, Manage MFA, Delete Account, etc. */}
          </div>
        </section>
      </div>
    </div>
  );
}