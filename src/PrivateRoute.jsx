import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  const [authState, setAuthState] = useState({ loading: true, user: null });
  const location = useLocation();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthState({ loading: false, user });
    });

    return () => unsubscribe();
  }, [auth]);

  // Show loading state while checking auth
  if (authState.loading) {
    return <div style={{ textAlign: 'center', padding: '50px', color: '#1A2258' }}>Loading...</div>;
  }

  // No user: redirect to sign-in
  if (!authState.user) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  // User is authenticated but email not verified: redirect to /verify-email (except for /verify-email)
  if (!authState.user.emailVerified && location.pathname !== '/verify-email') {
    return <Navigate to="/verify-email" replace state={{ from: location.pathname }} />;
  }

  // User is authenticated and verified (or on /verify-email): render children
  return children;
}

export default PrivateRoute;