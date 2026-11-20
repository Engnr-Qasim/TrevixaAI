import React from 'react';
import { motion } from 'motion/react';
import { Car, Fuel, Clock, Gauge, Shield, CheckCircle, AlertTriangle, Route } from 'lucide-react';
import { TransportOption } from '../../types/tripResult';

interface TransportSectionProps {
  customTransportOptions?: TransportOption[];
}

export const TransportSection: React.FC<TransportSectionProps> = ({ customTransportOptions }) => {
  const defaultOptions: TransportOption[] = [
    {
      id: 'tr-1',
      title: 'Private 4x4 Prado / TZ Jeep Safari',
      recommended: true,
      price: 'PKR 22,000 Total Trip',
      suitability: 'High Altitude & Off-Road Roads',
      travelTime: '2.5 - 3.5 Hrs / Day',
      roadCondition: 'Paved KKH Highway & Off-Road Tracks',
      difficulty: 'Moderate',
      features: [
        'Required for Eagle’s Nest, Borith Lake & Hoper Glacier access',
        'Includes experienced mountain driver & high-altitude fuel',
        'Spacious 5-6 passenger seats + luggage roof rack',
        'Unlimited custom photostops on Karakoram Highway',
      ],
      tag: 'Recommended Primary Option',
    },
    {
      id: 'tr-2',
      title: 'Private Saloon Car (Corolla / Civic)',
      recommended: false,
      price: 'PKR 14,000 Total Trip',
      suitability: 'Main Paved KKH Highway Only',
      travelTime: '3.0 - 4.0 Hrs / Day',
      roadCondition: '100% Paved Highway Asphalt',
      difficulty: 'Easy',
      features: [
        'Smooth ride on paved Karakoram Highway',
        'Cannot ascend steep unpaved dirt trails to Duikar viewpoints',
        'Air-conditioned & comfortable for highway cruising',
      ],
      tag: 'Budget Private Option',
    },
    {
      id: 'tr-3',
      title: 'Public NATCO / Coaster Bus',
      recommended: false,
      price: 'PKR 3,500 / seat',
      suitability: 'Fixed Route Express Transport',
      travelTime: '4.5 - 6.0 Hrs / Segment',
      roadCondition: 'Paved Highway Fixed Stops',
      difficulty: 'Easy',
      features: [
        'Departs fixed times from Gilgit or Rawalpindi terminal',
        'No custom photostops or off-road excursions included',
        'Economical choice for solo travelers & backpackers',
      ],
      tag: 'Backpacker Budget',
    },
  ];

  const options = (customTransportOptions && customTransportOptions.length > 0)
    ? customTransportOptions
    : defaultOptions;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Car className="w-5 h-5 text-sky-500" />
          <h2 className="text-2xl font-black text-[#111827] dark:text-white tracking-tight">
            Transport & Driving Logistics
          </h2>
        </div>
        <p className="text-xs text-[#4b5563] dark:text-[#cbd5e1] font-medium mt-0.5">
          Vehicle recommendations, road conditions, driving difficulty ratings, and alternative transport choices.
        </p>
      </div>

      {/* Grid of Transport Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {options.map((opt, idx) => (
          <motion.div
            key={opt.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: idx * 0.05 }}
            className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
              opt.recommended
                ? 'bg-gradient-to-b from-slate-900 via-slate-950 to-blue-950 text-white border-sky-500 shadow-xl shadow-sky-500/10'
                : 'bg-white dark:bg-[#0b1120] text-slate-800 dark:text-slate-200 border-slate-200/80 dark:border-slate-800 shadow-sm'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    opt.recommended
                      ? 'bg-sky-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {opt.tag}
                </span>

                <span className="text-[11px] font-extrabold text-slate-400">{opt.suitability}</span>
              </div>

              <div>
                <h3 className="text-base font-black tracking-tight">{opt.title}</h3>
                <span
                  className={`text-lg font-black block mt-1 ${
                    opt.recommended ? 'text-sky-300' : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {opt.price}
                </span>
              </div>

              {/* Detailed Metrics Pill */}
              <div className="grid grid-cols-2 gap-2 pt-2 pb-1 border-t border-slate-200/20 dark:border-slate-800 text-[11px] font-bold">
                <div className="flex items-center gap-1.5 opacity-90">
                  <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="truncate">{opt.travelTime}</span>
                </div>

                <div className="flex items-center gap-1.5 opacity-90">
                  <Gauge className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Difficulty: {opt.difficulty}</span>
                </div>

                <div className="col-span-2 flex items-center gap-1.5 opacity-90 text-[10px]">
                  <Route className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{opt.roadCondition}</span>
                </div>
              </div>

              <ul className="space-y-2 pt-2 border-t border-slate-200/20 dark:border-slate-800 text-xs font-medium">
                {opt.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2">
                    <CheckCircle
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        opt.recommended ? 'text-sky-400' : 'text-emerald-500'
                      }`}
                    />
                    <span className="leading-snug">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Road Alert Box */}
            {opt.recommended && (
              <div className="mt-4 p-3 rounded-2xl bg-sky-500/10 border border-sky-400/30 text-[11px] text-sky-200 font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Driver allocation includes high-altitude fuel surcharge & permits.</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
