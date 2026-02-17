import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://qrktrmjvqudyataiqair.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_dIurI9vBj4jy-4b9CdkdNw_9JkexcQ8";

export const supabase = createClient(supabaseUrl, supabaseKey);
