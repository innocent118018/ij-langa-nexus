-- =====================================================
-- PHASE 1: Multi-Tenant Commerce - RLS Policies
-- =====================================================

-- 1. Helper function to get user's company
CREATE OR REPLACE FUNCTION public.get_user_company_id()
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT company_id FROM profiles WHERE id = auth.uid()
$$;

-- 2. Helper function to check if user is reseller for a company
CREATE OR REPLACE FUNCTION public.is_reseller_for_company(company_uuid uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM companies c
    JOIN resellers r ON r.id = c.reseller_id
    WHERE c.id = company_uuid AND r.user_id = auth.uid()
  )
$$;

-- 3. RLS Policies for shipments
CREATE POLICY "shipments_admin_all" ON shipments FOR ALL
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "shipments_client_select" ON shipments FOR SELECT
USING (company_id = public.get_user_company_id());

CREATE POLICY "shipments_client_all" ON shipments FOR ALL
USING (company_id = public.get_user_company_id())
WITH CHECK (company_id = public.get_user_company_id());

-- 4. RLS Policies for site_settings
CREATE POLICY "site_settings_admin_all" ON site_settings FOR ALL
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "site_settings_client_all" ON site_settings FOR ALL
USING (company_id = public.get_user_company_id())
WITH CHECK (company_id = public.get_user_company_id());

-- 5. RLS Policies for campaigns
CREATE POLICY "campaigns_admin_all" ON campaigns FOR ALL
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "campaigns_client_all" ON campaigns FOR ALL
USING (company_id = public.get_user_company_id())
WITH CHECK (company_id = public.get_user_company_id());

-- 6. RLS Policies for commissions
CREATE POLICY "commissions_admin_all" ON commissions FOR ALL
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "commissions_reseller_select" ON commissions FOR SELECT
USING (reseller_id IN (SELECT id FROM resellers WHERE user_id = auth.uid()));

-- 7. Update products RLS for multi-tenant
DROP POLICY IF EXISTS "Products are viewable by everyone" ON products;
DROP POLICY IF EXISTS "Admin can create products" ON products;
DROP POLICY IF EXISTS "Admin can update products" ON products;
DROP POLICY IF EXISTS "Admin can delete products" ON products;

CREATE POLICY "products_public_select" ON products FOR SELECT
USING (is_active = true);

CREATE POLICY "products_admin_all" ON products FOR ALL
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "products_client_all" ON products FOR ALL
USING (company_id = public.get_user_company_id())
WITH CHECK (company_id = public.get_user_company_id());

-- 8. Update orders RLS for multi-tenant
DROP POLICY IF EXISTS "Admins manage all orders" ON orders;
DROP POLICY IF EXISTS "Users see their orders" ON orders;

CREATE POLICY "orders_admin_all" ON orders FOR ALL
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "orders_client_all" ON orders FOR ALL
USING (company_id = public.get_user_company_id())
WITH CHECK (company_id = public.get_user_company_id());

CREATE POLICY "orders_user_select" ON orders FOR SELECT
USING (user_id = auth.uid());

-- 9. Companies RLS for resellers
DROP POLICY IF EXISTS "companies_reseller_select" ON companies;
CREATE POLICY "companies_reseller_select" ON companies FOR SELECT
USING (reseller_id IN (SELECT id FROM resellers WHERE user_id = auth.uid()));

-- 10. Trigger for updated_at
CREATE OR REPLACE FUNCTION public.trigger_set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_shipments_updated_at ON shipments;
CREATE TRIGGER set_shipments_updated_at
BEFORE UPDATE ON shipments FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

DROP TRIGGER IF EXISTS set_site_settings_updated_at ON site_settings;
CREATE TRIGGER set_site_settings_updated_at
BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

DROP TRIGGER IF EXISTS set_campaigns_updated_at ON campaigns;
CREATE TRIGGER set_campaigns_updated_at
BEFORE UPDATE ON campaigns FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();