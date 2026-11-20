import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Sparkles, Calculator, Hotel, Utensils, Bookmark, ChevronRight } from 'lucide-react';

interface QuickActionItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  color: string;
  badge?: string;
}

export const QuickActions: React.FC = () => {
  const actions: QuickActionItem[] = [
    {
      id: 'generate-ai',
      title: 'Generate AI Trip',
      description: 'Custom itinerary tailored to your preferences in seconds',
      icon: Sparkles,
      href: '/plan-trip',
      color: 'from-sky-500 to-blue-600',
      badge: 'Popular',
    },
    {
      id: 'budget-calc',
      title: 'Budget Calculator',
      description: 'Estimate fuel, jeep rentals, and stay costs in PKR',
      icon: Calculator,
      href: '/budget-estimator',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      id: 'hotels',
      title: 'Hotels & Resorts',
      description: 'Browse luxury and boutique stay ideas in Pakistan',
      icon: Hotel,
      href: '/hotels',
      color: 'from-indigo-500 to-purple-600',
    },
    {
      id: 'restaurants',
      title: 'Local Dining',
      description: 'Discover authentic northern cuisines, trout, & cafes',
      icon: Utensils,
      href: '/restaurants',
      color: 'from-amber-500 to-orange-600',
    },
    {
      id: 'saved-trips',
      title: 'Saved Trips',
      description: 'Access your bookmarked itineraries & saved spots',
      icon: Bookmark,
      href: '/saved-trips',
      color: 'from-cyan-500 to-blue-500',
    },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#111827] dark:text-white tracking-tight">
            Quick Actions
          </h2>
          <p className="text-xs sm:text-sm text-[#4b5563] dark:text-[#cbd5e1] font-medium">
            Essential tools to kickstart your travel planning experience
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {actions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <Link
                to={action.href}
                className="group relative h-full flex flex-col justify-between p-5 rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200/80 dark:border-slate-800 hover:border-sky-500/50 dark:hover:border-blue-500/50 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Subtle top gradient accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${action.color} opacity-80 group-hover:opacity-100 transition-opacity`} />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${action.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {action.badge ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 dark:bg-blue-900/50 dark:text-sky-300 text-[10px] font-extrabold border border-sky-200 dark:border-blue-800">
                        {action.badge}
                      </span>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-sky-500 dark:group-hover:text-blue-400 group-hover:bg-sky-50 dark:group-hover:bg-blue-900/30 flex items-center justify-center transition-colors">
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    )}
                  </div>

                  <h3 className="text-base font-extrabold text-[#111827] dark:text-white group-hover:text-sky-600 dark:group-hover:text-blue-400 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-xs text-[#4b5563] dark:text-[#cbd5e1] font-normal leading-relaxed mt-1">
                    {action.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center text-xs font-bold text-sky-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Open Tool</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
