import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://jqehisgixmsaotezfyhx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZWhpc2dpeG1zYW90ZXpmeWh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4NjY0MjgsImV4cCI6MjA2ODQ0MjQyOH0.Nrk7pUVcVoaN78k0C5LCv9vm2CppDjl56htVXFaf0F0";

export const supabase = createClient(supabaseUrl, supabaseKey);
