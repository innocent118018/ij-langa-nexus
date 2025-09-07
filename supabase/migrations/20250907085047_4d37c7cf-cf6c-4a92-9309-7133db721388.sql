-- Fix RLS policies to allow order creation for authenticated users and guests
-- Update orders table policies to allow proper order creation

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Allow order creation for everyone" ON orders;
DROP POLICY IF EXISTS "Users can view own orders, admins view all" ON orders;
DROP POLICY IF EXISTS "Users can update own orders, admins update all" ON orders;
DROP POLICY IF EXISTS "Only admins can delete orders" ON orders;

-- Create comprehensive RLS policies for orders
-- Allow anyone to create orders (both authenticated users and guests)
CREATE POLICY "Anyone can create orders" 
ON orders 
FOR INSERT 
WITH CHECK (true);

-- Allow users to view their own orders, and admins to view all
CREATE POLICY "Users can view own orders or admins view all" 
ON orders 
FOR SELECT 
USING (
  user_id IS NULL OR 
  auth.uid() = user_id OR 
  (EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  ))
);

-- Allow users to update their own orders, admins can update all
CREATE POLICY "Users can update own orders or admins update all" 
ON orders 
FOR UPDATE 
USING (
  auth.uid() = user_id OR 
  (EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  ))
);

-- Only admins can delete orders
CREATE POLICY "Only admins can delete orders" 
ON orders 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  )
);

-- Fix order_items policies to allow creation when orders are created
DROP POLICY IF EXISTS "System can create order items" ON order_items;
DROP POLICY IF EXISTS "Users can view their own order items" ON order_items;
DROP POLICY IF EXISTS "Admins can manage all order items" ON order_items;

-- Allow order items creation for both system and users
CREATE POLICY "Anyone can create order items" 
ON order_items 
FOR INSERT 
WITH CHECK (true);

-- Allow users to view their order items
CREATE POLICY "Users can view own order items or admins view all" 
ON order_items 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id 
    AND (
      orders.user_id IS NULL OR 
      orders.user_id = auth.uid() OR
      (EXISTS (
        SELECT 1 FROM users 
        WHERE users.id = auth.uid() 
        AND users.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
      ))
    )
  )
);

-- Allow order items updates for admins and order owners
CREATE POLICY "Order owners and admins can update order items" 
ON order_items 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id 
    AND (
      orders.user_id = auth.uid() OR
      (EXISTS (
        SELECT 1 FROM users 
        WHERE users.id = auth.uid() 
        AND users.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
      ))
    )
  )
);

-- Only admins can delete order items
CREATE POLICY "Only admins can delete order items" 
ON order_items 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  )
);

-- Fix cart_items policies to allow guest cart functionality
DROP POLICY IF EXISTS "Users can manage their own cart items" ON cart_items;

-- Allow cart management for both authenticated users and guests (using session-based storage)
CREATE POLICY "Users can manage own cart items" 
ON cart_items 
FOR ALL 
USING (auth.uid() = user_id OR user_id IS NULL);

-- Ensure services are accessible to everyone for browsing
DROP POLICY IF EXISTS "services_select_active" ON services;
CREATE POLICY "Anyone can view active services" 
ON services 
FOR SELECT 
USING (is_active = true);

-- Allow contact form submissions from anyone
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON contact_forms;
CREATE POLICY "Anyone can submit contact forms" 
ON contact_forms 
FOR INSERT 
WITH CHECK (true);

-- Update create-order edge function policy to make it public
-- This is handled in supabase/config.toml by setting verify_jwt = false for create-order function