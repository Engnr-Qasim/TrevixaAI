import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Sparkles, Star, MapPin, ArrowRight, Compass, Calendar, Wallet } from 'lucide-react';
import { Button } from '../ui/button';

interface RecommendationCard {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  estimatedBudget: string;
  duration: string;
  bestSeason: string;
  aiMatch: number;
  badge: string;
  description: string;
}

export const AiRecommendations: React.FC = () => {
  const recommendations: RecommendationCard[] = [
    {
      id: 'hunza-escape',
      name: 'Hunza Escape',
      location: 'Karimabad, Hunza Valley',
      image: 'https://images.unsplash.com/photo-1589553460730-57f970634629?auto=format&fit=crop&w=1000&q=80',
      rating: 4.9,
      reviews: 1240,
      estimatedBudget: 'PKR 65,000 - 85,000',
      duration: '5 Days / 4 Nights',
      bestSeason: 'Autumn & Spring',
      aiMatch: 98,
      badge: 'Top Pick for You',
      description: 'Explore ancient Baltit & Altit forts, Attabad lake boating, and panoramic views of Rakaposhi.',
    },
    {
      id: 'skardu-explorer',
      name: 'Skardu Explorer',
      location: 'Skardu & Deosai, Gilgit',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
      rating: 4.8,
      reviews: 980,
      estimatedBudget: 'PKR 80,000 - 110,000',
      duration: '7 Days / 6 Nights',
      bestSeason: 'June - October',
      aiMatch: 95,
      badge: 'Adventure Focus',
      description: 'High-altitude Deosai Plains, Katpana Cold Desert safari, and serene Shangrila Resort stays.',
    },
    {
      id: 'fairy-meadows',
      name: 'Fairy Meadows Adventure',
      location: 'Nanga Parbat Base, Diamer',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
      rating: 4.9,
      reviews: 1450,
      estimatedBudget: 'PKR 50,000 - 70,000',
      duration: '4 Days / 3 Nights',
      bestSeason: 'June - September',
      aiMatch: 92,
      badge: 'Bucklist Hike',
      description: 'Trek through alpine forests under the towering face of Nanga Parbat, Killer Mountain.',
    },
    {
      id: 'swat-weekend',
      name: 'Swat Weekend Getaway',
      location: 'Kalam & Malam Jabba, Swat',
      image: 'https://images.unsplash.com/photo-1609839382283-e1897c92b95b?auto=format&fit=crop&w=1000&q=80',
      rating: 4.7,
      reviews: 810,
      estimatedBudget: 'PKR 35,000 - 50,000',
      duration: '3 Days / 2 Nights',
      bestSeason: 'All Year Round',
      aiMatch: 89,
      badge: 'Family Friendly',
      description: 'Emerald rivers, lush pine valleys, Mahodand Lake boating, and ski chairlifts at Malam Jabba.',
    },
  ];

  return (
    <section className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-blue-950/60 text-sky-700 dark:text-sky-300 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-sky-500 animate-pulse" />
            <span>AI Hyper-Personalized Picks</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#111827] dark:text-white tracking-tight">
            AI Recommendations
          </h2>
        </div>

        <Link to="/destinations" className="text-xs font-extrabold text-sky-600 dark:text-blue-400 hover:underline flex items-center gap-1">
          <span>View All Recommendations</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {recommendations.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.08 }}
            className="group relative rounded-[2rem] bg-white dark:bg-[#0b1120] border border-slate-200/80 dark:border-slate-800 hover:border-sky-500/60 dark:hover:border-blue-500/60 shadow-lg hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
          >
            {/* Header Image */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-900">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20" />

              {/* AI Match Badge */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-emerald-400/40 text-emerald-300 text-xs font-black flex items-center gap-1.5 shadow-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{item.aiMatch}% Match</span>
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-sky-500/80 backdrop-blur-md text-white text-[10px] font-extrabold shadow-md">
                {item.badge}
              </div>

              {/* Location Tag */}
              <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between">
                <span className="text-xs font-bold flex items-center gap-1 text-slate-200 drop-shadow">
                  <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="truncate">{item.location}</span>
                </span>
                <span className="text-xs font-extrabold text-amber-300 flex items-center gap-1 bg-slate-950/60 px-2 py-0.5 rounded-full border border-amber-400/30">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>Destination idea</span>
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-black text-[#111827] dark:text-white group-hover:text-sky-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-[#4b5563] dark:text-[#cbd5e1] font-normal leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#050b14] border border-slate-200/60 dark:border-slate-800">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                    <Wallet className="w-3 h-3 text-emerald-500" /> Budget
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-[11px] truncate block">
                    {item.estimatedBudget}
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#050b14] border border-slate-200/60 dark:border-slate-800">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-sky-500" /> Duration
                  </span>
                  <span className="text-[#111827] dark:text-white font-extrabold text-[11px] truncate block">
                    {item.duration}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <Link to={`/plan-trip?destination=${encodeURIComponent(item.name)}`}>
                <Button variant="outline" size="sm" className="w-full justify-center gap-2 rounded-xl text-xs font-bold group-hover:bg-sky-500 group-hover:text-white group-hover:border-sky-500 transition-all duration-300">
                  <Compass className="w-4 h-4" />
                  <span>Explore Itinerary</span>
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
