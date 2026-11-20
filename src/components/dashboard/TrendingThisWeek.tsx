import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Flame, MapPin, Compass, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

interface TrendingSpot {
  id: string;
  rank: number;
  name: string;
  location: string;
  image: string;
  views: string;
  description: string;
  highlight: string;
}

export const TrendingThisWeek: React.FC = () => {
  const trendingList: TrendingSpot[] = [
    {
      id: 'trend-1',
      rank: 1,
      name: 'Deosai National Park & Sheosar Lake',
      location: 'Skardu, Gilgit-Baltistan',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      views: '14.2k views this week',
      highlight: 'Land of the Giants • High Plateau',
      description: 'The second-highest alpine plateau on Earth, booming with summer wildflowers, Himalayan brown bears, and crystal blue reflections.',
    },
    {
      id: 'trend-2',
      rank: 2,
      name: 'Khunjerab Pass & Border Monument',
      location: 'Upper Hunza, Pak-China Border',
      image: 'https://images.unsplash.com/photo-1589553460730-57f970634629?auto=format&fit=crop&w=1200&q=80',
      views: '11.8k views this week',
      highlight: 'World\'s Highest Paved Border at 4,693m',
      description: 'Experience oxygen-rich mountain vistas along the Karakoram Highway leading up to the world\'s highest international border crossing.',
    },
    {
      id: 'trend-3',
      rank: 3,
      name: 'Naltar Valley & Colored Lakes',
      location: 'Gilgit District',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      views: '9.4k views this week',
      highlight: 'Pine Forests & Emerald Lakes',
      description: 'Famous for its vibrant blue and emerald lakes, dense pine forests, and winter skiing competitions surrounded by snow capped peaks.',
    },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 text-xs font-bold mb-1">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-bounce" />
            <span>Top Search Volume in Pakistan</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#111827] dark:text-white tracking-tight">
            Featured Destinations
          </h2>
        </div>

        <Link to="/destinations" className="text-xs font-extrabold text-sky-600 dark:text-blue-400 hover:underline flex items-center gap-1">
          <span>Browse Destinations</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {trendingList.map((spot, idx) => (
          <motion.div
            key={spot.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.08 }}
            className="group relative rounded-[2.5rem] bg-white dark:bg-[#0b1120] border border-slate-200/80 dark:border-slate-800 hover:border-sky-500/60 dark:hover:border-blue-500/60 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            {/* Header Image */}
            <div className="relative h-56 w-full overflow-hidden bg-slate-900">
              <img
                src={spot.image}
                alt={spot.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

              {/* Trending Rank Pill */}
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-amber-500 text-slate-950 font-black text-xs shadow-lg flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>Destination idea</span>
              </div>

              {/* Views Counter Overlay */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-white text-[11px] font-bold border border-white/20 flex items-center gap-1.5 shadow-md">
                <Eye className="w-3.5 h-3.5 text-sky-400" />
                <span>{spot.views}</span>
              </div>

              {/* Location Tag */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-300">
                  {spot.highlight}
                </span>
                <h3 className="text-xl font-black text-white drop-shadow leading-tight mt-0.5">
                  {spot.name}
                </h3>
              </div>
            </div>

            {/* Description & Action */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-[#4b5563] dark:text-[#cbd5e1] font-normal leading-relaxed">
                {spot.description}
              </p>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-sky-500" />
                  <span>{spot.location}</span>
                </span>

                <Link to={`/plan-trip?destination=${encodeURIComponent(spot.name)}`}>
                  <Button variant="neon" size="sm" className="gap-2 rounded-xl text-xs font-extrabold px-4 py-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate Plan</span>
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
