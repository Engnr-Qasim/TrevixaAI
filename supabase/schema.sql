-- =========================================================
-- TREVIXA SAAS APPLICATION SUPABASE DATABASE SCHEMA
-- Compatible with Clerk Authentication (User ID as String Primary Key)
-- =========================================================

-- 1. PROFILES TABLE
create table if not exists public.profiles (
  id text primary key, -- Clerk User ID (e.g., user_2xxx or usr_xxx)
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. USER PREFERENCES TABLE
create table if not exists public.user_preferences (
  user_id text primary key references public.profiles(id) on delete cascade,
  preferred_budget numeric default 100000,
  favorite_travel_style text default 'Friends & Family',
  preferred_transport text default 'Private Car',
  dark_light_theme text default 'dark',
  preferred_language text default 'English',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. TRIPS TABLE
create table if not exists public.trips (
  id uuid primary key default gen_random_uuid(),
  user_id text not null references public.profiles(id) on delete cascade,
  title text not null,
  destination text not null,
  province text,
  duration integer not null default 5,
  budget numeric default 0,
  travelers text,
  interests jsonb default '[]'::jsonb,
  preferences jsonb default '{}'::jsonb,
  ai_summary text,
  complete_itinerary_json jsonb not null,
  weather text,
  hotels jsonb default '[]'::jsonb,
  restaurants jsonb default '[]'::jsonb,
  packing_list jsonb default '[]'::jsonb,
  is_favorite boolean default false,
  is_deleted boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4. FAVORITE TRIPS TABLE
create table if not exists public.favorite_trips (
  id uuid primary key default gen_random_uuid(),
  user_id text not null references public.profiles(id) on delete cascade,
  trip_id uuid not null references public.trips(id) on delete cascade,
  created_at timestamptz default now(),
  constraint unique_user_favorite_trip unique(user_id, trip_id)
);

-- 5. SAVED DESTINATIONS TABLE
create table if not exists public.saved_destinations (
  id uuid primary key default gen_random_uuid(),
  user_id text not null references public.profiles(id) on delete cascade,
  destination_id text not null,
  destination_name text not null,
  region text,
  image_url text,
  rating numeric,
  tags jsonb default '[]'::jsonb,
  description text,
  created_at timestamptz default now(),
  constraint unique_user_destination unique(user_id, destination_id)
);

-- 6. RECENT ACTIVITY TABLE
create table if not exists public.recent_activity (
  id uuid primary key default gen_random_uuid(),
  user_id text not null references public.profiles(id) on delete cascade,
  activity_type text not null, -- 'viewed_trip', 'generated_trip', 'bookmarked_destination'
  trip_id uuid references public.trips(id) on delete cascade,
  title text not null,
  details jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- INDEXES FOR FAST QUERYING
create index if not exists idx_trips_user_id on public.trips(user_id);
create index if not exists idx_trips_created_at on public.trips(created_at desc);
create index if not exists idx_trips_is_favorite on public.trips(user_id, is_favorite);
create index if not exists idx_trips_is_deleted on public.trips(user_id, is_deleted);
create index if not exists idx_saved_dest_user_id on public.saved_destinations(user_id);
create index if not exists idx_recent_activity_user on public.recent_activity(user_id, created_at desc);

-- ROW LEVEL SECURITY (RLS) POLICIES
alter table public.profiles enable row level security;
alter table public.user_preferences enable row level security;
alter table public.trips enable row level security;
alter table public.favorite_trips enable row level security;
alter table public.saved_destinations enable row level security;
alter table public.recent_activity enable row level security;

-- PERMISSIVE RLS POLICIES FOR CLERK INTEGRATION
create policy "Allow user profiles access" on public.profiles for all using (true) with check (true);
create policy "Allow user preferences access" on public.user_preferences for all using (true) with check (true);
create policy "Allow user trips access" on public.trips for all using (true) with check (true);
create policy "Allow user favorites access" on public.favorite_trips for all using (true) with check (true);
create policy "Allow user saved destinations access" on public.saved_destinations for all using (true) with check (true);
create policy "Allow user recent activity access" on public.recent_activity for all using (true) with check (true);
