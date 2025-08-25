
-- Create stricter RLS policies to ensure users only see their own data
-- Drop existing policies that might be too permissive
DROP POLICY IF EXISTS "Users can view their own invoices" ON public.invoices;
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view their own documents" ON public.documents;
DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can view their own payments" ON public.payments;

-- Create user-specific policies for invoices (users can only see invoices linked to their customer record)
CREATE POLICY "Users can view invoices for their customer record" 
ON public.invoices FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.customers c 
    JOIN public.users u ON u.email = c.email 
    WHERE c.id = invoices.customer_id AND u.id = auth.uid()
  )
);

-- Ensure users can only see their own orders
CREATE POLICY "Users can view only their own orders" 
ON public.orders FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update only their own orders" 
ON public.orders FOR UPDATE 
USING (auth.uid() = user_id);

-- Ensure users can only see their own documents
CREATE POLICY "Users can view only their own documents" 
ON public.documents FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create only their own documents" 
ON public.documents FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update only their own documents" 
ON public.documents FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete only their own documents" 
ON public.documents FOR DELETE 
USING (auth.uid() = user_id);

-- Ensure users can only see their own notifications
CREATE POLICY "Users can view only their own notifications" 
ON public.notifications FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update only their own notifications" 
ON public.notifications FOR UPDATE 
USING (auth.uid() = user_id);

-- Ensure users can only see their own payments
CREATE POLICY "Users can view only their own payments" 
ON public.payments FOR SELECT 
USING (auth.uid() = user_id);

-- Create a more restrictive policy for customers - users can only see their own customer record
DROP POLICY IF EXISTS "Users can view customers" ON public.customers;
CREATE POLICY "Users can view their own customer record" 
ON public.customers FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.users u 
    WHERE u.email = customers.email AND u.id = auth.uid()
  )
);

-- Ensure admin access is properly restricted to specific email addresses
DROP POLICY IF EXISTS "Only authenticated admins can manage customers" ON public.customers;
CREATE POLICY "Only authenticated admins can manage customers" 
ON public.customers FOR ALL 
USING (
  (auth.jwt() ->> 'email') IN (
    'ij.langa11@gmail.com',
    'info@ijlanga.co.za',
    'orders@ijlanga.co.za',
    'billings@ijlanga.co.za',
    'correspondence@ijlanga.co.za'
  )
);

DROP POLICY IF EXISTS "Only authenticated admins can manage invoices" ON public.invoices;
CREATE POLICY "Only authenticated admins can manage invoices" 
ON public.invoices FOR ALL 
USING (
  (auth.jwt() ->> 'email') IN (
    'ij.langa11@gmail.com',
    'info@ijlanga.co.za',
    'orders@ijlanga.co.za',
    'billings@ijlanga.co.za',
    'correspondence@ijlanga.co.za'
  )
);

-- Add policy to ensure users can only update their own user profile
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;

CREATE POLICY "Users can view only their own profile" 
ON public.users FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update only their own profile" 
ON public.users FOR UPDATE 
USING (auth.uid() = id);

-- Ensure admins can view all profiles
CREATE POLICY "Admins can view all user profiles" 
ON public.users FOR SELECT 
USING (
  (auth.jwt() ->> 'email') IN (
    'ij.langa11@gmail.com',
    'info@ijlanga.co.za',
    'orders@ijlanga.co.za',
    'billings@ijlanga.co.za',
    'correspondence@ijlanga.co.za'
  )
);
