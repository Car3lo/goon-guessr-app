
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

// Use the correct Supabase client
export const supabase = createClient<Database>(
  "https://fitwuhhukbayfijdbfsx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpdHd1aGh1a2JheWZpamRiZnN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MDgxNDksImV4cCI6MjA2MDQ4NDE0OX0.aErDQCYPzjJGNVJvmKko4wMDP--HfSokhqUw1y36n28"
);

// Helper function to safely use Supabase
export const safeSupabaseCall = async (operation: (client: typeof supabase) => Promise<any>) => {
  try {
    return await operation(supabase);
  } catch (error) {
    console.error('Supabase operation failed:', error);
    return { data: null, error };
  }
};
