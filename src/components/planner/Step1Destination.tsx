import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Sparkles, Check, Clock, TrendingUp } from 'lucide-react';

interface DestinationOption {
  id: string;
  name: string;
  region: string;
  image: string;
  tag: string;
  popular: boolean;
  description: string;
}

interface Step1DestinationProps {
  selectedDestination: string;
  onSelectDestination: (dest: string) => void;
  onNext: () => void;
}

export const Step1Destination: React.FC<Step1DestinationProps> = ({
  selectedDestination,
  onSelectDestination,
  onNext,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [customInput, setCustomInput] = useState('');

  const destinations: DestinationOption[] = [
    {
      id: 'hunza',
      name: 'Hunza Valley',
      region: 'Gilgit-Baltistan',
      image: 'https://images.unsplash.com/photo-1589553460730-57f970634629?auto=format&fit=crop&w=800&q=80',
      tag: 'Most Popular',
      popular: true,
      description: 'Ancient forts, turquoise Attabad lake, and Rakaposhi views.',
    },
    {
      id: 'skardu',
      name: 'Skardu & Deosai',
      region: 'Gilgit-Baltistan',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      tag: 'High Altitude Desert',
      popular: true,
      description: 'Deosai plateau, Katpana cold desert, and Shangrila lake.',
    },
    {
      id: 'swat',
      name: 'Swat Valley',
      region: 'Khyber Pakhtunkhwa',
      image: 'https://images.unsplash.com/photo-1609839382283-e1897c92b95b?auto=format&fit=crop&w=800&q=80',
      tag: 'Family Favorite',
      popular: true,
      description: 'Emerald lakes, Malam Jabba ski chairlift, and Kalam pine rivers.',
    },
    {
      id: 'fairy-meadows',
      name: 'Fairy Meadows',
      region: 'Diamer District',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      tag: 'Adventure Trek',
      popular: true,
      description: 'Jeep ride, alpine camping under the Nanga Parbat mountain face.',
    },
    {
      id: 'neelum',
      name: 'Neelum Valley',
      region: 'Azad Kashmir',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      tag: 'Lush Greenery',
      popular: false,
      description: 'Keran, Sharda ruins, Arang Kel suspension bridge, and water streams.',
    },
    {
      id: 'naran',
      name: 'Naran & Kaghan',
      region: 'Khyber Pakhtunkhwa',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      tag: 'Classic Route',
      popular: false,
      description: 'Lulu Sar, Babusar Top elevation, and Saiful Muluk lake legend.',
    },
    {
      id: 'kumrat',
      name: 'Kumrat Valley',
      region: 'Upper Dir, KPK',
      image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
      tag: 'Pine Forest',
      popular: false,
      description: 'Tall cedar trees, Panjkora river, and Jahaz Banda waterfall trek.',
    },
    {
      id: 'chitral',
      name: 'Chitral & Kalash',
      region: 'Khyber Pakhtunkhwa',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      tag: 'Cultural Heritage',
      popular: false,
      description: 'Shandur polo ground, Kalash valleys, and Trich Mir peak vistas.',
    },
  ];

  const recentlyViewed = [
    { name: 'Hunza Valley', region: 'Gilgit-Baltistan' },
    { name: 'Skardu & Deosai', region: 'Gilgit-Baltistan' },
    { name: 'Malam Jabba', region: 'Swat' },
  ];

  const filtered = destinations.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (name: string) => {
    onSelectDestination(name);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      onSelectDestination(customInput.trim());
      setCustomInput('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Step Heading */}
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-black text-[#111827] dark:text-white tracking-tight">
          Where do you want to explore?
        </h2>
        <p className="text-sm text-[#4b5563] dark:text-[#cbd5e1] font-medium">
          Select a popular destination or type your custom location in Pakistan.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Hunza, Skardu, Swat, Naran..."
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 text-sm font-semibold text-[#111827] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
        />
      </div>

      {/* Recently Viewed Pills */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-sky-500" />
          <span>Recently Viewed Spots</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {recentlyViewed.map((spot) => (
            <button
              key={spot.name}
              onClick={() => handleSelect(spot.name)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                selectedDestination === spot.name
                  ? 'bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-500/20'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-sky-500'
              }`}
            >
              {spot.name}
            </button>
          ))}
        </div>
      </div>

      {/* Destination Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <span>Popular Northern Destinations</span>
          </span>
          <span className="text-xs text-slate-400 font-medium">
            {filtered.length} locations available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((item, idx) => {
            const isSelected = selectedDestination === item.name;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.04 }}
                onClick={() => handleSelect(item.name)}
                className={`relative rounded-3xl overflow-hidden cursor-pointer border transition-all duration-300 group ${
                  isSelected
                    ? 'border-sky-500 ring-2 ring-sky-500 ring-offset-2 dark:ring-offset-[#050b14] shadow-xl'
                    : 'border-slate-200/80 dark:border-slate-800 hover:border-sky-500/50 shadow-md hover:shadow-lg'
                }`}
              >
                <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />

                  {/* Selection Check Circle */}
                  <div
                    className={`absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                      isSelected
                        ? 'bg-sky-500 text-white border-sky-500 shadow-md'
                        : 'bg-slate-950/60 text-white/50 border-white/20'
                    }`}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>

                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-950/70 backdrop-blur-md text-white text-[10px] font-extrabold border border-white/20">
                    {item.tag}
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 text-white space-y-0.5">
                    <span className="text-[10px] font-extrabold text-sky-300 uppercase tracking-wide flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-sky-400" />
                      <span>{item.region}</span>
                    </span>
                    <h3 className="text-base font-black text-white drop-shadow">
                      {item.name}
                    </h3>
                  </div>
                </div>

                <div className="p-3.5 bg-white dark:bg-[#0b1120]">
                  <p className="text-xs text-[#4b5563] dark:text-[#cbd5e1] font-medium line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Custom Destination Form */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 space-y-2">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block">
          Don't see your destination? Enter custom spot:
        </label>
        <form onSubmit={handleCustomSubmit} className="flex gap-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="e.g. Gorakh Hill Station, Sindh"
            className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-[#050b14] border border-slate-200 dark:border-slate-700 text-xs font-semibold text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            type="submit"
            disabled={!customInput.trim()}
            className="px-4 py-2.5 rounded-xl bg-sky-500 text-white text-xs font-extrabold hover:bg-sky-600 disabled:opacity-50 transition-colors"
          >
            Select Spot
          </button>
        </form>
      </div>

      {/* Next Step Button */}
      <div className="pt-4 flex justify-end">
        <button
          onClick={onNext}
          disabled={!selectedDestination}
          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-extrabold text-sm shadow-lg shadow-sky-500/25 hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 transition-all flex items-center gap-2"
        >
          <span>Continue to Budget</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
