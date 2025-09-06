-- Fix orders table RLS policies to allow guest orders
DROP POLICY IF EXISTS "orders_insert_policy" ON public.orders;

-- Create new insert policy that allows both authenticated users and guest orders
CREATE POLICY "orders_insert_allow_guest_and_user" 
ON public.orders 
FOR INSERT 
WITH CHECK (
  -- Allow if user is authenticated and user_id matches auth.uid()
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) 
  OR 
  -- Allow guest orders (user_id is null and no authentication required)
  (user_id IS NULL)
  OR
  -- Allow admins to create orders for anyone
  (EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id = auth.uid() 
    AND users.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  ))
);