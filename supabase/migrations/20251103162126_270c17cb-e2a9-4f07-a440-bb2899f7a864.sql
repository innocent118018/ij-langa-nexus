-- Clear existing pricing data and create comprehensive new pricing structure
-- This replaces all existing services/products with the new pricing

-- First, backup any existing data by moving to archive tables
CREATE TABLE IF NOT EXISTS public.services_archive AS SELECT * FROM public.services;
CREATE TABLE IF NOT EXISTS public.products_archive AS SELECT * FROM public.products;

-- Clear existing data
TRUNCATE public.services CASCADE;
TRUNCATE public.products CASCADE;

-- Add new columns to services table for better categorization
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS code TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS subcategory TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS is_monthly_subscription BOOLEAN DEFAULT FALSE;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS included_items JSONB DEFAULT '[]'::jsonb;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(category);
CREATE INDEX IF NOT EXISTS idx_services_code ON public.services(code);
CREATE INDEX IF NOT EXISTS idx_services_is_monthly ON public.services(is_monthly_subscription);

-- Insert new comprehensive pricing data
-- CONSULTATION & HOURLY RATES
INSERT INTO public.services (code, name, description, price, category, subcategory, processing_time, requirements, is_active) VALUES
('CONSULT', 'Consultation', 'Professional consultation services', 1500.00, 'consultation', 'hourly', 'Per Hour', 'None', true),
('RATE-PARTNER', 'Partners Rate', 'Partner hourly rate for accounting/taxation', 1000.00, 'consultation', 'hourly', 'Per Hour', 'None', true),
('RATE-AO', 'Accounting Officers/Tax Consultants Rate', 'Accounting Officer/Tax Consultant hourly rate', 650.00, 'consultation', 'hourly', 'Per Hour', 'None', true);

-- TAXATION INDIVIDUAL
INSERT INTO public.services (code, name, description, price, category, subcategory, processing_time, requirements, is_active) VALUES
('NOO', 'Notice of Objection', 'Objection to SARS assessment', 750.00, 'taxation-individual', 'notices', '5-10 Days', 'Assessment notice, supporting documents', true),
('NOD', 'Notice of Correction', 'Correction of SARS assessment', 875.00, 'taxation-individual', 'notices', '5-10 Days', 'Assessment notice, correct information', true),
('NOA', 'Notice of Appeal to SARS', 'Appeal to SARS decision', 1250.00, 'taxation-individual', 'notices', '10-15 Days', 'SARS decision, grounds for appeal', true),
('ITR12-BASIC', 'Tax Returns: Salary Case (Under R250,000)', 'Individual tax return for salary earners under R250k', 500.00, 'taxation-individual', 'returns', '3-5 Days', 'IRP5, ID document', true),
('ITR12-ADV', 'Tax Returns: Salary Case (Allowances & Deductions)', 'Individual tax return with allowances and deductions', 1750.00, 'taxation-individual', 'returns', '5-7 Days', 'IRP5, medical aid certificate, retirement annuity', true),
('ITR12-DIR', 'Tax Returns: Directors/Members/Sole Trader', 'Tax return for directors, members, sole traders', 1750.00, 'taxation-individual', 'returns', '7-10 Days', 'Financial statements, IRP5, supporting documents', true),
('SAD', 'Submission of Review/Audit Documents', 'Submit documents for SARS audit or review', 500.00, 'taxation-individual', 'compliance', '3-5 Days', 'Audit letter, supporting documents', true),
('SAL', 'Statement of Liabilities & Income Reconciliation', 'Prepare liabilities statement and reconcile income', 1425.00, 'taxation-individual', 'statements', '5-10 Days', 'Bank statements, loan agreements, income sources', true),
('TLOG', 'Compilation of Travel Logbook', 'Prepare and compile travel logbook for tax purposes', 1500.00, 'taxation-individual', 'statements', '7-10 Days', 'Vehicle details, travel records', true),
('ANNX', 'Prepare Annexure, Rental Schedule', 'Rental property income and expense schedule', 1500.00, 'taxation-individual', 'statements', '5-10 Days', 'Rental agreements, income/expense records', true),
('CGT', 'Compilation of Capital Gain Tax', 'Calculate and compile capital gains tax', 1425.00, 'taxation-individual', 'calculations', '5-10 Days', 'Asset purchase/sale documents', true),
('TAUDITS', 'Tax Audits', 'Assistance with SARS tax audits (Income Tax, PAYE, SDL, UIF, VAT, WHT)', 1075.00, 'taxation-individual', 'audits', '10-20 Days', 'Audit letter, financial records', true);

