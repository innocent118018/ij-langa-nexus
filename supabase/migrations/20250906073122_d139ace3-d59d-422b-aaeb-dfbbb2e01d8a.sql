-- Drop the problematic policy and recreate it properly
DROP POLICY IF EXISTS "Allow order creation" ON public.orders;

-- Create a proper INSERT policy that allows both guest and authenticated users
CREATE POLICY "Allow order creation" ON public.orders
FOR INSERT 
TO public
WITH CHECK ((user_id IS NULL) OR (auth.uid() = user_id));