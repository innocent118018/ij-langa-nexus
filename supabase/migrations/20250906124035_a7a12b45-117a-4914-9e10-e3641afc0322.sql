-- Drop all existing orders policies to start fresh
DROP POLICY IF EXISTS "orders_insert_allow_guest_and_user" ON public.orders;
DROP POLICY IF EXISTS "orders_select_secure" ON public.orders;
DROP POLICY IF EXISTS "orders_update_policy" ON public.orders;
DROP POLICY IF EXISTS "orders_delete_policy" ON public.orders;

-- Create simple, permissive policies for orders table
-- Allow anyone to insert orders (both authenticated users and guests)
CREATE POLICY "allow_all_insert_orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);

-- Allow users to see their own orders, guests can't see orders, admins see all
CREATE POLICY "allow_select_own_orders" 
ON public.orders 
FOR SELECT 
USING (
  (user_id IS NOT NULL AND auth.uid() = user_id) 
  OR 
  (EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id = auth.uid() 
    AND users.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  ))
);

-- Allow users to update their own orders, admins can update all
CREATE POLICY "allow_update_own_orders" 
ON public.orders 
FOR UPDATE 
USING (
  (user_id IS NOT NULL AND auth.uid() = user_id) 
  OR 
  (EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id = auth.uid() 
    AND users.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  ))
);

-- Only admins can delete orders
CREATE POLICY "admin_delete_orders" 
ON public.orders 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id = auth.uid() 
    AND users.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  )
);