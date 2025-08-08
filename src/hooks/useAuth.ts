// useAuth.ts — Custom hook to access Firebase Auth context
// 2025-08-06 Initial pass-through of user and loading
// 2025-08-07 Return full context including login, register, logout

import { useAuthContext } from '../providers/AuthProvider';

const useAuth = () => {
  return useAuthContext();
};

export default useAuth;