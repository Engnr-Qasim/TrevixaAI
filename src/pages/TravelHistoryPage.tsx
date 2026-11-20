import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  History,
  Search,
  SlidersHorizontal,
  Bookmark,
  PlusCircle,
  CheckCircle2,
  Undo2,
  Calendar,
  Wallet,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { dbService, DbTripRecord, DbRecentActivity } from '../services/dbService';
import { TripCard } from '../components/trips/TripCard';
import { EditTitleModal } from '../components/trips/EditTitleModal';
import { DeleteConfirmModal } from '../components/trips/DeleteConfirmModal';
import { Button } from '../components/ui/button';

export const TravelHistoryPage: React.FC = () => {
  const { user } = useAuthContext();
  const userId = user?.id ?? '';

  const [trips, setTrips] = useState<DbTripRecord[]>([]);
  const [recentActivities, setRecentActivities] = useState<DbRecentActivity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'budget_high' | 'budget_low' | 'destination'>('newest');

  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [undoTripId, setUndoTripId] = useState<string | null>(null);

  // Modals state
  const [editingTrip, setEditingTrip] = useState<DbTripRecord | null>(null);
  const [deletingTrip, setDeletingTrip] = useState<DbTripRecord | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const userTrips = await dbService.getUserTrips(userId, {
        search: searchQuery,
        favoritesOnly,
        sort: sortBy,
      });
      setTrips(userTrips);

      const recent = await dbService.getRecentActivity(userId, 10);
      setRecentActivities(recent);
    } catch (e) {
      console.error('Error loading travel history:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [userId, searchQuery, favoritesOnly, sortBy]);

  const showToastWithUndo = (msg: string, tripIdToUndo?: string) => {
    setToastMessage(msg);
    if (tripIdToUndo) {
      setUndoTripId(tripIdToUndo);
    } else {
      setUndoTripId(null);
    }
    setTimeout(() => {
      setToastMessage(null);
      setUndoTripId(null);
    }, 5000);
  };

  const handleFavoriteToggle = async (tripId: string, isFav: boolean) => {
    await dbService.toggleFavoriteTrip(userId, tripId, isFav);
    showToastWithUndo(isFav ? '❤️ Added to favorites' : 'Removed from favorites');
    loadData();
  };

  const handleEditTitleSave = async (newTitle: string) => {
    if (!editingTrip) return;
    await dbService.updateTripTitle(editingTrip.id, newTitle);
    showToastWithUndo(`✨ Renamed trip to "${newTitle}"`);
    loadData();
  };

  const handleDuplicate = async (tripId: string) => {
    const dup = await dbService.duplicateTrip(userId, tripId);
    if (dup) {
      showToastWithUndo(`📋 Duplicated trip: "${dup.title}"`);
      loadData();
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingTrip) return;
    const tripId = deletingTrip.id;
    const title = deletingTrip.title;
    await dbService.deleteTrip(tripId, true);
    showToastWithUndo(`🗑️ Deleted "${title}"`, tripId);
    setDeletingTrip(null);
    loadData();
  };

  const handleUndoDelete = async () => {
    if (!undoTripId) return;
    await dbService.restoreTrip(undoTripId);
    showToastWithUndo('↩️ Trip restored successfully!');
    setUndoTripId(null);
    loadData();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 space-y-8">
      {/* Toast Notification with Undo */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-slate-950 text-white border border-sky-500/50 shadow-2xl backdrop-blur-xl flex items-center gap-4 text-xs font-black"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{toastMessage}</span>
            </div>
            {undoTripId && (
              <button
                onClick={handleUndoDelete}
                className="px-3 py-1 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-[11px] font-black flex items-center gap-1 transition-colors"
              >
                <Undo2 className="w-3.5 h-3.5" />
                <span>Undo</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-sky-500/10 text-sky-500 dark:bg-sky-500/20">
              <History className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-black text-[#111827] dark:text-white tracking-tight">
              Travel Journey History
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
            Timeline of all your generated trip itineraries, newest first. Search, sort by budget, favorite, and duplicate.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/plan-trip">
            <Button variant="neon" className="py-3 px-5 rounded-2xl text-xs font-black gap-2">
              <PlusCircle className="w-4 h-4" />
              <span>Plan New AI Trip</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Search & Sort Controls */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200/80 dark:border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Live Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search history by destination or custom title..."
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#050b14] text-xs font-medium text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Filter Pills & Sort Selector */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setFavoritesOnly(!favoritesOnly)}
            className={`px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
              favoritesOnly
                ? 'bg-rose-500 text-white border-rose-500 shadow-md'
                : 'bg-slate-50 dark:bg-[#050b14] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-sky-500'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${favoritesOnly ? 'fill-white' : ''}`} />
            <span>Favorites Only</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400">
            <SlidersHorizontal className="w-3.5 h-3.5 text-sky-500" />
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#050b14] text-xs font-bold text-[#111827] dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="budget_high">Budget (High to Low)</option>
              <option value="budget_low">Budget (Low to High)</option>
              <option value="destination">Destination (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Past Trips */}
      {isLoading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500 font-bold">Loading travel history from Supabase...</p>
        </div>
      ) : trips.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200/80 dark:border-slate-800 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center mx-auto">
            <History className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-black text-[#111827] dark:text-white">No travel history found</h3>
            <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto">
              {searchQuery || favoritesOnly
                ? 'No history matches your search parameters.'
                : 'Your travel history is empty. Generate your first itinerary with Trevixa AI!'}
            </p>
          </div>
          <Link to="/plan-trip" className="inline-block pt-2">
            <Button variant="neon" className="py-3 px-6 rounded-2xl text-xs font-black">
              Plan New Trip
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              userId={userId}
              onFavoriteToggle={handleFavoriteToggle}
              onEditTitle={(t) => setEditingTrip(t)}
              onDuplicate={handleDuplicate}
              onDelete={(t) => setDeletingTrip(t)}
            />
          ))}
        </div>
      )}

      {/* Recently Viewed Activity Banner */}
      {recentActivities.length > 0 && (
        <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sky-400" />
            <h3 className="text-base font-black text-white">Recently Opened Trips (Latest 10)</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {recentActivities.map((act) => (
              <div
                key={act.id}
                className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div className="truncate">
                  <span className="font-bold text-white block truncate">{act.title}</span>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    {new Date(act.created_at).toLocaleDateString()}
                  </span>
                </div>
                <Link to="/trip-results">
                  <span className="text-sky-400 text-[11px] font-bold hover:underline shrink-0">Reopen</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      {editingTrip && (
        <EditTitleModal
          isOpen={Boolean(editingTrip)}
          currentTitle={editingTrip.title}
          onClose={() => setEditingTrip(null)}
          onSave={handleEditTitleSave}
        />
      )}

      {deletingTrip && (
        <DeleteConfirmModal
          isOpen={Boolean(deletingTrip)}
          tripTitle={deletingTrip.title}
          onClose={() => setDeletingTrip(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};
