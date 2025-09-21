-- Fix security issues by setting proper search paths and updating functions

-- Update functions to have proper search path
CREATE OR REPLACE FUNCTION public.log_system_changes()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.system_audit_log (
    table_name,
    operation,
    record_id,
    old_values,
    new_values,
    user_id,
    user_email,
    ip_address
  ) VALUES (
    TG_TABLE_NAME,
    TG_OP,
    COALESCE(NEW.id, OLD.id),
    CASE WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD) ELSE NULL END,
    CASE WHEN TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN to_jsonb(NEW) ELSE NULL END,
    auth.uid(),
    auth.email(),
    inet_client_addr()
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update duplicate check functions with proper search path
CREATE OR REPLACE FUNCTION public.check_customer_duplicate(customer_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  IF customer_email IS NULL OR customer_email = '' THEN
    RETURN true; -- Allow null/empty emails
  END IF;
  
  RETURN NOT EXISTS (
    SELECT 1 FROM public.customers 
    WHERE email = customer_email
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

CREATE OR REPLACE FUNCTION public.check_invoice_duplicate(invoice_num TEXT, invoice_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 FROM public.sales_invoices 
    WHERE invoice_number = invoice_num 
    AND user_id = invoice_user_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

-- Update admin functions with proper search path
CREATE OR REPLACE FUNCTION public.detect_duplicates(target_table TEXT DEFAULT NULL)
RETURNS TABLE(
  table_name TEXT,
  duplicate_field TEXT,
  duplicate_value TEXT,
  record_count BIGINT,
  record_ids UUID[]
) AS $$
BEGIN
  -- Only allow admins to run this
  IF get_current_user_role() != ANY(ARRAY['admin', 'super_admin']) THEN
    RAISE EXCEPTION 'Access denied. Admin privileges required.';
  END IF;
  
  -- Check customers for duplicate emails
  IF target_table IS NULL OR target_table = 'customers' THEN
    RETURN QUERY
    SELECT 
      'customers'::TEXT,
      'email'::TEXT,
      c.email::TEXT,
      COUNT(*)::BIGINT,
      ARRAY_AGG(c.id)::UUID[]
    FROM public.customers c
    WHERE c.email IS NOT NULL AND c.email != ''
    GROUP BY c.email
    HAVING COUNT(*) > 1;
  END IF;
  
  -- Check sales_invoices for duplicate invoice numbers per user
  IF target_table IS NULL OR target_table = 'sales_invoices' THEN
    RETURN QUERY
    SELECT 
      'sales_invoices'::TEXT,
      'invoice_number'::TEXT,
      si.invoice_number::TEXT,
      COUNT(*)::BIGINT,
      ARRAY_AGG(si.id)::UUID[]
    FROM public.sales_invoices si
    GROUP BY si.invoice_number, si.user_id
    HAVING COUNT(*) > 1;
  END IF;
  
  -- Check users for duplicate emails
  IF target_table IS NULL OR target_table = 'users' THEN
    RETURN QUERY
    SELECT 
      'users'::TEXT,
      'email'::TEXT,
      u.email::TEXT,
      COUNT(*)::BIGINT,
      ARRAY_AGG(u.id)::UUID[]
    FROM public.users u
    WHERE u.email IS NOT NULL AND u.email != ''
    GROUP BY u.email
    HAVING COUNT(*) > 1;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.cleanup_duplicates(target_table TEXT)
RETURNS TABLE(cleaned_count INTEGER) AS $$
DECLARE
  result INTEGER := 0;
BEGIN
  -- Only allow admins to run this
  IF get_current_user_role() != ANY(ARRAY['admin', 'super_admin']) THEN
    RAISE EXCEPTION 'Access denied. Admin privileges required.';
  END IF;
  
  -- Clean up duplicate customers (keep the first one by created_at)
  IF target_table = 'customers' THEN
    WITH duplicates AS (
      SELECT id, ROW_NUMBER() OVER (
        PARTITION BY email 
        ORDER BY created_at ASC
      ) as rn
      FROM public.customers 
      WHERE email IS NOT NULL AND email != ''
    )
    DELETE FROM public.customers 
    WHERE id IN (
      SELECT id FROM duplicates WHERE rn > 1
    );
    
    GET DIAGNOSTICS result = ROW_COUNT;
  END IF;
  
  -- Clean up duplicate sales invoices (keep the first one by created_at)
  IF target_table = 'sales_invoices' THEN
    WITH duplicates AS (
      SELECT id, ROW_NUMBER() OVER (
        PARTITION BY invoice_number, user_id 
        ORDER BY created_at ASC
      ) as rn
      FROM public.sales_invoices
    )
    DELETE FROM public.sales_invoices 
    WHERE id IN (
      SELECT id FROM duplicates WHERE rn > 1
    );
    
    GET DIAGNOSTICS result = ROW_COUNT;
  END IF;
  
  RETURN QUERY SELECT result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;