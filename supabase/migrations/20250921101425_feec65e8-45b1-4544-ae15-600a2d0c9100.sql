-- Fix function search path security warnings
-- Update functions to have proper SET search_path for security

-- Fix notify_order_created function
CREATE OR REPLACE FUNCTION public.notify_order_created()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  -- This will be handled by the application layer
  RETURN NEW;
END;
$function$;

-- Fix notify_contact_form_submitted function
CREATE OR REPLACE FUNCTION public.notify_contact_form_submitted()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  -- This will be handled by the application layer
  RETURN NEW;
END;
$function$;

-- Fix handle_new_contact function
CREATE OR REPLACE FUNCTION public.handle_new_contact()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.customer_contacts (user_id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', split_part(COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'), ' ', 1)),
    COALESCE(NEW.raw_user_meta_data->>'last_name', split_part(COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'), ' ', 2))
  );
  RETURN NEW;
END;
$function$;

-- Fix auto_cancel_expired_orders function
CREATE OR REPLACE FUNCTION public.auto_cancel_expired_orders()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  -- Cancel orders that are pending for more than 7 days
  UPDATE orders 
  SET status = 'cancelled',
      admin_notes = 'Auto-cancelled: Payment not received within 7 days',
      updated_at = now()
  WHERE status = 'pending' 
    AND created_at < (now() - INTERVAL '7 days');
END;
$function$;