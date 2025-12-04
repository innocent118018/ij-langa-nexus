-- ================================================
-- IJ Langa Dashboard Rebuild - Core Settings Tables
-- ================================================

-- Drop existing related RLS policies that might conflict
DROP POLICY IF EXISTS "Users can view customers" ON public.customers;
DROP POLICY IF EXISTS "System can manage guest cart items" ON public.cart_items;
DROP POLICY IF EXISTS "System can manage customer sessions" ON public.customer_sessions;

-- ================================================
-- Company Settings Table (single record per organization)
-- ================================================
CREATE TABLE IF NOT EXISTS public.company_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'IJ Langa Consulting (Pty) Ltd',
  registration_number text,
  tax_number text,
  csd_number text,
  address text,
  logo_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.company_settings ENABLE ROW LEVEL SECURITY;

-- Only admins can view/modify company settings
CREATE POLICY "Admins can manage company settings" ON public.company_settings
  FOR ALL TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- ================================================
-- Contact Settings Table
-- ================================================
CREATE TABLE IF NOT EXISTS public.contact_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  primary_email text,
  billing_email text,
  orders_email text,
  support_email text,
  phone text,
  whatsapp text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.contact_settings ENABLE ROW LEVEL SECURITY;

-- Only admins can view/modify contact settings
CREATE POLICY "Admins can manage contact settings" ON public.contact_settings
  FOR ALL TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- ================================================
-- Banking Details Table (sensitive - admin only)
-- ================================================
CREATE TABLE IF NOT EXISTS public.banking_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bank_name text,
  branch_name text,
  branch_code text,
  account_number text, -- Consider encryption
  account_type text DEFAULT 'Current Account',
  swift_code text,
  verified boolean DEFAULT false,
  last_verified_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.banking_details ENABLE ROW LEVEL SECURITY;

-- Only super_admin can view/modify banking details
CREATE POLICY "Super admins can manage banking details" ON public.banking_details
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'super_admin'))
  WITH CHECK (has_role(auth.uid(), 'super_admin'));

-- ================================================
-- Website Settings Table
-- ================================================
CREATE TABLE IF NOT EXISTS public.website_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  website_url text DEFAULT 'https://ijlanga.co.za',
  support_email text DEFAULT 'correspondence@ijlanga.co.za',
  social_facebook text,
  social_linkedin text,
  social_twitter text,
  maintenance_mode boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;

-- Only admins can manage website settings
CREATE POLICY "Admins can manage website settings" ON public.website_settings
  FOR ALL TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- ================================================
-- Settings Audit Log
-- ================================================
CREATE TABLE IF NOT EXISTS public.settings_audit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  action text NOT NULL,
  entity text NOT NULL,
  entity_id uuid,
  old_value jsonb,
  new_value jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.settings_audit ENABLE ROW LEVEL SECURITY;

-- Admins can view audit logs
CREATE POLICY "Admins can view settings audit" ON public.settings_audit
  FOR SELECT TO authenticated
  USING (is_admin(auth.uid()));

-- System can insert audit logs
CREATE POLICY "System can insert settings audit" ON public.settings_audit
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- ================================================
-- Seed default data
-- ================================================
INSERT INTO public.company_settings (name, registration_number, tax_number, csd_number, address)
VALUES (
  'IJ Langa Consulting (Pty) Ltd',
  '2020/754266/07',
  '4540304286',
  'MAAA0988528',
  '78 Tekatakho, Nelspruit, Mpumalanga, 2350, South Africa'
) ON CONFLICT DO NOTHING;

INSERT INTO public.contact_settings (primary_email, billing_email, orders_email, support_email, phone)
VALUES (
  'info@ijlanga.co.za',
  'billings@ijlanga.co.za',
  'orders@ijlanga.co.za',
  'correspondence@ijlanga.co.za',
  '+27 13 004 0620'
) ON CONFLICT DO NOTHING;

INSERT INTO public.banking_details (bank_name, branch_name, branch_code, account_number, account_type)
VALUES (
  'Standard Bank',
  'Ermelo',
  '2844',
  '10186883984',
  'Current Account'
) ON CONFLICT DO NOTHING;

INSERT INTO public.website_settings (website_url, support_email)
VALUES (
  'https://ijlanga.co.za',
  'correspondence@ijlanga.co.za'
) ON CONFLICT DO NOTHING;

-- ================================================
-- Update timestamp trigger for all settings tables
-- ================================================
CREATE OR REPLACE FUNCTION public.update_settings_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_company_settings_timestamp
  BEFORE UPDATE ON public.company_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_settings_timestamp();

CREATE TRIGGER update_contact_settings_timestamp
  BEFORE UPDATE ON public.contact_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_settings_timestamp();

CREATE TRIGGER update_banking_details_timestamp
  BEFORE UPDATE ON public.banking_details
  FOR EACH ROW EXECUTE FUNCTION public.update_settings_timestamp();

CREATE TRIGGER update_website_settings_timestamp
  BEFORE UPDATE ON public.website_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_settings_timestamp();