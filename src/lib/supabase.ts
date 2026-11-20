import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const IS_SUPABASE_CONFIGURED = Boolean(
  SUPABASE_URL &&
    SUPABASE_ANON_KEY &&
    SUPABASE_URL.startsWith('https://') &&
    !SUPABASE_URL.includes('your-supabase-url')
);

export const supabase: SupabaseClient | null = IS_SUPABASE_CONFIGURED
  ? createClient(SUPABASE_URL as string, SUPABASE_ANON_KEY as string, {
      auth: {
        persistSession: false, // Session managed via Clerk Auth
        autoRefreshToken: false,
      },
    })
  : null;