-- BUSINESS ENTITIES (Companies, CC, Trusts)
INSERT INTO public.services (code, name, description, price, category, subcategory, processing_time, requirements, is_active) VALUES
('IT77', 'Update Administration Details with SARS', 'Update company/individual details with SARS', 750.00, 'business-entities', 'admin', '3-5 Days', 'Updated details, supporting documents', true),
('IT77-DEREG', 'Deregistration as Taxpayer', 'Deregister individual, CC, Pty, or Trust', 1500.00, 'business-entities', 'admin', '10-15 Days', 'Final returns, clearance documents', true),
('ITR14-DORM', 'Income Tax Return - Dormant', 'Tax return for dormant companies', 500.00, 'business-entities', 'returns', '3-5 Days', 'Company registration, financial statements', true),
('ITR14-MICRO', 'Income Tax Return - Under R1 Million', 'Tax return for micro businesses (turnover under R1m)', 1200.00, 'business-entities', 'returns', '5-7 Days', 'Financial statements, bank statements', true),
('ITR14-SMALL', 'Income Tax Return - Under R14 Million', 'Tax return for small businesses (turnover under R14m)', 1850.00, 'business-entities', 'returns', '7-10 Days', 'Financial statements, supporting schedules', true),
('ITR14-MED', 'Income Tax Return - Over R15 Million', 'Tax return for medium/large businesses', 2450.00, 'business-entities', 'returns', '10-15 Days', 'Audited financial statements, detailed schedules', true),
('IRP6-NT', 'Provisional Tax Return - Non Trading', 'Provisional tax for non-trading entities', 400.00, 'business-entities', 'provisional', '2-3 Days', 'Financial information', true),
('IRP6-1ST', 'Provisional Tax Return - 1st Period', 'First provisional tax return', 650.00, 'business-entities', 'provisional', '3-5 Days', 'Financial projections', true),
('IRP6-2ND', 'Provisional Tax Return - 2nd Period', 'Second provisional tax return', 1000.00, 'business-entities', 'provisional', '3-5 Days', 'Financial statements, tax calculation', true),
('IRP6-3RD', 'Additional Provisional Tax Return', 'Additional/top-up provisional tax', 500.00, 'business-entities', 'provisional', '2-3 Days', 'Final financial statements', true),
('IT12TR', 'Trust Income Tax Return', 'Income tax return for all types of trusts', 1800.00, 'business-entities', 'trusts', '7-10 Days', 'Trust deed, financial statements, beneficiary details', true),
('IT12TRD', 'Trust Income Tax Return - Dormant', 'Tax return for dormant trusts', 950.00, 'business-entities', 'trusts', '3-5 Days', 'Trust deed, nil activity confirmation', true),
('DTR02', 'Dividends Tax Return and Resolution', 'Prepare and submit dividends tax return', 950.00, 'business-entities', 'dividends', '3-5 Days', 'Board resolution, payment details', true),
('IT14SD', 'Supplementary Declaration Return', 'Supplementary declaration for additional income', 1250.00, 'business-entities', 'returns', '5-7 Days', 'Additional income details', true),
('TCS', 'Tax Compliance Certificate', 'Good standing/tender compliance certificate', 950.00, 'business-entities', 'certificates', '7-10 Days', 'All returns up to date', true),
('IT96', 'Deferred Payment Arrangement', 'Arrange payment plan with SARS', 750.00, 'business-entities', 'arrangements', '5-10 Days', 'Financial position, payment proposal', true),
('EFILING-REG', 'eFiling Registration', 'Register for SARS eFiling', 250.00, 'business-entities', 'registration', '1-2 Days', 'Tax number, ID/registration documents', true),
('PUBLIC-OFF', 'Public Officer Appointment', 'Appoint public officer for company', 590.00, 'business-entities', 'registration', '2-3 Days', 'Company documents, officer details', true),
('IMP-EXP', 'Import/Export Licence', 'Apply for import/export licence', 2850.00, 'business-entities', 'licences', '20-30 Days', 'Company registration, business plan', true),
('PAYMENT', 'Tax Payment Service', 'Payment of provisional/assessed tax', 110.00, 'business-entities', 'payments', 'Immediate', 'Payment reference', true);

-- EMPLOYEES TAX
INSERT INTO public.services (code, name, description, price, category, subcategory, processing_time, requirements, is_active) VALUES
('EMP101', 'Employer Registration', 'Register as employer for PAYE, SDL, UIF', 1850.00, 'employees-tax', 'registration', '5-7 Days', 'Company registration, banking details', true),
('EMP123T', 'Cancellation of Employer Registration', 'Cancel employer tax registration', 1200.00, 'employees-tax', 'deregistration', '7-10 Days', 'Final returns, clearance', true),
('IRP3', 'Tax Deduction Directive', 'Request tax directive for specific payments', 850.00, 'employees-tax', 'directives', '10-15 Days', 'Payment details, supporting documents', true),
('IRP5', 'Employee Tax Certificates', 'Prepare IRP5/IT3(a) certificates', 375.00, 'employees-tax', 'certificates', '3-5 Days', 'Payroll records', true),
('EMP501', 'Employee Tax Reconciliation', 'Annual PAYE reconciliation', 750.00, 'employees-tax', 'reconciliation', '5-7 Days', 'Monthly EMP201 returns, IRP5s', true),
('EMP201', 'Monthly PAYE/SDL/UIF Return', 'Monthly employer tax remittance', 650.00, 'employees-tax', 'returns', '2-3 Days', 'Payroll summary', true),
('TADMIN', 'Update Bank Details/Admin Changes', 'Update employer details at SARS', 375.00, 'employees-tax', 'admin', '2-3 Days', 'Updated information', true),
('EMPSA', 'Payroll Taxes - Objection & Reconstruction', 'Object to or reconstruct payroll assessments', 850.00, 'employees-tax', 'objections', '10-15 Days', 'Assessment, payroll records', true);

