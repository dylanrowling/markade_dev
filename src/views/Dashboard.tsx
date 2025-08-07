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

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [leagues, setLeagues] = useState<any[]>([]);

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
    </div>
  );
}