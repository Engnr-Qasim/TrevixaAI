import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  Compass,
  Bookmark,
  Settings,
  LogOut,
  User as UserIcon,
  ChevronDown,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';

export const UserProfileMenu: React.FC = () => {
  const { user, signOut } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsOpen(false);
    await signOut();
    navigate('/');
  };

  if (!user) return null;

  const initials = (user.fullName || user.firstName || 'T')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200/80 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
        aria-label="User Profile Menu"
      >
        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gradient-to-tr from-sky-500 to-blue-600 text-white flex items-center justify-center font-black text-xs shadow-md border border-white/20">
          {user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={user.fullName || 'User Profile'}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>

        <span className="hidden md:inline-block text-xs font-bold text-slate-700 dark:text-slate-200 max-w-[100px] truncate">
          {user.firstName || 'Traveler'}
        </span>

        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-64 rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 shadow-2xl z-50 overflow-hidden"
          >
            {/* User Header */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-100 dark:border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Authenticated</span>
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  {user.emailVerified ? 'Email verified' : 'Email unverified'}
                </span>
              </div>

              <h4 className="text-sm font-black text-[#111827] dark:text-white truncate">
                {user.fullName || 'Traveler'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate font-medium">
                {user.email || 'user@example.com'}
              </p>
            </div>

            {/* Navigation Links */}
            <div className="p-2 space-y-1 text-xs font-bold">
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 text-sky-500" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/history"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Compass className="w-4 h-4 text-blue-500" />
                <span>My Trips</span>
              </Link>

              <Link
                to="/saved-trips"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Bookmark className="w-4 h-4 text-purple-500" />
                <span>Saved Places</span>
              </Link>

              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Settings className="w-4 h-4 text-emerald-500" />
                <span>Settings</span>
              </Link>
            </div>

            {/* Logout Footer */}
            <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold transition-colors"
              >
                <LogOut className="w-4 h-4 text-rose-500" />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
