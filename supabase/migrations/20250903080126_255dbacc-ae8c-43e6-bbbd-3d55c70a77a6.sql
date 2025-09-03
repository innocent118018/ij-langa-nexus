-- Fix the function with CASCADE to handle dependencies
DROP FUNCTION IF EXISTS public.get_current_user_role() CASCADE;

-- Recreate the function with proper search path
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT role FROM public.users WHERE id = auth.uid();
$function$;

-- Recreate the dropped policies that depended on this function
CREATE POLICY IF NOT EXISTS "Admins can manage compliance records" ON public.compliance_records
  FOR ALL
  USING (public.get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

CREATE POLICY IF NOT EXISTS "Admins can manage documents" ON public.documents
  FOR ALL
  USING (public.get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

CREATE POLICY IF NOT EXISTS "Admins can manage notifications" ON public.notifications
  FOR ALL
  USING (public.get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

CREATE POLICY IF NOT EXISTS "Admins can manage products" ON public.products
  FOR ALL
  USING (public.get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));