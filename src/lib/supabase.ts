
import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallback values to prevent runtime errors
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a Supabase client only if we have the required values
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Helper function to safely use Supabase
export const safeSupabaseCall = async (operation: (client: any) => Promise<any>) => {
  if (!supabase) {
    console.error('Supabase client not initialized. Missing environment variables.');
    return { data: null, error: new Error('Supabase client not initialized') };
  }
  
  try {
    return await operation(supabase);
  } catch (error) {
    console.error('Supabase operation failed:', error);
    return { data: null, error };
  }
};
