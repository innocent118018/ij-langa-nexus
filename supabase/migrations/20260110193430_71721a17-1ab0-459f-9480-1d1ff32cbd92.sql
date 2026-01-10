-- ===============================
-- PHASE 1: CORE FOUNDATION REBUILD
-- Multi-Tenant Commerce OS
-- ===============================

-- 1. Ensure uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Add role column to profiles if missing
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'role'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN role TEXT DEFAULT 'client';
  END IF;
END $$;

-- 3. Create order_items table for normalized orders (no JSON items)
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id),
  description TEXT,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price NUMERIC(12,2) NOT NULL DEFAULT 0,
  total NUMERIC(12,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Create current_company helper function
CREATE OR REPLACE FUNCTION public.current_company()
RETURNS UUID
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT company_id FROM public.profiles WHERE id = auth.uid();
$$;

-- 5. Create is_current_user_admin helper (checks both role and email domain)
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    JOIN auth.users u ON p.id = u.id
    WHERE p.id = auth.uid() 
    AND (
      p.role IN ('admin', 'super_admin', 'accountant', 'consultant')
      OR u.email ILIKE '%@ijlanga.co.za'
    )
  );
$$;

-- 6. Create is_current_user_reseller helper
CREATE OR REPLACE FUNCTION public.is_current_user_reseller()
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'reseller'
  );
$$;

-- 7. Create is_current_user_client helper
CREATE OR REPLACE FUNCTION public.is_current_user_client()
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('client', 'user')
  );
$$;

-- 8. Enable RLS on order_items
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- 9. RLS policies for order_items
CREATE POLICY "order_items_admin_all" ON public.order_items
FOR ALL USING (public.is_current_user_admin());

CREATE POLICY "order_items_client_read" ON public.order_items
FOR SELECT USING (
  order_id IN (
    SELECT id FROM public.orders WHERE company_id = public.current_company()
  )
);

CREATE POLICY "order_items_client_insert" ON public.order_items
FOR INSERT WITH CHECK (
  order_id IN (
    SELECT id FROM public.orders WHERE company_id = public.current_company()
  )
);

-- 10. Add missing indexes for performance
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON public.order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_company_id ON public.profiles(company_id);

-- 11. Create updated_at trigger for order_items
CREATE TRIGGER set_order_items_updated_at
  BEFORE UPDATE ON public.order_items
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_set_updated_at();