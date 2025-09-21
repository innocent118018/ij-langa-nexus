-- Add customer_name column to sales_quotes table for temporary use
ALTER TABLE public.sales_quotes ADD COLUMN IF NOT EXISTS customer_name TEXT;

-- Clear existing test data and insert the provided sales quotes data
DELETE FROM public.sales_quotes WHERE quote_number LIKE 'QUO-%';

-- Insert all the sales quotes data with customer names
INSERT INTO public.sales_quotes (quote_number, issue_date, customer_name, description, total_amount, status, user_id) VALUES
('2020752745', '2025-09-20', 'Soul keepers', 'Stretch Tent Gazebo 5m x5m + 50 Blank Chairs + 1 Steel Foldable table', 850.00, 'Active', '00000000-0000-0000-0000-000000000000'),
('2020752744', '2025-09-18', 'NKUYAHAE HOLDINGS (PTY)LTD', 'Renewal SARS Tax Clearance ,CIPC BBBEE', 793.50, 'Accepted', '00000000-0000-0000-0000-000000000000'),
('2020752743', '2025-09-15', 'WANDILE KITCHEN', 'File Annual Returns and Declarations of Beneficial Ownership of WANDILE KITCHEN', 1253.50, 'Active', '00000000-0000-0000-0000-000000000000'),
('2020752742', '2025-09-12', 'Global Business Solutions', 'MY COMPLIANCE PROFILE SHELVING SA PMB (PTY) LTD', 59225.00, 'Expired', '00000000-0000-0000-0000-000000000000'),
('2020752741', '2025-09-11', 'NATHAN N NYANGUWO MEDICAL ORTHOTIST AND PROSTHETIST', 'Vat Returns Submissions of ITR12/ IPR5 NYANGUWO, NN', 1035.00, 'Accepted', '00000000-0000-0000-0000-000000000000'),
('2020752740', '2025-09-10', 'Madidi Property Management', 'CIPC Director Amendments for Enterprise Amabutho', 1656.00, 'Accepted', '00000000-0000-0000-0000-000000000000'),
('2020752739', '2025-09-08', 'Global Business Solutions', 'Vat Returns Submissions DV HYDRAULIC TECH ENGINEERING', 8027.00, 'Accepted', '00000000-0000-0000-0000-000000000000'),
('2020752738', '2025-09-04', 'Chulumanco Lilitha', 'MY COMPLIANCE PROFILE SEMBO COLLECTIVE', 575.00, 'Accepted', '00000000-0000-0000-0000-000000000000'),
('2020752737', '2025-09-04', 'Madidi Property Management', 'MY COMPLIANCE PROFILE M.M. Shangase', 4640.25, 'Accepted', '00000000-0000-0000-0000-000000000000'),
('2020752736', '2025-09-04', 'Madidi Property Management', 'MY COMPLIANCE PROFILE', 0.00, 'Expired', '00000000-0000-0000-0000-000000000000'),
('2020752735', '2025-09-03', 'NKUYAHAE HOLDINGS (PTY)LTD', 'MY COMPLIANCE PROFILE Nkuyahae Holdings', 1886.00, 'Accepted', '00000000-0000-0000-0000-000000000000'),
('2020752734', '2025-09-03', 'Global Business Solutions', 'MY COMPLIANCE PROFILE ZAKHELE PROPERTY HOLDING', 609220.55, 'Expired', '00000000-0000-0000-0000-000000000000'),
('2020752733', '2025-09-02', 'Madidi Property Management', 'COR, Tax Pin Issued', 1362.75, 'Accepted', '00000000-0000-0000-0000-000000000000'),
('2020752732', '2025-09-01', 'TECHLOGIX', 'Billable Invoice Coida', 287.50, 'Accepted', '00000000-0000-0000-0000-000000000000'),
('2020752731', '2025-08-29', 'KHAYA LAMI TRAVEL AND TOURS', 'MY COMPLIANCE PROFILE KHAYA LAMI TRAVEL AND TOURS', 1536.40, 'Accepted', '00000000-0000-0000-0000-000000000000'),
('2020752730', '2025-08-29', 'Madidi Property Management', 'MY COMPLIANCE PROFILE MADIDI PROPERTY MANAGEMENT', 2216.05, 'Accepted', '00000000-0000-0000-0000-000000000000'),
('2020752729', '2025-08-26', 'FEZEKA CIVIL ENGINEERING AND CONSTRUCTION', 'Main', 678.50, 'Accepted', '00000000-0000-0000-0000-000000000000'),
('2020752728', '2025-08-26', 'NSIBANDE MHURI TRADING AND PROJEC', 'Maintain Registered Details', 172.50, 'Accepted', '00000000-0000-0000-0000-000000000000'),
('2020752727', '2025-08-26', 'Global Business Solutions', 'Shelf Company Ij Langa Consulting 1-Minute Timeframe', 26093.50, 'Expired', '00000000-0000-0000-0000-000000000000'),
('2020752726', '2025-08-06', 'SP NGOBESE', 'Tax Compliance Status Request Sifiso Phinias Ngobese 0805643251', 563.50, 'Accepted', '00000000-0000-0000-0000-000000000000'),
('2020752725', '2025-08-05', 'Global Business Solutions', 'MY COMPLIANCE PROFILE Active Vision Solutions', 15608.82, 'Expired', '00000000-0000-0000-0000-000000000000'),
('2020752724', '2025-08-01', 'Sembo Collective', 'MY COMPLIANCE PROFILE', 678.50, 'Accepted', '00000000-0000-0000-0000-000000000000'),
('2020752723', '2025-07-31', 'Chulumanco Lilitha', 'B-BBEE CERTIFICATE FOR EXEMPTED MICRO ENTERPRISES Renewal', 207.00, 'Accepted', '00000000-0000-0000-0000-000000000000'),
('2020752722', '2025-07-31', 'NSIBANDE MHURI TRADING AND PROJEC', 'Maintain Registered Details', 736.00, 'Expired', '00000000-0000-0000-0000-000000000000'),
('2020752721', '2025-07-28', 'George munyonga', 'White Plastic Chairs', 196650.00, 'Expired', '00000000-0000-0000-0000-000000000000'),
('2020752720', '2025-07-28', 'George munyonga', 'White Plastic Chairs', 571550.00, 'Expired', '00000000-0000-0000-0000-000000000000'),
('2020752719', '2025-07-26', 'Global Business Solutions', 'Reduce Assessment nkateko clyde SARS Debt Settlement & Compliance Package', 28138.10, 'Expired', '00000000-0000-0000-0000-000000000000'),
('2020752718', '2025-07-26', 'Global Business Solutions', 'Submission of Tax Returns JRL COMMUNICATIONS (PTY) LTD', 575.00, 'Expired', '00000000-0000-0000-0000-000000000000'),
('2020752717', '2025-07-26', 'Global Business Solutions', 'Request for Reasons', 2990.00, 'Expired', '00000000-0000-0000-0000-000000000000'),
('2020752716', '2025-07-24', 'STARLITE EDUCATORS', 'Form CoR 40.3 - Notice of Pending Deregistration GOLDEN HARMONY FOODS 2023/650340/07', 1483.50, 'Expired', '00000000-0000-0000-0000-000000000000'),
('2020752715', '2025-07-24', 'STARLITE EDUCATORS', 'Form CoR 40.3 - Notice of Pending Deregistration STARLITE EDUCATORS (Pty) Ltd (2017/400737/07)', 1483.50, 'Expired', '00000000-0000-0000-0000-000000000000'),
('STE-001', '2025-07-24', 'STARLITE EDUCATORS', 'Form CoR 40.3 - Notice of Pending Deregistration K2022323203 [ ORAH GOLD ]', 1483.50, 'Expired', '00000000-0000-0000-0000-000000000000');

-- Update customer_id where customer names match existing customers
UPDATE public.sales_quotes 
SET customer_id = customers.id 
FROM public.customers 
WHERE sales_quotes.customer_name = customers.name;