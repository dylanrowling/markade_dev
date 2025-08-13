// Dashboard.tsx — Post-login dashboard scaffold with panels [2025-08-12]

import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";

import { auth, db } from "../services/firebase";
import useAuth from "../hooks/useAuth";
import Button from "../components/Button";
import Panel from "../components/Panel";
import SectionHeader from "../components/SectionHeader";
import { useQuotes } from "../hooks/useStocks";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [leagues, setLeagues] = useState<any[]>([]);
  const { data: quotes, loading: quotesLoading, error: quotesError } = useQuotes(
    ["AAPL", "GOOGL", "MSFT"]
  );

  if (loading) return <p className="font-market text-fg-default">Loading...</p>;

  useEffect(() => {
    const fetchLeagues = async () => {
      if (!user?.uid) return;
      try {
        const leaguesRef = collection(db, "leagues");
        const q = query(leaguesRef, where("members", "array-contains", user.uid));
        const querySnapshot = await getDocs(q);
        const leagueData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLeagues(leagueData);
      } catch (error) {
        console.error("Error fetching leagues:", error);
      }
    };

    fetchLeagues();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleCreateLeague = () => {
    navigate("/create-league");
  };

  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
      {/* My Leagues */}
      <Panel className="xl:col-span-2">
        <SectionHeader title="My Leagues" subtitle="Leagues you’re in" />
        <div className="text-base">
          {leagues.length > 0 ? (
            <ul className="space-y-2">
              {leagues.map((league) => (
                <li key={league.id} className="border border-divider rounded-none p-2">
                  <Link
                    to={`/league/${league.id}`}
                    className="text-accent-pink hover:underline font-arcade text-xl tracking-wide"
                  >
                    {league.title || league.leagueName || "Unnamed League"}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-market text-fg-default">You are not in any leagues yet.</p>
          )}

          <div className="mt-4 flex flex-wrap gap-3">
            <Button onClick={handleCreateLeague} variant="arcade2">
              Create League
            </Button>
            <Button onClick={handleLogout} variant="default">
              Log Out {user?.email ? `(${user.email})` : ""}
            </Button>
          </div>
        </div>
      </Panel>

      {/* Roster placeholder */}
      <Panel>
        <SectionHeader title="Roster" subtitle="Your current lineup" />
        <p className="font-market text-fg-default">Coming soon.</p>
      </Panel>

      {/* Upcoming Matchup placeholder */}
      <Panel>
        <SectionHeader title="Upcoming Matchup" subtitle="Your week at a glance" />
        <p className="font-market text-fg-default">Coming soon.</p>
      </Panel>

      {/* Market Pings (Live Quotes) */}
      <Panel className="xl:col-span-2">
        <SectionHeader title="Market Pings" subtitle="Live quotes (mock or Finnhub)" />
        {quotesLoading && <p aria-live="polite">Loading quotes…</p>}
        {quotesError && <p aria-live="polite" className="text-state-error">{quotesError}</p>}
        {!quotesLoading && !quotesError && (
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left border-b border-divider">
                <th scope="col" className="py-2">Ticker</th>
                <th scope="col" className="py-2">Price</th>
                <th scope="col" className="py-2">Change %</th>
                <th scope="col" className="py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {(quotes ?? []).map((q) => (
                <tr key={q.ticker} className="border-b border-divider/50">
                  <td className="py-2">{q.ticker}</td>
                  <td className="py-2">{q.price.toFixed(2)}</td>
                  <td className={`py-2 ${q.changePct >= 0 ? "text-state-success" : "text-state-error"}`}>
                    {q.changePct.toFixed(2)}
                  </td>
                  <td className="py-2">{new Date(q.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <p className="text-xs text-fg-subtle mt-2">
          Data source controlled by <code>VITE_STOCKS_PROVIDER</code>.
        </p>
      </Panel>
    </div>
  );
}