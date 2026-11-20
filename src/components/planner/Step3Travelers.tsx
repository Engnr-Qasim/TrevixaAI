import React from 'react';
import { motion } from 'motion/react';
import { User, Users, Heart, Home, Briefcase, Plus, Minus, Sparkles, Shield } from 'lucide-react';

interface TravelTypeOption {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  defaultAdults: number;
  defaultKids: number;
}

interface Step3TravelersProps {
  selectedType: string;
  adultsCount: number;
  kidsCount: number;
  petsCount: number;
  onSelectType: (typeId: string, adults: number, kids: number) => void;
  onUpdateCounts: (adults: number, kids: number, pets: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step3Travelers: React.FC<Step3TravelersProps> = ({
  selectedType,
  adultsCount,
  kidsCount,
  petsCount,
  onSelectType,
  onUpdateCounts,
  onNext,
  onBack,
}) => {
  const travelTypes: TravelTypeOption[] = [
    {
      id: 'solo',
      title: 'Solo Explorer',
      subtitle: 'Backpacking or solo photography expedition',
      icon: User,
      defaultAdults: 1,
      defaultKids: 0,
    },
    {
      id: 'couple',
      title: 'Couple Getaway',
      subtitle: 'Romantic mountain escape or honeymoon',
      icon: Heart,
      defaultAdults: 2,
      defaultKids: 0,
    },
    {
      id: 'friends',
      title: 'Friends Roadtrip',
      subtitle: 'Adventure group, 4x4 jeep safaris, camping',
      icon: Users,
      defaultAdults: 4,
      defaultKids: 0,
    },
    {
      id: 'family',
      title: 'Family Vacation',
      subtitle: 'Comfortable pace with kids & family members',
      icon: Home,
      defaultAdults: 2,
      defaultKids: 2,
    },
    {
      id: 'business',
      title: 'Corporate / Retreat',
      subtitle: 'Team offsite or workation in serene spots',
      icon: Briefcase,
      defaultAdults: 6,
      defaultKids: 0,
    },
  ];

  const handleTypeClick = (type: TravelTypeOption) => {
    onSelectType(type.id, type.defaultAdults, type.defaultKids);
  };

  return (
    <div className="space-y-6">
      {/* Step Heading */}
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-black text-[#111827] dark:text-white tracking-tight">
          Who is traveling with you?
        </h2>
        <p className="text-sm text-[#4b5563] dark:text-[#cbd5e1] font-medium">
          Choose your travel party style to auto-configure jeep seating and room counts.
        </p>
      </div>

      {/* Travel Type Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {travelTypes.map((type, idx) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.id;
          return (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.04 }}
              onClick={() => handleTypeClick(type)}
              className={`p-5 rounded-3xl bg-white dark:bg-[#0b1120] border cursor-pointer transition-all duration-300 flex flex-col justify-between group ${
                isSelected
                  ? 'border-sky-500 ring-2 ring-sky-500 ring-offset-2 dark:ring-offset-[#050b14] shadow-xl'
                  : 'border-slate-200/80 dark:border-slate-800 hover:border-sky-500/50 shadow-md hover:shadow-lg'
              }`}
            >
              <div>
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-3 transition-colors ${
                  isSelected
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-sky-50 dark:group-hover:bg-blue-900/30 group-hover:text-sky-600'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-base font-black text-[#111827] dark:text-white group-hover:text-sky-600 dark:group-hover:text-blue-400 transition-colors">
                  {type.title}
                </h3>
                <p className="text-xs text-[#4b5563] dark:text-[#cbd5e1] font-normal leading-relaxed mt-1">
                  {type.subtitle}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-bold text-sky-600 dark:text-blue-400">
                {isSelected ? '✓ Selected Style' : 'Click to Select'}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detailed Traveler Counter Controls */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 space-y-5">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-sky-500" />
          <h4 className="text-sm font-black text-[#111827] dark:text-white">
            Fine-tune Traveler Counts
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Adults */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#050b14] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div>
              <span className="block text-sm font-extrabold text-[#111827] dark:text-white">Adults</span>
              <span className="text-xs text-slate-400">Age 12+</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onUpdateCounts(Math.max(1, adultsCount - 1), kidsCount, petsCount)}
                className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black hover:bg-slate-200 text-slate-700 dark:text-white"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-base font-black text-[#111827] dark:text-white w-6 text-center">
                {adultsCount}
              </span>
              <button
                onClick={() => onUpdateCounts(adultsCount + 1, kidsCount, petsCount)}
                className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black hover:bg-slate-200 text-slate-700 dark:text-white"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Children */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#050b14] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div>
              <span className="block text-sm font-extrabold text-[#111827] dark:text-white">Children</span>
              <span className="text-xs text-slate-400">Age 2 - 11</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onUpdateCounts(adultsCount, Math.max(0, kidsCount - 1), petsCount)}
                className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black hover:bg-slate-200 text-slate-700 dark:text-white"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-base font-black text-[#111827] dark:text-white w-6 text-center">
                {kidsCount}
              </span>
              <button
                onClick={() => onUpdateCounts(adultsCount, kidsCount + 1, petsCount)}
                className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black hover:bg-slate-200 text-slate-700 dark:text-white"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Pets */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#050b14] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div>
              <span className="block text-sm font-extrabold text-[#111827] dark:text-white">Pets</span>
              <span className="text-xs text-slate-400">Dogs / Cats</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onUpdateCounts(adultsCount, kidsCount, Math.max(0, petsCount - 1))}
                className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black hover:bg-slate-200 text-slate-700 dark:text-white"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-base font-black text-[#111827] dark:text-white w-6 text-center">
                {petsCount}
              </span>
              <button
                onClick={() => onUpdateCounts(adultsCount, kidsCount, petsCount + 1)}
                className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black hover:bg-slate-200 text-slate-700 dark:text-white"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
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
          <span>Continue to Dates</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
