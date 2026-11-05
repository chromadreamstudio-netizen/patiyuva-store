import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// إنشاء عميل Supabase الذي سنستخدمه في كل مكان في المتجر لجلب المنتجات
export const supabase = createClient(supabaseUrl, supabaseAnonKey);