-- Drop the existing table if it exists and recreate it correctly
DROP TABLE IF EXISTS public.sales_quotes;

-- Create sales_quotes table with correct structure
CREATE TABLE public.sales_quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_number TEXT NOT NULL,
  issue_date DATE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_id UUID,
  description TEXT NOT NULL,
  amount NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Active',
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sales_quotes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for sales quotes
CREATE POLICY "Administrators can manage all sales quotes" 
ON public.sales_quotes 
FOR ALL 
USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Users can manage their own sales quotes" 
ON public.sales_quotes 
FOR ALL 
USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_sales_quotes_updated_at
  BEFORE UPDATE ON public.sales_quotes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert all the sales quotes data from the provided list
INSERT INTO public.sales_quotes (quote_number, issue_date, customer_name, description, amount, status) VALUES
('2020752745', '2025-09-20', 'Soul keepers', 'Stretch Tent Gazebo 5m x5m + 50 Blank Chairs + 1 Steel Foldable table', 850.00, 'Active'),
('2020752744', '2025-09-18', 'NKUYAHAE HOLDINGS (PTY)LTD', 'Renewal SARS Tax Clearance ,CIPC BBBEE', 793.50, 'Accepted'),
('2020752743', '2025-09-15', 'WANDILE KITCHEN', 'File Annual Returns and Declarations of Beneficial Ownership of WANDILE KITCHEN', 1253.50, 'Active'),
('2020752742', '2025-09-12', 'Global Business Solutions', 'MY COMPLIANCE PROFILE SHELVING SA PMB (PTY) LTD', 59225.00, 'Expired'),
('2020752741', '2025-09-11', 'NATHAN N NYANGUWO MEDICAL ORTHOTIST AND PROSTHETIST', 'Vat Returns Submissions of ITR12/ IPR5 NYANGUWO, NN', 1035.00, 'Accepted'),
('2020752740', '2025-09-10', 'Madidi Property Management', 'CIPC Director Amendments for Enterprise Amabutho', 1656.00, 'Accepted'),
('2020752739', '2025-09-08', 'Global Business Solutions', 'Vat Returns Submissions DV HYDRAULIC TECH ENGINEERING', 8027.00, 'Accepted'),
('2020752738', '2025-09-04', 'Chulumanco Lilitha', 'MY COMPLIANCE PROFILE SEMBO COLLECTIVE', 575.00, 'Accepted'),
('2020752737', '2025-09-04', 'Madidi Property Management', 'MY COMPLIANCE PROFILE M.M. Shangase', 4640.25, 'Accepted'),
('2020752736', '2025-09-04', 'Madidi Property Management', 'MY COMPLIANCE PROFILE', 0.00, 'Expired'),
('2020752735', '2025-09-03', 'NKUYAHAE HOLDINGS (PTY)LTD', 'MY COMPLIANCE PROFILE Nkuyahae Holdings', 1886.00, 'Accepted'),
('2020752734', '2025-09-03', 'Global Business Solutions', 'MY COMPLIANCE PROFILE ZAKHELE PROPERTY HOLDING', 609220.55, 'Expired'),
('2020752733', '2025-09-02', 'Madidi Property Management', 'COR, Tax Pin Issued', 1362.75, 'Accepted'),
('2020752732', '2025-09-01', 'TECHLOGIX', 'Billable Invoice Coida', 287.50, 'Accepted'),
('2020752731', '2025-08-29', 'KHAYA LAMI TRAVEL AND TOURS', 'MY COMPLIANCE PROFILE KHAYA LAMI TRAVEL AND TOURS', 1536.40, 'Accepted'),
('2020752730', '2025-08-29', 'Madidi Property Management', 'MY COMPLIANCE PROFILE MADIDI PROPERTY MANAGEMENT', 2216.05, 'Accepted'),
('2020752729', '2025-08-26', 'FEZEKA CIVIL ENGINEERING AND CONSTRUCTION', 'Main', 678.50, 'Accepted'),
('2020752728', '2025-08-26', 'NSIBANDE MHURI TRADING AND PROJEC', 'Maintain Registered Details', 172.50, 'Accepted'),
('2020752727', '2025-08-26', 'Global Business Solutions', 'Shelf Company Ij Langa Consulting 1-Minute Timeframe', 26093.50, 'Expired'),
('2020752726', '2025-08-06', 'SP NGOBESE', 'Tax Compliance Status Request Sifiso Phinias Ngobese 0805643251', 563.50, 'Accepted'),
('2020752725', '2025-08-05', 'Global Business Solutions', 'MY COMPLIANCE PROFILE Active Vision Solutions', 15608.82, 'Expired'),
('2020752724', '2025-08-01', 'Sembo Collective', 'MY COMPLIANCE PROFILE', 678.50, 'Accepted'),
('2020752723', '2025-07-31', 'Chulumanco Lilitha', 'B-BBEE CERTIFICATE FOR EXEMPTED MICRO ENTERPRISES Renewal', 207.00, 'Accepted'),
('2020752722', '2025-07-31', 'NSIBANDE MHURI TRADING AND PROJEC', 'Maintain Registered Details', 736.00, 'Expired'),
('2020752721', '2025-07-28', 'George munyonga', 'White Plastic Chairs', 196650.00, 'Expired'),
('2020752720', '2025-07-28', 'George munyonga', 'White Plastic Chairs', 571550.00, 'Expired'),
('2020752719', '2025-07-26', 'Global Business Solutions', 'Reduce Assessment nkateko clyde SARS Debt Settlement & Compliance Package', 28138.10, 'Expired'),
('2020752718', '2025-07-26', 'Global Business Solutions', 'Submission of Tax Returns JRL COMMUNICATIONS (PTY) LTD', 575.00, 'Expired'),
('2020752717', '2025-07-26', 'Global Business Solutions', 'Request for Reasons', 2990.00, 'Expired'),
('2020752716', '2025-07-24', 'STARLITE EDUCATORS', 'Form CoR 40.3 - Notice of Pending Deregistration GOLDEN HARMONY FOODS 2023/650340/07', 1483.50, 'Expired'),
('2020752715', '2025-07-24', 'STARLITE EDUCATORS', 'Form CoR 40.3 - Notice of Pending Deregistration STARLITE EDUCATORS (Pty) Ltd (2017/400737/07)', 1483.50, 'Expired'),
('STE-001', '2025-07-24', 'STARLITE EDUCATORS', 'Form CoR 40.3 - Notice of Pending Deregistration K2022323203 [ ORAH GOLD ]', 1483.50, 'Expired'),
('2020752714', '2025-07-23', 'Chulumanco Lilitha', 'CLEGG APPLETON (Pty) Ltd (2021/389526/07) file Beneficial Ownership and Securities Register declarations', 1081.00, 'Accepted'),
('2020752713', '2025-07-23', 'Given', 'VoIP Trunk - 4 channels - R110.00 (R95.65 + VAT)', 2536.50, 'Expired'),
('2020752712', '2025-07-23', 'JO CHILOANE', 'Income Tax Return for Individuals (Income Tax Act, No. 58 of 1962, as amended) 0080053804', 2680.98, 'Accepted'),
('2020752711', '2025-07-23', 'REDEEM GROUP', 'RMI Registration', 14748.76, 'Expired'),
('2020752709', '2025-07-21', 'TECHLOGIX', 'Income Tax Return for Individuals (Income Tax Act, No. 58 of 1962, as amended) 3648686156', 258.75, 'Expired'),
('2020752710', '2025-07-15', 'Sthuthamagade Trading and Projects Cc', 'CIPC Director Amendments for Enterprise STHUTHAMAGADE TRADING AND PROJECTS CC', 1046.50, 'Accepted'),
('2020752708', '2025-07-14', 'Musawenkosi Msibi', 'UIF Registration', 575.00, 'Expired'),
('2020752707', '2025-07-14', 'Sibongile Molefi', 'Submission of Tax Returns', 1914.98, 'Expired'),
('RFQ-150001282', '2025-07-03', 'CHIEF EXECUTIVE OFFICER SOUTH AFRICAN NATIONAL ROADS AGENCY SOC LIMITED', 'RFQ: APPOINTMENT OF A SERVICE PROVIDER FOR THE SUPPLY AND DELIVERY OF SOCCER ITEMS AND REFRESHMENTS', 539798.50, 'Active'),
('2020752706', '2025-07-01', 'JAMA KAMNISI TRADING AND PROJECTS', 'MY COMPLIANCE PROFILE MAKULUMANE HGM GENERAL DEALERS', 1828.50, 'Expired'),
('2020752705', '2025-06-30', 'TECHLOGIX', 'MORENA KE LETHABO TRAINING CENTRE', 2252.74, 'Accepted'),
('2020752704', '2025-06-27', 'JAMA KAMNISI TRADING AND PROJECTS', 'MAKULUMANE HGM GENERAL DEALERS', 920.00, 'Accepted'),
('2020752703', '2025-06-27', 'Chulumanco Lilitha', 'Tax Compliance Status Request MBALWANE BY V', 695.75, 'Accepted'),
('2020752702', '2025-06-26', 'NATHAN N NYANGUWO MEDICAL ORTHOTIST AND PROSTHETIST', 'Submitter Instatlation', 4896.15, 'Accepted'),
('2020752701', '2025-06-25', 'Global Business Solutions', 'XV THWALA Balance: 50154.54', 21361.25, 'Expired'),
('2020752700', '2025-06-19', 'NATHAN N NYANGUWO MEDICAL ORTHOTIST AND PROSTHETIST', 'Vat Registration ( 2018/363588/21 )', 3448.85, 'Accepted'),
('2020752699', '2025-06-17', 'Sthuthamagade Trading and Projects Cc', 'Term Service Contract', 817.69, 'Expired'),
('2020752698', '2025-06-14', 'NKUDU TRADING', 'Reintatement and Complience Profile', 1817.00, 'Expired'),
('2020752697', '2025-06-11', 'Global Business Solutions', 'RE: QUOTATION FOR FACILITATION OF SARS EXTENSION REQUEST (ISAAC KHOTA ENTREPRENEURS - 2018/294301/07)', 23000.00, 'Expired'),
('2020752696', '2025-06-03', 'JAMA KAMNISI TRADING AND PROJECTS', 'CIPC Director Amendments for Enterprise JAMA KAMNISI TRADING AND PROJECTS (Pty) Ltd', 345.00, 'Accepted'),
('2020752695', '2025-05-30', 'Msukaligwa Local Municipality', 'Supply and Delivery of A4 White Photocopy Paper – Mondi Rotatrim', 326140.00, 'Expired'),
('2020752694', '2025-05-29', 'Msukaligwa Local Municipality', 'Supply and Delivery of A4 White Photocopy Paper – Mondi Rotatrim', 65228.00, 'Expired'),
('2020752693', '2025-05-29', 'TECHLOGIX', 'MY COMPLIANCE PROFILE YOUTH ACCESS SOUTH AFRICA NPC', 2978.50, 'Accepted'),
('2020752692', '2025-05-28', 'SSL PROJECTS AND SUPPLY', 'Tax Compliance Status Request', 678.50, 'Accepted'),
('2020752691', '2025-05-27', 'SILVER STEIN', 'CSD & CIDB (CE)', 954.50, 'Expired'),
('2020752690', '2025-05-23', 'JAMA KAMNISI TRADING AND PROJECTS', 'Amendments', 839.50, 'Expired'),
('2020752689', '2025-05-21', 'Global Business Solutions', 'MAREBEYANE TRADING ENTERPRISE', 4081.35, 'Accepted'),
('38012033', '2025-05-20', 'Global Business Solutions', 'DV HYDRAULIC TECH ENGINEERING IRP6 Correction of R 215,160.50', 5750.00, 'Accepted'),
('38012032', '2025-05-20', 'Global Business Solutions', 'XABA FAMILY TRUST', 4025.00, 'Expired'),
('2020752688', '2025-05-20', 'Global Business Solutions', 'MLUNGISIMTHOBISI BUILDING AND RENOVATION', 10971.00, 'Expired'),
('38012031', '2025-05-13', 'Global Business Solutions', 'A1 Glass and Aluminium', 53762.50, 'Expired'),
('QUO-2020752687', '2025-05-12', 'Global Business Solutions', 'MD XABA Trading Name: MD XABA Registration Number: 8809075437083 Tax Reference: 0246233167', 4398.75, 'Expired'),
('QUO-2020752685', '2025-05-12', 'Global Business Solutions', 'DV HYDRAULIC TECH ENGINEERING', 24584.70, 'Accepted'),
('20250326', '2025-04-03', 'Sembo Collective', 'MY COMPLIANCE PROFILE SEMBO COLLECTIVE', 1138.50, 'Accepted'),
('38012030', '2025-03-24', 'FREESTYLE KITCHEN AND CATERING', 'MY COMPLIANCE PROFILE', 575.00, 'Expired'),
('38012029', '2025-03-24', 'Highveld Worship Center', 'Stretch Tent Gazebo 5m x10m Nonwaterproof', 816.50, 'Expired'),
('38012028', '2025-03-24', 'Suzan Ramapulane', 'Garage Motor Repais', 9093.05, 'Accepted'),
('38012027', '2025-03-11', 'THE NEW ST SAMPSON APOSTOLIC CHURCH', 'NPC Registration', 661.25, 'Accepted'),
('MLM38/01/2025', '2025-03-03', 'Msukaligwa Local Municipality', 'Request for qoutation supply and delivery of Cleaning Material', 271112.50, 'Expired'),
('MLM36/01/2025', '2025-03-03', 'Msukaligwa Local Municipality', 'Design and Construction of an Information Desk at the Main Entrance of Ermelo Civic Centre', 295868.87, 'Expired'),
('38012026', '2025-03-03', 'PRETTY HOPE SMITH', 'NOTICE OF REGISTRATION', 115.00, 'Accepted'),
('221', '2025-03-03', 'THOKOZA NHLANHLA INVESTMENTS', 'MY COMPLIANCE PROFILE 2022/646469/07', 2921.00, 'Accepted'),
('MLM37/01/2025', '2025-03-02', 'Msukaligwa Local Municipality', 'Request for qoutation supply and delivery of Twinsaver 1 Ply Toilet Paper (48 Rolls)', 331154.00, 'Expired'),
('219', '2025-03-02', 'JAMA KAMNISI TRADING AND PROJECTS', 'Address Changes for Companies and Close Corporations', 115.00, 'Accepted'),
('218', '2025-03-02', 'ORIS POULTRY AND GENERAL TRADING', 'Tax Compliance System and Debts Disputes', 3214.25, 'Expired'),
('185', '2025-02-27', 'THOKOZA NHLANHLA INVESTMENTS', 'OUTSTANDING ANNUAL RETURNS - THOKOZA NHLANHLA INVESTMENTS', 1426.00, 'Accepted'),
('WELLNESS-LAUNCH', '2025-02-25', 'Gauteng Department of e-Government', 'Quotation to provide a venue and catering for the launch of e-Gov wellness marathons and wellness hikes according to specification for Gauteng Department of e-Government.', 266800.00, 'Expired'),
('217', '2025-02-24', 'JAMA KAMNISI TRADING AND PROJECTS', 'Tax Compliance Status Request', 769.93, 'Accepted'),
('216', '2025-02-24', 'TSANTSABANE ENGINEERING SOLUTION PTY LTD', 'Rand Mutual Assurance Company Limited', 6242.67, 'Expired'),
('215', '2025-02-24', 'TSANTSABANE ENGINEERING SOLUTION PTY LTD', 'capture new organisation', 2202.48, 'Expired'),
('214', '2025-02-24', 'M C MOTAU TRADING', 'MY COMPLIANCE PROFILE 2016/088861/07', 833.75, 'Expired'),
('213', '2025-02-24', 'NTANDOSE TRADING AND PROJECTS', 'MY COMPLIANCE PROFILE 2012/086601/07', 1138.50, 'Accepted'),
('212', '2025-02-21', 'THE LINK GROUP', 'MY COMPLIANCE PROFILE', 2327.03, 'Expired'),
('211', '2025-02-20', 'Chulumanco Lilitha', 'MY COMPLIANCE PROFILE TSHALA CONCEPTS (PTY) LTD', 1150.00, 'Accepted'),
('210', '2025-02-18', 'BATHO BAKOPANO DISABLED COMPOSED WAIST', 'Reinstatentment', 1656.00, 'Expired'),
('209', '2025-02-18', 'M C MOTAU TRADING', 'Vat Registration', 2298.85, 'Expired'),
('208', '2025-02-17', 'YOWGATY', 'TCC', 563.50, 'Accepted'),
('207', '2025-02-15', 'PROJECTS MANAGEMENT UNIT (PTY) LTD', 'MY COMPLIANCE PROFILE', 1817.00, 'Expired'),
('206', '2025-02-13', 'VILLAGE CINEMA LINE', 'Outstanding Annual Returns - 2020 / 771168 / 07 Beneficial Ownership Declaration (BO)', 803.85, 'Expired'),
('205', '2025-02-12', 'THOKOZA SIYAVUMA CONSTRUCTION AND PROJECTS', 'Request for Information - Potential Suppliers/Service Providers (Grootvlei)', 5476.65, 'Accepted'),
('204', '2025-02-10', 'Chulumanco Lilitha', 'MY COMPLIANCE PROFILE Chulumanco Lilitha (PTY) LTD', 1150.00, 'Accepted'),
('203', '2025-02-06', 'Gauteng Department of e-Government', 'Request for Quotation to Supply and deliver branded security uniform for sixty-one (61) security officers (37 Males and 24 Females) according to specification for Gauteng Department of e-Government.', 270093.49, 'Expired'),
('202', '2025-01-30', 'SIPHALI', 'MY COMPLIANCE PROFILE', 2389.70, 'Accepted'),
('201', '2025-01-28', 'SHAKWANENG BUSINESS ENTERPRISE', 'MY COMPLIANCE PROFILE Registration Number: 2020/021271/07 Tax Reference: 9529350192', 2817.50, 'Expired'),
('200', '2025-01-28', 'THOKOZA SIYAVUMA CONSTRUCTION AND PROJECTS', 'MY COMPLIANCE PROFILE', 287.50, 'Expired'),
('199', '2025-01-28', 'Msukaligwa Local Municipality', 'Request for qoutation supply and delivery of (Re-advert) Camera and Accessories', 375328.22, 'Expired'),
('198', '2025-01-28', 'Chulumanco Lilitha', 're-instatement', 1596.18, 'Accepted'),
('197', '2025-01-20', 'ESKOM ROTEK INDUSTRIES 4230', 'Document Identifier 240-73269736 Enquiry number OLT2125996', 47397.25, 'Expired'),
('196', '2025-01-15', 'ORIS POULTRY AND GENERAL TRADING', 'Renewal SARS,CIPC AND BBBEE', 1574.35, 'Accepted'),
('195', '2025-01-14', 'TECHLOGIX', 'MY COMPLIANCE PROFILE', 1608.85, 'Expired'),
('194', '2025-01-13', 'TECHLOGIX', 'LUCID NATION (PTY) LTD', 803.85, 'Expired'),
('193', '2025-01-08', 'MDALUKWANE PROJECTS ENTERPRISE', 'Tax Compliance System', 563.50, 'Accepted'),
('192', '2025-01-06', 'NSIBANDE MHURI TRADING AND PROJEC', 'MY COMPLIANCE PROFILE', 402.50, 'Accepted'),
('CL-001', '2025-01-05', 'Chulumanco Lilitha', 'VUYOKAZI MNYANI has been allotted 1000 Ordinary Shares.', 665.85, 'Accepted'),
('191', '2025-01-03', 'THE LINK GROUP', 'B-BBEE certificate Renewal', 920.00, 'Expired'),
('190', '2024-12-24', 'Chulumanco Lilitha', 'MY COMPLIANCE PROFILE Registration Number: 2018/472183/07 Tax Reference: 9336586194', 1150.00, 'Accepted');

-- Link quotes to customers by updating customer_id where customer names match
UPDATE public.sales_quotes 
SET customer_id = customers.id 
FROM public.customers 
WHERE sales_quotes.customer_name = customers.name;