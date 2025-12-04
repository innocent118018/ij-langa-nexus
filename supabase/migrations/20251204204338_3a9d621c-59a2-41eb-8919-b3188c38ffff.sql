-- Fix PUBLIC_DATA_EXPOSURE: Drop overly permissive RLS policies

-- Drop permissive policy on customers table (allows anyone to read all customer data)
DROP POLICY IF EXISTS "Users can view customers" ON public.customers;

-- Drop permissive policy on cart_items table (allows anyone to do anything with cart items)
DROP POLICY IF EXISTS "System can manage guest cart items" ON public.cart_items;

-- Drop permissive policy on customer_sessions table (allows anyone to manage all sessions)
DROP POLICY IF EXISTS "System can manage customer sessions" ON public.customer_sessions;