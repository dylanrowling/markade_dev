


// Hook to test Firestore connectivity by writing and reading a test document
// [2025-08-06] Initial implementation for connectivity validation

import { useEffect } from 'react';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { app } from '../services/firebase';

const useFirestoreTest = () => {
  useEffect(() => {
    const runTest = async () => {
      try {
        const db = getFirestore(app);
        const testRef = doc(db, 'test-hooks', 'connection-check');

        // Write a test document
        await setDoc(testRef, { timestamp: new Date().toISOString(), status: 'ok' });
        console.log('✅ Firestore write successful');

        // Read the test document
        const docSnap = await getDoc(testRef);
        if (docSnap.exists()) {
          console.log('✅ Firestore read successful:', docSnap.data());
        } else {
          console.error('❌ Document not found');
        }
      } catch (err) {
        console.error('🔥 Firestore test failed:', err);
      }
    };

    runTest();
  }, []);
};

export default useFirestoreTest;