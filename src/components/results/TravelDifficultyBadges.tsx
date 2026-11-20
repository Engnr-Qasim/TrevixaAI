import React from 'react';
import { motion } from 'motion/react';
import {
  Gauge,
  Route,
  Footprints,
  Users,
  UserCheck,
  Accessibility,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { TravelDifficultyBadgesData } from '../../types/tripResult';

interface TravelDifficultyBadgesProps {
  data?: TravelDifficultyBadgesData;
  feasibilityScore?: number;
}

export const TravelDifficultyBadges: React.FC<TravelDifficultyBadgesProps> = ({
  data,
  feasibilityScore = 98.5,
}) => {
  const badges = [
    {
      label: 'Difficulty Rating',
      value: data?.difficulty || 'Moderate Altitude (2,400m+)',
      icon: Gauge,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800',
    },
    {
      label: 'Road & Highway Quality',
      value: data?.roadQuality || '85% Paved KKH / 15% Mountain Track',
      icon: Route,
      color: 'text-sky-500 bg-sky-50 dark:bg-sky-950/50 border-sky-200 dark:border-sky-800',
    },
    {
      label: 'Walking & Hiking Level',
      value: data?.walkingLevel || 'Light Walking & Scenic Sightseeing',
      icon: Footprints,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800',
    },
    {
      label: 'Family & Kids Suitability',
      value: data?.familyFriendly || 'Highly Family Suitable & Safe',
      icon: Users,
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800',
    },
    {
      label: 'Solo Travel Safety',
      value: data?.soloFriendly || 'Extremely Safe & Welcoming Locals',
      icon: UserCheck,
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800',
    },
    {
      label: 'Wheelchair & Mobility Access',
      value: data?.wheelchairAccessibility || 'Partial (Fort steps, lake docks accessible)',
      icon: Accessibility,
      color: 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-sky-500" />
            <h2 className="text-2xl font-black text-[#111827] dark:text-white tracking-tight">
              Travel Difficulty & Feasibility Badges
            </h2>
          </div>
          <p className="text-xs text-[#4b5563] dark:text-[#cbd5e1] font-medium mt-0.5">
            Real-time accessibility, road condition, and comfort ratings for this destination.
          </p>
        </div>

        {/* Score Badge */}
        <div className="px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 flex items-center gap-2.5 self-start sm:self-center">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span className="text-xs font-black">
            AI Feasibility Rating: <span className="text-sm font-black">{feasibilityScore}%</span>
          </span>
        </div>
      </div>

      {/* Grid of Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.04 }}
              className="p-5 rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-start gap-3.5 hover:shadow-md transition-shadow"
            >
              <div className={`p-3 rounded-2xl border ${badge.color} shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>

              <div className="space-y-1 min-w-0">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  {badge.label}
                </span>
                <h4 className="text-xs font-black text-[#111827] dark:text-white leading-snug">
                  {badge.value}
                </h4>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
