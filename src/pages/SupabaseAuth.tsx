//this is supabase auth credentials
import { createClient } from "@supabase/supabase-js";
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyYnhxcW9kdGRvbG9xc21ycm51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ3OTM3MjQsImV4cCI6MjAzMDM2OTcyNH0.0xNZhJfInJokgcyrLHFwKvGZYQ3RF72QCMGwIbAhv9Q'
const SUPABASE_URL = "https://erbxqqodtdoloqsmrrnu.supabase.co"

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Google Authentication
export const loginWithGoogleAuth = async () => {
    const google = supabase.auth.signInWithOAuth({ provider: 'google' })
    localStorage.setItem("accessToken", JSON.stringify(google));
}

// GitHub Athentication
export const loginWithGithubAuth = async () => {
    const github = supabase.auth.signInWithOAuth({ provider: 'github' })
    localStorage.setItem("accessToken", JSON.stringify(github));
}
