import React from 'react';
import { motion } from 'motion/react';
import { Utensils, Star, MapPin, Coffee, Award } from 'lucide-react';

interface RestaurantOption {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  estCostPerPerson: number;
  bestDish: string;
  distance: string;
  image: string;
  badge: string;
}

interface RestaurantsSectionProps {
  customRestaurants?: RestaurantOption[];
}

export const RestaurantsSection: React.FC<RestaurantsSectionProps> = ({ customRestaurants }) => {
  const defaultRestaurants: RestaurantOption[] = [
    {
      id: 'rest-1',
      name: 'Cafe de Hunza',
      cuisine: 'Coffee & Artisanal Bakery',
      rating: 4.9,
      estCostPerPerson: 1200,
      bestDish: 'World-Famous Walnut Cake & Organic Espresso',
      distance: '0.3 km from Karimabad Bazaar',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      badge: 'Iconic Must-Visit',
    },
    {
      id: 'rest-2',
      name: 'Glacier Breeze Cafe',
      cuisine: 'Mountain Desserts & Tea',
      rating: 4.8,
      estCostPerPerson: 1400,
      bestDish: 'Fresh Apricot Cake & Herbal Hunza Tea',
      distance: 'Overlooking Passu Cathedral Cones',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      badge: 'Best Viewpoint Cafe',
    },
    {
      id: 'rest-3',
      name: 'Osho Maraka Traditional Restaurant',
      cuisine: 'Authentic Balti & Gilgiti Food',
      rating: 4.7,
      estCostPerPerson: 1800,
      bestDish: 'Chapshuro (Beef stuffed flatbread) & Dowdo Soup',
      distance: '0.6 km from Baltit Fort',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      badge: 'Cultural Culinary',
    },
    {
      id: 'rest-4',
      name: 'Gojal Mountain Trout House',
      cuisine: 'Fresh River Seafood',
      rating: 4.9,
      estCostPerPerson: 2200,
      bestDish: 'Pan-Seared Organic Mountain Rainbow Trout',
      distance: 'Near Attabad Lake spillway',
      image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
      badge: 'Fresh Trout Specialty',
    },
  ];

  const restaurants = customRestaurants ?? defaultRestaurants;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-sky-500" />
            <h2 className="text-2xl font-black text-[#111827] dark:text-white tracking-tight">
              Food & Mountain Cafe Spotlights
            </h2>
          </div>
          <p className="text-xs text-[#4b5563] dark:text-[#cbd5e1] font-medium mt-0.5">
            Local culinary recommendations featuring famous cakes, Chapshuro, and fresh river trout.
          </p>
        </div>

        <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-3.5 py-1.5 rounded-full border border-amber-200 dark:border-amber-800 self-start sm:self-center">
          Confirm details with the venue
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {restaurants.length === 0 && <p className="text-sm text-slate-500">No dining suggestions were available. Check local listings.</p>}
        {restaurants.map((rest, idx) => (
          <motion.div
            key={rest.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: idx * 0.05 }}
            className="rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-40 w-full bg-slate-900 overflow-hidden">
                <img
                  src={rest.image}
                  alt={rest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-sky-300 text-[10px] font-black border border-white/20">
                  Dining suggestion
                </span>

                <div className="absolute bottom-2.5 right-3 flex items-center gap-1 bg-amber-500 text-slate-950 px-2 py-0.5 rounded-md text-[11px] font-black">
                  <Star className="w-3 h-3 fill-slate-950" />
                  <span>Rating unavailable</span>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-sm font-black text-[#111827] dark:text-white">
                  {rest.name}
                </h3>

                <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400 block">
                  {rest.cuisine}
                </span>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs font-medium space-y-0.5">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-500" />
                    Signature Item
                  </span>
                  <p className="text-slate-800 dark:text-slate-200 font-bold text-[11px]">
                    {rest.bestDish}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-extrabold">
              <span className="text-slate-400 text-[10px] truncate max-w-[120px]">
                {rest.distance}
              </span>
              <span className="text-emerald-600 dark:text-emerald-400">
                ~PKR {rest.estCostPerPerson.toLocaleString()}/person
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
