import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Compass,
  Bookmark,
  Sun,
  Moon,
  Menu,
  X,
  ChevronRight,
  User,
  LogIn,
} from 'lucide-react';
import { APP_CONFIG } from '../constants/app';
import { useTheme } from '../context/ThemeContext';
import { useAuthContext } from '../context/AuthContext';
import { UserProfileMenu } from './auth/UserProfileMenu';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();
  const { isSignedIn } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
  };

  const navLinks = [
    { title: 'Home', href: '/', id: 'hero' },
    { title: 'Dashboard', href: '/dashboard', isRoute: true, badge: 'New' },
    { title: 'Features', href: '/#features', id: 'features' },
    { title: 'Destinations', href: '/#destinations', id: 'destinations' },
    { title: 'Pricing', href: '/#pricing', id: 'pricing', badge: 'Coming Soon' },
    { title: 'About', href: '/#about', id: 'about' },
    { title: 'Contact', href: '/#contact', id: 'contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800/80 dark:bg-[#050b14]/80 transition-colors">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-gradient-to-tr from-sky-500 via-cyan-500 to-sky-600 dark:from-blue-600 dark:via-blue-500 dark:to-sky-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-sky-500/20 dark:shadow-blue-500/25 group-hover:scale-105 transition-all duration-300 border border-sky-400/30 dark:border-blue-400/30">
                <Compass className="w-5 h-5" />
              </div>
              <div className="flex flex-col -space-y-0.5">
                <span className="font-bold text-xl tracking-tight text-[#111827] dark:text-white font-sans">
                  {APP_CONFIG.name}
                </span>
                <span className="text-[10px] text-sky-600 dark:text-blue-400 font-semibold uppercase tracking-widest hidden sm:inline">
                  {APP_CONFIG.brandOwner}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((item) => {
              if (item.isRoute) {
                return (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="text-sm font-semibold text-[#4b5563] hover:text-sky-600 dark:text-[#e5e7eb] dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
                  >
                    <span>{item.title}</span>
                    {item.badge && (
                      <span className="inline-block text-[9px] uppercase px-1.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200/60 dark:bg-[#0b1120] dark:text-sky-300 dark:border-blue-900/80 font-bold">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              }

              return (
                <a
                  key={item.title}
                  href={item.href}
                  onClick={(e) => {
                    if (location.pathname === '/' && item.id) {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }
                  }}
                  className="text-sm font-semibold text-[#4b5563] hover:text-sky-600 dark:text-[#e5e7eb] dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <span>{item.title}</span>
                  {item.badge && (
                    <span className="inline-block text-[9px] uppercase px-1.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200/60 dark:bg-[#0b1120] dark:text-sky-300 dark:border-blue-900/80 font-bold">
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action Controls & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="text-[#4b5563] dark:text-[#e5e7eb] hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="h-4 w-4 text-sky-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
              ) : (
                <Moon className="h-4 w-4 text-slate-700 transition-transform duration-300 rotate-0 hover:-rotate-12" />
              )}
            </Button>

            {/* Saved Trips Quick Button */}
            <Link to="/saved-trips" className="hidden sm:inline-flex">
              <Button variant="ghost" size="sm" className="gap-1.5 text-[#4b5563] dark:text-[#e5e7eb]">
                <Bookmark className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                <span className="hidden md:inline">Saved</span>
              </Button>
            </Link>

            {/* User Profile Menu or Sign In Button */}
            {isSignedIn ? (
              <UserProfileMenu />
            ) : (
              <Link to="/sign-in" className="hidden sm:inline-flex">
                <Button variant="outline" size="sm" className="gap-1.5 text-xs font-bold">
                  <LogIn className="h-3.5 w-3.5" />
                  <span>Sign In</span>
                </Button>
              </Link>
            )}

            {/* Get Started / Start Planning Button */}
            <Link to="/plan-trip">
              <Button variant="neon" size="sm" className="gap-2 text-xs sm:text-sm">
                <Sparkles className="h-4 w-4" />
                <span>Get Started</span>
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-slate-700 dark:text-slate-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-b border-slate-200 bg-white/95 backdrop-blur-xl dark:border-slate-800 dark:bg-[#050b14]/95 overflow-hidden"
            >
              <div className="space-y-2 p-4 sm:p-6">
                <div className="mb-2 px-3 text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-blue-400">
                  Navigation
                </div>
                {navLinks.map((item) => {
                  if (item.isRoute) {
                    return (
                      <Link
                        key={item.title}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between rounded-full px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-[#e5e7eb] dark:hover:bg-slate-800/80 transition-colors"
                      >
                        <span>{item.title}</span>
                        <div className="flex items-center gap-1.5">
                          {item.badge && <Badge variant="sky">{item.badge}</Badge>}
                          <ChevronRight className="h-4 w-4 text-slate-400" />
                        </div>
                      </Link>
                    );
                  }

                  return (
                    <a
                      key={item.title}
                      href={item.href}
                      onClick={(e) => {
                        if (location.pathname === '/' && item.id) {
                          e.preventDefault();
                          handleNavClick(item.id);
                        } else {
                          setMobileMenuOpen(false);
                        }
                      }}
                      className="flex items-center justify-between rounded-full px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-[#e5e7eb] dark:hover:bg-slate-800/80 transition-colors"
                    >
                      <span>{item.title}</span>
                      <div className="flex items-center gap-1.5">
                        {item.badge && <Badge variant="sky">{item.badge}</Badge>}
                        <ChevronRight className="h-4 w-4 text-slate-400" />
                      </div>
                    </a>
                  );
                })}

                <div className="my-3 border-t border-slate-200 dark:border-slate-800 pt-3" />

                {isSignedIn ? (
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-between rounded-full px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/80"
                  >
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-sky-500" />
                      <span>Account Settings</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </Link>
                ) : (
                  <Link
                    to="/sign-in"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-between rounded-full px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/80"
                  >
                    <div className="flex items-center gap-2">
                      <LogIn className="h-4 w-4 text-sky-500" />
                      <span>Sign In</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </Link>
                )}

                <div className="pt-2">
                  <Link to="/plan-trip" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="neon" className="w-full justify-center gap-2" size="lg">
                      <Sparkles className="h-4 w-4" />
                      <span>Get Started Free</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};


