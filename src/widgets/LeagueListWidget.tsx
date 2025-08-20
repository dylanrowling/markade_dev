import { Link } from "react-router-dom";
import Button from "../components/Button";

export type LeagueRecord = {
  id: string;
  title?: string;
  leagueName?: string;
};

type Props = {
  leagues: LeagueRecord[];
  onCreate: () => void;
  onLogout: () => void;
  userEmail?: string;
  className?: string;
};

export default function LeagueListWidget({
  leagues,
  onCreate,
  onLogout,
  userEmail,
  className,
}: Props) {
  const hasLeagues = leagues.length > 0;

  return (
    <div className={["text-base", className].filter(Boolean).join(" ")}>
      {hasLeagues ? (
        <ul role="list" className="space-y-2">
          {leagues.map((league) => {
            const name =
              league.title || league.leagueName || "Unnamed League";

            return (
              <li key={league.id}>
                <Link
                  to={`/league/${league.id}`}
                  aria-label={`Open league ${name}`}
                  className={[
                    "block",
                    // row container + border like your panels
                    "border border-divider px-3 py-2",
                    // keyboard focus
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                    // subtle hover invert that matches your link style
                    "hover:bg-surface/10",
                  ].join(" ")}
                >
                  <span
                    className="mk-arcade-display text-xl tracking-wide text-accentBold truncate"
                    title={name}
                  >
                    {name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="border border-divider p-3">
          <p className="font-market mk-text-market-sub mb-3">
            You are not in any leagues yet.
          </p>
          <Button onClick={onCreate} variant="arcade2">
            Create your first league
          </Button>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-3">
        <Button onClick={onCreate} variant="arcade2">
          Create League
        </Button>
        <Button onClick={onLogout} variant="default">
          {userEmail ? `Log Out (${userEmail})` : "Log Out"}
        </Button>
      </div>
    </div>
  );
}