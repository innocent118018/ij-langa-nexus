-- Fix remaining CIPC tables security policies
-- Check and update only tables that still need fixing

-- Fix CIPC companies table
DROP POLICY IF EXISTS "Admin can manage CIPC companies" ON public.cipc_companies;
DROP POLICY IF EXISTS "Only authorized admins can manage CIPC companies" ON public.cipc_companies;
CREATE POLICY "Admins only can manage CIPC companies" 
ON public.cipc_companies FOR ALL 
USING (public.get_current_user_role() = ANY(ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

-- Fix CIPC auditors table
DROP POLICY IF EXISTS "Admin can manage CIPC auditors" ON public.cipc_auditors;
DROP POLICY IF EXISTS "Only authorized admins can manage CIPC auditors" ON public.cipc_auditors;
CREATE POLICY "Admins only can manage CIPC auditors" 
ON public.cipc_auditors FOR ALL 
USING (public.get_current_user_role() = ANY(ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

-- Fix CIPC secretaries table
DROP POLICY IF EXISTS "Admin can manage CIPC secretaries" ON public.cipc_secretaries;
DROP POLICY IF EXISTS "Only authorized admins can manage CIPC secretaries" ON public.cipc_secretaries;
CREATE POLICY "Admins only can manage CIPC secretaries" 
ON public.cipc_secretaries FOR ALL 
USING (public.get_current_user_role() = ANY(ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

-- Fix CIPC addresses table
DROP POLICY IF EXISTS "Admin can manage CIPC addresses" ON public.cipc_company_addresses;
DROP POLICY IF EXISTS "Only authorized admins can manage CIPC addresses" ON public.cipc_company_addresses;
CREATE POLICY "Admins only can manage CIPC addresses" 
ON public.cipc_company_addresses FOR ALL 
USING (public.get_current_user_role() = ANY(ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

-- Fix CIPC capital table
DROP POLICY IF EXISTS "Admin can manage CIPC capital" ON public.cipc_capital;
DROP POLICY IF EXISTS "Only authorized admins can manage CIPC capital" ON public.cipc_capital;
CREATE POLICY "Admins only can manage CIPC capital" 
ON public.cipc_capital FOR ALL 
USING (public.get_current_user_role() = ANY(ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

-- Fix CIPC filing history table
DROP POLICY IF EXISTS "Admin can manage CIPC filing history" ON public.cipc_filing_history;
DROP POLICY IF EXISTS "Only authorized admins can manage CIPC filing history" ON public.cipc_filing_history;
CREATE POLICY "Admins only can manage CIPC filing history" 
ON public.cipc_filing_history FOR ALL 
USING (public.get_current_user_role() = ANY(ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

-- Fix CIPC history table
DROP POLICY IF EXISTS "Admin can manage CIPC history" ON public.cipc_history;
DROP POLICY IF EXISTS "Only authorized admins can manage CIPC history" ON public.cipc_history;
CREATE POLICY "Admins only can manage CIPC history" 
ON public.cipc_history FOR ALL 
USING (public.get_current_user_role() = ANY(ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

-- Fix CIPC API logs table
DROP POLICY IF EXISTS "Admin can manage CIPC API logs" ON public.cipc_api_logs;
DROP POLICY IF EXISTS "Only authorized admins can manage CIPC API logs" ON public.cipc_api_logs;
CREATE POLICY "Admins only can manage CIPC API logs" 
ON public.cipc_api_logs FOR ALL 
USING (public.get_current_user_role() = ANY(ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));