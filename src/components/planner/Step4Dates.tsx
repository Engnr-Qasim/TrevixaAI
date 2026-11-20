import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, Clock, Sun, Sparkles, Check, ToggleLeft, ToggleRight, Info } from 'lucide-react';

interface DurationPreset {
  id: string;
  days: number;
  label: string;
  subtitle: string;
  tag: string;
}

interface Step4DatesProps {
  selectedDuration: number;
  startDate: string;
  endDate: string;
  isFlexible: boolean;
  onSelectDuration: (days: number) => void;
  onUpdateDates: (start: string, end: string) => void;
  onToggleFlexible: (flex: boolean) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step4Dates: React.FC<Step4DatesProps> = ({
  selectedDuration,
  startDate,
  endDate,
  isFlexible,
  onSelectDuration,
  onUpdateDates,
  onToggleFlexible,
  onNext,
  onBack,
}) => {
  const presets: DurationPreset[] = [
    {
      id: 'dur-3',
      days: 3,
      label: 'Weekend Quickie (3 Days)',
      subtitle: 'Malam Jabba, Swat, or Murree Hills',
      tag: 'Short Break',
    },
    {
      id: 'dur-5',
      days: 5,
      label: 'Standard Explorer (5 Days)',
      subtitle: 'Hunza Karimabad + Attabad Lake',
      tag: 'Most Popular',
    },
    {
      id: 'dur-7',
      days: 7,
      label: 'Full Grand Tour (7 Days)',
      subtitle: 'Skardu + Deosai + Khaplu Fort',
      tag: 'Recommended',
    },
    {
      id: 'dur-10',
      days: 10,
      label: 'Northern Circuit (10+ Days)',
      subtitle: 'Hunza, Skardu, Fairy Meadows, Naran',
      tag: 'Deep Adventure',
    },
  ];

  const handlePresetClick = (days: number) => {
    onSelectDuration(days);

    // Auto update start & end dates relative to today
    const today = new Date();
    const future = new Date();
    future.setDate(today.getDate() + days);

    onUpdateDates(
      today.toISOString().split('T')[0],
      future.toISOString().split('T')[0]
    );
  };

  return (
    <div className="space-y-6">
      {/* Step Heading */}
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-black text-[#111827] dark:text-white tracking-tight">
          When are you planning to travel?
        </h2>
        <p className="text-sm text-[#4b5563] dark:text-[#cbd5e1] font-medium">
          Select trip duration or pick specific dates. We will automatically factor in seasonal weather conditions.
        </p>
      </div>

      {/* Seasonal Weather Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
            <Sun className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Seasonal Weather Advisor
            </span>
            <p className="text-xs font-bold text-[#111827] dark:text-white">
              July - October is Peak Season in Gilgit-Baltistan & Swat (Clear Skies 22°C - 28°C)
            </p>
          </div>
        </div>
      </div>

      {/* Duration Presets */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          Select Trip Length Preset:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {presets.map((preset, idx) => {
            const isSelected = selectedDuration === preset.days;
            return (
              <motion.div
                key={preset.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.04 }}
                onClick={() => handlePresetClick(preset.days)}
                className={`p-5 rounded-3xl bg-white dark:bg-[#0b1120] border cursor-pointer transition-all duration-300 flex flex-col justify-between group ${
                  isSelected
                    ? 'border-sky-500 ring-2 ring-sky-500 ring-offset-2 dark:ring-offset-[#050b14] shadow-xl'
                    : 'border-slate-200/80 dark:border-slate-800 hover:border-sky-500/50 shadow-md hover:shadow-lg'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-sky-50 text-sky-700 dark:bg-blue-900/60 dark:text-sky-300 border border-sky-200 dark:border-blue-800">
                      {preset.tag}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                        isSelected ? 'bg-sky-500 text-white border-sky-500' : 'border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>

                  <h3 className="text-base font-black text-[#111827] dark:text-white group-hover:text-sky-600 dark:group-hover:text-blue-400 transition-colors">
                    {preset.label}
                  </h3>
                  <p className="text-xs text-[#4b5563] dark:text-[#cbd5e1] font-normal leading-relaxed mt-1">
                    {preset.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-sky-600 dark:text-blue-400">
                  {preset.days} Days / {preset.days - 1} Nights
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Date Pickers & Flexible Switch */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h4 className="text-sm font-black text-[#111827] dark:text-white">
              Specific Date Range (Optional)
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pick exact travel start and return dates
            </p>
          </div>

          {/* Flexible Dates Toggle */}
          <button
            onClick={() => onToggleFlexible(!isFlexible)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#050b14] border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200"
          >
            {isFlexible ? (
              <ToggleRight className="w-5 h-5 text-sky-500" />
            ) : (
              <ToggleLeft className="w-5 h-5 text-slate-400" />
            )}
            <span>Flexible Dates (±3 Days)</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Start Date:
            </label>
            <div className="relative">
              <CalendarIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => onUpdateDates(e.target.value, endDate)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#050b14] border border-slate-200 dark:border-slate-700 text-xs font-semibold text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              End Date:
            </label>
            <div className="relative">
              <CalendarIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="date"
                value={endDate}
                onChange={(e) => onUpdateDates(startDate, e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#050b14] border border-slate-200 dark:border-slate-700 text-xs font-semibold text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
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
          <span>Continue to Interests</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
