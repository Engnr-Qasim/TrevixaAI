import { supabase, IS_SUPABASE_CONFIGURED } from '../lib/supabase';
import { GeneratedTripData, HotelOption, RestaurantOption, PackingChecklistItem } from '../types/tripResult';

export interface DbTripRecord {
  id: string;
  user_id: string;
  title: string;
  destination: string;
  province?: string;
  duration: number;
  budget: number;
  travelers?: string;
  interests?: string[];
  preferences?: Record<string, any>;
  ai_summary?: string;
  complete_itinerary_json: GeneratedTripData;
  weather?: string;
  hotels?: HotelOption[];
  restaurants?: RestaurantOption[];
  packing_list?: PackingChecklistItem[];
  is_favorite: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbSavedDestination {
  id: string;
  user_id: string;
  destination_id: string;
  destination_name: string;
  region?: string;
  image_url?: string;
  rating?: number;
  tags?: string[];
  description?: string;
  created_at: string;
}

export interface DbUserPreferences {
  user_id: string;
  preferred_budget: number;
  favorite_travel_style: string;
  preferred_transport: string;
  dark_light_theme: 'dark' | 'light' | 'system';
  preferred_language: string;
  updated_at?: string;
}

export interface DbRecentActivity {
  id: string;
  user_id: string;
  activity_type: 'viewed_trip' | 'generated_trip' | 'bookmarked_destination';
  trip_id?: string;
  title: string;
  details?: Record<string, any>;
  created_at: string;
}

// STORAGE KEYS FOR FALLBACK PERSISTENCE
const STORAGE_KEYS = {
  TRIPS: 'trevixa_db_trips',
  FAVORITES: 'trevixa_db_favorites',
  DESTINATIONS: 'trevixa_db_saved_destinations',
  PREFERENCES: 'trevixa_db_user_preferences',
  RECENT: 'trevixa_db_recent_activity',
  PROFILES: 'trevixa_db_profiles',
};

// HELPER: LOCAL STORAGE READ/WRITE
const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const setLocalStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`LocalStorage write error for ${key}:`, e);
  }
};

