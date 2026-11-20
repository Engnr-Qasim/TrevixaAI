import React from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Calendar,
  Wallet,
  Bookmark,
  Copy,
  Edit3,
  Trash2,
  ExternalLink,
  Users,
  Sparkles,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DbTripRecord, dbService } from '../../services/dbService';

interface TripCardProps {
  trip: DbTripRecord;
  userId: string;
  onFavoriteToggle: (tripId: string, isFav: boolean) => void;
  onEditTitle: (trip: DbTripRecord) => void;
  onDuplicate: (tripId: string) => void;
  onDelete: (trip: DbTripRecord) => void;
}

export const TripCard: React.FC<TripCardProps> = ({
  trip,
  userId,
  onFavoriteToggle,
  onEditTitle,
  onDuplicate,
  onDelete,
}) => {
  const navigate = useNavigate();

  const handleOpenTrip = async () => {
    // Record recent activity
    await dbService.recordRecentActivity(userId, 'viewed_trip', trip.id, trip.title, {
      destination: trip.destination,
    });

    // Store in session storage for trip results viewer
    sessionStorage.setItem('trevixa_current_trip_params', JSON.stringify(trip.complete_itinerary_json));
    navigate('/trip-results');
  };

  const heroImg =
    trip.complete_itinerary_json?.heroImage ||
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200/80 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-sky-500/50 transition-all overflow-hidden flex flex-col group"
    >
      {/* Top Banner Image */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-900">
        <img
          src={heroImg}
          alt={trip.destination}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Favorite & Quick Badges */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button
            onClick={() => onFavoriteToggle(trip.id, !trip.is_favorite)}
            className={`p-2.5 rounded-2xl backdrop-blur-md border transition-all ${
              trip.is_favorite
                ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/30'
                : 'bg-slate-900/70 text-white border-white/20 hover:bg-slate-900'
            }`}
            title={trip.is_favorite ? 'Remove Favorite' : 'Mark as Favorite'}
          >
            <Bookmark className={`w-4 h-4 ${trip.is_favorite ? 'fill-white' : ''}`} />
          </button>
        </div>

        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-bold">
          <span className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>{trip.destination}</span>
          </span>

          <span className="bg-sky-500/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-black uppercase text-white">
            {trip.duration} Days
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-black text-[#111827] dark:text-white line-clamp-1 group-hover:text-sky-500 transition-colors">
              {trip.title}
            </h3>
            <button
              onClick={() => onEditTitle(trip)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors shrink-0"
              title="Edit Custom Title"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-2 leading-relaxed">
            {trip.ai_summary || `Custom AI itinerary for ${trip.destination} (${trip.duration} Days)`}
          </p>
        </div>

        {/* Metrics Pill Row */}
        <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80">
            <span className="text-[10px] text-slate-400 uppercase block font-semibold">Est. Budget</span>
            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
              PKR {Number(trip.budget).toLocaleString()}
            </span>
          </div>

          <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80">
            <span className="text-[10px] text-slate-400 uppercase block font-semibold">Style</span>
            <span className="text-xs font-black text-slate-800 dark:text-slate-200 truncate block">
              {trip.travelers || 'Family'}
            </span>
          </div>
        </div>

        {/* Card Action Controls Row */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => onDuplicate(trip.id)}
              className="p-2 rounded-xl text-slate-500 hover:text-sky-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs font-bold flex items-center gap-1"
              title="Duplicate Trip"
            >
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Duplicate</span>
            </button>

            <button
              onClick={() => onDelete(trip)}
              className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-xs font-bold flex items-center gap-1"
              title="Delete Trip"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleOpenTrip}
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-sky-500 hover:bg-sky-600 text-white font-black text-xs transition-colors flex items-center gap-1.5 shadow-md"
          >
            <span>Open Trip</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
