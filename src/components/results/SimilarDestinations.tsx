import React from 'react';
import { motion } from 'motion/react';
import { Compass, Calendar, Wallet, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SimilarDestination {
  id: string;
  name: string;
  region: string;
  estBudget: string;
  bestSeason: string;
  image: string;
  matchScore: number;
  highlight: string;
}

export const SimilarDestinations: React.FC = () => {
  const destinations: SimilarDestination[] = [
    {
      id: 'sim-1',
      name: 'Skardu Valley & Deosai Plains',
      region: 'Gilgit-Baltistan',
      estBudget: 'PKR 85,000',
      bestSeason: 'May - October',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      matchScore: 96,
      highlight: 'Shangrila Lake, Cold Desert & Deosai Bear Sanctuary',
    },
    {
      id: 'sim-2',
      name: 'Fairy Meadows & Nanga Parbat Base',
      region: 'Diamer District',
      estBudget: 'PKR 45,000',
      bestSeason: 'June - September',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      matchScore: 94,
      highlight: 'Alpine pine forests beneath Killer Mountain',
    },
    {
      id: 'sim-3',
      name: 'Swat & Kalam Alpine Valley',
      region: 'Khyber Pakhtunkhwa',
      estBudget: 'PKR 38,000',
      bestSeason: 'All Year Round',
      image: 'https://images.unsplash.com/photo-1589553460730-57f970634629?auto=format&fit=crop&w=800&q=80',
      matchScore: 92,
      highlight: 'Mahodand Lake, Ushu Forest & Malam Jabba Skiing',
    },
    {
      id: 'sim-4',
      name: 'Neelum Valley Azad Kashmir',
      region: 'Azad Kashmir',
      estBudget: 'PKR 42,000',
      bestSeason: 'April - October',
      image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
      matchScore: 91,
      highlight: 'Ratti Gali Alpine Lake, Arang Kel & Sharda Fort',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-sky-500" />
            <h2 className="text-2xl font-black text-[#111827] dark:text-white tracking-tight">
              Explore Similar Pakistani Journeys
            </h2>
          </div>
          <p className="text-xs text-[#4b5563] dark:text-[#cbd5e1] font-medium mt-0.5">
            Alternative mountain destinations with similar travel styles and budgets.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {destinations.map((dest, idx) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: idx * 0.05 }}
            className="rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-sky-300 text-[10px] font-black border border-white/20 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-sky-400" />
                  {dest.matchScore}% Match
                </span>
              </div>

              <div className="p-4 space-y-2">
                <span className="text-[10px] font-extrabold uppercase text-slate-400 block">
                  {dest.region}
                </span>

                <h3 className="text-sm font-black text-[#111827] dark:text-white">
                  {dest.name}
                </h3>

                <p className="text-xs text-[#4b5563] dark:text-[#cbd5e1] leading-relaxed line-clamp-2">
                  {dest.highlight}
                </p>
              </div>
            </div>

            <div className="p-4 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-emerald-600 dark:text-emerald-400 font-black">
                  {dest.estBudget}
                </span>
                <span className="text-slate-400 text-[10px]">{dest.bestSeason}</span>
              </div>

              <Link to="/plan-trip" className="block">
                <button className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-sky-500 hover:text-white text-slate-800 dark:text-slate-200 text-xs font-black transition-colors flex items-center justify-center gap-1.5">
                  <span>Plan This Journey</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
