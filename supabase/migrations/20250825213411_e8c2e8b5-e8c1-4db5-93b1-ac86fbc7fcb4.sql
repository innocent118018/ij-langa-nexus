
-- Create a products table to store all the services
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC,
  image_url TEXT,
  category TEXT NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 999,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policy that allows anyone to view active products
CREATE POLICY "Anyone can view active products" 
  ON public.products 
  FOR SELECT 
  USING (is_active = true);

-- Create policy that allows admins to manage products
CREATE POLICY "Admins can manage products" 
  ON public.products 
  FOR ALL 
  USING (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

-- Update cart_items table to use product_id instead of service_id
ALTER TABLE public.cart_items 
ADD COLUMN product_id UUID;

-- Update cart_items to reference products table
ALTER TABLE public.cart_items 
ADD CONSTRAINT cart_items_product_id_fkey 
FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;

-- Insert all the services as products
INSERT INTO public.products (name, description, price, category) VALUES
-- Consultation
('Consultation', 'Professional consultation service', 1500.00, 'consultation'),

-- Accounting/Taxation Rate Per Hour
('Partner Rate', 'Partner consultation rate per hour', 1000.00, 'hourly-rates'),
('Accounting Officer/Tax Consultant Rate', 'Accounting officer or tax consultant rate per hour', 650.00, 'hourly-rates'),

-- Individual Taxation
('NOO - Notice of Objection', 'Notice of Objection filing', 750.00, 'individual-taxation'),
('NOD - Notice of Correction', 'Notice of Correction filing', 875.00, 'individual-taxation'),
('NOA - Notice of Appeal to SARS', 'Notice of Appeal to SARS filing', 1250.00, 'individual-taxation'),
('ITR12 - Salary Case (Under R250,000)', 'Return of Income/Tax Returns for salary under R250,000', 500.00, 'individual-taxation'),
('ITR12 - Salary Case (With Allowances)', 'Return of Income/Tax Returns with allowances and deductions', 1750.00, 'individual-taxation'),
('ITR12 - Directors/Members/Sole Trader', 'Return of Income/Tax Returns for directors, members, or sole traders', 1750.00, 'individual-taxation'),
('SAD - Audit Documents Submission', 'Submission of Review/Audit Documents', 500.00, 'individual-taxation'),
('SAL - Statement of Liabilities', 'Prepare Statement of Liabilities, Reconcile Schedule Income Statements', NULL, 'individual-taxation'),
('TLOG - Travel Logbook', 'Compilation of Travel Logbook', NULL, 'individual-taxation'),
('ANNX - Annexure Preparation', 'Prepare Annexure, Rental Schedule Income Statements', NULL, 'individual-taxation'),
('CGT - Capital Gain Tax', 'Compilation of Capital Gain Tax', NULL, 'individual-taxation'),
('TAUDITS - Tax Audits', 'Tax Audits - Income Tax, PAYE, SDL, UIF, VAT, WHT', NULL, 'individual-taxation'),

-- Business Entities
('IT77 - Administration Update', 'Update of administration details with SARS', 750.00, 'business-entities'),
('IT77 (LET) - Deregistration', 'Deregistration as a taxpayer', 1500.00, 'business-entities'),
('ITR14 - Dormant Return', 'Return of Income Tax - Dormant', 500.00, 'business-entities'),
('ITR14 - Micro Business (Under R1M)', 'Return of Income Tax - Under 1 Million (Micro)', 1200.00, 'business-entities'),
('ITR14 - Small Business (Under R14M)', 'Return of Income Tax - Under 14 Million (Small)', 1850.00, 'business-entities'),
('ITR14 - Medium/Large (Over R15M)', 'Return of Income Tax - Over 15 Million (Med/Large)', 2450.00, 'business-entities'),
('IRP6 - Provisional Tax (Non Trading)', 'Return of provisional tax - Non Trading', 400.00, 'business-entities'),
('IRP6 - Provisional Tax (1st)', 'Return of provisional tax - 1st payment', 650.00, 'business-entities'),
('IRP6 - Provisional Tax (2nd)', 'Return of provisional tax - 2nd payment', 1000.00, 'business-entities'),
('IRP6(3) - Additional Provisional Tax', 'Return of additional provisional tax', 500.00, 'business-entities'),
('IT12TR - Trust Returns', 'Return of Income (All Trust)', 1800.00, 'business-entities'),
('IT12TRD - Dormant Trust Returns', 'Returns of Income (All trust Dormant)', 950.00, 'business-entities'),
('DTR02 - Dividends Tax Return', 'Return dividends Tax and Resolution', 950.00, 'business-entities'),
('IT14SD - Supplementary Declaration', 'Return for supplementary Declaration', 1250.00, 'business-entities'),
('TCS - Tax Compliance Certificate', 'Tax Compliance Certificate (Good Standing, Tender)', 950.00, 'business-entities'),
('IT96 - Deferred Payment Arrangement', 'Arrangement for deferred payment of Income Tax', 750.00, 'business-entities'),
('E-filing Registration', 'E-filing Registration', 250.00, 'business-entities'),
('Tax Payment Service', 'Payment of provisional Tax, Assessment Tax', 110.00, 'business-entities'),

-- Employee Tax
('EMP101 - Employer Registration', 'Registration of an Employer - Employer Tax, Skills Development Levy and UIF', 1850.00, 'employee-tax'),
('EMP123T - Employer Cancellation', 'Cancellation of Registration as Employer', 1200.00, 'employee-tax'),
('IRP3 - Tax Deduction Directive', 'Request for Tax Deduction Directive', 850.00, 'employee-tax'),
('IRP5/IT3 - Employee Certificates', 'Employees Tax Certificates/General Information Returns and Computation', 375.00, 'employee-tax'),
('EMP501 - Tax Reconciliation', 'Employees Tax Reconciliation', 750.00, 'employee-tax'),
('EMP201 - Tax Remittance Return', 'Employees Tax/SDL and UIF Remittance Return', 650.00, 'employee-tax'),
('TADMIN - Bank Details Update', 'Preparation of updating bank details/admin changes at SARS', 375.00, 'employee-tax'),
('EMPSA - Payroll Tax Objection', 'Payroll Taxes - Objection and Reconstruction', 850.00, 'employee-tax'),

-- VAT
('VAT101 - VAT Registration', 'VAT registration', 1500.00, 'vat'),
('VAT201 - VAT Return', 'VAT return filing', 700.00, 'vat'),

-- UIF
('UF1 - UIF Registration', 'UIF Registration - Ufiling', 850.00, 'uif'),
('UF2 - Monthly UIF Return', 'Monthly Return - UIF Declaration', 475.00, 'uif'),
('UF19 - Employer Contribution', 'Employer Contribution Return (Per Month)', 400.00, 'uif'),

-- Professional Reports
('Accounting Officer Certificate', 'Confirmation of Earnings Certificate', 1000.00, 'professional-reports'),
('EME/QSE Affidavits', 'EME/QSE Affidavits', 500.00, 'professional-reports'),

-- Annual Administration Fees
('AAF1 - Main Trading Entity', 'Main Trading Entity - Company/CC annual fee', 650.00, 'annual-fees'),
('AAF2 - 2nd Trading Entity', '2nd Trading Entity - Company/CC annual fee', 350.00, 'annual-fees'),
('AAF3 - 3rd Trading Entity', '3rd Trading Entity - Company/CC/Trust/Partnership annual fee', 250.00, 'annual-fees'),
('AAF4 - Non-Trading Entity', 'Non-Trading entity/property company/CC - Dormant at SARS', 250.00, 'annual-fees'),

-- Payroll Administration
('Payroll Admin (1-10 employees)', 'Payroll administration for 1-10 employees', 450.00, 'payroll'),
('Payroll Admin (11-50 employees)', 'Payroll administration for 11-50 employees', 350.00, 'payroll'),
('Payroll Admin (50-100 employees)', 'Payroll administration for 50-100 employees', 250.00, 'payroll'),
('Payroll Admin (100-500 employees)', 'Payroll administration for 100-500 employees', 150.00, 'payroll'),
('Employment Contract', 'Employment Contract to specification', NULL, 'payroll'),

-- Company Formation and Amendments
('COR9.1 - Name Reservation', 'Name Reservation', 250.00, 'company-formation'),
('COR9.2 - Extend Name Reservation', 'Application to extend name reservation', 500.00, 'company-formation'),
('COR9.5 - Name Refusal Notice', 'Notice Refusing name reservation', 50.00, 'company-formation'),
('COR9.6 - Contested Name Notice', 'Notice of potentially contested name', 50.00, 'company-formation'),
('COR9.7 - Offensive Name Notice', 'Notice of potentially offensive name', 50.00, 'company-formation'),
('COR10.1 - Defensive Name Application', 'Application for defensive name', 500.00, 'company-formation'),
('COR10.2 - Renew Defensive Name', 'Application to renew defensive name', 700.00, 'company-formation'),
('COR14.3 - Registration Certificate', 'Registration Certificate', 50.00, 'company-formation'),
('COR15.1 - Memorandum of Incorporation', 'Memorandum of Incorporation (MOI)', 1250.00, 'company-formation'),
('COR15.2 - MOI Amendment Notice', 'Notice of amendments of Memorandum of Incorporation and resolution', 750.00, 'company-formation'),
('COR15.3 - MOI Alteration Notice', 'Notice of alteration of MOI', 650.00, 'company-formation'),
('COR15.4 - MOI Translation Notice', 'Notice of translation of MOI', 650.00, 'company-formation'),
('COR15.5 - MOI Consolidation Notice', 'Notice of consolidation of MOI', 650.00, 'company-formation'),
('COR15.6 - MOI Consolidation Request', 'Notice to consolidate the MOI', 650.00, 'company-formation'),
('COR16.1 - Financial Year End Change', 'Notice of change of Financial Year End', 650.00, 'company-formation'),
('COR16.2 - Ratification Vote Result', 'Notice of result of rule of ratification vote', 500.00, 'company-formation'),
('COR17.1 - Foreign Company Transfer', 'Application of foreign company to transfer registration', 2500.00, 'company-formation'),
('COR17.2 - Further Information Notice', 'Notice requiring further information', 550.00, 'company-formation'),
('COR17.3 - Foreign Registration Certificate', 'Registration Certificate for foreign company', 1200.00, 'company-formation'),
('COR18.1 - CC Conversion Notice', 'Notice of conversion of a close corporation', 850.00, 'company-formation'),
('COR25 - Financial Year End Change', 'Notice of change of financial year end', 750.00, 'company-formation'),
('COR31 - Par Value Shares Conversion', 'Notice of board resolution to convert par value shares', 750.00, 'company-formation'),
('COR35.1 - Pre-incorporation Contract', 'Notice of pre-incorporation contract', 650.00, 'company-formation'),
('COR36.1 - Notice to Companies', 'Standard form notice to companies by holders of securities', 250.00, 'company-formation'),
('COR36.2 - Notice by Company', 'Standard form notice by company to holders of securities', 250.00, 'company-formation'),
('COR36.3 - Beneficial Interest Notice', 'Notice to beneficial interest holders', 250.00, 'company-formation'),
('COR36.4 - Director Interest Notice', 'Standard form notice to company by director of personal financial interest', 250.00, 'company-formation'),
('COR39 - Director Change Notice', 'Notice of change concerning a director and resolution', 850.00, 'company-formation'),
('COR40.1 - Winding Up Notice', 'Notice of resolution to wind up solvent company', 1000.00, 'company-formation'),
('COR40.2 - Transfer Registration Notice', 'Notice of transfer of company registration to foreign jurisdiction', 1200.00, 'company-formation'),
('COR40.3 - Inactive Company Demand', 'Demand letter to inactive company', 750.00, 'company-formation'),
('COR40.4 - De-registration Notice', 'Commission notice of pending de-registration', 250.00, 'company-formation'),
('COR40.5 - Re-instatement Application', 'Application for re-instatement of de-registered company', 1000.00, 'company-formation'),
('COR44 - Required Appointment Notice', 'Company notice of required appointment and resolution', 750.00, 'company-formation'),
('COR123.1 - Business Rescue Notice', 'Notice of start of business rescue proceedings', 750.00, 'company-formation'),
('COR123.2 - Practitioner Appointment', 'Notice of appointment of practitioner', 650.00, 'company-formation'),
('COR123.3 - No Business Rescue Notice', 'Notice to not commence business rescue proceedings', 650.00, 'company-formation'),
('COR125.1 - Business Rescue Status', 'Notice concerning status of business rescue proceedings', 650.00, 'company-formation'),
('COR125.2 - Business Rescue Termination', 'Notice of termination of business rescue proceedings', 750.00, 'company-formation'),
('COR125.3 - Business Rescue Implementation', 'Notice of substantial implementation of a business rescue plan', 650.00, 'company-formation'),
('COR126.1 - Practitioner License Application', 'Application of license as a business rescue practitioner', 1500.00, 'company-formation'),
('COR134.1 - ADR Provider Application', 'Application to Commission to be accredited as ADR provider', 1000.00, 'company-formation'),
('COR178 - Exemption Request', 'Request for particulars regarding requested exemption', 750.00, 'company-formation'),

-- Company Register Services
('Company Register Setup', 'New and Populate Company and Minute Register', 650.00, 'company-registers'),
('Company Register Update', 'Update Company Register per Category', 350.00, 'company-registers'),
('Share Certificates', 'Issue Share Certificates per Shareholder', 500.00, 'company-registers'),
('Resolutions', 'Resolution Shareholders/Directors', 475.00, 'company-registers'),
('Confirmation Certificates', 'Confirmation Certificates from CIPC', 200.00, 'company-registers'),
('Power of Attorney', 'Power of Attorney - Directors', 350.00, 'company-registers'),

-- Deregistration Services
('Dormant Company Deregistration', 'Deregistration: Various Forms and Resolutions - Dormant Company', 1500.00, 'deregistration'),
('Trading Company Deregistration', 'Deregistration: Various Forms and Resolutions - Trading Company', 2200.00, 'deregistration'),
('Close Corporation Deregistration', 'Deregistration: Various Forms and Resolutions - Close Corporation', 800.00, 'deregistration'),
('IT77 Deregistration Service', 'IT77 Deregistration service', 375.00, 'deregistration'),
('Priority Fee - Urgent Lodgements', 'Priority Fee for Urgent Lodgements with CIPC/SARS', 1300.00, 'urgent-services');
