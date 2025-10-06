import { createClient } from '@supabase/supabase-js';

const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPA_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON;
const SUPA_SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const supabase = createClient(SUPA_URL, SUPA_ANON);
export const supabaseAdmin = SUPA_SERVICE ? createClient(SUPA_URL, SUPA_SERVICE) : null;
