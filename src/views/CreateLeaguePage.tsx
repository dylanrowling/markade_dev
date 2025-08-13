// CreateLeaguePage.tsx
// Purpose: Page for commissioners to create a new league with name, player count, and draft settings
// 🕒 2025-08-06 — Initial form scaffold with state and field-level validation

import React, { useState } from 'react';
import Button from '../components/Button';
import { addDoc, collection, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { db } from '../services/firebase';

const CreateLeaguePage = () => {
  const [leagueName, setLeagueName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(8);
  const [draftDateTime, setDraftDateTime] = useState('');
  const [draftDuration, setDraftDuration] = useState(60);

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!leagueName || !draftDateTime || !maxPlayers || !draftDuration) {
      alert('Please fill out all fields.');
      return;
    }

    if (!user) {
      alert('You must be logged in to create a league.');
      return;
    }

    try {
      const leagueRef = await addDoc(collection(db, 'leagues'), {
        commissionerId: user.uid,
        title: leagueName,
        slug: leagueName.toLowerCase().replace(/\s+/g, '-'),
        members: [user.uid],
        draftDateTime,
        draftDuration,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating league:', error);
      alert('There was an error creating your league. Please try again.');
    }
  };

  return (
    <div className="text-fg-default bg-panel min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="font-market text-3xl font-bold mb-6">Create a League</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input
          type="text"
          placeholder="League Name"
          value={leagueName}
          onChange={(e) => setLeagueName(e.target.value)}
          className="w-full px-4 py-2 border border-divider rounded-none bg-panel text-fg-default"
        />
        <input
          type="number"
          placeholder="Max Players"
          value={maxPlayers}
          onChange={(e) => setMaxPlayers(Number(e.target.value))}
          className="w-full px-4 py-2 border border-divider rounded-none bg-panel text-fg-default"
        />
        <input
          type="datetime-local"
          placeholder="Draft Date & Time"
          value={draftDateTime}
          onChange={(e) => setDraftDateTime(e.target.value)}
          className="w-full px-4 py-2 border border-divider rounded-none bg-panel text-fg-default"
        />
        <input
          type="number"
          placeholder="Draft Duration (min)"
          value={draftDuration}
          onChange={(e) => setDraftDuration(Number(e.target.value))}
          className="w-full px-4 py-2 border border-divider rounded-none bg-panel text-fg-default"
        />
        <Button type="submit" variant="arcade1">
          Create League
        </Button>
      </form>
      <div className="mt-4">
        <Button variant="default" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default CreateLeaguePage;