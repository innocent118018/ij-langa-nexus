-- Fix critical security issues with multiple tables lacking RLS policies

-- Enable RLS and add policies for compliance_records table
ALTER TABLE public.compliance_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own compliance records" 
ON public.compliance_records 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own compliance records" 
ON public.compliance_records 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own compliance records" 
ON public.compliance_records 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all compliance records" 
ON public.compliance_records 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.users 
  WHERE users.id = auth.uid() 
  AND users.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
));

-- Enable RLS and add policies for documents table
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own documents" 
ON public.documents 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own documents" 
ON public.documents 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own documents" 
ON public.documents 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own documents" 
ON public.documents 
FOR DELETE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all documents" 
ON public.documents 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.users 
  WHERE users.id = auth.uid() 
  AND users.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
));

-- Enable RLS and add policies for notifications table
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications" 
ON public.notifications 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" 
ON public.notifications 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all notifications" 
ON public.notifications 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.users 
  WHERE users.id = auth.uid() 
  AND users.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
));

-- Fix the infinite recursion issue in users table policies by creating a security definer function
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.users WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Update existing users policies to use the security definer function
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;

CREATE POLICY "Users can view their own profile" 
ON public.users 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.users 
FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" 
ON public.users 
FOR SELECT 
USING (public.get_current_user_role() = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

-- Update other tables to use the security definer function to avoid recursion
DROP POLICY IF EXISTS "Admins can manage all orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can manage services" ON public.services;
DROP POLICY IF EXISTS "Admins can manage all payments" ON public.payments;

CREATE POLICY "Admins can manage all orders" 
ON public.orders 
FOR ALL 
USING (public.get_current_user_role() = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Admins can manage services" 
ON public.services 
FOR ALL 
USING (public.get_current_user_role() = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Admins can manage all payments" 
ON public.payments 
FOR ALL 
USING (public.get_current_user_role() = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

-- Update compliance_records and documents policies to use security definer function
DROP POLICY IF EXISTS "Admins can manage all compliance records" ON public.compliance_records;
DROP POLICY IF EXISTS "Admins can manage all documents" ON public.compliance_records;
DROP POLICY IF EXISTS "Admins can manage all notifications" ON public.notifications;

CREATE POLICY "Admins can manage all compliance records" 
ON public.compliance_records 
FOR ALL 
USING (public.get_current_user_role() = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Admins can manage all documents" 
ON public.documents 
FOR ALL 
USING (public.get_current_user_role() = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Admins can manage all notifications" 
ON public.notifications 
FOR ALL 
USING (public.get_current_user_role() = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant']));