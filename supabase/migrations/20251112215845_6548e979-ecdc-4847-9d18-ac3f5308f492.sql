-- Add comprehensive pricing data to services table

-- Add new columns to services table if they don't exist
ALTER TABLE public.services 
ADD COLUMN IF NOT EXISTS code TEXT,
ADD COLUMN IF NOT EXISTS subcategory TEXT,
ADD COLUMN IF NOT EXISTS unit TEXT DEFAULT 'each',
ADD COLUMN IF NOT EXISTS billing TEXT DEFAULT 'once',
ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS vat_inclusive BOOLEAN DEFAULT true;

-- Create index on code for faster lookups
CREATE INDEX IF NOT EXISTS idx_services_code ON public.services(code);

-- Insert Monthly Billed Accounting - Business Support Packages
INSERT INTO public.services (name, category, subcategory, price, unit, billing, description, features, vat_inclusive, code) VALUES
('Base – Business Assistant', 'Monthly Billed Accounting', 'Business Support Packages', 5290, '/month', 'monthly', 
 'For businesses that are not VAT-registered; core accounting and compliance.',
 '["Qualified Professional Accountant (SA)", "Xero subscription", "Hubdoc document capture", "Monthly processing + bank reconciliations", "Annual Financial Statements", "All tax submissions & reminders (Income, Provisional, VAT, Withholding)", "Monthly payroll processing with statutory submissions", "Monthly reporting pack (Exec summary, Cash, P&L, Balance Sheet, Aged AR/AP)", "Business support for accounting/tax queries", "Quarterly review meeting"]'::jsonb,
 true, 'BASE-BUS-ASST'),

('Core – Business Leader', 'Monthly Billed Accounting', 'Business Support Packages', 7877, '/month', 'monthly',
 'Enhanced monthly accounting from source documents.',
 '["Qualified Professional Accountant (SA)", "Xero subscription", "Hubdoc capture", "Processing from supplier/customer invoices & source documents", "Annual Financial Statements", "All tax submissions & reminders", "Monthly payroll statutory submissions", "Standard monthly reporting pack", "Business support", "Quarterly review meeting"]'::jsonb,
 true, 'CORE-BUS-LEAD'),

('Premium – Business Champion', 'Monthly Billed Accounting', 'Business Support Packages', 14375, '/month', 'monthly',
 'Premium package with daily/weekly payroll.',
 '["Dedicated Professional Accountant (SA)", "Xero + Hubdoc", "Processing from invoices & source docs", "Annual Financial Statements", "All tax submissions & reminders", "Daily/weekly payroll + statutory submissions", "Monthly reporting pack", "Quarterly review meeting"]'::jsonb,
 true, 'PREM-BUS-CHAMP');

-- Insert Transaction-Based Packages
INSERT INTO public.services (name, category, price, unit, billing, description, features, vat_inclusive, code) VALUES
('Basic', 'Transaction-Based Packages', 759, '/month', 'monthly', 'Up to 30 transactions p/m.',
 '["Receipt Bank", "Weekly reconciliation", "Paperless Payables", "Automatic debtor reminders", "Payroll up to 3 employees"]'::jsonb, true, 'TRANS-BASIC'),
 
('Lite', 'Transaction-Based Packages', 1035, '/month', 'monthly', 'Up to 60 transactions p/m.',
 '["Receipt Bank", "Weekly reconciliation", "Paperless Payables", "Automatic debtor reminders", "Payroll up to 5 employees"]'::jsonb, true, 'TRANS-LITE'),
 
('Focus', 'Transaction-Based Packages', 1380, '/month', 'monthly', 'Up to 90 transactions p/m.',
 '["Receipt Bank", "Weekly reconciliation", "Paperless Payables", "Automatic debtor reminders", "Payroll up to 7 employees"]'::jsonb, true, 'TRANS-FOCUS'),
 
('Active', 'Transaction-Based Packages', 1725, '/month', 'monthly', 'Up to 120 transactions p/m.',
 '["Receipt Bank", "Daily reconciliation", "Paperless Payables", "Automatic debtor reminders", "Payroll up to 10 employees"]'::jsonb, true, 'TRANS-ACTIVE'),
 
