-- =====================================================
-- PHASE 1: Multi-Tenant Commerce - Schema First
-- =====================================================

-- 1. Add company_id to profiles
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS company_id uuid,
  ADD COLUMN IF NOT EXISTS reseller_id uuid;

-- 2. Extend companies table for e-commerce
ALTER TABLE public.companies 
  ADD COLUMN IF NOT EXISTS plan_id uuid,
  ADD COLUMN IF NOT EXISTS ecommerce_enabled boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS reseller_id uuid,
  ADD COLUMN IF NOT EXISTS domain text,
  ADD COLUMN IF NOT EXISTS logo_url text,
  ADD COLUMN IF NOT EXISTS primary_color text DEFAULT '#0ea5a0',
  ADD COLUMN IF NOT EXISTS subscription_status text DEFAULT 'trial',
  ADD COLUMN IF NOT EXISTS trial_ends_at timestamptz DEFAULT (now() + interval '14 days');

-- 3. Add company_id to products for multi-tenant
ALTER TABLE public.products 
  ADD COLUMN IF NOT EXISTS company_id uuid,
  ADD COLUMN IF NOT EXISTS shipping_required boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS metadata jsonb DEFAULT '{}';

-- 4. Add company_id to orders for multi-tenant
ALTER TABLE public.orders 
  ADD COLUMN IF NOT EXISTS company_id uuid,
  ADD COLUMN IF NOT EXISTS customer_id uuid,
  ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS shipping_status text DEFAULT 'pending';

-- 5. Create shipments table
CREATE TABLE IF NOT EXISTS public.shipments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL,
  company_id uuid,
  courier text,
  tracking_number text,
  status text DEFAULT 'pending',
  shipped_at timestamptz,
  delivered_at timestamptz,
  shipping_address jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 6. Create site_settings table for no-code customization
CREATE TABLE IF NOT EXISTS public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL UNIQUE,
  theme jsonb DEFAULT '{"mode": "light", "primaryColor": "#0ea5a0"}',
  colors jsonb DEFAULT '{}',
  checkout_fields jsonb DEFAULT '["name", "email", "phone", "address"]',
  branding jsonb DEFAULT '{}',
  custom_css text,
  analytics_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 7. Create campaigns table for marketing
CREATE TABLE IF NOT EXISTS public.campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL,
  name text NOT NULL,
  type text NOT NULL,
  status text DEFAULT 'draft',
  content jsonb NOT NULL DEFAULT '{}',
  recipients jsonb DEFAULT '[]',
  scheduled_at timestamptz,
  sent_at timestamptz,
  stats jsonb DEFAULT '{"sent": 0, "opened": 0, "clicked": 0}',
  created_by uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 8. Create commissions table for reseller tracking
CREATE TABLE IF NOT EXISTS public.commissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reseller_id uuid NOT NULL,
  company_id uuid,
  order_id uuid,
  amount numeric(12,2) NOT NULL DEFAULT 0,
  percentage numeric(5,2) NOT NULL DEFAULT 10,
  status text DEFAULT 'pending',
  paid_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- 9. Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_company ON profiles(company_id);
CREATE INDEX IF NOT EXISTS idx_profiles_reseller ON profiles(reseller_id);
CREATE INDEX IF NOT EXISTS idx_products_company ON products(company_id);
CREATE INDEX IF NOT EXISTS idx_orders_company ON orders(company_id);
CREATE INDEX IF NOT EXISTS idx_shipments_order ON shipments(order_id);
CREATE INDEX IF NOT EXISTS idx_shipments_company ON shipments(company_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_company ON campaigns(company_id);
CREATE INDEX IF NOT EXISTS idx_commissions_reseller ON commissions(reseller_id);
CREATE INDEX IF NOT EXISTS idx_companies_reseller ON companies(reseller_id);

-- 10. Enable RLS on new tables
ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;