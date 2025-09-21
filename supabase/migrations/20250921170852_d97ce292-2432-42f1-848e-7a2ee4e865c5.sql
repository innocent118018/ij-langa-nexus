-- Add user_id column to customers table
ALTER TABLE public.customers 
ADD COLUMN user_id UUID;

-- Update existing customers to have a default user_id (this should be updated manually for real data)
-- For now, we'll leave it NULL for existing records

-- Enable Row Level Security if not already enabled
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own customers" ON public.customers;
DROP POLICY IF EXISTS "Users can create their own customers" ON public.customers;
DROP POLICY IF EXISTS "Users can update their own customers" ON public.customers;
DROP POLICY IF EXISTS "Users can delete their own customers" ON public.customers;
DROP POLICY IF EXISTS "Admins can manage all customers" ON public.customers;

-- Create RLS policies
CREATE POLICY "Users can view their own customers" 
ON public.customers 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own customers" 
ON public.customers 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own customers" 
ON public.customers 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own customers" 
ON public.customers 
FOR DELETE 
USING (auth.uid() = user_id);

-- Admin policies
CREATE POLICY "Admins can manage all customers" 
ON public.customers 
FOR ALL 
USING (get_current_user_role() = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

-- Add index for better performance on user_id
CREATE INDEX IF NOT EXISTS idx_customers_user_id ON public.customers(user_id);