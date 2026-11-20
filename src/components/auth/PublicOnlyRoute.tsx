import React from 'react';
import { Navigate, useLocation, type Location } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

export function authReturnPath(location: Location) {
  const from = location.state?.from;
  const value = new URLSearchParams(location.search).get('returnTo') ??
    (typeof from?.pathname === 'string' ? from.pathname + (from.search ?? '') + (from.hash ?? '') : '');
  if (!value.startsWith('/') || value.startsWith('//') || /[\\\x00-\x20]/.test(value)) return '/dashboard';
  const target = new URL(value, window.location.origin);
  if (target.origin !== window.location.origin || target.pathname.startsWith('//') || /^\/sign-(in|up)(\/|$)/i.test(target.pathname)) return '/dashboard';
  return target.pathname + target.search + target.hash;
}

interface PublicOnlyRouteProps {
  children: React.ReactNode;
}

export const PublicOnlyRoute: React.FC<PublicOnlyRouteProps> = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuthContext();
  const location = useLocation();

  if (isLoaded && isSignedIn) {
    const from = authReturnPath(location);
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};
