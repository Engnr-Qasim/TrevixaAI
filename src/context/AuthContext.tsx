import React, { createContext, useContext, useState, useEffect, useLayoutEffect } from 'react';
import { useUser as useClerkUser, useAuth as useClerkAuth, useSession, useClerk } from '@clerk/clerk-react';

import { connectSupabaseSession } from '../lib/supabase';
import { dbService } from '../services/dbService';

export const CAN_USE_DEMO_AUTH = import.meta.env.DEV;

export interface UserProfileData {
  id: string;
  fullName: string | null;
  firstName: string | null;
  email: string | null;
  imageUrl: string | null;
  createdAt?: string;
  emailVerified?: boolean;
}

interface AuthContextType {
  isSignedIn: boolean;
  isLoaded: boolean;
  user: UserProfileData | null;
  isClerkLive: boolean;
  getSessionToken: () => Promise<string | null>;
  signOut: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signUpWithEmail: (fullName: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  updateProfile: (data: { fullName?: string; imageUrl?: string }) => Promise<{ success: boolean; error?: string }>;
  deleteAccount: () => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const CLERK_PUB_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
export const IS_CLERK_CONFIGURED = Boolean(
  CLERK_PUB_KEY && /^pk_(test|live)_[A-Za-z0-9+/=]+$/.test(CLERK_PUB_KEY)
);

// Fallback User State Storage Key
const FALLBACK_USER_STORAGE_KEY = 'trevixa_fallback_user_session';

const defaultFallbackUser: UserProfileData = {
  id: 'usr_trevixa_demo_789',
  fullName: 'Qasim Usman',
  firstName: 'Qasim',
  email: 'qasim.usman@trevixa.ai',
  imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  createdAt: '2026-01-15',
  emailVerified: true,
};

// 1. Internal provider when Clerk is LIVE
const LiveClerkAuthProviderInner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user: clerkUser, isLoaded: clerkUserLoaded } = useClerkUser();
  const { isSignedIn: clerkSignedIn, isLoaded: clerkAuthLoaded } = useClerkAuth();
  const { session } = useSession();
  const { signOut: clerkSignOut, openSignIn, openSignUp } = useClerk();

  const [localCustomProfile, setLocalCustomProfile] = useState<{ fullName?: string; imageUrl?: string }>({});

