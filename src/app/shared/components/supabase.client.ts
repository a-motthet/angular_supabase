import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oeuacquwdeypdcgthvwu.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ldWFjcXV3ZGV5cGRjZ3Rodnd1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjExNzgxMiwiZXhwIjoyMDYxNjkzODEyfQ.2hksigOmNIpihTOFuChBqxTwQYzwU7z6bVCJnDuXKMk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
