-- Add client_id column to service_contracts table
ALTER TABLE public.service_contracts 
ADD COLUMN IF NOT EXISTS client_id uuid REFERENCES public.contract_clients(id) ON DELETE SET NULL;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_service_contracts_client_id ON public.service_contracts(client_id);

-- Update RLS policies for service_contracts to allow users to view their contracts
DROP POLICY IF EXISTS "Users can view their own contracts" ON public.service_contracts;
CREATE POLICY "Users can view their own contracts" 
ON public.service_contracts 
FOR SELECT 
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create their own contracts" ON public.service_contracts;
CREATE POLICY "Users can create their own contracts" 
ON public.service_contracts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all contracts" ON public.service_contracts;
CREATE POLICY "Admins can view all contracts" 
ON public.service_contracts 
FOR ALL 
USING (get_current_user_role() = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

-- Update contract_clients policies
DROP POLICY IF EXISTS "Users can update own client records" ON public.contract_clients;
CREATE POLICY "Users can update own client records" 
ON public.contract_clients 
FOR UPDATE 
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can manage all clients" ON public.contract_clients;
CREATE POLICY "Admins can manage all clients" 
ON public.contract_clients 
FOR ALL 
USING (get_current_user_role() = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

-- Update contract_documents policies
DROP POLICY IF EXISTS "Users can update own documents" ON public.contract_documents;
CREATE POLICY "Users can update own documents" 
ON public.contract_documents 
FOR UPDATE 
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own documents" ON public.contract_documents;
CREATE POLICY "Users can delete own documents" 
ON public.contract_documents 
FOR DELETE 
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can manage all documents" ON public.contract_documents;
CREATE POLICY "Admins can manage all documents" 
ON public.contract_documents 
FOR ALL 
USING (get_current_user_role() = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant']));