-- Fix critical security vulnerability: CIPC Directors table unrestricted access
-- Replace overly permissive policy with proper role-based access control

-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "Admin can manage CIPC directors" ON public.cipc_directors;

-- Create proper restrictive policy for CIPC directors access
-- Only admin, super_admin, accountant, and consultant roles can access sensitive director data
CREATE POLICY "Only authorized admins can manage CIPC directors" 
ON public.cipc_directors FOR ALL 
USING (public.get_current_user_role() = ANY(ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

-- Also apply the same fix to other CIPC tables with similar vulnerabilities
DROP POLICY IF EXISTS "Admin can manage CIPC companies" ON public.cipc_companies;
CREATE POLICY "Only authorized admins can manage CIPC companies" 
ON public.cipc_companies FOR ALL 
USING (public.get_current_user_role() = ANY(ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

DROP POLICY IF EXISTS "Admin can manage CIPC auditors" ON public.cipc_auditors;
CREATE POLICY "Only authorized admins can manage CIPC auditors" 
ON public.cipc_auditors FOR ALL 
USING (public.get_current_user_role() = ANY(ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

DROP POLICY IF EXISTS "Admin can manage CIPC secretaries" ON public.cipc_secretaries;
CREATE POLICY "Only authorized admins can manage CIPC secretaries" 
ON public.cipc_secretaries FOR ALL 
USING (public.get_current_user_role() = ANY(ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

DROP POLICY IF EXISTS "Admin can manage CIPC addresses" ON public.cipc_company_addresses;
CREATE POLICY "Only authorized admins can manage CIPC addresses" 
ON public.cipc_company_addresses FOR ALL 
USING (public.get_current_user_role() = ANY(ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

DROP POLICY IF EXISTS "Admin can manage CIPC capital" ON public.cipc_capital;
CREATE POLICY "Only authorized admins can manage CIPC capital" 
ON public.cipc_capital FOR ALL 
USING (public.get_current_user_role() = ANY(ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

DROP POLICY IF EXISTS "Admin can manage CIPC filing history" ON public.cipc_filing_history;
CREATE POLICY "Only authorized admins can manage CIPC filing history" 
ON public.cipc_filing_history FOR ALL 
USING (public.get_current_user_role() = ANY(ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

DROP POLICY IF EXISTS "Admin can manage CIPC history" ON public.cipc_history;
CREATE POLICY "Only authorized admins can manage CIPC history" 
ON public.cipc_history FOR ALL 
USING (public.get_current_user_role() = ANY(ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

DROP POLICY IF EXISTS "Admin can manage CIPC API logs" ON public.cipc_api_logs;
CREATE POLICY "Only authorized admins can manage CIPC API logs" 
ON public.cipc_api_logs FOR ALL 
USING (public.get_current_user_role() = ANY(ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));