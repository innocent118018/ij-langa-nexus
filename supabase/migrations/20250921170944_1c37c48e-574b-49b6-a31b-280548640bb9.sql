-- Fix Security Definer View issue by recreating system_monitoring view without SECURITY DEFINER
DROP VIEW IF EXISTS public.system_monitoring;

-- Recreate the view without SECURITY DEFINER (use SECURITY INVOKER which is default)
CREATE VIEW public.system_monitoring AS
SELECT 
  'customers' as table_name,
  COUNT(*) as total_records,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '24 hours') as records_last_24h,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as records_last_7d
FROM public.customers
UNION ALL
SELECT 
  'sales_invoices' as table_name,
  COUNT(*) as total_records,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '24 hours') as records_last_24h,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as records_last_7d
FROM public.sales_invoices
UNION ALL
SELECT 
  'orders' as table_name,
  COUNT(*) as total_records,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '24 hours') as records_last_24h,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as records_last_7d
FROM public.orders;