  const user: UserProfileData | null = clerkUser
    ? {
        id: clerkUser.id,
        fullName: localCustomProfile.fullName || clerkUser.fullName || `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'Traveler',
        firstName: clerkUser.firstName || 'Traveler',
        email: clerkUser.primaryEmailAddress?.emailAddress || null,
        imageUrl: localCustomProfile.imageUrl || clerkUser.imageUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        createdAt: clerkUser.createdAt ? new Date(clerkUser.createdAt).toISOString().split('T')[0] : '2026-01-01',
        emailVerified: clerkUser.primaryEmailAddress?.verification?.status === 'verified',
      }
    : null;

  const handleSignOut = async () => {
    await clerkSignOut();
  };

  const handleSignInWithEmail = async (email: string, pass: string) => {
    if (!email || !pass) {
      return { success: false, error: 'Email and password are required.' };
    }
    openSignIn();
    return { success: true };
  };

  const handleSignUpWithEmail = async (fullName: string, email: string, pass: string) => {
    if (!fullName || !email || !pass) {
      return { success: false, error: 'Please fill in all required fields.' };
    }
    openSignUp();
    return { success: true };
  };

  const handleSignInWithGoogle = async () => {
    openSignIn();
    return { success: true };
  };

  const handleUpdateProfile = async (data: { fullName?: string; imageUrl?: string }) => {
    setLocalCustomProfile((prev) => ({ ...prev, ...data }));
    return { success: true };
  };

  const handleDeleteAccount = async () => {
    try {
      if (clerkUser) {
        await clerkUser.delete();
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to delete account' };
    }
  };

  useLayoutEffect(() => {
    if (!session || !user) return;
    const disconnect = connectSupabaseSession(() => session.getToken());
    dbService.ensureUserProfile(user);
    return disconnect;
  }, [session, user?.id, user?.email, user?.fullName, user?.imageUrl]);

  return (
    <AuthContext.Provider
      value={{
        isSignedIn: Boolean(clerkSignedIn),
        isLoaded: clerkUserLoaded && clerkAuthLoaded,
        user,
        isClerkLive: true,
        getSessionToken: () => session?.getToken() ?? Promise.resolve(null),
        signOut: handleSignOut,
        signInWithEmail: handleSignInWithEmail,
        signUpWithEmail: handleSignUpWithEmail,
        signInWithGoogle: handleSignInWithGoogle,
        updateProfile: handleUpdateProfile,
        deleteAccount: handleDeleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 2. Fallback Auth Provider when Clerk key is NOT present
export const FallbackAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfileData | null>(() => {
    try {
      const saved = localStorage.getItem(FALLBACK_USER_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return defaultFallbackUser;
  });

  const [isSignedIn, setIsSignedIn] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(FALLBACK_USER_STORAGE_KEY);
      return Boolean(saved);
    } catch {
      return true; // default logged in demo for quick testing
    }
  });

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      if (isSignedIn && user) {
        localStorage.setItem(FALLBACK_USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(FALLBACK_USER_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [isSignedIn, user]);

  const signOut = async () => {
    setIsSignedIn(false);
    setUser(null);
  };

  const signInWithEmail = async (email: string, pass: string) => {
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (!pass || pass.length < 4) {
      return { success: false, error: 'Invalid credentials. Password must be at least 4 characters.' };
    }

    const newUser: UserProfileData = {
      id: `usr_${Date.now()}`,
      fullName: email.split('@')[0].replace('.', ' ') || 'Traveler',
      firstName: email.split('@')[0] || 'Traveler',
      email,
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      createdAt: new Date().toISOString().split('T')[0],
      emailVerified: true,
    };
    setUser(newUser);
    setIsSignedIn(true);
    return { success: true };
  };

  const signUpWithEmail = async (fullName: string, email: string, pass: string) => {
    if (!fullName.trim()) {
      return { success: false, error: 'Full name is required.' };
    }
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (!pass || pass.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    const newUser: UserProfileData = {
      id: `usr_${Date.now()}`,
      fullName: fullName.trim(),
      firstName: fullName.trim().split(' ')[0],
      email: email.trim(),
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      createdAt: new Date().toISOString().split('T')[0],
      emailVerified: true,
    };
    setUser(newUser);
    setIsSignedIn(true);
    return { success: true };
  };

  const signInWithGoogle = async () => {
    const googleUser: UserProfileData = {
      id: `usr_google_${Date.now()}`,
      fullName: 'Google Explorer',
      firstName: 'Google',
      email: 'explorer.google@gmail.com',
      imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      createdAt: new Date().toISOString().split('T')[0],
      emailVerified: true,
    };
    setUser(googleUser);
    setIsSignedIn(true);
    return { success: true };
  };

  const updateProfile = async (data: { fullName?: string; imageUrl?: string }) => {
    if (!user) return { success: false, error: 'No user signed in' };
    const updated = {
      ...user,
      fullName: data.fullName ?? user.fullName,
      firstName: data.fullName ? data.fullName.split(' ')[0] : user.firstName,
      imageUrl: data.imageUrl ?? user.imageUrl,
    };
    setUser(updated);
    return { success: true };
  };

  const deleteAccount = async () => {
    setIsSignedIn(false);
    setUser(null);
    localStorage.removeItem(FALLBACK_USER_STORAGE_KEY);
    return { success: true };
  };

  useEffect(() => {
    if (user) {
      import('../services/dbService').then(({ dbService }) => {
        dbService.ensureUserProfile(user);
      });
    }
  }, [user?.id]);

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        isLoaded,
        user,
        isClerkLive: false,
        getSessionToken: async () => null,
        signOut,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        updateProfile,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const authUnavailable = async () => ({ success: false, error: 'Authentication is unavailable.' });

export const UnconfiguredAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthContext.Provider value={{
    isSignedIn: false, isLoaded: true, isClerkLive: false, user: null,
    getSessionToken: async () => null, signOut: async () => {},
    signInWithEmail: authUnavailable, signUpWithEmail: authUnavailable,
    signInWithGoogle: authUnavailable, updateProfile: authUnavailable, deleteAccount: authUnavailable,
  }}>
    {children}
  </AuthContext.Provider>
);

export const LiveClerkAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <LiveClerkAuthProviderInner>{children}</LiveClerkAuthProviderInner>;
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return ctx;
};
