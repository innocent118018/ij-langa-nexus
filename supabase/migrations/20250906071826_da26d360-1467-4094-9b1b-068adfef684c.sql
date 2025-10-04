-- Add RLS policies for CIPC tables that currently have RLS enabled but no policies

-- Enable RLS and add policies for cipc_companies
CREATE POLICY "Admins can manage CIPC companies" ON cipc_companies
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.role = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  )
);

-- Enable RLS and add policies for cipc_directors  
CREATE POLICY "Admins can manage CIPC directors" ON cipc_directors
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.role = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  )
);

-- Enable RLS and add policies for cipc_secretaries
CREATE POLICY "Admins can manage CIPC secretaries" ON cipc_secretaries
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.role = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  )
);

-- Enable RLS and add policies for cipc_auditors
CREATE POLICY "Admins can manage CIPC auditors" ON cipc_auditors
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.role = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  )
);

-- Enable RLS and add policies for cipc_capital
CREATE POLICY "Admins can manage CIPC capital" ON cipc_capital
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.role = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  )
);

-- Enable RLS and add policies for cipc_history
CREATE POLICY "Admins can manage CIPC history" ON cipc_history
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.role = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  )
);

-- Enable RLS and add policies for cipc_filing_history
CREATE POLICY "Admins can manage CIPC filing history" ON cipc_filing_history
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.role = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  )
);

-- Enable RLS and add policies for cipc_company_addresses
CREATE POLICY "Admins can manage CIPC company addresses" ON cipc_company_addresses
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.role = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  )
);

-- Enable RLS and add policies for cipc_api_logs
CREATE POLICY "Admins can manage CIPC API logs" ON cipc_api_logs
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.role = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
  )
);

-- Fix the function search path issue
ALTER FUNCTION public.handle_new_user() SET search_path = 'public';