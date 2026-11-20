import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Wallet, Sparkles, Check, DollarSign, ShieldCheck, HelpCircle } from 'lucide-react';

interface BudgetTier {
  id: string;
  name: string;
  pkrRange: string;
  averageTotal: number;
  badge: string;
  color: string;
  description: string;
  features: string[];
}

interface Step2BudgetProps {
  selectedTier: string;
  customAmount: number;
  onSelectTier: (tierId: string, amount: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step2Budget: React.FC<Step2BudgetProps> = ({
  selectedTier,
  customAmount,
  onSelectTier,
  onNext,
  onBack,
}) => {
  const tiers: BudgetTier[] = [
    {
      id: 'budget',
      name: 'Backpacker / Budget',
      pkrRange: 'PKR 25,000 - 45,000',
      averageTotal: 35000,
      badge: 'Economical',
      color: 'from-emerald-500 to-teal-600',
      description: 'Cozy guest houses, shared coaster/bus transport, local dhabas & street trout.',
      features: ['Clean guesthouses', 'Public/Coaster transport', 'Local street food & tea', 'Self-guided treks'],
    },
    {
      id: 'standard',
      name: 'Standard Explorer',
      pkrRange: 'PKR 55,000 - 85,000',
      averageTotal: 70000,
      badge: 'Most Popular',
      color: 'from-sky-500 to-blue-600',
      description: '3-star boutique hotels, private saloon car rental, jeep safaris, and restaurant dining.',
      features: ['3-Star hotel rooms', 'Private sedan car rental', 'Dedicated jeep rentals', 'Popular restaurant meals'],
    },
    {
      id: 'premium',
      name: 'Premium Comfort',
      pkrRange: 'PKR 95,000 - 150,000',
      averageTotal: 120000,
      badge: 'Comfort First',
      color: 'from-purple-500 to-indigo-600',
      description: '4-star resorts, private Prado/Prado 4x4, local tour guide, fine mountain dining.',
      features: ['4-Star resort stays', 'Prado 4x4 vehicle with driver', 'Professional local guide', 'A la carte mountain dining'],
    },
    {
      id: 'luxury',
      name: 'Luxury Escape',
      pkrRange: 'PKR 180,000+',
      averageTotal: 220000,
      badge: 'VIP VIP',
      color: 'from-amber-500 to-orange-600',
      description: 'Serena / Shangrila luxury suites, helicopter option, concierge, private chef.',
      features: ['Serena & Luxury Glamping', 'V8 / Luxury SUV transport', 'Full concierge service', 'Gourmet meal packages'],
    },
  ];

  const [isCustom, setIsCustom] = useState(selectedTier === 'custom');
  const [sliderVal, setSliderVal] = useState(customAmount || 75000);

  const handleTierClick = (tier: BudgetTier) => {
    setIsCustom(false);
    onSelectTier(tier.id, tier.averageTotal);
  };

  const handleSliderChange = (val: number) => {
    setSliderVal(val);
    setIsCustom(true);
    onSelectTier('custom', val);
  };

  return (
    <div className="space-y-6">
      {/* Step Heading */}
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-black text-[#111827] dark:text-white tracking-tight">
          What is your travel budget?
        </h2>
        <p className="text-sm text-[#4b5563] dark:text-[#cbd5e1] font-medium">
          Choose a preset tier or set a custom amount in PKR. AI will optimize stay and jeep allocations accordingly.
        </p>
      </div>

      {/* Preset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiers.map((tier, idx) => {
          const isSelected = !isCustom && selectedTier === tier.id;
          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.05 }}
              onClick={() => handleTierClick(tier)}
              className={`relative rounded-3xl p-5 bg-white dark:bg-[#0b1120] border cursor-pointer transition-all duration-300 flex flex-col justify-between group ${
                isSelected
                  ? 'border-sky-500 ring-2 ring-sky-500 ring-offset-2 dark:ring-offset-[#050b14] shadow-xl'
                  : 'border-slate-200/80 dark:border-slate-800 hover:border-sky-500/50 shadow-md hover:shadow-lg'
              }`}
            >
              {/* Badge & Check */}
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold text-white bg-gradient-to-r ${tier.color} shadow-sm`}>
                  {tier.badge}
                </span>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                    isSelected
                      ? 'bg-sky-500 text-white border-sky-500'
                      : 'bg-slate-100 dark:bg-slate-800 text-transparent border-slate-300 dark:border-slate-700'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>

              {/* Title & Range */}
              <div className="space-y-1 mb-3">
                <h3 className="text-base font-black text-[#111827] dark:text-white group-hover:text-sky-600 dark:group-hover:text-blue-400 transition-colors">
                  {tier.name}
                </h3>
                <p className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
                  {tier.pkrRange}
                </p>
                <p className="text-xs text-[#4b5563] dark:text-[#cbd5e1] font-normal leading-relaxed">
                  {tier.description}
                </p>
              </div>

              {/* Inclusions List */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                {tier.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Custom Budget Slider Card */}
      <div className={`p-6 rounded-3xl bg-slate-50 dark:bg-[#0b1120] border transition-all ${
        isCustom ? 'border-sky-500 ring-2 ring-sky-500/20' : 'border-slate-200 dark:border-slate-800'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-[#111827] dark:text-white">
                Custom Budget Amount
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Specify exact budget in Pakistani Rupees (PKR)
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-2xl font-black text-sky-600 dark:text-blue-400">
              PKR {sliderVal.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Range Slider */}
        <input
          type="range"
          min={20000}
          max={300000}
          step={5000}
          value={sliderVal}
          onChange={(e) => handleSliderChange(Number(e.target.value))}
          className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
        />

        <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-2">
          <span>PKR 20,000 (Min)</span>
          <span>PKR 150,000</span>
          <span>PKR 300,000+ (Luxury)</span>
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
          disabled={!selectedTier && !isCustom}
          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-extrabold text-sm shadow-lg shadow-sky-500/25 hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 transition-all flex items-center gap-2"
        >
          <span>Continue to Travelers</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
