-- Remove user policies and ensure only admin policies exist for sales_invoices
DROP POLICY IF EXISTS "Users can view own sales invoices" ON public.sales_invoices;
DROP POLICY IF EXISTS "Users can create own sales invoices" ON public.sales_invoices;
DROP POLICY IF EXISTS "Users can update own sales invoices" ON public.sales_invoices;