-- VALUE ADDED TAX
INSERT INTO public.services (code, name, description, price, category, subcategory, processing_time, requirements, is_active) VALUES
('VAT101', 'VAT Registration', 'Register for Value Added Tax', 1500.00, 'vat', 'registration', '10-15 Days', 'Financial projections, bank statements', true),
('VAT201', 'VAT Return', 'Monthly/bi-monthly VAT return', 700.00, 'vat', 'returns', '3-5 Days', 'Sales/purchase records, bank statements', true);

-- UIF (Unemployment Insurance Fund)
INSERT INTO public.services (code, name, description, price, category, subcategory, processing_time, requirements, is_active) VALUES
('UF1', 'UIF Registration - Ufiling', 'Register for Unemployment Insurance Fund', 850.00, 'uif', 'registration', '3-5 Days', 'Company registration, employee details', true),
('UF2', 'Monthly UIF Declaration', 'Monthly UIF return', 475.00, 'uif', 'returns', '2-3 Days', 'Payroll summary', true),
('UF19', 'UIF Employer Contribution Return', 'Monthly UIF contribution (non-payroll clients)', 400.00, 'uif', 'returns', '2-3 Days', 'Employee earnings', true);

-- ACCOUNTING OFFICERS CERTIFICATES
INSERT INTO public.services (code, name, description, price, category, subcategory, processing_time, requirements, is_active) VALUES
('AO-CERT', 'Accounting Officers Certificate', 'Confirmation of earnings certificate', 1000.00, 'certificates', 'professional', '3-5 Days', 'Financial statements, income details', true),
('EME-QSE', 'EME/QSE Affidavits', 'Affidavits for exempt micro/qualifying small enterprises', 500.00, 'certificates', 'affidavits', '2-3 Days', 'Financial information', true);

-- ANNUAL ADMINISTRATION FEES
INSERT INTO public.services (code, name, description, price, category, subcategory, processing_time, requirements, is_active, is_monthly_subscription) VALUES
('AAF1', 'Annual Admin Fee - Main Trading Entity', 'Annual administration for main company/CC', 650.00, 'admin-fees', 'annual', 'Annual', 'Active company', true, false),
('AAF2', 'Annual Admin Fee - 2nd Entity', 'Annual administration for second entity', 350.00, 'admin-fees', 'annual', 'Annual', 'Active company', true, false),
('AAF3', 'Annual Admin Fee - 3rd Entity', 'Annual administration for third entity (CC/Trust/Partnership)', 250.00, 'admin-fees', 'annual', 'Annual', 'Active company', true, false),
('AAF4', 'Annual Admin Fee - Dormant Entity', 'Annual administration for dormant company', 250.00, 'admin-fees', 'annual', 'Annual', 'Dormant company', true, false);

-- PAYROLL ADMINISTRATION (Scale-based pricing)
INSERT INTO public.services (code, name, description, price, category, subcategory, processing_time, requirements, is_active) VALUES
('PAYROLL-1-10', 'Payroll Administration (1-10 Employees)', 'Monthly payroll for 1-10 employees', 450.00, 'payroll', 'monthly', 'Monthly', 'Employee details, hours worked', true),
('PAYROLL-11-50', 'Payroll Administration (11-50 Employees)', 'Monthly payroll for 11-50 employees', 350.00, 'payroll', 'monthly', 'Monthly', 'Employee details, hours worked', true),
('PAYROLL-51-100', 'Payroll Administration (51-100 Employees)', 'Monthly payroll for 51-100 employees', 250.00, 'payroll', 'monthly', 'Monthly', 'Employee details, hours worked', true),
('PAYROLL-101-500', 'Payroll Administration (101-500 Employees)', 'Monthly payroll for 101-500 employees', 150.00, 'payroll', 'monthly', 'Monthly', 'Employee details, hours worked', true),
('EMP-CONTRACT', 'Employment Contract', 'Custom employment contract preparation', 0.00, 'payroll', 'contracts', 'Negotiated', 'Job description, terms', true);

-- Continue in next batch...
