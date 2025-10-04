-- Temporarily disable RLS on orders table to allow guest orders
ALTER TABLE public.orders DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS 
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "allow_all_insert_orders" ON public.orders;
DROP POLICY IF EXISTS "allow_select_own_orders" ON public.orders;
DROP POLICY IF EXISTS "allow_update_own_orders" ON public.orders;
DROP POLICY IF EXISTS "admin_delete_orders" ON public.orders;

-- Create comprehensive RLS policies for orders

-- 1. INSERT Policy - Allow both authenticated users and guests to create orders
CREATE POLICY "orders_insert_policy" ON public.orders
FOR INSERT 
WITH CHECK (
  -- Allow if no authentication (guest checkout)
  auth.uid() IS NULL
  OR
  -- Allow if authenticated user creates order for themselves  
  (auth.uid() IS NOT NULL AND (user_id = auth.uid() OR user_id IS NULL))
  OR
  -- Allow admins to create orders for anyone
  (auth.uid() IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id = auth.uid() 
    AND users.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  ))
);

-- 2. SELECT Policy - Users see their orders, admins see all
CREATE POLICY "orders_select_policy" ON public.orders
FOR SELECT 
USING (
  -- Users can see their own orders
  (user_id IS NOT NULL AND auth.uid() = user_id)
  OR
  -- Admins can see all orders
  (EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id = auth.uid() 
    AND users.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  ))
);

-- 3. UPDATE Policy - Users update their orders, admins update any
CREATE POLICY "orders_update_policy" ON public.orders
FOR UPDATE 
USING (
  -- Users can update their own orders
  (user_id IS NOT NULL AND auth.uid() = user_id)
  OR
  -- Admins can update any order
  (EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id = auth.uid() 
    AND users.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  ))
);

-- 4. DELETE Policy - Only admins can delete orders
CREATE POLICY "orders_delete_policy" ON public.orders
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id = auth.uid() 
    AND users.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  )
);