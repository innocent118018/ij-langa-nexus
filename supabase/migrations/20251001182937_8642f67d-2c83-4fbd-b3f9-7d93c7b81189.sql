-- Create monthly compliance packages table
CREATE TABLE IF NOT EXISTS public.monthly_compliance_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_name TEXT NOT NULL,
  package_tier TEXT NOT NULL, -- base, core, premium, basic, lite, focus, active, bold, unleash, pulse, nurture
  price NUMERIC NOT NULL,
  description TEXT,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create service contracts table
CREATE TABLE IF NOT EXISTS public.service_contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  package_id UUID REFERENCES public.monthly_compliance_packages(id),
  contract_number TEXT UNIQUE NOT NULL,
  contract_status TEXT DEFAULT 'pending', -- pending, signed, active, terminated
  contract_text TEXT NOT NULL,
  signed_at TIMESTAMP WITH TIME ZONE,
  signature_ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create contract documents table for uploads
CREATE TABLE IF NOT EXISTS public.contract_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID REFERENCES public.service_contracts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL, -- selfie_with_id, id_copy, proof_of_address
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create service applications table
CREATE TABLE IF NOT EXISTS public.service_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID REFERENCES public.service_contracts(id),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  contact_number TEXT NOT NULL,
  business_name TEXT,
  industry TEXT,
  country TEXT DEFAULT 'South Africa',
  city TEXT,
  is_owner_director BOOLEAN,
  operating_duration TEXT,
  estimated_revenue TEXT,
  tax_compliant BOOLEAN,
  main_challenge TEXT,
  selected_package TEXT,
  terms_accepted BOOLEAN DEFAULT false,
  application_status TEXT DEFAULT 'submitted',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.monthly_compliance_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contract_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_applications ENABLE ROW LEVEL SECURITY;

-- Policies for monthly_compliance_packages
CREATE POLICY "Anyone can view active packages"
  ON public.monthly_compliance_packages FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage packages"
  ON public.monthly_compliance_packages FOR ALL
  USING (get_current_user_role() = ANY(ARRAY['admin', 'super_admin']));

-- Policies for service_contracts
CREATE POLICY "Users can view own contracts"
  ON public.service_contracts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own contracts"
  ON public.service_contracts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pending contracts"
  ON public.service_contracts FOR UPDATE
  USING (auth.uid() = user_id AND contract_status = 'pending');

