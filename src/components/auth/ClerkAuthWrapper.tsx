import React from 'react';
import { ClerkProvider } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';
import {
  LiveClerkAuthProvider,
  FallbackAuthProvider,
  UnconfiguredAuthProvider,
  CAN_USE_DEMO_AUTH,
  IS_CLERK_CONFIGURED,
} from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const CLERK_PUB_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export const ClerkAuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { resolvedTheme } = useTheme();

  if (IS_CLERK_CONFIGURED && CLERK_PUB_KEY) {
    return (
      <ClerkProvider
        publishableKey={CLERK_PUB_KEY}
        signInUrl="/sign-in"
        signUpUrl="/sign-up"
        signInFallbackRedirectUrl="/dashboard"
        signUpFallbackRedirectUrl="/dashboard"
        afterSignOutUrl="/"
        appearance={{
          baseTheme: resolvedTheme === 'dark' ? dark : undefined,
          variables: {
            colorPrimary: '#0284c7', // Sky-600
            colorBackground: resolvedTheme === 'dark' ? '#0b1120' : '#ffffff',
            colorText: resolvedTheme === 'dark' ? '#ffffff' : '#111827',
            colorInputBackground: resolvedTheme === 'dark' ? '#050b14' : '#f8fafc',
            colorInputText: resolvedTheme === 'dark' ? '#ffffff' : '#111827',
            borderRadius: '1rem',
          },
          elements: {
            card: 'rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl bg-white dark:bg-[#0b1120]',
            formButtonPrimary:
              'bg-gradient-to-r from-sky-500 via-blue-600 to-sky-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold rounded-2xl py-3 shadow-md transition-all',
            socialButtonsBlockButton:
              'rounded-2xl border border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-50 dark:hover:bg-slate-800/60',
            headerTitle: 'text-2xl font-black text-[#111827] dark:text-white',
            headerSubtitle: 'text-xs text-slate-500 dark:text-slate-400 font-medium',
          },
        }}
      >
        <LiveClerkAuthProvider>{children}</LiveClerkAuthProvider>
      </ClerkProvider>
    );
  }

  const Provider = CAN_USE_DEMO_AUTH ? FallbackAuthProvider : UnconfiguredAuthProvider;
  return <Provider>{children}</Provider>;
};
