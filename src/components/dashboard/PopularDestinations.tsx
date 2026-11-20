import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MapPin, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { Button } from '../ui/button';

interface PopularSpot {
  id: string;
  name: string;
  location: string;
  image: string;
  budget: string;
  tag: string;
}

export const PopularDestinations: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const spots: PopularSpot[] = [
    {
      id: 'hunza',
      name: 'Hunza Valley',
      location: 'Gilgit-Baltistan',
      image: 'https://images.unsplash.com/photo-1589553460730-57f970634629?auto=format&fit=crop&w=800&q=80',
      budget: 'PKR 65k - 85k',
      tag: 'Most Popular',
    },
    {
      id: 'skardu',
      name: 'Skardu',
      location: 'Gilgit-Baltistan',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      budget: 'PKR 80k - 110k',
      tag: 'Cold Desert',
    },
    {
      id: 'swat',
      name: 'Swat Valley',
      location: 'Khyber Pakhtunkhwa',
      image: 'https://images.unsplash.com/photo-1609839382283-e1897c92b95b?auto=format&fit=crop&w=800&q=80',
      budget: 'PKR 35k - 50k',
      tag: 'Switzerland of East',
    },
    {
      id: 'murree',
      name: 'Murree Hills',
      location: 'Punjab',
      image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
      budget: 'PKR 25k - 40k',
      tag: 'Quick Weekend',
    },
    {
      id: 'neelum',
      name: 'Neelum Valley',
      location: 'Azad Kashmir',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      budget: 'PKR 40k - 60k',
      tag: 'Lush Forests',
    },
    {
      id: 'naran',
      name: 'Naran Kaghan',
      location: 'Khyber Pakhtunkhwa',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      budget: 'PKR 45k - 65k',
      tag: 'Saiful Muluk Lake',
    },
    {
      id: 'fairy-meadows',
      name: 'Fairy Meadows',
      location: 'Diamer District',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      budget: 'PKR 50k - 70k',
      tag: 'Nanga Parbat View',
    },
    {
      id: 'attabad',
      name: 'Attabad Lake',
      location: 'Hunza Valley',
      image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
      budget: 'PKR 60k - 80k',
      tag: 'Turquoise Waters',
    },
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#111827] dark:text-white tracking-tight">
            Popular Destinations
          </h2>
          <p className="text-xs sm:text-sm text-[#4b5563] dark:text-[#cbd5e1] font-medium">
            Swipe through top-rated Pakistani destinations loved by travelers
          </p>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleScroll('left')}
            className="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1120] text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1120] text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Container */}
      <div
        ref={scrollRef}
        className="flex items-center gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth snap-x snap-mandatory"
      >
        {spots.map((spot, idx) => (
          <motion.div
            key={spot.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.04 }}
            className="snap-start shrink-0 w-64 sm:w-72 rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200/80 dark:border-slate-800 hover:border-sky-500/50 dark:hover:border-blue-500/50 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div className="relative h-40 w-full overflow-hidden bg-slate-900">
              <img
                src={spot.image}
                alt={spot.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/75 backdrop-blur-md text-white text-[10px] font-extrabold border border-white/20">
                {spot.tag}
              </span>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <h3 className="text-base font-black text-[#111827] dark:text-white group-hover:text-sky-600 dark:group-hover:text-blue-400 transition-colors">
                  {spot.name}
                </h3>
                <div className="flex items-center justify-between mt-1 text-xs text-[#4b5563] dark:text-[#cbd5e1] font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-500" />
                    <span>{spot.location}</span>
                  </span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                    {spot.budget}
                  </span>
                </div>
              </div>

              <Link to={`/plan-trip?destination=${encodeURIComponent(spot.name)}`}>
                <Button variant="secondary" size="sm" className="w-full justify-center gap-1.5 rounded-xl text-xs font-bold mt-1">
                  <Compass className="w-3.5 h-3.5 text-sky-500" />
                  <span>Explore Plan</span>
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
