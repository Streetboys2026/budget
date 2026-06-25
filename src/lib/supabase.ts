import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Chanda = {
  id: string;
  donor_name: string;
  amount: number;
  date: string;
  created_at: string;
};

export type Expense = {
  id: string;
  description: string;
  amount: number;
  date: string;
  created_at: string;
};

export type Comment = {
  id: string;
  name: string;
  comment: string;
  created_at: string;
};
