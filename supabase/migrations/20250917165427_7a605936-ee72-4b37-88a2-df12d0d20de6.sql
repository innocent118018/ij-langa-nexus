-- Fix security warnings by setting search_path on functions

-- Fix validate_clerkiq_access function
DROP FUNCTION IF EXISTS validate_clerkiq_access() CASCADE;
CREATE OR REPLACE FUNCTION validate_clerkiq_access()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Log access attempt
  INSERT INTO clerkiq_audit_logs (
    user_id, 
    action, 
    resource_type, 
    resource_id, 
    details,
    ip_address
  ) VALUES (
    auth.uid(),
    TG_OP,
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    jsonb_build_object(
      'old', to_jsonb(OLD),
      'new', to_jsonb(NEW)
    ),
    inet_client_addr()
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Re-create triggers for ClerkIQ tables with fixed function
CREATE TRIGGER clerkiq_credits_security_audit
  AFTER INSERT OR UPDATE OR DELETE ON clerkiq_credits
  FOR EACH ROW EXECUTE FUNCTION validate_clerkiq_access();

CREATE TRIGGER bank_statements_security_audit
  AFTER INSERT OR UPDATE OR DELETE ON bank_statements
  FOR EACH ROW EXECUTE FUNCTION validate_clerkiq_access();