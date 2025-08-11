// hooks/useAuth.ts
// Purpose: Convenience hook around AuthProvider context
// 2025-08-06 Initial pass-through
// 2025-08-07 Return full context API
// 2025-08-11 Add named export and explicit return type

import { useAuthContext } from '../providers/AuthProvider';

/**
 * Access the global Firebase auth context.
 * Includes: { user, loading, isAuthenticated, login, register, logout }
 */
export function useAuth(): ReturnType<typeof useAuthContext> {
  return useAuthContext();
}

export default useAuth;