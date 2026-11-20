import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Search, MapPin, Star, Bookmark, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { dbService, DbSavedDestination } from '../services/dbService';
import { Button } from '../components/ui/button';

interface DestinationItem {
  id: string;
  name: string;
  region: string;
  province: string;
  image: string;
  rating: number;
  tags: string[];
  description: string;
}

const DESTINATION_LIST: DestinationItem[] = [
  {
    id: 'dest_hunza',
    name: 'Hunza Valley',
    region: 'Karimabad, Hunza',
    province: 'Gilgit-Baltistan',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    tags: ['Mountains', 'Forts', 'Autumn Blossoms', 'Culture'],
    description: 'Breathtaking valley featuring Karimabad, Altit & Baltit Forts, Passu Cones, and Attabad Lake.',
  },
  {
    id: 'dest_skardu',
    name: 'Skardu & Shangrila',
    region: 'Skardu Valley',
    province: 'Gilgit-Baltistan',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    tags: ['Cold Desert', 'Lakes', 'Deosai Plains', 'Luxury Resorts'],
    description: 'Gateway to K2, home of Shangrila Lake, Katpana Cold Desert dunes, and Deosai Plateau.',
  },
  {
    id: 'dest_swat',
    name: 'Swat Valley & Kalam',
    region: 'Mingora & Kalam',
    province: 'Khyber Pakhtunkhwa',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    tags: ['Alpine Rivers', 'Mahodand Lake', 'Skiing', 'History'],
    description: 'The Switzerland of the East with pine forests, roaring Swat river, and Malam Jabba ski resort.',
  },
  {
    id: 'dest_fairy_meadows',
    name: 'Fairy Meadows & Nanga Parbat',
    region: 'Raikot, Chilas',
    province: 'Gilgit-Baltistan',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    tags: ['Trekking', 'Nanga Parbat Basecamp', 'Camping', 'Adventure'],
    description: 'Lush alpine plateau facing Nanga Parbat, the 9th highest mountain in the world.',
  },
  {
    id: 'dest_neelum',
    name: 'Neelum Valley Kashmir',
    region: 'Muzaffarabad & Arang Kel',
    province: 'Azad Jammu & Kashmir',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    tags: ['Green Valleys', 'Arang Kel', 'Waterfalls', 'Kashmir'],
    description: 'Emerald rivers, dense forests, and cable car rides leading to high altitude Arang Kel village.',
  },
  {
    id: 'dest_gwadar',
    name: 'Gwadar Coast & Hammerhead',
    region: 'Gwadar',
    province: 'Balochistan',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    tags: ['Coastal Highway', 'Beaches', 'Marine Life', 'Desert Coast'],
    description: 'Golden beaches, turquoise Arabian Sea waters, and dramatic coastal highways of Balochistan.',
  },
];

export const DestinationsPage: React.FC = () => {
  const { user } = useAuthContext();
  const userId = user?.id || 'usr_trevixa_demo_789';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvince, setSelectedProvince] = useState<string>('All');
  const [savedDests, setSavedDests] = useState<DbSavedDestination[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadSavedDestinations = async () => {
    const list = await dbService.getSavedDestinations(userId);
    setSavedDests(list);
  };

  useEffect(() => {
    loadSavedDestinations();
  }, [userId]);

  const isSaved = (destId: string) => savedDests.some((d) => d.destination_id === destId);

  const handleBookmarkToggle = async (dest: DestinationItem) => {
    const saved = await dbService.toggleSaveDestination(userId, {
      destination_id: dest.id,
      destination_name: dest.name,
      region: dest.region,
      image_url: dest.image,
      rating: dest.rating,
      tags: dest.tags,
      description: dest.description,
    });

    setToastMessage(saved ? `⭐ Bookmarked ${dest.name}` : `Removed ${dest.name} from saved destinations`);
    setTimeout(() => setToastMessage(null), 3000);
    loadSavedDestinations();
  };

  const filteredDestinations = DESTINATION_LIST.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesProvince = selectedProvince === 'All' || d.province === selectedProvince;

    return matchesSearch && matchesProvince;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 space-y-8">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-slate-950 text-white border border-sky-500/50 shadow-2xl backdrop-blur-xl flex items-center gap-3 text-xs font-black"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-sky-500/10 text-sky-500 dark:bg-sky-500/20">
              <Compass className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-black text-[#111827] dark:text-white tracking-tight">
              Discover Destinations
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
            Explore Pakistan's most famous mountain valleys, alpine lakes, and heritage monuments. Bookmark places to saved destinations.
          </p>
        </div>

        <Link to="/saved-trips">
          <Button variant="outline" className="py-3 px-5 rounded-2xl text-xs font-bold gap-2">
            <Bookmark className="w-4 h-4 text-sky-500" />
            <span>View Saved Destinations ({savedDests.length})</span>
          </Button>
        </Link>
      </div>

      {/* Filter and Search controls */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200/80 dark:border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search valleys, lakes, forts..."
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#050b14] text-xs font-medium text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Province selector */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {['All', 'Gilgit-Baltistan', 'Khyber Pakhtunkhwa', 'Azad Jammu & Kashmir', 'Balochistan'].map((prov) => (
            <button
              key={prov}
              onClick={() => setSelectedProvince(prov)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedProvince === prov
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'bg-slate-50 dark:bg-[#050b14] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-sky-500'
              }`}
            >
              {prov}
            </button>
          ))}
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDestinations.map((dest) => {
          const bookmarked = isSaved(dest.id);
          return (
            <div
              key={dest.id}
              className="rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between group"
            >
              <div className="relative h-52 bg-slate-900 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => handleBookmarkToggle(dest)}
                    className={`p-2.5 rounded-2xl backdrop-blur-md border transition-all ${
                      bookmarked
                        ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/30'
                        : 'bg-slate-900/80 text-white border-white/20 hover:bg-slate-900'
                    }`}
                    title={bookmarked ? 'Remove Bookmark' : 'Bookmark Destination'}
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-white' : ''}`} />
                  </button>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-bold">
                  <span className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    <span>{dest.region}</span>
                  </span>

                  <span className="text-amber-400 font-black flex items-center gap-1 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{dest.rating}</span>
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-[#111827] dark:text-white group-hover:text-sky-500 transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    {dest.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {dest.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-[10px] font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  to="/plan-trip"
                  onClick={() => {
                    sessionStorage.setItem('trevixa_current_trip_params', JSON.stringify({ destination: dest.name }));
                  }}
                  className="block pt-2"
                >
                  <button className="w-full py-3 rounded-2xl bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-500 hover:text-white text-sky-600 dark:text-sky-400 font-black text-xs transition-colors flex items-center justify-center gap-2 shadow-sm">
                    <Sparkles className="w-4 h-4 text-sky-500 group-hover:text-white" />
                    <span>Generate Itinerary for {dest.name}</span>
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
