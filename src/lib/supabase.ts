import { createClient } from '@supabase/supabase-js';
import type { Guest } from '../types/wedding';

// Read from Vite environment variables or localStorage (allows live config in admin)
const getSupabaseConfig = () => {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const localUrl = localStorage.getItem('wedding_supabase_url');
  const localKey = localStorage.getItem('wedding_supabase_anon_key');

  const url = localUrl || envUrl || '';
  const key = localKey || envKey || '';

  return { url, key, isConfigured: Boolean(url && key) };
};

export const { url, key, isConfigured } = getSupabaseConfig();

export const supabase = isConfigured
  ? createClient(url, key)
  : null;

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

    return (data || []).map((row: any) => ({
      id: row.id,
      code: row.code,
      name: row.name,
      phone: row.phone,
      passes: row.passes || 1,
      confirmedPasses: row.confirmed_passes || 0,
      status: row.status || 'pending',
      dietaryPreference: row.dietary_preference || 'standard',
      dietaryNotes: row.dietary_notes || '',
      notes: row.notes || '',
      updatedAt: row.updated_at,
    }));
  } catch (err) {
    console.error('Exception fetching from Supabase:', err);
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
        dietary_preference: guest.dietaryPreference,
        dietary_notes: guest.dietaryNotes,
        notes: guest.notes,
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

export const insertGuestInDb = async (guest: Omit<Guest, 'id'>): Promise<Guest | null> => {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('guests')
      .insert([
        {
          code: guest.code.toUpperCase().trim(),
          name: guest.name.trim(),
          phone: guest.phone || '',
          passes: guest.passes,
          confirmed_passes: guest.confirmedPasses,
          status: guest.status,
          dietary_preference: guest.dietaryPreference || 'standard',
          dietary_notes: guest.dietaryNotes || '',
          notes: guest.notes || '',
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error adding guest in Supabase:', error);
      return null;
    }

    return {
      id: data.id,
      code: data.code,
      name: data.name,
      phone: data.phone,
      passes: data.passes,
      confirmedPasses: data.confirmed_passes,
      status: data.status,
      dietaryPreference: data.dietary_preference,
      dietaryNotes: data.dietary_notes,
      notes: data.notes,
      updatedAt: data.updated_at,
    };
  } catch (err) {
    console.error('Exception adding guest to Supabase:', err);
    return null;
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
