import React from 'react';
import { motion } from 'motion/react';
import { Compass, Wallet, Map, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';

interface InsightStat {
  id: string;
  label: string;
  value: string;
  subtext: string;
  icon: React.ElementType;
  gradient: string;
  badge: string;
}

export const TravelInsights: React.FC = () => {
  const stats: InsightStat[] = [
    {
      id: 'trips-planned',
      label: 'Trips Planned',
      value: '12',
      subtext: '+3 this month',
      icon: Compass,
      gradient: 'from-sky-500 to-blue-600',
      badge: 'Active Planner',
    },
    {
      id: 'budget-saved',
      label: 'Budget Saved',
      value: 'PKR 145,000',
      subtext: 'Via AI route & hotel deals',
      icon: Wallet,
      gradient: 'from-emerald-500 to-teal-600',
      badge: 'Top Saver',
    },
    {
      id: 'places-explored',
      label: 'Places Explored',
      value: '28',
      subtext: 'Across 4 provinces & GB',
      icon: Map,
      gradient: 'from-purple-500 to-indigo-600',
      badge: 'Explorer',
    },
    {
      id: 'ai-plans',
      label: 'AI Plans Generated',
      value: '42',
      subtext: 'Instant custom itineraries',
      icon: Sparkles,
      gradient: 'from-amber-500 to-orange-600',
      badge: 'Pro Member',
    },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <span>Lifetime Travel Analytics</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#111827] dark:text-white tracking-tight">
            Travel Insights
          </h2>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <ShieldCheck className="w-4 h-4 text-sky-500" />
          <span>Synced with Nexora Account</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.06 }}
              className="relative p-6 rounded-[2rem] bg-white dark:bg-[#0b1120] border border-slate-200/80 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Background ambient glow */}
              <div className={`absolute -right-6 -bottom-6 w-28 h-28 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />

              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-extrabold border border-slate-200/80 dark:border-slate-700">
                  {stat.badge}
                </span>
              </div>

              <div>
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-2xl sm:text-3xl font-black text-[#111827] dark:text-white tracking-tight"
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm font-bold text-slate-700 dark:text-slate-200 mt-1">
                  {stat.label}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  {stat.subtext}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
