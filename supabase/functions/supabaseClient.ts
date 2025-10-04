import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nnotjvqgejcmutukcwvt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ub3RqdnFnZWpjbXV0dWtjd3Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1ODU5NzYsImV4cCI6MjA3MDE2MTk3Nn0.0LtKdRvV54V17N5PYlWaY4Tn8i7fASEvLmMM0kGgoXE0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
