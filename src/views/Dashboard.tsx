// Dashboard.tsx — Placeholder for post-login user dashboard [2025-08-06]

import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';
import Button from '../components/Button';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import useAuth from '../hooks/useAuth';
import { useQuotes } from '../hooks/useStocks';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [leagues, setLeagues] = useState<any[]>([]);
  const { data: quotes, loading: quotesLoading, error: quotesError } = useQuotes(["AAPL", "GOOGL", "MSFT"]);

  if (loading) return <p className="text-white">Loading...</p>;

  useEffect(() => {
    const fetchLeagues = async () => {
      if (!user?.uid) return;
      try {
        const leaguesRef = collection(db, 'leagues');
        const q = query(leaguesRef, where('members', 'array-contains', user.uid));
        const querySnapshot = await getDocs(q);
        const leagueData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLeagues(leagueData);
      } catch (error) {
        console.error('Error fetching leagues:', error);
      }
    };

    fetchLeagues();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleCreateLeague = () => {
    navigate('/create-league');
  };

  return (
    <div className="text-white min-h-screen bg-background flex flex-col items-center justify-center gap-4 text-2xl">
      <p className="font-market-header">Welcome to the Dashboard!</p>
      <div className="text-base text-left w-full max-w-md">
        {leagues.length > 0 ? (
          <ul className="space-y-2">
            {leagues.map((league) => (
              <li key={league.id} className="border border-white rounded p-2">
                <Link
                  to={`/league/${league.id}`}
                  className="text-pink-400 hover:underline font-arcade text-xl tracking-wide"
                >
                  {league.title || league.leagueName || 'Unnamed League'}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 font-market">You are not in any leagues yet.</p>
        )}
      </div>
      <Button onClick={handleCreateLeague} variant="arcade2">
        Create League
      </Button>
      <Button onClick={handleLogout} variant="default1">
        Log Out {user?.email ? `(${user.email})` : ''}
      </Button>
      {/* Live Quotes Test – quick smoke test for stockClient (mock | finnhub) */}
      <div className="text-base w-full max-w-2xl mt-6">
        <div className="border border-white/20 rounded p-3">
          <h3 className="font-market-header text-xl mb-2">Live Quotes Test</h3>
          {quotesLoading && <p>Loading quotes…</p>}
          {quotesError && <p className="text-red-400">{quotesError}</p>}
          {!quotesLoading && !quotesError && (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--mk-border)' }}>
                  <th>Ticker</th>
                  <th>Price</th>
                  <th>Change %</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {(quotes ?? []).map((q) => (
                  <tr key={q.ticker} style={{ borderBottom: '1px solid var(--mk-grid)' }}>
                    <td>{q.ticker}</td>
                    <td>{q.price.toFixed(2)}</td>
                    <td style={{ color: q.changePct >= 0 ? 'var(--mk-green)' : 'var(--mk-red)' }}>
                      {q.changePct.toFixed(2)}
                    </td>
                    <td>{new Date(q.ts).toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <p className="text-xs text-gray-400 mt-2">
            {/* TODO: Remove this test once data wiring is confirmed. Controlled by VITE_STOCKS_PROVIDER (mock | finnhub). */}
            Data source controlled by VITE_STOCKS_PROVIDER.
          </p>
        </div>
      </div>
    </div>
  );
}