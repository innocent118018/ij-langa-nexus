-- Create RLS policies for customers table
-- Allow administrators to view all customers
CREATE POLICY "Administrators can view all customers" 
ON customers 
FOR SELECT 
USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

-- Allow administrators to insert customers
CREATE POLICY "Administrators can create customers" 
ON customers 
FOR INSERT 
WITH CHECK (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

-- Allow administrators to update customers
CREATE POLICY "Administrators can update customers" 
ON customers 
FOR UPDATE 
USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

-- Allow administrators to delete customers
CREATE POLICY "Administrators can delete customers" 
ON customers 
FOR DELETE 
USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

-- Also allow public access for new user registrations (so users can become customers)
CREATE POLICY "Allow public user registration as customers" 
ON customers 
FOR INSERT 
WITH CHECK (true);

-- Allow users to view their own customer record if they have matching email
CREATE POLICY "Users can view their own customer record" 
ON customers 
FOR SELECT 
USING (email = auth.email());