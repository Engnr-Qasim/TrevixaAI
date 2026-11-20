import React from 'react';
import { motion } from 'motion/react';
import { Compass, Clock, Ticket, MapPin, Camera } from 'lucide-react';

interface AttractionOption {
  id: string;
  name: string;
  category: string;
  openingHours: string;
  recommendedDuration: string;
  ticketFee: string;
  description: string;
  image: string;
  photoSpotTip: string;
}

interface AttractionsSectionProps {
  customAttractions?: AttractionOption[];
}

export const AttractionsSection: React.FC<AttractionsSectionProps> = ({ customAttractions }) => {
  const defaultAttractions: AttractionOption[] = [
    {
      id: 'attr-1',
      name: 'Baltit Fort (800 Yrs Old)',
      category: 'UNESCO Heritage',
      openingHours: '09:00 AM - 05:30 PM',
      recommendedDuration: '2.5 Hours',
      ticketFee: 'PKR 600 / person',
      description: 'Ancient Tibetan-influenced fortress overlooking Karimabad town with royal artifacts.',
      image: 'https://images.unsplash.com/photo-1609839382283-e1897c92b95b?auto=format&fit=crop&w=800&q=80',
      photoSpotTip: 'Best photos from the top balcony facing Ladyfinger Peak.',
    },
    {
      id: 'attr-2',
      name: 'Attabad Turquoise Lake',
      category: 'Glacier Lake & Boating',
      openingHours: 'Open All Day',
      recommendedDuration: '3.0 Hours',
      ticketFee: 'PKR 2,500 Boat Ride',
      description: 'Stunning bright blue alpine lake created in 2010 surrounded by massive rocky cliffs.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      photoSpotTip: 'Rent a wooden speed boat for reflection mirror shots.',
    },
    {
      id: 'attr-3',
      name: 'Passu Cathedral Cones Viewpoint',
      category: 'Natural Wonder',
      openingHours: '24/7 Viewpoint',
      recommendedDuration: '1.5 Hours',
      ticketFee: 'Free',
      description: 'Jagged needle-like mountain peaks rising over 6,000m along the Karakoram Highway.',
      image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
      photoSpotTip: 'Sunrise light paints the mountain tips bright orange.',
    },
    {
      id: 'attr-4',
      name: 'Hussaini Hanging Rope Bridge',
      category: 'Extreme Adventure',
      openingHours: '08:00 AM - 07:00 PM',
      recommendedDuration: '1.0 Hour',
      ticketFee: 'PKR 300 Ticket',
      description: 'Walk across one of the most thrilling wooden plank suspension bridges in Asia.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      photoSpotTip: 'Camera angle looking straight across the wooden planks.',
    },
  ];

  const attractions = (customAttractions && customAttractions.length > 0) ? customAttractions : defaultAttractions;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-sky-500" />
            <h2 className="text-2xl font-black text-[#111827] dark:text-white tracking-tight">
              Top Sightseeing Attractions & Photo Spots
            </h2>
          </div>
          <p className="text-xs text-[#4b5563] dark:text-[#cbd5e1] font-medium mt-0.5">
            Key historic monuments, alpine lakes, and dramatic viewpoints along your route.
          </p>
        </div>

        <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3.5 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800 self-start sm:self-center">
          Verified Opening Hours
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {attractions.map((attr, idx) => (
          <motion.div
            key={attr.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: idx * 0.05 }}
            className="rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col md:flex-row group"
          >
            {/* Image */}
            <div className="relative w-full md:w-52 h-48 md:h-auto bg-slate-900 shrink-0 overflow-hidden">
              <img
                src={attr.image}
                alt={attr.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-sky-300 text-[10px] font-black border border-white/20">
                {attr.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-base font-black text-[#111827] dark:text-white">
                  {attr.name}
                </h3>

                <p className="text-xs text-[#4b5563] dark:text-[#cbd5e1] leading-relaxed">
                  {attr.description}
                </p>

                <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-blue-950/50 border border-sky-100 dark:border-blue-900 text-[11px] text-sky-800 dark:text-sky-300 font-bold flex items-center gap-2">
                  <Camera className="w-3.5 h-3.5 shrink-0 text-sky-500" />
                  <span>{attr.photoSpotTip}</span>
                </div>
              </div>

              {/* Specs Footer */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-sky-500" />
                  {attr.recommendedDuration}
                </span>

                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-black">
                  <Ticket className="w-3.5 h-3.5 text-emerald-500" />
                  {attr.ticketFee}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
