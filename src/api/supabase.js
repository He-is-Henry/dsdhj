import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://mhfzldjgiojowwrvefbu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oZnpsZGpnaW9qb3d3cnZlZmJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2MDU2NTAsImV4cCI6MjA4OTE4MTY1MH0.xNb8Zh7hlg0VWBUBO3KTon6-iYvcB4q6-IcQQWOWiLs";

export const supabase = createClient(supabaseUrl, supabaseKey);
