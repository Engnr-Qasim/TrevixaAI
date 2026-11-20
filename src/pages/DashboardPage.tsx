import React, { useState } from 'react';
import { motion } from 'motion/react';
import { WelcomeHero } from '../components/dashboard/WelcomeHero';
import { QuickActions } from '../components/dashboard/QuickActions';
import { ContinuePlanning } from '../components/dashboard/ContinuePlanning';
import { AiRecommendations } from '../components/dashboard/AiRecommendations';
import { PopularDestinations } from '../components/dashboard/PopularDestinations';
import { TravelInsights } from '../components/dashboard/TravelInsights';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { SavedDestinations } from '../components/dashboard/SavedDestinations';
import { TrendingThisWeek } from '../components/dashboard/TrendingThisWeek';
import { Sparkles, Compass, Filter, RefreshCw, LayoutDashboard } from 'lucide-react';
import { Button } from '../components/ui/button';

export const DashboardPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'itineraries' | 'budget' | 'bookmarks'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <div className="w-full space-y-12 sm:space-y-16 pb-20 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Section Filter Header & Quick Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-md shadow-sky-500/20">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#111827] dark:text-white tracking-tight flex items-center gap-2">
              <span>Explorer Hub</span>
              <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 dark:bg-blue-900/60 dark:text-sky-300 border border-sky-200 dark:border-blue-800">
                Planner
              </span>
            </h1>
            <p className="text-xs text-[#4b5563] dark:text-[#cbd5e1] font-medium">
              Trevixa AI Travel Engine • Plan Smart, Travel Better
            </p>
          </div>
        </div>

        {/* Filter Pills & Refresh Button */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 text-xs font-bold">
            {(['all', 'itineraries', 'budget', 'bookmarks'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-3 py-1.5 rounded-xl capitalize transition-all ${
                  activeFilter === tab
                    ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1120]"
            aria-label="Refresh Dashboard Data"
          >
            <RefreshCw className={`w-4 h-4 text-slate-500 ${isRefreshing ? 'animate-spin text-sky-500' : ''}`} />
          </Button>
        </div>
      </div>

      {/* SECTION 1: WELCOME HERO */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <WelcomeHero />
      </motion.div>

      {/* SECTION 2: QUICK ACTIONS */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <QuickActions />
      </motion.div>

      {/* SECTION 3: CONTINUE PLANNING */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <ContinuePlanning />
      </motion.div>

      {/* SECTION 4: AI RECOMMENDATIONS */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <AiRecommendations />
      </motion.div>

      {/* SECTION 5: POPULAR DESTINATIONS */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <PopularDestinations />
      </motion.div>

      {/* SECTION 6: TRAVEL INSIGHTS */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        <TravelInsights />
      </motion.div>

      {/* SECTION 7: RECENT ACTIVITY */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <RecentActivity />
      </motion.div>

      {/* SECTION 8: SAVED DESTINATIONS */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
      >
        <SavedDestinations />
      </motion.div>

      {/* SECTION 9: TRENDING THIS WEEK */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <TrendingThisWeek />
      </motion.div>
    </div>
  );
};
