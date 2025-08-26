
-- First, let's create a function to get the current user's role (to avoid recursion issues)
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT role FROM public.users WHERE id = auth.uid();
$$;

-- Update users table to ensure proper structure
ALTER TABLE public.users 
  ALTER COLUMN role SET DEFAULT 'client',
  ALTER COLUMN id SET NOT NULL;

-- Ensure all data tables have proper foreign key relationships to users
-- Update orders table to link to users properly
ALTER TABLE public.orders 
  ALTER COLUMN user_id SET NOT NULL,
  ADD CONSTRAINT orders_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

-- Update invoices table to link to users via customers
-- First, ensure customers table has proper email linking
ALTER TABLE public.customers 
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES public.users(id) ON DELETE SET NULL;

-- Update existing customer records to link to users by email
UPDATE public.customers 
SET user_id = u.id 
FROM public.users u 
WHERE customers.email = u.email AND customers.user_id IS NULL;

-- Update invoices to have direct user relationship
ALTER TABLE public.invoices 
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES public.users(id) ON DELETE CASCADE;

-- Link existing invoices to users via customers
UPDATE public.invoices 
SET user_id = c.user_id 
FROM public.customers c 
WHERE invoices.customer_id = c.id AND invoices.user_id IS NULL;

-- Update payments table to ensure user relationship
ALTER TABLE public.payments 
  ALTER COLUMN user_id SET NOT NULL,
  ADD CONSTRAINT payments_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

-- Update documents table relationship
ALTER TABLE public.documents 
  ALTER COLUMN user_id SET NOT NULL,
  ADD CONSTRAINT documents_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

-- Update notifications table relationship  
ALTER TABLE public.notifications 
  ALTER COLUMN user_id SET NOT NULL,
  ADD CONSTRAINT notifications_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

-- Update compliance_records table relationship
ALTER TABLE public.compliance_records 
  ALTER COLUMN user_id SET NOT NULL,
  ADD CONSTRAINT compliance_records_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

-- Update cart_items table relationship
ALTER TABLE public.cart_items 
  ALTER COLUMN user_id SET NOT NULL,
  ADD CONSTRAINT cart_items_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

-- Now update RLS policies to use the secure function
-- Drop existing policies that might conflict
DROP POLICY IF EXISTS "Admins can view all user profiles" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Users can view only their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update only their own profile" ON public.users;

-- Create comprehensive user policies
CREATE POLICY "Users can view their own profile" 
  ON public.users FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" 
  ON public.users FOR SELECT 
  USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Users can update their own profile" 
  ON public.users FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Admins can manage all users" 
  ON public.users FOR ALL 
  USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin']));

-- Update invoices policies to use direct user relationship
DROP POLICY IF EXISTS "Only authenticated admins can manage invoices" ON public.invoices;
DROP POLICY IF EXISTS "Users can view invoices for their customer record" ON public.invoices;

CREATE POLICY "Users can view their own invoices" 
  ON public.invoices FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all invoices" 
  ON public.invoices FOR ALL 
  USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

-- Update orders policies
DROP POLICY IF EXISTS "Admins can manage all orders" ON public.orders;
DROP POLICY IF EXISTS "Users can create their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can update only their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can update their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view only their own orders" ON public.orders;

CREATE POLICY "Users can manage their own orders" 
  ON public.orders FOR ALL 
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all orders" 
  ON public.orders FOR ALL 
  USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

-- Update payments policies
DROP POLICY IF EXISTS "Admins can manage all payments" ON public.payments;
DROP POLICY IF EXISTS "Users can view only their own payments" ON public.payments;

CREATE POLICY "Users can view their own payments" 
  ON public.payments FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own payments" 
  ON public.payments FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all payments" 
  ON public.payments FOR ALL 
  USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

-- Update customers policies
DROP POLICY IF EXISTS "Only authenticated admins can manage customers" ON public.customers;
DROP POLICY IF EXISTS "Users can view their own customer record" ON public.customers;

CREATE POLICY "Users can view their linked customer record" 
  ON public.customers FOR SELECT 
  USING (auth.uid() = user_id OR auth.uid() IN (
    SELECT u.id FROM public.users u WHERE u.email = customers.email
  ));

CREATE POLICY "Admins can manage all customers" 
  ON public.customers FOR ALL 
  USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON public.invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_customers_user_id ON public.customers(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON public.documents(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
