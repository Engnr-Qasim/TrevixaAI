import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

function isPublicKey(key: string) {
  if (key.startsWith('sb_publishable_')) return true;
  try {
    const payload = key.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(payload)).role === 'anon';
  } catch {
    return false;
  }
}

export let supabase: SupabaseClient | null = null;
export const IS_SUPABASE_CONFIGURED = Boolean(url?.startsWith('https://') && publishableKey && isPublicKey(publishableKey));

export function connectSupabaseSession(getToken: () => Promise<string | null>) {
  if (!IS_SUPABASE_CONFIGURED) return;
  let active = true;
  const client = createClient(url!, publishableKey!, {
    accessToken: async () => {
      const token = active ? await getToken() : null;
      if (!active || !token) throw new Error('Sign in to access your travel data.');
      return token;
    },
  });
  supabase = client;
  return () => {
    active = false;
    if (supabase === client) supabase = null;
  };
}
