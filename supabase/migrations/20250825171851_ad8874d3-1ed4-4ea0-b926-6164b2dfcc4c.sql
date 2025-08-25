
-- Create services table with all the requested services
INSERT INTO services (name, description, category, price, processing_time, requirements, is_active, is_popular) VALUES
-- Register services
('Company Registration', 'Register a new private company (Pty Ltd)', 'Register', 590.00, '3-5 Days', 'Valid ID, Proof of Address, Company Name', true, true),
('Non-Profit Company', 'Register a Non-Profit Company', 'Register', 1500.00, '3-7 Days', 'Valid ID, NPO Constitution, Directors Details', true, false),
('Incorporation', 'Register an Incorporation', 'Register', 1500.00, '21 Days', 'Valid ID, Memorandum, Articles of Association', true, false),
('Shelf Company', 'Purchase pre-registered shelf company', 'Register', 890.00, 'Immediate', 'Valid ID, Proof of Address', true, false),
('CO-OP Registration', 'Register a Cooperative', 'Register', 1200.00, '7-14 Days', 'Valid ID, Co-op Constitution, Member Details', true, false),
('Company Name Only', 'Reserve company name only', 'Register', 250.00, '1 Day', 'Preferred company names (3 options)', true, false),

-- Change services
('Company Name Change', 'Change existing company name', 'Change', 650.00, '1-2 Days', 'Current registration, New name options', true, false),
('Director/Shareholder Changes', 'Update directors and shareholders', 'Change', 850.00, '1-7 Days', 'Valid ID, Resignation letters, Appointment forms', true, false),
('Close Corporation Changes', 'CC amendments and changes', 'Change', 390.00, '3-5 Days', 'CC registration, Amendment details', true, false),
('Registered Address Change', 'Change company registered address', 'Change', 390.00, '15 Days', 'New address proof, Board resolution', true, false),
('Shareholders Agreement', 'Draft shareholders agreement', 'Change', 990.00, '1 Day', 'Shareholder details, Agreement terms', true, false),
('Memorandum of Incorporation', 'MOI amendments and changes', 'Change', 990.00, '21 Days', 'Current MOI, Required changes', true, false),
('Financial Year End Change', 'Change company financial year end', 'Change', 390.00, '1 Day', 'Board resolution, New year end date', true, false),

-- SARS services
('Tax Clearance', 'Obtain SARS tax clearance certificate', 'SARS', 490.00, '1-7 Days', 'Valid ID, Tax compliance documents', true, true),
('VAT Registration', 'Register for VAT with SARS', 'SARS', 890.00, '5-10 Days', 'Company registration, Financial projections', true, false),
('Import Export Licence', 'Apply for import/export licence', 'SARS', 1590.00, '2-4 Weeks', 'Company registration, Business plan', true, false),
('Public Officer Appointment', 'Appoint public officer with SARS', 'SARS', 590.00, '6-8 Weeks', 'Valid ID, Proof of address, Tax number', true, true),
('PAYE and UIF Registration', 'Register for PAYE and UIF', 'SARS', 690.00, '3-5 Days', 'Company registration, Employee details', true, false),
('SDL Registration', 'Skills Development Levy registration', 'SARS', 490.00, '3-5 Days', 'Company registration, Payroll details', true, false),

-- Other services
('Annual Returns', 'File annual returns with CIPC', 'Other', 190.00, '2 Days', 'Company registration, Financial statements', true, true),
('BEE Affidavit', 'Broad-Based Black Economic Empowerment certificate', 'Other', 390.00, '1 Day', 'Company details, Ownership structure', true, false),
('CSD Registration', 'Central Supplier Database registration', 'Other', 390.00, '1 Day', 'Company registration, Bank details', true, false),
('Beneficial Ownership', 'Beneficial ownership declaration', 'Other', 590.00, '1-7 Days', 'Shareholder details, Ownership structure', true, true),
('PSIRA Assistance', 'Private Security Industry Regulatory Authority', 'Other', 5620.00, '4-6 Weeks', 'Security business plan, Directors CVs', true, false),
('Trademarks', 'Register trademark with CIPC', 'Other', 2200.00, '10 Days', 'Trademark design, Classification details', true, false),
('Company Restoration', 'Restore deregistered company', 'Other', 2580.00, '21 Days', 'Deregistration notice, Restoration reasons', true, false),
('CIDB Registration', 'Construction Industry Development Board', 'Other', 1250.00, '2-3 Weeks', 'Company registration, Construction experience', true, false),
('COID Registration', 'Compensation for Occupational Injuries', 'Other', 890.00, '1-2 Weeks', 'Company registration, Employee details', true, false),
('NHBRC Registration', 'National Home Builders Registration Council', 'Other', 1990.00, 'Suspended Service', 'Company registration, Building qualifications', false, false),

-- Packages
('Starter Package', 'New Pty + Public Officer + Tax Clearance', 'Packages', 1670.00, '1-2 Weeks', 'Complete company setup documents', true, true),
('Tender Package', 'Complete tender-ready package', 'Packages', 3040.00, '2-3 Weeks', 'All tender requirements documents', true, true),
('Premium Package', 'Complete business setup with website', 'Packages', 6155.00, '3-4 Weeks', 'All business setup requirements', true, false),

-- Tax Services
('Individual Tax Return (IRP5)', 'IT12 Individual Income Tax Return with IRP5', 'Tax', 1665.20, '5-10 Days', 'IRP5, Bank statements, Medical aid', true, false),
('Individual Tax Return (IRP5 + Rental)', 'IT12 with IRP5 and Rental Income', 'Tax', 2248.20, '7-14 Days', 'IRP5, Rental agreements, Expenses', true, false),
('Company Tax Return', 'IT14 Company Income Tax Return', 'Tax', 1915.40, '10-15 Days', 'Financial statements, Supporting docs', true, false),
('VAT Return', 'VAT201 Return submission', 'Tax', 288.40, '2-3 Days', 'VAT records, Invoices, Receipts', true, false),
('PAYE Return', 'EMP201 PAYE Return', 'Tax', 288.40, '2-3 Days', 'Payroll records, Employee details', true, false);

-- Create cart table for shopping functionality
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on cart_items
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Create policies for cart_items
CREATE POLICY "Users can manage their own cart items" ON cart_items
  FOR ALL USING (auth.uid() = user_id);