('Bold', 'Transaction-Based Packages', 2829, '/month', 'monthly', 'Up to 180 transactions p/m.',
 '["Receipt Bank", "Daily reconciliation", "Paperless Payables", "Automatic debtor reminders", "Payroll up to 15 employees"]'::jsonb, true, 'TRANS-BOLD');

-- Insert Advisory & Strategic Packages
INSERT INTO public.services (name, category, price, unit, billing, description, features, vat_inclusive, code) VALUES
('Nurture', 'Advisory & Strategic Packages', 3450, '/month', 'monthly', 'Advisory bundle incl. tax, payroll & reports.',
 '["AFS, IT, Provisional", "IRP5 Reconciliations", "EMP201 + UIF + COIDA + VAT", "Monthly Pulse Report & meeting", "Quarterly HeadsUp", "Tax Forecasting", "Cashflow, Budget Monitor, Benchmark", "Annual Valuation & Plan"]'::jsonb, true, 'ADV-NURTURE'),
 
('Pulse', 'Advisory & Strategic Packages', 5175, '/month', 'monthly', 'Expanded advisory with monthly sessions.',
 '["Includes all Nurture items"]'::jsonb, true, 'ADV-PULSE'),
 
('Unleash', 'Advisory & Strategic Packages', 7705, '/month', 'monthly', 'Premium advisory & planning.',
 '["Includes all Pulse items"]'::jsonb, true, 'ADV-UNLEASH');

-- SARS Tax Returns
INSERT INTO public.services (name, category, price, unit, billing, description, vat_inclusive, code) VALUES
('IT12 – Individual (IRP5)', 'SARS Tax Returns', 1665.20, 'each', 'once', 'Individual tax return with IRP5', true, 'IT12-IRP5'),
('IT12 – Individual (IRP5 + Rental)', 'SARS Tax Returns', 2248.20, 'each', 'once', 'Individual tax return with IRP5 and rental income', true, 'IT12-IRP5-RENT'),
('IT12 – Sole Proprietor', 'SARS Tax Returns', 2831.20, 'each', 'once', 'Sole proprietor tax return', true, 'IT12-SOLE'),
('IT12 – Sole Proprietor + Rental', 'SARS Tax Returns', 3414.20, 'each', 'once', 'Sole proprietor with rental income', true, 'IT12-SOLE-RENT'),
('IT12 Verification/Audit', 'SARS Tax Returns', 988.00, 'per hour', 'once', 'Tax verification or audit support', true, 'IT12-AUDIT'),
('IT14 – Company/CC', 'SARS Tax Returns', 1915.40, 'each', 'once', 'Company or CC tax return', true, 'IT14-CO'),
('IT14 – Company/CC – Nil', 'SARS Tax Returns', 988.00, 'each', 'once', 'Nil company tax return', true, 'IT14-NIL'),
('IT12TR – Trust', 'SARS Tax Returns', 1915.40, 'each', 'once', 'Trust tax return', true, 'IT12TR'),
('IT12TR – Trust – Nil', 'SARS Tax Returns', 988.00, 'each', 'once', 'Nil trust tax return', true, 'IT12TR-NIL'),
('IT14/IT12TR Verification/Audit', 'SARS Tax Returns', 988.00, 'per hour', 'once', 'Company/Trust audit support', true, 'IT14-AUDIT');

-- Provisional Tax
INSERT INTO public.services (name, category, price, unit, billing, description, vat_inclusive, code) VALUES
('IRP6 – Provisional (1st period)', 'Provisional Tax', 904.20, 'each', 'once', 'First provisional tax period', true, 'IRP6-1ST'),
('IRP6 – Provisional (2nd period)', 'Provisional Tax', 904.20, 'each', 'once', 'Second provisional tax period', true, 'IRP6-2ND');

-- VAT
INSERT INTO public.services (name, category, price, unit, billing, description, vat_inclusive, code) VALUES
('VAT201 – Nil', 'VAT', 144.20, 'each', 'once', 'Nil VAT return', true, 'VAT201-NIL'),
('VAT201', 'VAT', 288.40, 'each', 'once', 'Standard VAT return', true, 'VAT201'),
('VAT Verification/Audit', 'VAT', 988.00, 'per hour', 'once', 'VAT audit support', true, 'VAT-AUDIT');

