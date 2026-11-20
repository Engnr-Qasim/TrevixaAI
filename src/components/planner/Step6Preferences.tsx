import React from 'react';
import { motion } from 'motion/react';
import {
  Hotel,
  Utensils,
  Car,
  UserCheck,
  Sun,
  MapPin,
  Sparkles,
  Calculator,
  Gauge,
  Check,
} from 'lucide-react';

export interface PreferencesState {
  hotels: boolean;
  restaurants: boolean;
  transport: boolean;
  localGuide: boolean;
  weather: boolean;
  attractions: boolean;
  hiddenGems: boolean;
  estimatedCosts: boolean;
  pace: 'relaxed' | 'balanced' | 'fast';
}

interface Step6PreferencesProps {
  preferences: PreferencesState;
  onTogglePreference: (key: keyof Omit<PreferencesState, 'pace'>) => void;
  onChangePace: (pace: 'relaxed' | 'balanced' | 'fast') => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step6Preferences: React.FC<Step6PreferencesProps> = ({
  preferences,
  onTogglePreference,
  onChangePace,
  onNext,
  onBack,
}) => {
  const toggleItems = [
    {
      key: 'hotels' as const,
      title: 'Hotels & Lodging',
      desc: 'Include curated stay recommendations with room photos and price tags.',
      icon: Hotel,
    },
    {
      key: 'restaurants' as const,
      title: 'Restaurants & Dining',
      desc: 'Local trout cafes, mountain view tea spots & traditional dining.',
      icon: Utensils,
    },
    {
      key: 'transport' as const,
      title: 'Transport & Jeep Rentals',
      desc: '4x4 Jeep rentals, fuel calculations, and driver contact references.',
      icon: Car,
    },
    {
      key: 'localGuide' as const,
      title: 'Local Tour Guide',
      desc: 'Licensed local guides for high-altitude treks and fort history.',
      icon: UserCheck,
    },
    {
      key: 'weather' as const,
      title: 'Live Weather Radar',
      desc: 'Day-by-day temperature forecasts and road condition alerts.',
      icon: Sun,
    },
    {
      key: 'attractions' as const,
      title: 'Top Attractions & Entry Tickets',
      desc: 'Fort tickets, boat rentals, and national park entrance fees.',
      icon: MapPin,
    },
    {
      key: 'hiddenGems' as const,
      title: 'Hidden Gems & Secret Spots',
      desc: 'Lesser-known waterfalls, viewpoints, and serene village walks.',
      icon: Sparkles,
    },
    {
      key: 'estimatedCosts' as const,
      title: 'Itemized PKR Cost Estimates',
      desc: 'Full transparent cost breakdown for gas, food, stays, and shopping.',
      icon: Calculator,
    },
  ];

  const paceOptions = [
    {
      id: 'relaxed' as const,
      title: 'Relaxed & Scenic',
      desc: '1-2 main spots per day. Plentiful tea stops and mountain lounging.',
    },
    {
      id: 'balanced' as const,
      title: 'Balanced Explorer',
      desc: '2-3 key attractions per day. Perfect mix of sights & rest.',
    },
    {
      id: 'fast' as const,
      title: 'Fast-Paced Adventure',
      desc: 'Cover maximum ground. Sunrise to sunset sightseeing.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Step Heading */}
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-black text-[#111827] dark:text-white tracking-tight">
          Customize Itinerary Inclusions & Pace
        </h2>
        <p className="text-sm text-[#4b5563] dark:text-[#cbd5e1] font-medium">
          Toggle what details AI should bake directly into your generated travel plan.
        </p>
      </div>

      {/* Pace Selection */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Gauge className="w-4 h-4 text-sky-500" />
          <span>Travel Pace Preference:</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {paceOptions.map((option) => {
            const isSelected = preferences.pace === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onChangePace(option.id)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-sky-50 dark:bg-blue-950/60 border-sky-500 ring-2 ring-sky-500/20'
                    : 'bg-white dark:bg-[#0b1120] border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-extrabold text-[#111827] dark:text-white">
                    {option.title}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-sky-500 stroke-[3]" />}
                </div>
                <p className="text-xs text-[#4b5563] dark:text-[#cbd5e1] leading-relaxed">
                  {option.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Toggles Grid */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          Inclusions & AI Modules:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {toggleItems.map((item, idx) => {
            const Icon = item.icon;
            const isChecked = preferences[item.key];

            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.03 }}
                onClick={() => onTogglePreference(item.key)}
                className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between gap-4 transition-all ${
                  isChecked
                    ? 'bg-white dark:bg-[#0b1120] border-sky-500/80 shadow-md'
                    : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-75'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isChecked
                        ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#111827] dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-[#4b5563] dark:text-[#cbd5e1] leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Custom Toggle Switch */}
                <div
                  className={`w-12 h-6 rounded-full p-1 transition-colors shrink-0 ${
                    isChecked ? 'bg-sky-500' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
                      isChecked ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-4 flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-200 transition-colors"
        >
          Back
        </button>

        <button
          onClick={onNext}
          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-extrabold text-sm shadow-lg shadow-sky-500/25 hover:shadow-xl hover:scale-[1.02] transition-all flex items-center gap-2"
        >
          <span>Review Summary</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
