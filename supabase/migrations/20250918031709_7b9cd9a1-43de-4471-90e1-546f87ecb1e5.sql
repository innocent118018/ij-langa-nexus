-- Fix function security warnings by setting search_path
ALTER FUNCTION public.get_dashboard_metrics(uuid) SET search_path = public;
ALTER FUNCTION public.get_user_profile_with_activity(uuid) SET search_path = public;
ALTER FUNCTION public.get_current_user_role() SET search_path = public;