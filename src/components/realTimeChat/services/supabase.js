import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://okkdlbdnfaylakfbycta.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ra2RsYmRuZmF5bGFrZmJ5Y3RhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM1MjIzNTIsImV4cCI6MjAyOTA5ODM1Mn0.Zf4DnOscUxz5LxbulHsMMmtyXT7Eoapg50WVgAW_Nig";

export const supabaseUrl = SUPABASE_URL;
const supabaseKey = SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
