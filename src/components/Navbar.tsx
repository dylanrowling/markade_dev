// Navbar.tsx — Top nav for auth actions
// 2025-08-13 Modernized to semantic tokens + gated dev links
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";
import Button from "./Button";

export default function Navbar() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const showPlayground = import.meta.env.VITE_SHOW_PLAYGROUND === "1";

  return (
    <nav className="w-full bg-panel border-b border-divider">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-3 sm:px-4 py-2">
        {/* Brand */}
        <Button
          as="button"
          onClick={() => navigate("/dashboard")}
          variant="arcadeyellow"
          size="sm"
          title="Dashboard"
        >
          MARKADE
        </Button>

        {/* Dev-only links (gated by .env flag, same as Playground) */}
        {showPlayground && (
          <div className="flex items-center gap-3">
            <Button as="button" onClick={() => navigate("/playground")} variant="default" size="sm">
              Playground
            </Button>
            <Button as="button" onClick={() => navigate("/grid-playground")} variant="default" size="sm">
              Grid Playground
            </Button>
          </div>
        )}

        {/* Auth actions */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              {/* Keep this simple for now; swap to a menu later if needed */}
              <Button
                as="button"
                onClick={() => {
                  navigate("/profile");
                }}
                variant="default"
                size="sm"
                title="Profile"
              >
                {user.displayName || user.email}
              </Button>
            </>
          ) : (
            <>
              <Button as="a" href="/login" variant="default" size="sm">
                Login
              </Button>
              <Button as="a" href="/register" variant="default" size="sm">
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}