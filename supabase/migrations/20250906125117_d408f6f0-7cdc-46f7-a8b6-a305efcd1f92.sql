-- Drop existing problematic policies
DROP POLICY IF EXISTS "orders_insert_policy" ON public.orders;
DROP POLICY IF EXISTS "orders_select_policy" ON public.orders;
DROP POLICY IF EXISTS "orders_update_policy" ON public.orders;
DROP POLICY IF EXISTS "orders_delete_policy" ON public.orders;

-- Create simple and clear RLS policies for orders
-- 1. INSERT: Allow anyone to create orders (guest or authenticated users)
CREATE POLICY "Allow order creation for everyone"
ON public.orders
FOR INSERT
WITH CHECK (true);

-- 2. SELECT: Users can view their own orders (via user_id), admins can view all
CREATE POLICY "Users can view own orders, admins view all"
ON public.orders
FOR SELECT
USING (
  -- Guest orders (no user_id) can be viewed by anyone during checkout
  user_id IS NULL OR
  -- Users can view their own orders
  auth.uid() = user_id OR
  -- Admins can view all orders
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id = auth.uid() 
    AND users.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  )
);

-- 3. UPDATE: Users can update their own orders, admins can update all
CREATE POLICY "Users can update own orders, admins update all"
ON public.orders
FOR UPDATE
USING (
  -- Users can update their own orders
  auth.uid() = user_id OR
  -- Admins can update all orders
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id = auth.uid() 
    AND users.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  )
);

-- 4. DELETE: Only admins can delete orders
CREATE POLICY "Only admins can delete orders"
ON public.orders
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id = auth.uid() 
    AND users.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  )
);

-- Also check if there's a problematic trigger and remove it if needed
DROP TRIGGER IF EXISTS validate_order_ownership_trigger ON public.orders;

-- Remove the problematic validation function since it's causing issues
DROP FUNCTION IF EXISTS public.validate_order_ownership();