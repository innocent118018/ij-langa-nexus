-- Create audit table for monitoring all changes
CREATE TABLE IF NOT EXISTS public.system_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name TEXT NOT NULL,
  operation TEXT NOT NULL, -- INSERT, UPDATE, DELETE
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  user_id UUID,
  user_email TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on audit log
ALTER TABLE public.system_audit_log ENABLE ROW LEVEL SECURITY;

-- Create policy for audit log - only admins can view, system can insert
CREATE POLICY "Admins can view all audit logs" 
ON public.system_audit_log 
FOR SELECT 
USING (get_current_user_role() = ANY(ARRAY['admin', 'super_admin']));

CREATE POLICY "System can insert audit logs" 
ON public.system_audit_log 
FOR INSERT 
WITH CHECK (true);

-- Create function to log changes
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add unique constraints to prevent duplicates (only if they don't exist)
DO $$
BEGIN
    -- For customers, prevent duplicate emails globally
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'unique_customer_email'
    ) THEN
        ALTER TABLE public.customers ADD CONSTRAINT unique_customer_email 
        UNIQUE (email) DEFERRABLE INITIALLY DEFERRED;
    END IF;
    
    -- For sales_invoices, prevent duplicate invoice numbers per user
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'unique_invoice_number_per_user'
    ) THEN
        ALTER TABLE public.sales_invoices ADD CONSTRAINT unique_invoice_number_per_user 
        UNIQUE (invoice_number, user_id);
    END IF;
END $$;

-- Create triggers for important tables to log changes (only if they don't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'audit_customers_changes'
    ) THEN
        CREATE TRIGGER audit_customers_changes
          AFTER INSERT OR UPDATE OR DELETE ON public.customers
          FOR EACH ROW EXECUTE FUNCTION public.log_system_changes();
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'audit_sales_invoices_changes'
    ) THEN
        CREATE TRIGGER audit_sales_invoices_changes
          AFTER INSERT OR UPDATE OR DELETE ON public.sales_invoices
          FOR EACH ROW EXECUTE FUNCTION public.log_system_changes();
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'audit_users_changes'
    ) THEN
        CREATE TRIGGER audit_users_changes
          AFTER INSERT OR UPDATE OR DELETE ON public.users
          FOR EACH ROW EXECUTE FUNCTION public.log_system_changes();
    END IF;
END $$;

-- Create function to check for duplicate customers by email
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
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Create policy to prevent duplicate customer emails
DROP POLICY IF EXISTS "Prevent duplicate customer emails" ON public.customers;
CREATE POLICY "Prevent duplicate customer emails" 
ON public.customers 
FOR INSERT 
WITH CHECK (
  email IS NULL OR 
  email = '' OR 
  check_customer_duplicate(email)
);

-- Create function to check for duplicate invoices
CREATE OR REPLACE FUNCTION public.check_invoice_duplicate(invoice_num TEXT, invoice_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 FROM public.sales_invoices 
    WHERE invoice_number = invoice_num 
    AND user_id = invoice_user_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Policy to prevent duplicate invoice numbers per user
DROP POLICY IF EXISTS "Prevent duplicate invoice numbers per user" ON public.sales_invoices;
CREATE POLICY "Prevent duplicate invoice numbers per user" 
ON public.sales_invoices 
FOR INSERT 
WITH CHECK (check_invoice_duplicate(invoice_number, user_id));

-- Create monitoring view for system health
CREATE OR REPLACE VIEW public.system_monitoring AS
SELECT 
  'customers' as table_name,
  COUNT(*) as total_records,
  COUNT(DISTINCT email) as unique_emails,
  COUNT(*) - COUNT(DISTINCT COALESCE(email, id::text)) as potential_duplicates,
  NOW() as last_checked
FROM public.customers
WHERE email IS NOT NULL AND email != ''

UNION ALL

SELECT 
  'sales_invoices' as table_name,
  COUNT(*) as total_records,
  COUNT(DISTINCT user_id) as unique_users,
  COUNT(*) - COUNT(DISTINCT invoice_number || user_id::text) as potential_duplicates,
  NOW() as last_checked
FROM public.sales_invoices

UNION ALL

SELECT 
  'users' as table_name,
  COUNT(*) as total_records,
  COUNT(DISTINCT id) as unique_users,
  COUNT(*) - COUNT(DISTINCT email) as potential_duplicates,
  NOW() as last_checked
FROM public.users;

-- Create duplicate detection function for admins (fixed parameter name conflict)
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to clean up duplicate entries (admin only)
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
$$ LANGUAGE plpgsql SECURITY DEFINER;