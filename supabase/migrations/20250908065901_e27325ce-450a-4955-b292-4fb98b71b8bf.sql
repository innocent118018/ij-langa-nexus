-- Create comprehensive secretarial software tables with proper RLS

-- Entity Management table
CREATE TABLE IF NOT EXISTS public.company_entities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  company_name TEXT NOT NULL,
  registration_number TEXT,
  incorporation_date DATE,
  business_address TEXT,
  postal_address TEXT,
  phone TEXT,
  email TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Directors table
CREATE TABLE IF NOT EXISTS public.company_directors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.company_entities(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  id_number TEXT,
  appointment_date DATE,
  resignation_date DATE,
  residential_address TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Shareholders table
CREATE TABLE IF NOT EXISTS public.company_shareholders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.company_entities(id) ON DELETE CASCADE,
  shareholder_name TEXT NOT NULL,
  id_number TEXT,
  share_percentage DECIMAL(5,2),
  share_class TEXT DEFAULT 'ordinary',
  certificate_number TEXT,
  acquisition_date DATE,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Compliance Calendar table
CREATE TABLE IF NOT EXISTS public.compliance_calendar (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  company_id UUID REFERENCES public.company_entities(id) ON DELETE CASCADE,
  compliance_type TEXT NOT NULL,
  due_date DATE NOT NULL,
  status TEXT DEFAULT 'pending',
  reminder_sent BOOLEAN DEFAULT false,
  completed_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Document Templates table
CREATE TABLE IF NOT EXISTS public.document_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_name TEXT NOT NULL,
  template_type TEXT NOT NULL,
  content TEXT,
  variables JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Generated Documents table
CREATE TABLE IF NOT EXISTS public.generated_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  company_id UUID REFERENCES public.company_entities(id) ON DELETE CASCADE,
  template_id UUID REFERENCES public.document_templates(id),
  document_name TEXT NOT NULL,
  document_type TEXT NOT NULL,
  content TEXT,
  file_path TEXT,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Meeting Management table
CREATE TABLE IF NOT EXISTS public.board_meetings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.company_entities(id) ON DELETE CASCADE,
  meeting_date TIMESTAMP WITH TIME ZONE NOT NULL,
  meeting_type TEXT NOT NULL,
  agenda TEXT,
  minutes TEXT,
  attendees JSONB,
  action_items JSONB,
  status TEXT DEFAULT 'scheduled',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Audit Trail table
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  table_name TEXT NOT NULL,
  record_id UUID NOT NULL,
  action TEXT NOT NULL,
  old_values JSONB,
  new_values JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.company_entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_directors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_shareholders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.board_meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for company_entities
CREATE POLICY "Users can manage their own companies" 
ON public.company_entities 
FOR ALL 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all companies" 
ON public.company_entities 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM users 
  WHERE users.id = auth.uid() 
  AND users.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
));

-- RLS Policies for company_directors
CREATE POLICY "Users can manage directors of their companies" 
ON public.company_directors 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM company_entities 
  WHERE company_entities.id = company_directors.company_id 
  AND company_entities.user_id = auth.uid()
));

CREATE POLICY "Admins can manage all directors" 
ON public.company_directors 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM users 
  WHERE users.id = auth.uid() 
  AND users.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
));

-- RLS Policies for company_shareholders
CREATE POLICY "Users can manage shareholders of their companies" 
ON public.company_shareholders 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM company_entities 
  WHERE company_entities.id = company_shareholders.company_id 
  AND company_entities.user_id = auth.uid()
));

CREATE POLICY "Admins can manage all shareholders" 
ON public.company_shareholders 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM users 
  WHERE users.id = auth.uid() 
  AND users.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
));

-- RLS Policies for compliance_calendar
CREATE POLICY "Users can manage their own compliance" 
ON public.compliance_calendar 
FOR ALL 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all compliance" 
ON public.compliance_calendar 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM users 
  WHERE users.id = auth.uid() 
  AND users.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
));

-- RLS Policies for document_templates (admin only)
CREATE POLICY "Admins can manage document templates" 
ON public.document_templates 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM users 
  WHERE users.id = auth.uid() 
  AND users.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
));

CREATE POLICY "Users can view active templates" 
ON public.document_templates 
FOR SELECT 
USING (is_active = true);

-- RLS Policies for generated_documents
CREATE POLICY "Users can manage their own generated documents" 
ON public.generated_documents 
FOR ALL 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all generated documents" 
ON public.generated_documents 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM users 
  WHERE users.id = auth.uid() 
  AND users.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
));

-- RLS Policies for board_meetings
CREATE POLICY "Users can manage meetings of their companies" 
ON public.board_meetings 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM company_entities 
  WHERE company_entities.id = board_meetings.company_id 
  AND company_entities.user_id = auth.uid()
));

CREATE POLICY "Admins can manage all meetings" 
ON public.board_meetings 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM users 
  WHERE users.id = auth.uid() 
  AND users.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
));

-- RLS Policies for audit_logs
CREATE POLICY "Users can view their own audit logs" 
ON public.audit_logs 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all audit logs" 
ON public.audit_logs 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM users 
  WHERE users.id = auth.uid() 
  AND users.role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
));

CREATE POLICY "System can insert audit logs" 
ON public.audit_logs 
FOR INSERT 
WITH CHECK (true);

-- Create triggers for updated_at columns
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_company_entities_updated_at
  BEFORE UPDATE ON public.company_entities
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_company_directors_updated_at
  BEFORE UPDATE ON public.company_directors
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_company_shareholders_updated_at
  BEFORE UPDATE ON public.company_shareholders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_compliance_calendar_updated_at
  BEFORE UPDATE ON public.compliance_calendar
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_document_templates_updated_at
  BEFORE UPDATE ON public.document_templates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_generated_documents_updated_at
  BEFORE UPDATE ON public.generated_documents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_board_meetings_updated_at
  BEFORE UPDATE ON public.board_meetings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();