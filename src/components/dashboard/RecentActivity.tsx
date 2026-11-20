import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Sparkles, Bookmark, Eye, Calculator, Clock, ChevronRight, CheckCircle } from 'lucide-react';

interface ActivityItem {
  id: string;
  title: string;
  action: string;
  timestamp: string;
  icon: React.ElementType;
  iconColor: string;
  badge: string;
  link: string;
}

export const RecentActivity: React.FC = () => {
  const activities: ActivityItem[] = [
    {
      id: 'act-1',
      title: 'Generated 5-Day Hunza Autumn Plan',
      action: 'AI Generator',
      timestamp: '2 hours ago',
      icon: Sparkles,
      iconColor: 'text-sky-500 bg-sky-50 dark:bg-blue-950/60',
      badge: 'Itinerary',
      link: '/plan-trip?destination=Hunza',
    },
    {
      id: 'act-2',
      title: 'Saved Serena Shigar Fort Resort, Skardu',
      action: 'Saved Items',
      timestamp: 'Yesterday at 4:30 PM',
      icon: Bookmark,
      iconColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60',
      badge: 'Hotel',
      link: '/saved-trips',
    },
    {
      id: 'act-3',
      title: 'Viewed Fairy Meadows Trekking & Jeep Guide',
      action: 'Destination Guide',
      timestamp: '3 days ago',
      icon: Eye,
      iconColor: 'text-purple-500 bg-purple-50 dark:bg-purple-950/60',
      badge: 'Guide',
      link: '/attractions',
    },
    {
      id: 'act-4',
      title: 'Calculated Fuel & Jeep Budget for Swat Roadtrip',
      action: 'Budget Estimator',
      timestamp: '5 days ago',
      icon: Calculator,
      iconColor: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60',
      badge: 'Budget',
      link: '/budget-estimator',
    },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#111827] dark:text-white tracking-tight">
            Example Activity
          </h2>
          <p className="text-xs sm:text-sm text-[#4b5563] dark:text-[#cbd5e1] font-medium">
            Your recent trip planning sessions and saved bookmarks
          </p>
        </div>

        <Link to="/history" className="text-xs font-extrabold text-sky-600 dark:text-blue-400 hover:underline flex items-center gap-1">
          <span>Full History</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="rounded-[2.5rem] bg-white dark:bg-[#0b1120] border border-slate-200/80 dark:border-slate-800 p-5 sm:p-7 shadow-lg">
        <div className="relative space-y-6 before:absolute before:inset-0 before:left-5 sm:before:left-6 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
          {activities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="relative flex items-start gap-4 pl-1 group"
              >
                {/* Timeline Icon Node */}
                <div className={`relative z-10 w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-slate-200/80 dark:border-slate-700 ${item.iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content Box */}
                <div className="flex-1 bg-slate-50 dark:bg-[#050b14] border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group-hover:border-sky-500/40 dark:group-hover:border-blue-500/40 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {item.badge}
                      </span>
                      <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{item.timestamp}</span>
                      </span>
                    </div>

                    <h4 className="text-sm font-black text-[#111827] dark:text-white group-hover:text-sky-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h4>
                  </div>

                  <Link to={item.link}>
                    <button className="self-start sm:self-center px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-sky-500 hover:text-white hover:border-sky-500 dark:hover:bg-blue-600 transition-colors flex items-center gap-1">
                      <span>View</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
