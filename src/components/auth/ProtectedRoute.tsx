import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { Compass, Sparkles } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuthContext();
  const location = useLocation();

  if (!isLoaded) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-sky-500 via-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-xl shadow-sky-500/20 animate-pulse">
            <Compass className="w-8 h-8 animate-spin" />
          </div>
          <Sparkles className="w-5 h-5 text-sky-400 absolute -top-1 -right-1 animate-bounce" />
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-black text-[#111827] dark:text-white tracking-tight">
            Verifying Security Session...
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Trevixa AI Auth Engine • Restoring encrypted traveler session
          </p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
