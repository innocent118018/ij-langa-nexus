-- First, let's clean up any potential duplicates and insert customers if they don't exist
-- Insert customers in smaller batches with ON CONFLICT handling
INSERT INTO public.customers (name, email, phone, address, status, accounts_receivable) VALUES
('Agriculture, Rural Development Land & Environmental Affairs', 'agriculture@gov.za', NULL, NULL, 'Active', 0.00),
('ALFA MUHY AUTO SPRAY PAINTING AND PANELBEATING', 'alfa@email.com', NULL, NULL, 'Active', 0.00),
('Alinda Jacob Jr', 'alinda@email.com', NULL, NULL, 'Active', 0.00),
('AZALE COMMUNICATIONS (PTY) LTD', 'azale@email.com', NULL, NULL, 'Active', 0.00),
('BATHO BAKOPANO DISABLED COMPOSED WAIST', 'batho@email.com', NULL, NULL, 'Active', 0.00),
('CHIEF EXECUTIVE OFFICER SOUTH AFRICAN NATIONAL ROADS AGENCY SOC LIMITED', 'ceo@sanral.co.za', NULL, NULL, 'Active', 0.00),
('Chulumanco Lilitha', 'chulumanco@email.com', NULL, NULL, 'Active', -720.37),
('Department of Public Works,Road And Transport', 'dpwrt@gov.za', NULL, NULL, 'Active', 0.00),
('ENTHA MEDIA', 'entha@email.com', NULL, NULL, 'Active', 0.00),
('ESKOM ROTEK INDUSTRIES 4230', 'eskom@email.com', NULL, NULL, 'Active', 0.00),
('FIKILE KUYENZEKA KUNGUMUSA', 'fikile@email.com', NULL, NULL, 'Active', 0.00),
('FREESTYLE KITCHEN AND CATERING', 'freestyle@email.com', NULL, NULL, 'Active', 0.00),
('Gauteng Department of e-Government', 'egov@gauteng.gov.za', NULL, NULL, 'Active', 0.00),
('George munyonga', 'george@email.com', NULL, NULL, 'Active', 0.00),
('Given', 'given@email.com', NULL, NULL, 'Active', 0.00),
('Global Business Solutions', 'global@email.com', NULL, NULL, 'Active', 18212.05),
('Highveld Worship Center', 'highveld@email.com', NULL, NULL, 'Active', 0.00),
('JAMA KAMNISI TRADING AND PROJECTS', 'jama@email.com', NULL, NULL, 'Active', 1575.48),
('JO CHILOANE', 'jo@email.com', NULL, NULL, 'Active', 23179.19),
('KHAYA LAMI TRAVEL AND TOURS', 'khaya@email.com', NULL, NULL, 'Active', 0.00),
('kuthele civil engineering and construction pty ltd', 'kuthele@email.com', NULL, NULL, 'Active', 0.00),
('M C MOTAU TRADING', 'mcmotau@email.com', NULL, NULL, 'Active', 0.00),
('MABS MEDIA AGENCY', 'mabs@email.com', NULL, NULL, 'Active', 5875.20),
('Madidi Property Management', 'madidi@email.com', NULL, NULL, 'Active', 0.00),
('MANYUNYU LOGISTICS', 'manyunyu@email.com', NULL, NULL, 'Active', 0.00)
ON CONFLICT (name) DO UPDATE SET 
  accounts_receivable = EXCLUDED.accounts_receivable,
  email = EXCLUDED.email,
  status = EXCLUDED.status;