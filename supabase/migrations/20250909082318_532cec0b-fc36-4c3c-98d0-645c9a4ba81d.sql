-- Add comprehensive dashboard policies for store functions and document management

-- Create RLS policies for products table (complete store functions)
CREATE POLICY "Admins can create products" 
ON public.products 
FOR INSERT 
TO authenticated
WITH CHECK (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

CREATE POLICY "Admins can update products" 
ON public.products 
FOR UPDATE 
TO authenticated
USING (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

CREATE POLICY "Admins can delete products" 
ON public.products 
FOR DELETE 
TO authenticated
USING (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

-- Enhanced customer creation and management policies
CREATE POLICY "Admins can create customers" 
ON public.customers 
FOR INSERT 
TO authenticated
WITH CHECK (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

CREATE POLICY "Users can create customer profile for themselves" 
ON public.customers 
FOR INSERT 
TO authenticated
WITH CHECK (
  email = (SELECT email FROM users WHERE id = auth.uid())
);

CREATE POLICY "Admins can update customers" 
ON public.customers 
FOR UPDATE 
TO authenticated
USING (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

-- Enhanced document policies for uploading and storing
CREATE POLICY "Admins can view all documents" 
ON public.documents 
FOR SELECT 
TO authenticated
USING (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

-- Service management policies for admins
CREATE POLICY "Admins can create services" 
ON public.services 
FOR INSERT 
TO authenticated
WITH CHECK (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

CREATE POLICY "Admins can update services" 
ON public.services 
FOR UPDATE 
TO authenticated
USING (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

CREATE POLICY "Admins can delete services" 
ON public.services 
FOR DELETE 
TO authenticated
USING (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

-- Invoice management policies
CREATE POLICY "Admins can create invoices" 
ON public.invoices 
FOR INSERT 
TO authenticated
WITH CHECK (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

CREATE POLICY "Admins can update invoices" 
ON public.invoices 
FOR UPDATE 
TO authenticated
USING (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

-- Payment management policies
CREATE POLICY "Admins can create payments" 
ON public.payments 
FOR INSERT 
TO authenticated
WITH CHECK (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

CREATE POLICY "Users can create their own payments" 
ON public.payments 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Order management policies (enhanced)
CREATE POLICY "Admins can manage order assignments" 
ON public.orders 
FOR UPDATE 
TO authenticated
USING (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

-- Contact form management
CREATE POLICY "Admins can update contact forms" 
ON public.contact_forms 
FOR UPDATE 
TO authenticated
USING (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

-- User management policies
CREATE POLICY "Admins can create users" 
ON public.users 
FOR INSERT 
TO authenticated
WITH CHECK (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text]));

CREATE POLICY "Admins can update any user" 
ON public.users 
FOR UPDATE 
TO authenticated
USING (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text]));

-- Notification policies
CREATE POLICY "Admins can create notifications for any user" 
ON public.notifications 
FOR INSERT 
TO authenticated
WITH CHECK (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

-- Support ticket policies (enhanced)
CREATE POLICY "Admins can assign tickets" 
ON public.support_tickets 
FOR UPDATE 
TO authenticated
USING (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

-- Message policies (enhanced)
CREATE POLICY "Admins can create messages to any user" 
ON public.messages 
FOR INSERT 
TO authenticated
WITH CHECK (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

-- Cart items policies for store functions
CREATE POLICY "Admins can view all cart items" 
ON public.cart_items 
FOR SELECT 
TO authenticated
USING (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

CREATE POLICY "System can manage guest cart items" 
ON public.cart_items 
FOR ALL 
TO authenticated
USING (user_id IS NULL OR auth.uid() = user_id OR get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

-- Order items policies for complete store functions
CREATE POLICY "Admins can create order items" 
ON public.order_items 
FOR INSERT 
TO authenticated
WITH CHECK (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

-- Document templates policies for admins
CREATE POLICY "Admins can create document templates" 
ON public.document_templates 
FOR INSERT 
TO authenticated
WITH CHECK (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

CREATE POLICY "Admins can update document templates" 
ON public.document_templates 
FOR UPDATE 
TO authenticated
USING (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

-- Generated documents policies
CREATE POLICY "Admins can create generated documents for any user" 
ON public.generated_documents 
FOR INSERT 
TO authenticated
WITH CHECK (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

-- Compliance records policies (enhanced)
CREATE POLICY "Admins can create compliance records for any user" 
ON public.compliance_records 
FOR INSERT 
TO authenticated
WITH CHECK (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

-- Compliance calendar policies (enhanced)
CREATE POLICY "Admins can create compliance calendar entries for any user" 
ON public.compliance_calendar 
FOR INSERT 
TO authenticated
WITH CHECK (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

-- Company entities policies (enhanced)
CREATE POLICY "Admins can create company entities for any user" 
ON public.company_entities 
FOR INSERT 
TO authenticated
WITH CHECK (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

-- Board meetings policies (enhanced)
CREATE POLICY "Admins can create board meetings for any company" 
ON public.board_meetings 
FOR INSERT 
TO authenticated
WITH CHECK (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

-- Audit logs policies (system can insert, admins can view all)
-- (Already exists, no additional policies needed)

-- Create function to get user's company entities for dashboard access
CREATE OR REPLACE FUNCTION public.get_user_companies(user_uuid uuid)
RETURNS TABLE (
  id uuid,
  company_name text,
  registration_number text,
  status text
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT ce.id, ce.company_name, ce.registration_number, ce.status
  FROM public.company_entities ce
  WHERE ce.user_id = user_uuid AND ce.status = 'active';
$$;

-- Create function to get user's recent activity for dashboard
CREATE OR REPLACE FUNCTION public.get_user_recent_activity(user_uuid uuid, limit_count integer DEFAULT 10)
RETURNS TABLE (
  activity_type text,
  description text,
  created_at timestamp with time zone,
  related_id uuid
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 'order' as activity_type, 
         'Order #' || o.id::text as description,
         o.created_at,
         o.id as related_id
  FROM public.orders o
  WHERE o.user_id = user_uuid
  
  UNION ALL
  
  SELECT 'document' as activity_type,
         'Document: ' || d.document_type as description,
         d.created_at,
         d.id as related_id
  FROM public.documents d
  WHERE d.user_id = user_uuid
  
  UNION ALL
  
  SELECT 'message' as activity_type,
         'Message: ' || m.subject as description,
         m.created_at,
         m.id as related_id
  FROM public.messages m
  WHERE m.recipient_id = user_uuid OR m.sender_id = user_uuid
  
  ORDER BY created_at DESC
  LIMIT limit_count;
$$;