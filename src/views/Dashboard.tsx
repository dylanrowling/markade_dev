// Dashboard.tsx — Post-login dashboard with ColorPanel-wrapped widgets [2025-08-19]

import { useEffect, useMemo, useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";

import { auth, db } from "../services/firebase";
import useAuth from "../hooks/useAuth";
import ColorPanel from "../components/ColorPanel";
import { useQuotes } from "../hooks/useStocks";

// widgets
import type { LeagueRecord } from "../types/leagues";
import LeagueListWidget from "../widgets/LeagueListWidget";
import RosterWidget from "../widgets/RosterWidget";
import MatchupWidget from "../widgets/MatchupWidget";
import MarketPingsWidget from "../widgets/MarketPingsWidget";

type QuoteRow = {
  ticker: string;
  price: number;
  changePct: number;
  ts: number;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [leagues, setLeagues] = useState<LeagueRecord[]>([]);

  // Early auth guard
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  const { data: quotes, loading: quotesLoading, error: quotesError } = useQuotes(
    ["AAPL", "GOOGL", "MSFT"]
  );

  useEffect(() => {
    if (!user?.uid) return;
    (async () => {
      try {
        const leaguesRef = collection(db, "leagues");
        const q = query(leaguesRef, where("members", "array-contains", user.uid));
        const querySnapshot = await getDocs(q);
        const leagueData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as any),
        })) as LeagueRecord[];
        setLeagues(leagueData);
      } catch (error) {
        console.error("Error fetching leagues:", error);
      }
    })();
  }, [user?.uid]);

  if (loading) {
    return <p className="font-market mk-text-market-sub">Loading…</p>;
  }

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

  const quoteRows: QuoteRow[] = useMemo(
    () =>
      (quotes ?? []).map((q) => ({
        ticker: q.ticker,
        price: q.price,
        changePct: q.changePct,
        ts: q.ts,
      })),
    [quotes]
  );

  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
      {/* Leagues → Yellow “NEWS” */}
      <ColorPanel tone="yellow" label="LEAGUES" className="xl:col-span-2">
        <LeagueListWidget
          leagues={leagues}
          onCreate={handleCreateLeague}
          onLogout={handleLogout}
          userEmail={user?.email || undefined}
        />
      </ColorPanel>

      {/* Roster → Pink “ROSTER” */}
      <ColorPanel tone="pink" label="ROSTER">
        <RosterWidget />
      </ColorPanel>

      {/* Upcoming → Blue “MATCHUPS” */}
      <ColorPanel tone="blue" label="MATCHUPS">
        <MatchupWidget />
      </ColorPanel>

      {/* Quotes → White “MARKET” */}
      <ColorPanel tone="white" label="MARKET" className="xl:col-span-2">
        <MarketPingsWidget
          rows={quoteRows}
          loading={quotesLoading}
          error={quotesError ?? null}
        />
      </ColorPanel>
    </div>
  );
}