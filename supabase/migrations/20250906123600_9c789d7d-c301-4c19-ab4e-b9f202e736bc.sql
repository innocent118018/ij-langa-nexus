-- Insert some sample services/products from the services.ts file
INSERT INTO public.services (name, description, price, category, is_popular, is_active) VALUES
  ('Consultation', 'Professional consultation services for business and tax matters', 1500.00, 'professional-fees', false, true),
  ('Partners', 'Partner-level consultation for complex matters', 1150.00, 'professional-fees', true, true),
  ('Accounting Officers/Tax Consultants', 'Specialist accounting and tax consultation services', 650.00, 'professional-fees', false, true),
  ('Return of Income/Tax Returns: Salary Case (Under 250,000)', 'Basic individual tax return for salary earners', 500.00, 'individual-taxation', true, true),
  ('Return of Income Tax - Under 1 Million (Micro)', 'Income tax return for micro businesses', 1200.00, 'business-entities', true, true),
  ('VAT registration', 'Register for Value Added Tax with SARS', 1500.00, 'vat', true, true),
  ('VAT return', 'Bi-monthly VAT return submission', 700.00, 'vat', true, true),
  ('Registration of an Employer - Employer Tax, Skills Development Levy and UIF', 'Register as employer for PAYE, SDL, and UIF', 1850.00, 'employees-tax', true, true),
  ('Employees Tax/SDL and UIF Remittance Return', 'Monthly PAYE, SDL, and UIF returns', 650.00, 'employees-tax', true, true),
  ('Tax Compliance Certificate (Good Standing, Tender)', 'Obtain tax compliance status certificate', 950.00, 'business-entities', true, true);

-- Insert corresponding products to test the Products page  
INSERT INTO public.products (name, description, price, category, is_active, stock_quantity) VALUES
  ('Business Registration Package', 'Complete business registration with CIPC including directors details', 2500.00, 'business-setup', true, 999),
  ('Monthly Bookkeeping Service', 'Professional monthly bookkeeping service for small businesses', 1200.00, 'accounting', true, 999),
  ('Annual Financial Statements', 'Comprehensive annual financial statements preparation', 3500.00, 'accounting', true, 999),
  ('Personal Tax Return', 'Individual income tax return preparation and submission', 750.00, 'taxation', true, 999),
  ('Company Tax Return', 'Corporate income tax return preparation', 1800.00, 'taxation', true, 999),
  ('Payroll Setup & Management', 'Complete payroll setup and monthly management', 950.00, 'payroll', true, 999),
  ('SARS Representation', 'Professional representation for SARS audits and queries', 1500.00, 'compliance', true, 999),
  ('B-BBEE Certificate Application', 'Assistance with B-BBEE certificate application', 2200.00, 'compliance', true, 999),
  ('Trust Registration', 'Complete trust registration and setup', 4500.00, 'business-setup', true, 999),
  ('VAT Registration & Setup', 'VAT registration with SARS and initial setup', 1600.00, 'taxation', true, 999);