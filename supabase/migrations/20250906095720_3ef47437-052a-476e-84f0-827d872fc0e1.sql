-- Update RLS policies to give administrators full access to all data

-- Update users table policies to allow admins to see all users
DROP POLICY IF EXISTS "users_select_own" ON public.users;
CREATE POLICY "users_select_policy" ON public.users
FOR SELECT
USING (
  -- Users can see their own data OR admins can see all data
  auth.uid() = id 
  OR EXISTS (
    SELECT 1 FROM public.users admin_check
    WHERE admin_check.id = auth.uid() 
    AND admin_check.role = ANY(ARRAY['admin', 'super_admin'])
  )
);

-- Update customers table policies to allow admins to see all customers
DROP POLICY IF EXISTS "Only authenticated admins can manage customers" ON public.customers;
DROP POLICY IF EXISTS "Users can view their own customer record" ON public.customers;

-- New comprehensive customers policies
CREATE POLICY "customers_select_policy" ON public.customers
FOR SELECT
USING (
  -- Users can see their customer record OR admins can see all
  EXISTS (
    SELECT 1 FROM public.users u
    WHERE u.email = customers.email 
    AND u.id = auth.uid()
  )
  OR EXISTS (
    SELECT 1 FROM public.users admin_check
    WHERE admin_check.id = auth.uid() 
    AND admin_check.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  )
);

CREATE POLICY "customers_admin_manage" ON public.customers
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.users admin_check
    WHERE admin_check.id = auth.uid() 
    AND admin_check.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  )
);

-- Update invoices table policies to allow admins to see all invoices
DROP POLICY IF EXISTS "Only authenticated admins can manage invoices" ON public.invoices;
DROP POLICY IF EXISTS "Users can view invoices for their customer record" ON public.invoices;

-- New comprehensive invoices policies
CREATE POLICY "invoices_select_policy" ON public.invoices
FOR SELECT
USING (
  -- Users can see invoices for their customer record OR admins can see all
  EXISTS (
    SELECT 1 FROM (customers c JOIN users u ON (u.email = c.email))
    WHERE c.id = invoices.customer_id 
    AND u.id = auth.uid()
  )
  OR EXISTS (
    SELECT 1 FROM public.users admin_check
    WHERE admin_check.id = auth.uid() 
    AND admin_check.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  )
);

CREATE POLICY "invoices_admin_manage" ON public.invoices
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.users admin_check
    WHERE admin_check.id = auth.uid() 
    AND admin_check.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  )
);

-- Update payments table to allow admins to see all payments
CREATE POLICY "payments_select_policy" ON public.payments
FOR SELECT
USING (
  -- Users can see their own payments OR admins can see all
  auth.uid() = user_id
  OR EXISTS (
    SELECT 1 FROM public.users admin_check
    WHERE admin_check.id = auth.uid() 
    AND admin_check.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  )
);

-- Ensure notifications policies allow admins to see all notifications
DROP POLICY IF EXISTS "Users can view only their own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can view own notifications" ON public.notifications;

CREATE POLICY "notifications_select_policy" ON public.notifications
FOR SELECT
USING (
  -- Users can see their own notifications OR admins can see all
  auth.uid() = user_id
  OR EXISTS (
    SELECT 1 FROM public.users admin_check
    WHERE admin_check.id = auth.uid() 
    AND admin_check.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  )
);

-- Update contact forms policy to allow admins to see all contact forms
DROP POLICY IF EXISTS "Only authenticated admins can view contact forms" ON public.contact_forms;

CREATE POLICY "contact_forms_admin_view" ON public.contact_forms
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.users admin_check
    WHERE admin_check.id = auth.uid() 
    AND admin_check.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  )
);

CREATE POLICY "contact_forms_admin_manage" ON public.contact_forms
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.users admin_check
    WHERE admin_check.id = auth.uid() 
    AND admin_check.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  )
);

-- Add comments for clarity
COMMENT ON POLICY "users_select_policy" ON public.users IS 'Users can view their own profile, admins can view all users';
COMMENT ON POLICY "customers_select_policy" ON public.customers IS 'Users can view their customer record, admins can view all customers';
COMMENT ON POLICY "invoices_select_policy" ON public.invoices IS 'Users can view their invoices, admins can view all invoices';
COMMENT ON POLICY "payments_select_policy" ON public.payments IS 'Users can view their payments, admins can view all payments';
COMMENT ON POLICY "notifications_select_policy" ON public.notifications IS 'Users can view their notifications, admins can view all notifications';