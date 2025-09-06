-- Drop existing policies and recreate them properly
DROP POLICY IF EXISTS "Allow order creation" ON public.orders;
DROP POLICY IF EXISTS "Admins can manage all orders" ON public.orders;
DROP POLICY IF EXISTS "Users can update only their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can update their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view their orders" ON public.orders;

-- Create comprehensive policies for orders table
-- Allow anyone to create orders (guest or authenticated)
CREATE POLICY "orders_insert_policy" ON public.orders
FOR INSERT 
TO public
WITH CHECK (true);

-- Allow users to view their own orders, admins can view all
CREATE POLICY "orders_select_policy" ON public.orders
FOR SELECT 
TO public
USING (
  (user_id IS NULL) OR 
  (auth.uid() = user_id) OR 
  (EXISTS ( SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text])))
);

-- Allow users to update their own orders, admins can update all
CREATE POLICY "orders_update_policy" ON public.orders
FOR UPDATE 
TO public
USING (
  (auth.uid() = user_id) OR 
  (EXISTS ( SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text])))
);

-- Allow admins to delete orders
CREATE POLICY "orders_delete_policy" ON public.orders
FOR DELETE 
TO public
USING (
  EXISTS ( SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]))
);