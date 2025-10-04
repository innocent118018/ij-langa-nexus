-- Update the orders table RLS policy to allow guest checkout
DROP POLICY IF EXISTS "Users can create their own orders" ON orders;

-- Create new policy that allows guest checkout and authenticated user orders
CREATE POLICY "Allow order creation" ON orders
FOR INSERT 
WITH CHECK (
  -- Allow if no user_id (guest checkout) 
  user_id IS NULL 
  OR 
  -- Allow if user_id matches authenticated user
  auth.uid() = user_id
);

-- Also ensure the RLS policy for selecting orders works with guest checkout
DROP POLICY IF EXISTS "Users can view only their own orders" ON orders;

CREATE POLICY "Users can view their orders" ON orders
FOR SELECT 
USING (
  -- Allow if user is authenticated and owns the order
  (auth.uid() = user_id)
  OR
  -- Allow admins to view all orders
  (EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.role = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  ))
);