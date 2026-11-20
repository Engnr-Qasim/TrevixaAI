import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  LayoutDashboard,
  MapPin,
  Sparkles,
  Bookmark,
  User,
  X,
  Moon,
  Sun,
  ShieldCheck,
  ChevronRight,
  LogOut,
  Wallet,
  Settings,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { APP_CONFIG } from '../constants/app';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { resolvedTheme, toggleTheme } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/', icon: Compass },
    { label: 'Hub', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Create', path: '/plan-trip', isPrimary: true, icon: Sparkles },
    { label: 'Saved', path: '/saved-trips', icon: Bookmark },
    { label: 'Profile', path: '#profile', icon: User, onClick: () => setProfileOpen(true) },
  ];

  return (
    <>
      {/* Sticky Bottom Bar for Mobile & Tablet (lg:hidden) */}
      <nav aria-label="Mobile Navigation" className="fixed bottom-0 left-0 right-0 z-50 lg:hidden px-3 pb-safe pt-1.5 pb-2">
        <div className="mx-auto max-w-md rounded-3xl bg-white/90 dark:bg-[#080d1a]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xl shadow-slate-900/15 p-1.5 flex items-center justify-around relative">
          {navItems.map((item) => {
            const isActive = item.path === '/' 
              ? location.pathname === '/' 
              : item.path !== '#profile' && location.pathname.startsWith(item.path);

            if (item.isPrimary) {
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className="flex flex-col items-center justify-center -mt-5"
                >
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-tr from-sky-500 via-blue-600 to-sky-400 text-white flex items-center justify-center shadow-lg shadow-sky-500/35 border-2 border-white dark:border-[#080d1a]"
                  >
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </motion.div>
                  <span className="text-[10px] font-extrabold text-sky-600 dark:text-blue-400 mt-1">
                    {item.label}
                  </span>
                </Link>
              );
            }

            if (item.onClick) {
              return (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className="flex flex-col items-center justify-center py-1 px-3 rounded-2xl relative transition-all active:scale-95"
                >
                  <item.icon className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  <span className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 mt-1">
                    {item.label}
                  </span>
                </button>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.path}
                className="flex flex-col items-center justify-center py-1 px-3 rounded-2xl relative transition-all active:scale-95"
              >
                {isActive && (
                  <motion.div
                    layoutId="mobileNavPill"
                    className="absolute inset-0 bg-sky-500/10 dark:bg-blue-500/20 rounded-2xl -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <item.icon
                  className={`w-5 h-5 transition-colors ${
                    isActive
                      ? 'text-sky-600 dark:text-blue-400 stroke-[2.5]'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                />
                <span
                  className={`text-[10px] font-extrabold mt-1 transition-colors ${
                    isActive
                      ? 'text-sky-600 dark:text-blue-400'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Native Mobile Profile Sheet / Modal */}
      <AnimatePresence>
        {profileOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-md p-0 sm:p-4 lg:hidden">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="w-full max-w-lg bg-white dark:bg-[#0b1120] rounded-t-[2.5rem] sm:rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
            >
              {/* Grab handle bar */}
              <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto -mt-1 mb-2" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white font-extrabold flex items-center justify-center text-lg shadow-md">
                    QA
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#111827] dark:text-white">Qasim Usman</h3>
                    <p className="text-xs text-sky-600 dark:text-blue-400 font-semibold">Traveler Account</p>
                  </div>
                </div>
                <button
                  onClick={() => setProfileOpen(false)}
                  className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Account Quick Stats */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 dark:bg-[#050b14] rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center">
                <div>
                  <div className="text-sm font-black text-[#111827] dark:text-white">4</div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Trips Built</div>
                </div>
                <div className="border-x border-slate-200 dark:border-slate-800">
                  <div className="text-sm font-black text-sky-600 dark:text-blue-400">12</div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Saved Spots</div>
                </div>
                <div>
                  <div className="text-sm font-black text-emerald-500">PKR</div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Currency</div>
                </div>
              </div>

              {/* Preferences List */}
              <div className="space-y-2 pt-1">
                <div className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 px-1">
                  App Settings
                </div>

                <button
                  onClick={toggleTheme}
                  className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-[#050b14] border border-slate-200/80 dark:border-slate-800 flex items-center justify-between font-bold text-sm text-[#111827] dark:text-white"
                >
                  <div className="flex items-center gap-3">
                    {resolvedTheme === 'dark' ? (
                      <Sun className="w-5 h-5 text-amber-400" />
                    ) : (
                      <Moon className="w-5 h-5 text-sky-600" />
                    )}
                    <span>Appearance</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 capitalize">
                    {resolvedTheme} Mode
                  </span>
                </button>

                <Link
                  to="/history"
                  onClick={() => setProfileOpen(false)}
                  className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-[#050b14] border border-slate-200/80 dark:border-slate-800 flex items-center justify-between font-bold text-sm text-[#111827] dark:text-white"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-sky-500" />
                    <span>My Travel History</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>

                <Link
                  to="/budget-estimator"
                  onClick={() => setProfileOpen(false)}
                  className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-[#050b14] border border-slate-200/80 dark:border-slate-800 flex items-center justify-between font-bold text-sm text-[#111827] dark:text-white"
                >
                  <div className="flex items-center gap-3">
                    <Wallet className="w-5 h-5 text-emerald-500" />
                    <span>PKR Fuel & Jeep Rates</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>

                <Link
                  to="/about"
                  onClick={() => setProfileOpen(false)}
                  className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-[#050b14] border border-slate-200/80 dark:border-slate-800 flex items-center justify-between font-bold text-sm text-[#111827] dark:text-white"
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-blue-500" />
                    <span>About {APP_CONFIG.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setProfileOpen(false)}
                  className="w-full py-3.5 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-blue-400 font-extrabold text-sm flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Close Profile</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
