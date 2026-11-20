import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Star, ArrowRight, Bookmark } from 'lucide-react';
import { Button } from '../ui/button';

interface SavedSpot {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  budget: string;
  savedAt: string;
}

export const SavedDestinations: React.FC = () => {
  const [savedSpots, setSavedSpots] = useState<SavedSpot[]>([
    {
      id: 'saved-hunza',
      name: 'Baltit Fort & Karimabad',
      location: 'Hunza, Gilgit-Baltistan',
      image: 'https://images.unsplash.com/photo-1589553460730-57f970634629?auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      budget: 'PKR 70,000',
      savedAt: '2 days ago',
    },
    {
      id: 'saved-shangrila',
      name: 'Shangrila Resort Lake',
      location: 'Skardu, Gilgit-Baltistan',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      budget: 'PKR 95,000',
      savedAt: '1 week ago',
    },
    {
      id: 'saved-kalam',
      name: 'Mahodand Lake & Kalam',
      location: 'Swat Valley, KPK',
      image: 'https://images.unsplash.com/photo-1609839382283-e1897c92b95b?auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      budget: 'PKR 45,000',
      savedAt: '2 weeks ago',
    },
    {
      id: 'saved-malam',
      name: 'Malam Jabba Ski Resort',
      location: 'Swat, KPK',
      image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
      rating: 4.6,
      budget: 'PKR 35,000',
      savedAt: '3 weeks ago',
    },
  ]);

  const toggleHeart = (id: string) => {
    setSavedSpots((prev) => prev.filter((spot) => spot.id !== id));
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 text-xs font-bold mb-1">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>{savedSpots.length} Example Destinations</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#111827] dark:text-white tracking-tight">
            Example Destinations
          </h2>
        </div>

        <Link to="/saved-trips" className="text-xs font-extrabold text-sky-600 dark:text-blue-400 hover:underline flex items-center gap-1">
          <span>Manage Saved List</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {savedSpots.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 dark:bg-[#0b1120] rounded-3xl border border-slate-200 dark:border-slate-800">
          <p className="text-sm font-bold text-slate-500">No saved destinations remaining.</p>
          <Link to="/destinations" className="text-xs text-sky-500 font-extrabold mt-2 inline-block">
            Browse Destinations to Bookmark
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth">
          <AnimatePresence>
            {savedSpots.map((spot) => (
              <motion.div
                key={spot.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="shrink-0 w-72 sm:w-80 rounded-[2rem] bg-white dark:bg-[#0b1120] border border-slate-200/80 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group relative"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={spot.image}
                    alt={spot.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Heart Toggle Button */}
                  <button
                    onClick={() => toggleHeart(spot.id)}
                    className="absolute top-3 right-3 p-2.5 rounded-full bg-slate-950/70 backdrop-blur-md text-rose-500 hover:scale-110 transition-transform shadow-md border border-white/20"
                    aria-label="Remove from saved"
                  >
                    <Heart className="w-4 h-4 fill-rose-500" />
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] uppercase font-extrabold text-amber-300 tracking-wider">
                      Saved {spot.savedAt}
                    </span>
                    <h3 className="text-base font-black text-white drop-shadow truncate">
                      {spot.name}
                    </h3>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#4b5563] dark:text-[#cbd5e1] font-semibold">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-sky-500" />
                      <span>{spot.location}</span>
                    </span>
                    <span className="flex items-center gap-1 text-amber-500 font-extrabold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>Example</span>
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">
                      Est. <strong className="text-emerald-600 dark:text-emerald-400">{spot.budget}</strong>
                    </span>

                    <Link to={`/plan-trip?destination=${encodeURIComponent(spot.name)}`}>
                      <Button variant="neon" size="sm" className="rounded-xl text-xs font-bold px-3.5 py-1.5">
                        Plan Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
};
