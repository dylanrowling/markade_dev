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
  className?: string;
};

export default function LeagueListWidget({
  leagues,
  onCreate,
  className,
}: Props) {
  const hasLeagues = leagues.length > 0;

  return (
    <div className={["text-base", className].filter(Boolean).join(" ")}>
      {hasLeagues ? (
        <>
          <p className="mk-arcade-display text-accentBold text-yellow-400 mb-2">Leagues:</p>
          <ul role="list" className="space-y-2">
            {leagues.map((league) => {
              const name =
                league.title || league.leagueName || "Unnamed League";

              return (
                <li key={league.id}>
                  <Link
                    to={`/league/${league.id}`}
                    aria-label={`Open league ${name}`}
                  >
                    <Button variant="arcadewhite" className="w-full text-left truncate" title={name}>
                      {name}
                    </Button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p className="mk-arcade-display text-accentBold text-yellow-400">
          You are not in any leagues yet
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-3">
        <Button onClick={onCreate} variant="arcadeyellow">
          Create League
        </Button>
      </div>
    </div>
  );
}