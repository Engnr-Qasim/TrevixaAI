import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Hotel,
  Star,
  MapPin,
  Wifi,
  Coffee,
  Flame,
  Car,
  Heart,
  ExternalLink,
  Check,
} from 'lucide-react';

interface HotelOption {
  id: string;
  name: string;
  rating: number;
  reviewsCount: number;
  location: string;
  pricePerNight: number;
  totalEstCost: number;
  image: string;
  badge: string;
  amenities: string[];
  description: string;
}

interface HotelsSectionProps {
  onToast: (msg: string) => void;
  customHotels?: HotelOption[];
}

export const HotelsSection: React.FC<HotelsSectionProps> = ({ onToast, customHotels }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [bookedIds, setBookedIds] = useState<string[]>([]);

  const defaultHotels: HotelOption[] = [
    {
      id: 'hotel-1',
      name: 'Hunza Serena Inn & Royal Gardens',
      rating: 4.9,
      reviewsCount: 420,
      location: 'Karimabad, Hunza Valley',
      pricePerNight: 24000,
      totalEstCost: 96000,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      badge: 'Luxury Top Pick',
      amenities: ['Mountain View', 'Buffet Breakfast', 'Heated Rooms', 'Wi-Fi', 'Free Parking'],
      description: 'Heritage Serena property with royal garden views of Ultar Sar and Baltit Fort cliffs.',
    },
    {
      id: 'hotel-2',
      name: 'Off-Grid Luxury Glamping Resort',
      rating: 4.8,
      reviewsCount: 280,
      location: 'Duikar, Eagle’s Nest Peak',
      pricePerNight: 16000,
      totalEstCost: 64000,
      image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
      badge: 'Stargazing Dome',
      amenities: ['Geodesic Dome', 'Fire Pit', '360° Sunset View', 'Heated Blankets', 'Hot Showers'],
      description: 'Glass-dome glamping at 2,850m elevation with unobstructed views of the Milky Way galaxy.',
    },
    {
      id: 'hotel-3',
      name: 'Luxus Hunza Attabad Lake Resort',
      rating: 4.9,
      reviewsCount: 310,
      location: 'Attabad Lake Waterfront',
      pricePerNight: 28000,
      totalEstCost: 112000,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      badge: 'Waterfront Views',
      amenities: ['Private Balcony', 'Jet Ski Access', 'Fine Dining', 'Breakfast Included'],
      description: 'Overwater luxury chalets situated directly on the edge of the turquoise Attabad lake.',
    },
    {
      id: 'hotel-4',
      name: 'Darbar Hotel & Resort Karimabad',
      rating: 4.6,
      reviewsCount: 190,
      location: 'Karimabad Market',
      pricePerNight: 11000,
      totalEstCost: 44000,
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      badge: 'Best Value',
      amenities: ['Free Wi-Fi', 'Local Restaurant', 'Hot Water', 'Generator Backup'],
      description: 'Cozy traditional hotel located steps away from Karimabad Bazaar and craft shops.',
    },
  ];

  const hotels = customHotels ?? defaultHotels;

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((f) => f !== id));
      onToast('Hotel removed from favorites');
    } else {
      setFavorites([...favorites, id]);
      onToast('Hotel saved to favorites!');
    }
  };

  const handleBookClick = (id: string, name: string) => {
    if (!bookedIds.includes(id)) {
      setBookedIds([...bookedIds, id]);
      onToast(`Saved reservation slot for ${name}!`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Hotel className="w-5 h-5 text-sky-500" />
            <h2 className="text-2xl font-black text-[#111827] dark:text-white tracking-tight">
              AI-Curated Hotel & Stay Recommendations
            </h2>
          </div>
          <p className="text-xs text-[#4b5563] dark:text-[#cbd5e1] font-medium mt-0.5">
            Lodging suggestions with estimated costs. Confirm room availability, prices, and amenities directly.
          </p>
        </div>

        <span className="text-xs font-extrabold text-sky-600 dark:text-blue-400 bg-sky-50 dark:bg-blue-950 px-3.5 py-1.5 rounded-full border border-sky-200 dark:border-blue-800 self-start sm:self-center">
          4 Recommended Stays
        </span>
      </div>

      {/* Grid of Hotels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hotels.length === 0 && <p className="text-sm text-slate-500">No lodging suggestions were available. Check local accommodation providers.</p>}
        {hotels.map((hotel, idx) => {
          const isFav = favorites.includes(hotel.id);
          const isBooked = bookedIds.includes(hotel.id);

          return (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.05 }}
              className="rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image & Badges Overlay */}
                <div className="relative h-52 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-black border border-white/20">
                    Availability unconfirmed
                  </span>

                  <button
                    onClick={() => toggleFavorite(hotel.id)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-slate-950/60 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:scale-110 transition-transform"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="text-xs font-bold text-sky-300 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-sky-400" />
                      {hotel.location}
                    </span>

                    <div className="flex items-center gap-1 bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-lg text-xs font-black">
                      <Star className="w-3.5 h-3.5 fill-slate-950" />
                      <span>Rating unavailable</span>

                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-base font-black text-[#111827] dark:text-white group-hover:text-sky-600 dark:group-hover:text-blue-400 transition-colors">
                    {hotel.name}
                  </h3>

                  <p className="text-xs text-[#4b5563] dark:text-[#cbd5e1] leading-relaxed">
                    {hotel.description}
                  </p>

                  {/* Amenities Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {hotel.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-extrabold"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Book Button Footer */}
              <div className="p-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">
                    Estimated Tariff
                  </span>
                  <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                    PKR {hotel.pricePerNight.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium"> / night</span>
                </div>

                <button
                  onClick={() => handleBookClick(hotel.id, hotel.name)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                    isBooked
                      ? 'bg-emerald-500 text-white'
                      : 'bg-sky-500 hover:bg-sky-600 text-white shadow-md shadow-sky-500/20'
                  }`}
                >
                  {isBooked ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Saved Slot</span>
                    </>
                  ) : (
                    <>
                      <span>Book Later</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
