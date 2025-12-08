-- IJ Langa: Additional RLS Security Setup
-- Works alongside existing is_admin function

-- 1. Create support_tickets table if not exists
CREATE TABLE IF NOT EXISTS public.support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'open',
  priority text DEFAULT 'normal',
  assigned_to uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "support_admin_all" ON public.support_tickets;
DROP POLICY IF EXISTS "support_user_insert" ON public.support_tickets;
DROP POLICY IF EXISTS "support_user_read" ON public.support_tickets;

-- Admin full access to support tickets
CREATE POLICY "support_admin_all" ON public.support_tickets
  FOR ALL
  USING (public.is_admin(auth.uid()));

-- Users can create their own tickets
CREATE POLICY "support_user_insert" ON public.support_tickets
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can view their own tickets
CREATE POLICY "support_user_read" ON public.support_tickets
  FOR SELECT
  USING (auth.uid() = user_id);

-- 2. Create admin_config table for storing admin email allowlist
CREATE TABLE IF NOT EXISTS public.admin_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  config_key text UNIQUE NOT NULL,
  config_value jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.admin_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admin_config_super_admin" ON public.admin_config;

-- Only super_admins can manage admin config
CREATE POLICY "admin_config_super_admin" ON public.admin_config
  FOR ALL
  USING (public.has_role(auth.uid(), 'super_admin'))
  WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

-- Insert default admin emails configuration
INSERT INTO public.admin_config (config_key, config_value)
VALUES ('admin_emails', '["billings@ijlanga.co.za", "correspondence@ijlanga.co.za", "info@ijlanga.co.za", "nomusaprecious@ijlanga.co.za", "noreply@ijlanga.co.za", "orders@ijlanga.co.za", "admin@ijlanga.co.za", "ij.langa11@gmail.com"]'::jsonb)
ON CONFLICT (config_key) DO UPDATE SET config_value = EXCLUDED.config_value, updated_at = now();

-- 3. Create function to check if email is in admin allowlist
CREATE OR REPLACE FUNCTION public.is_admin_email(user_email text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_config
    WHERE config_key = 'admin_emails'
      AND config_value ? user_email
  );
$$;

-- 4. Create function to auto-assign admin role on user creation
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_email text;
  should_be_admin boolean;
BEGIN
  -- Get user email
  SELECT email INTO user_email FROM auth.users WHERE id = NEW.user_id;
  
  -- Check if should be admin
  should_be_admin := public.is_admin_email(user_email);
  
  -- Update role if admin email
  IF should_be_admin AND NEW.role NOT IN ('super_admin', 'admin') THEN
    NEW.role := 'admin';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Drop and recreate trigger
DROP TRIGGER IF EXISTS trigger_handle_new_user_role ON public.user_roles;
CREATE TRIGGER trigger_handle_new_user_role
  BEFORE INSERT ON public.user_roles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_role();

-- 5. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_support_tickets_user ON public.support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON public.support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_admin_config_key ON public.admin_config(config_key);

-- 6. Grant execute permission on security functions
GRANT EXECUTE ON FUNCTION public.is_admin_email TO authenticated;