CREATE POLICY "Admins can view all contracts"
  ON public.service_contracts FOR SELECT
  USING (get_current_user_role() = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

-- Policies for contract_documents
CREATE POLICY "Users can view own documents"
  ON public.contract_documents FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upload own documents"
  ON public.contract_documents FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all documents"
  ON public.contract_documents FOR SELECT
  USING (get_current_user_role() = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

-- Policies for service_applications
CREATE POLICY "Users can view own applications"
  ON public.service_applications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own applications"
  ON public.service_applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all applications"
  ON public.service_applications FOR SELECT
  USING (get_current_user_role() = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Admins can update applications"
  ON public.service_applications FOR UPDATE
  USING (get_current_user_role() = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

-- Function to generate contract number
CREATE OR REPLACE FUNCTION generate_contract_number()
RETURNS TEXT AS $$
DECLARE
  next_number INTEGER;
  contract_num TEXT;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(contract_number FROM 5) AS INTEGER)), 0) + 1
  INTO next_number
  FROM public.service_contracts
  WHERE contract_number LIKE 'CNT-%';
  
  contract_num := 'CNT-' || LPAD(next_number::TEXT, 6, '0');
  RETURN contract_num;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert monthly compliance packages
INSERT INTO public.monthly_compliance_packages (package_name, package_tier, price, description, features) VALUES
('Base - Business Assistant', 'base', 4600, 'Our Base Business Assistant monthly accounting package is designed for businesses that are not VAT-registered.', 
  '[
    "Qualified Professional Accountant (SA) assigned as dedicated account manager",
    "Xero accounting software subscription",
    "Hubdoc - all financial documents in one place, automatically",
    "Monthly processing and reconciliations directly from bank statements",
    "Annual Financial Statements",
    "All tax submissions & reminders (Income Tax, Provisional Tax, VAT, Withholding Tax)",
    "Monthly payroll processing with SARS, Department of Labour and Compensation Commissioner submissions",
    "Standard monthly reporting pack (Executive summary, Cash summary, P&L, Balance Sheet, Aged Receivables, Aged Payables)",
    "Business support for all accounting, tax and business queries",
    "Quarterly review meeting"
  ]'::jsonb),

('Core - Business Leader', 'core', 6850, 'Enhanced monthly accounting package with comprehensive processing from source documents.', 
  '[
    "Qualified Professional Accountant (SA) assigned as dedicated account manager",
    "Xero accounting software subscription",
    "Hubdoc - all financial documents in one place, automatically",
    "Monthly processing directly from supplier and customer invoices and source documents",
    "Annual Financial Statements",
    "All tax submissions & reminders (Income Tax, Provisional Tax, VAT, Withholding Tax)",
    "Monthly payroll processing with SARS, Department of Labour and Compensation Commissioner submissions",
    "Standard monthly reporting pack (Executive summary, Cash summary, P&L, Balance Sheet, Aged Receivables, Aged Payables)",
    "Business support for all accounting, tax and business queries",
    "Quarterly review meeting"
  ]'::jsonb),

('Premium - Business Champion', 'premium', 12500, 'Premium monthly accounting package with daily/weekly payroll processing.', 
  '[
    "Qualified Professional Accountant (SA) assigned as dedicated account manager",
    "Xero accounting software subscription",
    "Hubdoc - all financial documents in one place, automatically",
    "Monthly processing directly from supplier and customer invoices and source documents",
    "Annual Financial Statements",
    "All tax submissions & reminders (Income Tax, Provisional Tax, VAT, Withholding Tax)",
    "Daily and/or weekly payroll processing with SARS, Department of Labour and Compensation Commissioner submissions",
    "Standard monthly reporting pack (Executive summary, Cash summary, P&L, Balance Sheet, Aged Receivables, Aged Payables)",
    "Business support for all accounting, tax and business queries",
    "Quarterly review meeting"
  ]'::jsonb),

('Basic', 'basic', 660, 'Up to 30 transactions per month with essential services.',
  '[
    "Up to 30 transactions per month & Receipt Bank",
    "Weekly reconciliation",
    "Paperless Payables",
    "Automatic debtor reminders",
    "Payroll for up to 3 employees"
  ]'::jsonb),

('Lite', 'lite', 900, 'Up to 60 transactions per month with expanded features.',
  '[
    "Up to 60 transactions per month & Receipt Bank",
    "Weekly reconciliation",
    "Paperless Payables",
    "Automatic debtor reminders",
    "Payroll for up to 5 employees"
  ]'::jsonb),

('Focus', 'focus', 1200, 'Up to 90 transactions per month for growing businesses.',
  '[
    "Up to 90 transactions per month & Receipt Bank",
    "Weekly reconciliation",
    "Paperless Payables",
    "Automatic debtor reminders",
    "Payroll for up to 7 employees"
  ]'::jsonb),

('Active', 'active', 1500, 'Up to 120 transactions with daily reconciliation.',
  '[
    "Up to 120 transactions per month & Receipt Bank",
    "Daily reconciliation",
    "Paperless Payables",
    "Automatic debtor reminders",
    "Payroll for up to 10 employees"
  ]'::jsonb),

('Bold', 'bold', 2460, 'Up to 180 transactions with comprehensive support.',
  '[
    "Up to 180 transactions per month & Receipt Bank",
    "Daily reconciliation",
    "Paperless Payables",
    "Automatic debtor reminders",
    "Payroll for up to 15 employees"
  ]'::jsonb),

('Nurture', 'nurture', 3000, 'Complete compliance and advisory package.',
  '[
    "Annual Financial Statements",
    "Income Tax Returns",
    "Provisional Tax Returns",
    "Bi-annual IRP5 reconciliation",
    "Monthly EMP201s",
    "Monthly UIF submission",
    "COIDA Return",
    "VAT Returns",
    "Monthly Pulse Report",
    "Monthly Pulse meeting with business advisor",
    "Quarterly HeadsUp Report",
    "Tax Forecasting",
    "Dynamic Cashflow",
    "Budget Monitor",
    "Benchmark Analysis",
    "Annual Valuation",
    "Annual Financial Plan"
  ]'::jsonb),

('Pulse', 'pulse', 4500, 'Advanced compliance with strategic planning.',
  '[
    "Annual Financial Statements",
    "Income Tax Returns",
    "Provisional Tax Returns",
    "Bi-annual IRP5 reconciliation",
    "Monthly EMP201s",
    "Monthly UIF submission",
    "COIDA Return",
    "VAT Returns",
    "Monthly Pulse Report",
    "Monthly Pulse meeting with business advisor",
    "Quarterly HeadsUp Report",
    "Tax Forecasting",
    "Dynamic Cashflow",
    "Budget Monitor",
    "Benchmark Analysis",
    "Annual Valuation",
    "Annual Financial Plan"
  ]'::jsonb),

('Unleash', 'unleash', 6700, 'Ultimate compliance and business growth package.',
  '[
    "Annual Financial Statements",
    "Income Tax Returns",
    "Provisional Tax Returns",
    "Bi-annual IRP5 reconciliation",
    "Monthly EMP201s",
    "Monthly UIF submission",
    "COIDA Return",
    "VAT Returns",
    "Monthly Pulse Report",
    "Monthly Pulse meeting with business advisor",
    "Quarterly HeadsUp Report",
    "Tax Forecasting",
    "Dynamic Cashflow",
    "Budget Monitor",
    "Benchmark Analysis",
    "Annual Valuation",
    "Annual Financial Plan"
  ]'::jsonb);

-- Create indexes
CREATE INDEX idx_service_contracts_user ON public.service_contracts(user_id);
CREATE INDEX idx_service_contracts_status ON public.service_contracts(contract_status);
CREATE INDEX idx_contract_documents_contract ON public.contract_documents(contract_id);
CREATE INDEX idx_service_applications_user ON public.service_applications(user_id);
CREATE INDEX idx_service_applications_status ON public.service_applications(application_status);