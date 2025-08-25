-- Fix critical security issues - Clean approach

-- Create security definer function to avoid infinite recursion
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.users WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- Enable RLS and add policies for compliance_records table
ALTER TABLE public.compliance_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own compliance records" 
ON public.compliance_records FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own compliance records" 
ON public.compliance_records FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own compliance records" 
ON public.compliance_records FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage compliance records" 
ON public.compliance_records FOR ALL 
USING (public.get_current_user_role() = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

-- Enable RLS and add policies for documents table  
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own documents" 
ON public.documents FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own documents" 
ON public.documents FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own documents" 
ON public.documents FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own documents" 
ON public.documents FOR DELETE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage documents" 
ON public.documents FOR ALL 
USING (public.get_current_user_role() = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

-- Enable RLS and add policies for notifications table
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications" 
ON public.notifications FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" 
ON public.notifications FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage notifications" 
ON public.notifications FOR ALL 
USING (public.get_current_user_role() = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant']));