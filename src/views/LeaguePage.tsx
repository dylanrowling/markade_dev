// LeaguePage.tsx
// Purpose: Display league-specific details, players, and draft info
// 🕓 2025-08-06 — Initial structure with data fetching and role-based display

import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import useAuth from '../hooks/useAuth';
import Button from '../components/Button';

export default function LeaguePage() {
  const { leagueId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [league, setLeague] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!leagueId) return;

    const fetchLeague = async () => {
      try {
        const docRef = doc(db, 'leagues', leagueId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setLeague({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (err) {
        console.error('Failed to load league:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeague();
  }, [leagueId]);

  if (loading) return <div className="text-white p-4">Loading League...</div>;
  if (!league) return <div className="text-white p-4">League not found.</div>;

  const isCommissioner = league.commissionerId === user?.uid;

  return (
    <div className="text-white min-h-screen bg-black flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold">{league.title}</h1>
      <p className="text-sm text-gray-400">League ID: {league.id}</p>
      <p>
        Draft Date:{' '}
        {league.draftDateTime?.seconds
          ? new Date(league.draftDateTime.seconds * 1000).toLocaleString()
          : 'N/A'}
      </p>
      <p>Draft Duration: {league.draftDuration || 'N/A'} minutes</p>
      <p className="mt-2">
        Role: {isCommissioner ? 'Commissioner' : 'Player'}
      </p>
      <div>
        <h2 className="text-xl font-semibold mt-4">Members</h2>
        <ul className="list-disc pl-5">
          {league.members?.map((memberId: string) => (
            <li key={memberId}>{memberId}</li>
          ))}
        </ul>
      </div>
      <Button onClick={() => navigate('/dashboard')} variant="secondary">
        Back to Dashboard
      </Button>
    </div>
  );
}