-- PAYE
INSERT INTO public.services (name, category, price, unit, billing, description, vat_inclusive, code) VALUES
('EMP201 – Nil', 'PAYE', 144.20, 'each', 'once', 'Nil PAYE return', true, 'EMP201-NIL'),
('EMP201', 'PAYE', 288.40, 'each', 'once', 'Standard PAYE return', true, 'EMP201'),
('EMP201 Verification/Audit', 'PAYE', 988.00, 'per hour', 'once', 'PAYE audit support', true, 'EMP201-AUDIT'),
('EMP501 (Bi-annual)', 'PAYE', 410.20, 'each', 'once', 'Bi-annual reconciliation', true, 'EMP501');

-- Bookkeeping
INSERT INTO public.services (name, category, price, unit, billing, description, vat_inclusive, code) VALUES
('Data Entry – Cashbook/Suppliers/Customers', 'Bookkeeping', 476.00, 'per hour', 'once', 'Data entry services', true, 'BK-DATA'),
('Reconciliations – GL/AR/AP/Balance Sheet', 'Bookkeeping', 988.00, 'per hour', 'once', 'Financial reconciliations', true, 'BK-RECON'),
('VAT Reports & Reconciliations', 'Bookkeeping', 988.00, 'per hour', 'once', 'VAT reporting and reconciliation', true, 'BK-VAT');

-- Payroll
INSERT INTO public.services (name, category, price, unit, billing, description, vat_inclusive, code) VALUES
('Payslips (batched file) – per employee', 'Payroll', 77.40, 'each', 'once', 'Batched payslip file', true, 'PAY-BATCH'),
('Payslips (individual PDFs) – per employee', 'Payroll', 89.00, 'each', 'once', 'Individual PDF payslips', true, 'PAY-IND'),
('Payslip Calculation', 'Payroll', 476.00, 'per hour', 'once', 'Payslip calculations', true, 'PAY-CALC'),
('IRP5/IT3 Certificate – per employee', 'Payroll', 362.60, 'each', 'once', 'Tax certificates', true, 'PAY-IRP5'),
('Employee Income Tax Registration', 'Payroll', 357.20, 'each', 'once', 'Register employee for tax', true, 'PAY-REG'),
('Department of Labour – UIF Declaration', 'Payroll', 232.20, 'each', 'once', 'UIF declarations', true, 'PAY-UIF'),
('Workmans Compensation – ROE calc', 'Payroll', 988.00, 'per hour', 'once', 'Workers compensation calculations', true, 'PAY-COMP');

-- Annual Financial Statements & Compliance
INSERT INTO public.services (name, category, price, unit, billing, description, vat_inclusive, code) VALUES
('AFS (< R1m turnover)', 'Annual Financial Statements & Compliance', 3500, 'from', 'once', 'R3,500 – R6,500', true, 'AFS-1M'),
('AFS (R1m – R5m turnover)', 'Annual Financial Statements & Compliance', 7000, 'from', 'once', 'R7,000 – R12,500', true, 'AFS-5M'),
('AFS (R5m – R10m turnover)', 'Annual Financial Statements & Compliance', 12500, 'from', 'once', 'R12,500 – R25,000', true, 'AFS-10M'),
('AFS (R10m+ turnover)', 'Annual Financial Statements & Compliance', 25000, 'from', 'once', 'Custom pricing', true, 'AFS-10M-PLUS'),
('Management Accounts (Quarterly)', 'Annual Financial Statements & Compliance', 5000, 'from', 'once', 'R5,000 – R15,000', true, 'MGMT-ACCT'),
('Drafting Company Resolutions', 'Annual Financial Statements & Compliance', 1500, 'from', 'once', 'R1,500 – R5,000', true, 'CO-RES');

