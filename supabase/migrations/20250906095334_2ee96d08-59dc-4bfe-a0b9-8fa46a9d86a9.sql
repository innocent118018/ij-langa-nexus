-- Fix function search path security warning
CREATE OR REPLACE FUNCTION validate_order_ownership()
RETURNS TRIGGER AS $$
BEGIN
  -- If user_id is provided, ensure it matches the authenticated user (for user orders)
  -- Guest orders (user_id is null) are allowed for checkout process
  IF NEW.user_id IS NOT NULL AND auth.uid() IS NOT NULL AND NEW.user_id != auth.uid() THEN
    -- Only allow admins to create orders for other users
    IF NOT EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = auth.uid() 
      AND users.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
    ) THEN
      RAISE EXCEPTION 'Cannot create orders for other users';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update get_current_user_role function to fix search path warning
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $function$
  SELECT role FROM public.users WHERE id = auth.uid();
$function$;