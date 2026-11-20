import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme } from '../types';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'trevixa_theme';

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'system';
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY) as Theme | null;
  return saved || 'system';
};

const getInitialResolvedTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY) as Theme | null;
  if (saved === 'dark') return 'dark';
  if (saved === 'light') return 'light';
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(getInitialResolvedTheme);

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (isDark: boolean) => {
      if (isDark) {
        root.classList.add('dark');
        setResolvedTheme('dark');
      } else {
        root.classList.remove('dark');
        setResolvedTheme('light');
      }
    };

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      applyTheme(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        applyTheme(e.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      applyTheme(theme === 'dark');
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, newTheme);
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
