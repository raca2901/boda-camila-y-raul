import { createClient } from '@supabase/supabase-js';
import type { Guest } from '../types/wedding';
import { generateUUID } from '../types/wedding';

// Default public Supabase project URL and publishable key (safe for frontend clients)
const DEFAULT_SUPABASE_URL = 'https://cbxftdqqdgkgyheezbps.supabase.co';
const DEFAULT_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_Uym8J1t1cSmHVbi-aCMQEQ_TjbsHc4I';

// Read from Vite environment variables, localStorage override, or built-in project defaults
const getSupabaseConfig = () => {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const localUrl = localStorage.getItem('wedding_supabase_url');
  const localKey = localStorage.getItem('wedding_supabase_anon_key');

  const url = localUrl || envUrl || DEFAULT_SUPABASE_URL;
  const key = localKey || envKey || DEFAULT_SUPABASE_PUBLISHABLE_KEY;

  return { url, key, isConfigured: Boolean(url && key) };
};

export const { url, key, isConfigured } = getSupabaseConfig();

export const supabase = isConfigured ? createClient(url, key) : null;

export const saveSupabaseCredentials = (supabaseUrl: string, supabaseAnonKey: string) => {
  localStorage.setItem('wedding_supabase_url', supabaseUrl.trim());
  localStorage.setItem('wedding_supabase_anon_key', supabaseAnonKey.trim());
  window.location.reload();
};

export const clearSupabaseCredentials = () => {
  localStorage.removeItem('wedding_supabase_url');
  localStorage.removeItem('wedding_supabase_anon_key');
  window.location.reload();
};

// Map raw Supabase DB record to Guest interface
const mapRowToGuest = (row: Record<string, unknown>): Guest => ({
  id: String(row.id),
  code: String(row.code || ''),
  name: String(row.name || ''),
  phone: typeof row.phone === 'string' ? row.phone : '',
  passes: typeof row.passes === 'number' ? row.passes : 1,
  confirmedPasses: typeof row.confirmed_passes === 'number' ? row.confirmed_passes : 0,
  status: (row.status as Guest['status']) || 'pending',
  dietaryPreference: (row.dietary_preference as Guest['dietaryPreference']) || 'standard',
  dietaryNotes: typeof row.dietary_notes === 'string' ? row.dietary_notes : '',
  notes: typeof row.notes === 'string' ? row.notes : '',
  updatedAt: typeof row.updated_at === 'string' ? row.updated_at : undefined,
});

const mapGuestToRow = (guest: Omit<Guest, 'id'> & { id?: string }) => {
  const guestId = guest.id || generateUUID();
  return {
    id: guestId,
    code: (guest.code || guestId.slice(0, 8)).toUpperCase().trim(),
    name: guest.name.trim(),
    phone: guest.phone || '',
    passes: Math.max(1, guest.passes || 1),
    confirmed_passes: Math.max(0, guest.confirmedPasses || 0),
    status: guest.status || 'pending',
    dietary_preference: guest.dietaryPreference || 'standard',
    dietary_notes: guest.dietaryNotes || '',
    notes: guest.notes || '',
    updated_at: guest.updatedAt || new Date().toISOString(),
  };
};

// Supabase helper functions
export const fetchGuestsFromDb = async (): Promise<Guest[] | null> => {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('guests')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.warn('Error fetching guests from Supabase:', error.message);
      return null;
    }

    return (data || []).map((row) => mapRowToGuest(row as Record<string, unknown>));
  } catch (err) {
    console.error('Exception fetching from Supabase:', err);
    return null;
  }
};

// Fetch single guest by UUID or Code
export const fetchGuestByUuidOrCode = async (identifier: string): Promise<Guest | null> => {
  if (!supabase || !identifier) return null;
  const cleanId = identifier.trim();

  try {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(cleanId);
    if (isUuid) {
      const { data, error } = await supabase
        .from('guests')
        .select('*')
        .eq('id', cleanId)
        .maybeSingle();

      if (!error && data) {
        return mapRowToGuest(data as Record<string, unknown>);
      }
    }

    const { data: codeData, error: codeErr } = await supabase
      .from('guests')
      .select('*')
      .ilike('code', cleanId)
      .maybeSingle();

    if (!codeErr && codeData) {
      return mapRowToGuest(codeData as Record<string, unknown>);
    }

    return null;
  } catch (err) {
    console.error('Exception finding guest in Supabase:', err);
    return null;
  }
};

export const updateGuestRsvpInDb = async (guest: Guest): Promise<boolean> => {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from('guests')
      .update({
        status: guest.status,
        confirmed_passes: guest.confirmedPasses,
        dietary_preference: guest.dietaryPreference || 'standard',
        dietary_notes: guest.dietaryNotes || '',
        notes: guest.notes || '',
        updated_at: new Date().toISOString(),
      })
      .eq('id', guest.id);

    if (error) {
      console.error('Error updating guest in Supabase:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Exception updating guest in Supabase:', err);
    return false;
  }
};

export const insertGuestInDb = async (
  guest: Omit<Guest, 'id'> & { id?: string }
): Promise<Guest | null> => {
  if (!supabase) return null;
  try {
    const row = mapGuestToRow(guest);
    const { data, error } = await supabase
      .from('guests')
      .upsert([row], { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      console.error('Error adding guest in Supabase:', error);
      return null;
    }

    return mapRowToGuest(data as Record<string, unknown>);
  } catch (err) {
    console.error('Exception adding guest to Supabase:', err);
    return null;
  }
};

export const upsertGuestsInDb = async (guestsToSync: Guest[]): Promise<boolean> => {
  if (!supabase || guestsToSync.length === 0) return true;
  try {
    const rows = guestsToSync.map((g) => mapGuestToRow(g));
    const { error } = await supabase
      .from('guests')
      .upsert(rows, { onConflict: 'id' });

    if (error) {
      console.error('Error syncing local guests to Supabase:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Exception syncing local guests to Supabase:', err);
    return false;
  }
};

export const deleteGuestInDb = async (id: string): Promise<boolean> => {
  if (!supabase) return false;
  try {
    const { error } = await supabase.from('guests').delete().eq('id', id);
    return !error;
  } catch (err) {
    console.error('Exception deleting guest:', err);
    return false;
  }
};