-- Professional Rates
INSERT INTO public.services (name, category, price, unit, billing, description, vat_inclusive, code) VALUES
('Junior Bookkeeper', 'Professional Rates', 400, 'per hour', 'once', 'R400 – R600 per hour', true, 'RATE-JR-BK'),
('Senior Bookkeeper', 'Professional Rates', 600, 'per hour', 'once', 'R600 – R900 per hour', true, 'RATE-SR-BK'),
('Accountant', 'Professional Rates', 900, 'per hour', 'once', 'R900 – R1,500 per hour', true, 'RATE-ACCT'),
('Senior Accountant / CFO', 'Professional Rates', 1500, 'per hour', 'once', 'R1,500 – R3,000 per hour', true, 'RATE-CFO'),
('Tax Practitioner', 'Professional Rates', 900, 'per hour', 'once', 'R900 – R2,000 per hour', true, 'RATE-TAX'),
('Forensic Accountant', 'Professional Rates', 2500, 'per hour', 'once', 'R2,500 – R5,000 per hour', true, 'RATE-FOR'),
('Auditor', 'Professional Rates', 1800, 'per hour', 'once', 'R1,800 – R3,500 per hour', true, 'RATE-AUD');

-- Compliance Services (subset)
INSERT INTO public.services (name, category, price, unit, billing, description, vat_inclusive, code) VALUES
('Company name reservation (COR9.1)', 'Compliance Services', 120.00, 'each', 'once', 'Reserve company name', true, 'COR9-1'),
('Company name reservation extension (COR9.2)', 'Compliance Services', 100.00, 'each', 'once', 'Extend name reservation', true, 'COR9-2'),
('New (Pty) Ltd Registration – Online', 'Compliance Services', 429.00, 'each', 'once', 'Online company registration', true, 'PTY-REG-ONL'),
('New (Pty) Ltd Registration – Manual', 'Compliance Services', 459.00, 'each', 'once', 'Manual company registration', true, 'PTY-REG-MAN'),
('Memorandum of Incorporation amendments', 'Compliance Services', 550.00, 'each', 'once', 'Amend MOI', true, 'MOI-AMD'),
('Convert CC to (Pty) Ltd', 'Compliance Services', 850.00, 'each', 'once', 'Convert close corporation', true, 'CC-CONV'),
('Share certificate', 'Compliance Services', 150.00, 'each', 'once', 'Issue share certificate', true, 'SHARE-CERT'),
('Deregistration of Company/CC', 'Compliance Services', 450.00, 'each', 'once', 'Deregister company', true, 'DEREG');

-- Tax Service Rates
INSERT INTO public.services (name, category, price, unit, billing, description, vat_inclusive, code) VALUES
('Income Tax Registration', 'Tax Service Rates', 400.00, 'each', 'once', 'Register for income tax', true, 'TAX-REG-INC'),
('PAYE/UIF/SDL Registration (SARS)', 'Tax Service Rates', 899.00, 'each', 'once', 'Register employer with SARS', true, 'TAX-REG-PAYE'),
('VAT Registration', 'Tax Service Rates', 999.00, 'each', 'once', 'Register for VAT', true, 'TAX-REG-VAT'),
('Tax Clearance (Good Standing/Tender)', 'Tax Service Rates', 350.00, 'each', 'once', 'Tax clearance certificate', true, 'TAX-CLEAR');

-- Branding & Design
INSERT INTO public.services (name, category, price, unit, billing, description, vat_inclusive, code) VALUES
('Logo Design', 'Branding & Design', 450.00, 'each', 'once', 'Professional logo design', true, 'BRAND-LOGO'),
('Business Cards (500 laminated)', 'Branding & Design', 495.00, 'each', 'once', '500 laminated business cards', true, 'BRAND-CARD'),
('Website (5 pages)', 'Branding & Design', 1250.00, 'each', 'once', '5-page business website', true, 'BRAND-WEB');

-- Business Planning & Advisory
INSERT INTO public.services (name, category, price, unit, billing, description, vat_inclusive, code) VALUES
('Business Profile (standard)', 'Business Planning & Advisory', 399.00, 'each', 'once', 'Standard business profile', true, 'BIZ-PROF-STD'),
('Business Profile (graphical)', 'Business Planning & Advisory', 699.00, 'each', 'once', 'Graphical business profile', true, 'BIZ-PROF-GFX');