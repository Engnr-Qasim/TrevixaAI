import React from 'react';
import { motion } from 'motion/react';
import {
  Trees,
  Mountain,
  Utensils,
  Landmark,
  Camera,
  Footprints,
  Tent,
  Bird,
  History,
  ShoppingBag,
  Waves,
  Car,
  Sparkles,
  Check,
} from 'lucide-react';

interface InterestTag {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
}

interface Step5InterestsProps {
  selectedInterests: string[];
  onToggleInterest: (id: string) => void;
  onSelectPreset: (interests: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step5Interests: React.FC<Step5InterestsProps> = ({
  selectedInterests,
  onToggleInterest,
  onSelectPreset,
  onNext,
  onBack,
}) => {
  const interestsList: InterestTag[] = [
    { id: 'nature', name: 'Nature', icon: Trees, description: 'Alpine valleys, meadows & coniferous forests' },
    { id: 'adventure', name: 'Adventure', icon: Mountain, description: '4x4 Jeep rides, river rafting, zip-lines' },
    { id: 'food', name: 'Food & Cuisine', icon: Utensils, description: 'Fresh river trout, Chapshuro, local teas' },
    { id: 'culture', name: 'Culture', icon: Landmark, description: 'Balti folklore, music, crafts & hospitality' },
    { id: 'photography', name: 'Photography', icon: Camera, description: 'Golden hour mountain views & stargazing' },
    { id: 'hiking', name: 'Hiking', icon: Footprints, description: 'Passu glacier treks, Rakaposhi base camp' },
    { id: 'camping', name: 'Camping', icon: Tent, description: 'Stargazing at Fairy Meadows & Deosai' },
    { id: 'wildlife', name: 'Wildlife', icon: Bird, description: 'Himalayan brown bears, Ibex, Markhor' },
    { id: 'history', name: 'History', icon: History, description: 'Ancient Baltit & Altit forts, Silk route' },
    { id: 'shopping', name: 'Shopping', icon: ShoppingBag, description: 'Gemstones, dry fruits, handmade shawls' },
    { id: 'lakes', name: 'Lakes', icon: Waves, description: 'Attabad, Saiful Muluk, Shangrila, Sheosar' },
    { id: 'roadtrips', name: 'Road Trips', icon: Car, description: 'Driving Karakoram Highway & Babusar Pass' },
  ];

  const presets = [
    {
      name: 'Thrill Seeker',
      list: ['adventure', 'hiking', 'camping', 'roadtrips'],
    },
    {
      name: 'Relaxation & Food',
      list: ['nature', 'food', 'lakes', 'shopping'],
    },
    {
      name: 'Photography & Nature',
      list: ['photography', 'nature', 'lakes', 'culture', 'history'],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Step Heading */}
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-black text-[#111827] dark:text-white tracking-tight">
          What are your travel interests?
        </h2>
        <p className="text-sm text-[#4b5563] dark:text-[#cbd5e1] font-medium">
          Select all activities and experiences you want AI to prioritize in your itinerary.
        </p>
      </div>

      {/* Quick Presets Row */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Quick Bundles:
        </span>
        {presets.map((bundle) => (
          <button
            key={bundle.name}
            onClick={() => onSelectPreset(bundle.list)}
            className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-blue-900/40 text-xs font-extrabold text-sky-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            + {bundle.name}
          </button>
        ))}
      </div>

      {/* Animated Interests Chips Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
        {interestsList.map((interest, idx) => {
          const Icon = interest.icon;
          const isSelected = selectedInterests.includes(interest.id);

          return (
            <motion.div
              key={interest.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: idx * 0.03 }}
              onClick={() => onToggleInterest(interest.id)}
              className={`p-4 rounded-3xl cursor-pointer border transition-all duration-200 flex flex-col justify-between group ${
                isSelected
                  ? 'bg-sky-50 dark:bg-blue-950/50 border-sky-500 ring-2 ring-sky-500/30 shadow-md'
                  : 'bg-white dark:bg-[#0b1120] border-slate-200/80 dark:border-slate-800 hover:border-sky-500/50'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-sky-100 dark:group-hover:bg-blue-900/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                    isSelected
                      ? 'bg-sky-500 text-white border-sky-500'
                      : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-black text-[#111827] dark:text-white group-hover:text-sky-600 dark:group-hover:text-blue-400">
                  {interest.name}
                </h3>
                <p className="text-[11px] text-[#4b5563] dark:text-[#cbd5e1] font-normal leading-relaxed mt-0.5">
                  {interest.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Counter Tag */}
      <div className="text-xs font-extrabold text-slate-500 dark:text-slate-400">
        {selectedInterests.length} interests selected
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
          disabled={selectedInterests.length === 0}
          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-extrabold text-sm shadow-lg shadow-sky-500/25 hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 transition-all flex items-center gap-2"
        >
          <span>Continue to Preferences</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
