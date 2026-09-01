import { createClient } from '@supabase/supabase-js';

// Supabase URL & Anon Key configuration from Environment Variables
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (!isSupabaseConfigured) {
  console.log("ℹ️ Supabase environment variables (SUPABASE_URL & SUPABASE_ANON_KEY) not set yet. Running in local memory DB mode with instant fallback.");
} else {
  console.log("⚡ Supabase database connection initialized successfully!");
}
