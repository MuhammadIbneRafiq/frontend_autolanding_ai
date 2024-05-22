//this is supabase auth credentials
import { createClient } from "@supabase/supabase-js";

// put these up into

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ra2RsYmRuZmF5bGFrZmJ5Y3RhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM1MjIzNTIsImV4cCI6MjAyOTA5ODM1Mn0.Zf4DnOscUxz5LxbulHsMMmtyXT7Eoapg50WVgAW_Nig";
const SUPABASE_URL = "https://okkdlbdnfaylakfbycta.supabase.co";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Google Authentication
export const loginWithGoogleAuth = async () => {
  const google = supabase.auth.signInWithOAuth({ provider: "google" });
  localStorage.setItem("accessToken", JSON.stringify(google));
  console.log("gauth from supabase:", JSON.stringify(google));
};

// // GitHub Athentication
// export const loginWithGithubAuth = async () => {
//     const github = supabase.auth.signInWithOAuth({ provider: 'github' })
//     localStorage.setItem("accessToken", JSON.stringify(github));
// }
