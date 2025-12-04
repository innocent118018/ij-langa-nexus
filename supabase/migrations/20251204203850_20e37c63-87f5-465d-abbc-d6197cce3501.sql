-- Fix PUBLIC_DATA_EXPOSURE: Drop overly permissive RLS policy on customer_accounts
-- The policy "Customer accounts are viewable by authenticated users for selec" uses TRUE condition

DROP POLICY IF EXISTS "Customer accounts are viewable by authenticated users for selec" ON public.customer_accounts;