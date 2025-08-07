

// useAuth.ts — Custom hook to access Firebase Auth user from context [2025-08-06]

import { useAuthContext } from '../providers/AuthProvider';

const useAuth = () => {
  const { user, loading } = useAuthContext();
  return { user, loading };
};

export default useAuth;