// DEFAULT SEED DEMO TRIPS
const getInitialSeedTrips = (userId: string): DbTripRecord[] => [
  {
    id: 'trip_hunza_demo_001',
    user_id: userId,
    title: 'Hunza Autumn Valley Expedition',
    destination: 'Hunza Valley',
    province: 'Gilgit-Baltistan',
    duration: 5,
    budget: 75000,
    travelers: 'Friends & Family',
    interests: ['nature', 'photography', 'culture'],
    ai_summary: '5-day autumn roadtrip exploring Karimabad, Altit Fort, Passu Cones, and Attabad Lake.',
    complete_itinerary_json: {
      destination: 'Hunza Valley',
      region: 'Gilgit-Baltistan',
      matchScore: 98,
      durationDays: 5,
      budgetAmount: 75000,
      bestSeason: 'Autumn',
      weather: '18°C Mild',
      travelStyle: 'Friends & Family',
      heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80',
      executiveSummary: 'Experience breathtaking apricot blossoms and snow-capped peaks in Karimabad.',
      feasibilityScore: 95,
      budgetBreakdown: [
        { category: 'Stay & Hotels', amount: 30000, percentage: 40, description: 'Luxury lodge stays' },
        { category: 'Transport', amount: 25000, percentage: 33, description: '4x4 Prado transport' },
        { category: 'Food & Trout', amount: 12000, percentage: 16, description: 'Local Hunza cuisine' },
        { category: 'Activities & Fees', amount: 8000, percentage: 11, description: 'Fort tickets & boating' },
      ],
      dayItinerary: [
        {
          dayNumber: 1,
          title: 'Arrival in Karimabad & Sunset at Eagle’s Nest',
          dateStr: 'Day 1',
          theme: 'Culture & Panoramic Sunset',
          activities: [
            {
              id: 'act-1',
              timeSlot: '09:00 AM',
              period: 'morning',
              title: 'Drive from Gilgit to Hunza Valley',
              location: 'Karakoram Highway',
              duration: '3 Hours',
              estCost: 'PKR 4,000',
              description: 'Picturesque drive along the Karakoram Highway with view of Rakaposhi peak.',
              image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
              type: 'Travel',
            },
          ],
        },
      ],
      hotels: [],
      restaurants: [],
      attractions: [],
      packingChecklist: [],
      weatherForecast: [],
      localTips: [],
    },
    weather: '18°C Mild & Sunny',
    hotels: [],
    restaurants: [],
    packing_list: [],
    is_favorite: true,
    is_deleted: false,
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'trip_skardu_demo_002',
    user_id: userId,
    title: 'Skardu Cold Desert & Lakes Getaway',
    destination: 'Skardu',
    province: 'Gilgit-Baltistan',
    duration: 6,
    budget: 110000,
    travelers: 'Couple / Luxury',
    interests: ['adventure', 'nature', 'lakes'],
    ai_summary: '6-day luxury tour of Shangrila Lake, Katpana Desert, Deosai Plains, and Basho Valley.',
    complete_itinerary_json: {
      destination: 'Skardu',
      region: 'Gilgit-Baltistan',
      matchScore: 96,
      durationDays: 6,
      budgetAmount: 110000,
      bestSeason: 'Summer / Autumn',
      weather: '22°C Clear',
      travelStyle: 'Luxury',
      heroImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1600&q=80',
      executiveSummary: 'Explore world famous Shangrila resort, high altitude Cold Desert sand dunes, and Deosai plateau.',
      feasibilityScore: 92,
      budgetBreakdown: [],
      dayItinerary: [],
      hotels: [],
      restaurants: [],
      attractions: [],
      packingChecklist: [],
      weatherForecast: [],
      localTips: [],
    },
    weather: '22°C Clear Skies',
    hotels: [],
    restaurants: [],
    packing_list: [],
    is_favorite: false,
    is_deleted: false,
    created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
];

// =========================================================
// DATABASE SERVICE METHODS
// =========================================================

let profileSync: Promise<void> | undefined;

export const dbService = {
  // -------------------------------------------------------
  // 0. PROFILE SYNC
  // -------------------------------------------------------
  async ensureUserProfile(user: { id: string; email?: string | null; fullName?: string | null; imageUrl?: string | null }) {
    if (!user || !user.id) return;

    if (IS_SUPABASE_CONFIGURED && supabase) {
      try {
        profileSync = Promise.resolve(supabase.from('profiles').upsert(
          {
            id: user.id,
            email: user.email || '',
            full_name: user.fullName || 'Traveler',
            avatar_url: user.imageUrl || '',
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'id' }
        )).then(({ error }) => {
          if (error) console.warn('Travel profile could not sync.');
        }).catch(() => {
          console.warn('Travel profile could not sync.');
        });
        await profileSync;
      } catch (err) {
        console.warn('Supabase profile upsert error:');
      }
    } else {
      const profiles = getLocalStorage<Record<string, any>>(STORAGE_KEYS.PROFILES, {});
      profiles[user.id] = {
        id: user.id,
        email: user.email,
        full_name: user.fullName,
        avatar_url: user.imageUrl,
        updated_at: new Date().toISOString(),
      };
      setLocalStorage(STORAGE_KEYS.PROFILES, profiles);
    }
  },

  // -------------------------------------------------------
  // 1. SAVE NEW AI TRIP
  // -------------------------------------------------------
  async saveTrip(userId: string, tripData: GeneratedTripData, customTitle?: string): Promise<DbTripRecord> {
    const tripTitle = customTitle || `${tripData.destination} ${tripData.durationDays}-Day AI Plan`;

    const newTrip: DbTripRecord = {
      id: `trip_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      user_id: userId,
      title: tripTitle,
      destination: tripData.destination,
      province: tripData.region || 'Pakistan',
      duration: tripData.durationDays,
      budget: tripData.budgetAmount,
      travelers: tripData.travelStyle || 'Friends & Family',
      interests: [],
      preferences: {},
      ai_summary: tripData.executiveSummary,
      complete_itinerary_json: tripData,
      weather: tripData.weather,
      hotels: tripData.hotels || [],
      restaurants: tripData.restaurants || [],
      packing_list: tripData.packingChecklist || [],
      is_favorite: false,
      is_deleted: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (IS_SUPABASE_CONFIGURED && supabase) {
      try {
        await profileSync;
        const { data, error } = await supabase
          .from('trips')
          .insert({
            user_id: userId,
            title: tripTitle,
            destination: tripData.destination,
            province: tripData.region,
            duration: tripData.durationDays,
            budget: tripData.budgetAmount,
            travelers: tripData.travelStyle,
            ai_summary: tripData.executiveSummary,
            complete_itinerary_json: tripData,
            weather: tripData.weather,
            hotels: tripData.hotels || [],
            restaurants: tripData.restaurants || [],
            packing_list: tripData.packingChecklist || [],
            is_favorite: false,
            is_deleted: false,
          })
          .select()
          .single();

        if (error) {
          console.error('Supabase saveTrip error:');
        } else if (data) {
          // Log recent activity
          await this.recordRecentActivity(userId, 'generated_trip', data.id, tripTitle, { destination: tripData.destination });
          return data as DbTripRecord;
        }
      } catch (e) {
        console.warn('Supabase exception during saveTrip, falling back:');
      }
    }

    // Local Storage Fallback
    const existing = getLocalStorage<DbTripRecord[]>(STORAGE_KEYS.TRIPS, []);
    const userTrips = existing.filter((t) => t.user_id === userId);
    if (import.meta.env.DEV && userId.startsWith('usr_') && userTrips.length === 0 && existing.length === 0) {
      existing.push(...getInitialSeedTrips(userId));
    }
    existing.unshift(newTrip);
    setLocalStorage(STORAGE_KEYS.TRIPS, existing);

    await this.recordRecentActivity(userId, 'generated_trip', newTrip.id, tripTitle, { destination: tripData.destination });
    return newTrip;
  },

  // -------------------------------------------------------
  // 2. FETCH USER TRIPS WITH SEARCH, SORT, & FILTERS
  // -------------------------------------------------------
  async getUserTrips(
    userId: string,
    options?: {
      includeDeleted?: boolean;
      search?: string;
      sort?: 'newest' | 'oldest' | 'budget_high' | 'budget_low' | 'destination';
      favoritesOnly?: boolean;
    }
  ): Promise<DbTripRecord[]> {
    let results: DbTripRecord[] = [];

    if (IS_SUPABASE_CONFIGURED && supabase) {
      try {
        let query = supabase.from('trips').select('*').eq('user_id', userId);

        if (!options?.includeDeleted) {
          query = query.eq('is_deleted', false);
        }

        if (options?.favoritesOnly) {
          query = query.eq('is_favorite', true);
        }

        if (options?.search) {
          query = query.or(`destination.ilike.%${options.search}%,title.ilike.%${options.search}%`);
        }

        // Sorting
        switch (options?.sort) {
          case 'oldest':
            query = query.order('created_at', { ascending: true });
            break;
          case 'budget_high':
            query = query.order('budget', { ascending: false });
            break;
          case 'budget_low':
            query = query.order('budget', { ascending: true });
            break;
          case 'destination':
            query = query.order('destination', { ascending: true });
            break;
          case 'newest':
          default:
            query = query.order('created_at', { ascending: false });
            break;
        }

        const { data, error } = await query;
        if (!error && data) {
          return data as DbTripRecord[];
        }
      } catch (e) {
        console.warn('Supabase getUserTrips error:');
      }
    }

    // Local Storage Fallback
    const all = getLocalStorage<DbTripRecord[]>(STORAGE_KEYS.TRIPS, []);
    let userTrips = all.filter((t) => t.user_id === userId);

    if (import.meta.env.DEV && userId.startsWith('usr_') && userTrips.length === 0) {
      const seed = getInitialSeedTrips(userId);
      all.push(...seed);
      setLocalStorage(STORAGE_KEYS.TRIPS, all);
      userTrips = seed;
    }

    results = userTrips.filter((t) => (options?.includeDeleted ? true : !t.is_deleted));

    if (options?.favoritesOnly) {
      results = results.filter((t) => t.is_favorite);
    }

    if (options?.search) {
      const q = options.search.toLowerCase();
      results = results.filter((t) => t.title.toLowerCase().includes(q) || t.destination.toLowerCase().includes(q));
    }

    // Sort
    results.sort((a, b) => {
      if (options?.sort === 'oldest') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      if (options?.sort === 'budget_high') {
        return b.budget - a.budget;
      }
      if (options?.sort === 'budget_low') {
        return a.budget - b.budget;
      }
      if (options?.sort === 'destination') {
        return a.destination.localeCompare(b.destination);
      }
      // default newest
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    return results;
  },

  // -------------------------------------------------------
  // 3. EDIT TRIP TITLE
  // -------------------------------------------------------
  async updateTripTitle(tripId: string, newTitle: string): Promise<boolean> {
    if (!newTitle.trim()) return false;

    if (IS_SUPABASE_CONFIGURED && supabase) {
      try {
        const { error } = await supabase
          .from('trips')
          .update({ title: newTitle.trim(), updated_at: new Date().toISOString() })
          .eq('id', tripId);
        if (!error) return true;
      } catch (e) {
        console.warn('Supabase updateTripTitle error:');
      }
    }

    const all = getLocalStorage<DbTripRecord[]>(STORAGE_KEYS.TRIPS, []);
    const idx = all.findIndex((t) => t.id === tripId);
    if (idx !== -1) {
      all[idx].title = newTitle.trim();
      all[idx].updated_at = new Date().toISOString();
      setLocalStorage(STORAGE_KEYS.TRIPS, all);
      return true;
    }
    return false;
  },

  // -------------------------------------------------------
  // 4. TOGGLE FAVORITE TRIP
  // -------------------------------------------------------
  async toggleFavoriteTrip(userId: string, tripId: string, isFav: boolean): Promise<boolean> {
    if (IS_SUPABASE_CONFIGURED && supabase) {
      try {
        await supabase
          .from('trips')
          .update({ is_favorite: isFav, updated_at: new Date().toISOString() })
          .eq('id', tripId);

        if (isFav) {
          await supabase.from('favorite_trips').upsert({ user_id: userId, trip_id: tripId });
        } else {
          await supabase.from('favorite_trips').delete().eq('user_id', userId).eq('trip_id', tripId);
        }
        return true;
      } catch (e) {
        console.warn('Supabase toggleFavoriteTrip error:');
      }
    }

    const all = getLocalStorage<DbTripRecord[]>(STORAGE_KEYS.TRIPS, []);
    const idx = all.findIndex((t) => t.id === tripId);
    if (idx !== -1) {
      all[idx].is_favorite = isFav;
      all[idx].updated_at = new Date().toISOString();
      setLocalStorage(STORAGE_KEYS.TRIPS, all);
      return true;
    }
    return false;
  },

  // -------------------------------------------------------
  // 5. DUPLICATE TRIP
  // -------------------------------------------------------
  async duplicateTrip(userId: string, tripId: string): Promise<DbTripRecord | null> {
    const trips = await this.getUserTrips(userId, { includeDeleted: true });
    const original = trips.find((t) => t.id === tripId);
    if (!original) return null;

    const copyTitle = `${original.title} (Copy)`;
    const duplicated: DbTripRecord = {
      ...original,
      id: `trip_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      user_id: userId,
      title: copyTitle,
      is_favorite: false,
      is_deleted: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (IS_SUPABASE_CONFIGURED && supabase) {
      try {
        const { data, error } = await supabase
          .from('trips')
          .insert({
            user_id: userId,
            title: copyTitle,
            destination: original.destination,
            province: original.province,
            duration: original.duration,
            budget: original.budget,
            travelers: original.travelers,
            ai_summary: original.ai_summary,
            complete_itinerary_json: original.complete_itinerary_json,
            weather: original.weather,
            hotels: original.hotels,
            restaurants: original.restaurants,
            packing_list: original.packing_list,
            is_favorite: false,
            is_deleted: false,
          })
          .select()
          .single();

        if (!error && data) {
          return data as DbTripRecord;
        }
      } catch (e) {
        console.warn('Supabase duplicateTrip error:');
      }
    }

    const all = getLocalStorage<DbTripRecord[]>(STORAGE_KEYS.TRIPS, []);
    all.unshift(duplicated);
    setLocalStorage(STORAGE_KEYS.TRIPS, all);
    return duplicated;
  },

  // -------------------------------------------------------
  // 6. SOFT DELETE & UNDO RESTORE TRIP
  // -------------------------------------------------------
  async deleteTrip(tripId: string, soft: boolean = true): Promise<boolean> {
    if (IS_SUPABASE_CONFIGURED && supabase) {
      try {
        if (soft) {
          await supabase.from('trips').update({ is_deleted: true, updated_at: new Date().toISOString() }).eq('id', tripId);
        } else {
          await supabase.from('trips').delete().eq('id', tripId);
        }
        return true;
      } catch (e) {
        console.warn('Supabase deleteTrip error:');
      }
    }

    const all = getLocalStorage<DbTripRecord[]>(STORAGE_KEYS.TRIPS, []);
    const idx = all.findIndex((t) => t.id === tripId);
    if (idx !== -1) {
      if (soft) {
        all[idx].is_deleted = true;
        all[idx].updated_at = new Date().toISOString();
      } else {
        all.splice(idx, 1);
      }
      setLocalStorage(STORAGE_KEYS.TRIPS, all);
      return true;
    }
    return false;
  },

  async restoreTrip(tripId: string): Promise<boolean> {
    if (IS_SUPABASE_CONFIGURED && supabase) {
      try {
        await supabase.from('trips').update({ is_deleted: false, updated_at: new Date().toISOString() }).eq('id', tripId);
        return true;
      } catch (e) {
        console.warn('Supabase restoreTrip error:');
      }
    }

    const all = getLocalStorage<DbTripRecord[]>(STORAGE_KEYS.TRIPS, []);
    const idx = all.findIndex((t) => t.id === tripId);
    if (idx !== -1) {
      all[idx].is_deleted = false;
      all[idx].updated_at = new Date().toISOString();
      setLocalStorage(STORAGE_KEYS.TRIPS, all);
      return true;
    }
    return false;
  },

  // -------------------------------------------------------
  // 7. SAVED DESTINATIONS BOOKMARKING
  // -------------------------------------------------------
  async getSavedDestinations(userId: string): Promise<DbSavedDestination[]> {
    if (IS_SUPABASE_CONFIGURED && supabase) {
      try {
        const { data, error } = await supabase
          .from('saved_destinations')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (!error && data) {
          return data as DbSavedDestination[];
        }
      } catch (e) {
        console.warn('Supabase getSavedDestinations error:');
      }
    }

    const all = getLocalStorage<DbSavedDestination[]>(STORAGE_KEYS.DESTINATIONS, []);
    return all.filter((d) => d.user_id === userId);
  },

  async toggleSaveDestination(userId: string, dest: {
    destination_id: string;
    destination_name: string;
    region?: string;
    image_url?: string;
    rating?: number;
    tags?: string[];
    description?: string;
  }): Promise<boolean> {
    const existing = await this.getSavedDestinations(userId);
    const isAlreadySaved = existing.some((d) => d.destination_id === dest.destination_id);

    if (IS_SUPABASE_CONFIGURED && supabase) {
      try {
        await profileSync;
        if (isAlreadySaved) {
          await supabase.from('saved_destinations').delete().eq('user_id', userId).eq('destination_id', dest.destination_id);
          return false;
        } else {
          await supabase.from('saved_destinations').insert({
            user_id: userId,
            destination_id: dest.destination_id,
            destination_name: dest.destination_name,
            region: dest.region,
            image_url: dest.image_url,
            rating: dest.rating,
            tags: dest.tags || [],
            description: dest.description,
          });
          return true;
        }
      } catch (e) {
        console.warn('Supabase toggleSaveDestination error:');
      }
    }

    const all = getLocalStorage<DbSavedDestination[]>(STORAGE_KEYS.DESTINATIONS, []);
    if (isAlreadySaved) {
      const filtered = all.filter((d) => !(d.user_id === userId && d.destination_id === dest.destination_id));
      setLocalStorage(STORAGE_KEYS.DESTINATIONS, filtered);
      return false;
    } else {
      const newBookmarked: DbSavedDestination = {
        id: `dest_${Date.now()}`,
        user_id: userId,
        destination_id: dest.destination_id,
        destination_name: dest.destination_name,
        region: dest.region,
        image_url: dest.image_url,
        rating: dest.rating,
        tags: dest.tags,
        description: dest.description,
        created_at: new Date().toISOString(),
      };
      all.unshift(newBookmarked);
      setLocalStorage(STORAGE_KEYS.DESTINATIONS, all);
      return true;
    }
  },

  // -------------------------------------------------------
  // 8. RECENT ACTIVITY (AUTOMATICALLY RECORD LATEST 10 VIEWS)
  // -------------------------------------------------------
  async recordRecentActivity(
    userId: string,
    activityType: 'viewed_trip' | 'generated_trip' | 'bookmarked_destination',
    tripId?: string,
    title: string = 'Trip Activity',
    details?: Record<string, any>
  ): Promise<void> {
    if (IS_SUPABASE_CONFIGURED && supabase) {
      try {
        await profileSync;
        await supabase.from('recent_activity').insert({
          user_id: userId,
          activity_type: activityType,
          trip_id: tripId,
          title,
          details,
        });
      } catch (e) {
        console.warn('Supabase recordRecentActivity error:');
      }
    }

    const all = getLocalStorage<DbRecentActivity[]>(STORAGE_KEYS.RECENT, []);
    const newAct: DbRecentActivity = {
      id: `act_${Date.now()}`,
      user_id: userId,
      activity_type: activityType,
      trip_id: tripId,
      title,
      details,
      created_at: new Date().toISOString(),
    };
    all.unshift(newAct);
    // Keep max 20 per user in local storage
    const userOnly = all.filter((a) => a.user_id === userId).slice(0, 20);
    const others = all.filter((a) => a.user_id !== userId);
    setLocalStorage(STORAGE_KEYS.RECENT, [...userOnly, ...others]);
  },

  async getRecentActivity(userId: string, limit = 10): Promise<DbRecentActivity[]> {
    if (IS_SUPABASE_CONFIGURED && supabase) {
      try {
        const { data, error } = await supabase
          .from('recent_activity')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(limit);

        if (!error && data) {
          return data as DbRecentActivity[];
        }
      } catch (e) {
        console.warn('Supabase getRecentActivity error:');
      }
    }

    const all = getLocalStorage<DbRecentActivity[]>(STORAGE_KEYS.RECENT, []);
    return all.filter((a) => a.user_id === userId).slice(0, limit);
  },

  // -------------------------------------------------------
  // 9. USER PREFERENCES
  // -------------------------------------------------------
  async getUserPreferences(userId: string): Promise<DbUserPreferences> {
    const defaultPrefs: DbUserPreferences = {
      user_id: userId,
      preferred_budget: 100000,
      favorite_travel_style: 'Friends & Family',
      preferred_transport: 'Private Car / Prado',
      dark_light_theme: 'dark',
      preferred_language: 'English',
    };

    if (IS_SUPABASE_CONFIGURED && supabase) {
      try {
        const { data, error } = await supabase.from('user_preferences').select('*').eq('user_id', userId).single();
        if (!error && data) {
          return data as DbUserPreferences;
        }
      } catch (e) {
        console.warn('Supabase getUserPreferences error:');
      }
    }

    const all = getLocalStorage<Record<string, DbUserPreferences>>(STORAGE_KEYS.PREFERENCES, {});
    return all[userId] || defaultPrefs;
  },

  async saveUserPreferences(userId: string, prefs: Partial<DbUserPreferences>): Promise<DbUserPreferences> {
    const current = await this.getUserPreferences(userId);
    const updated: DbUserPreferences = {
      ...current,
      ...prefs,
      user_id: userId,
      updated_at: new Date().toISOString(),
    };

    if (IS_SUPABASE_CONFIGURED && supabase) {
      try {
        await profileSync;
        await supabase.from('user_preferences').upsert(updated, { onConflict: 'user_id' });
      } catch (e) {
        console.warn('Supabase saveUserPreferences error:');
      }
    }

    const all = getLocalStorage<Record<string, DbUserPreferences>>(STORAGE_KEYS.PREFERENCES, {});
    all[userId] = updated;
    setLocalStorage(STORAGE_KEYS.PREFERENCES, all);
    return updated;
  },
};
