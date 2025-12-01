-- Insert new one-time purchase products for company registration packages

-- Popular Packages
INSERT INTO services (name, category, subcategory, price, unit, billing, description, features, code, vat_inclusive, is_active) VALUES
('Company Registration Package - Starter', 'Popular Packages', NULL, 1670, 'once', 'once', 'Essential company registration package', 
 '["New Company", "Bank Ready", "Share Certificates", "Public Officer Appoint.", "Tax Clearance Cert."]'::jsonb, 
 'PKG-STARTER', true, true),

('Company Registration Package - Tender', 'Popular Packages', NULL, 3040, 'once', 'once', 'Complete tender-ready package', 
 '["New Company", "Bank Ready", "Share Certificates", "Beneficial Ownership", "Public Officer Appoint.", "Tax Clearance Cert.", "BEE Affidavit", "CSD Registration"]'::jsonb, 
 'PKG-TENDER', true, true),

('Company Registration Package - Premium', 'Popular Packages', NULL, 6155, 'once', 'once', 'Premium package with website and marketing', 
 '["New Company", "Bank Ready", "Share Certificates", "Beneficial Ownership", "Public Officer Appoint.", "Tax Clearance Cert.", "BEE Affidavit", "CSD Registration", "Standard Website", "Google Map", "SEO", "Social Media Links", "User Access Control", "500 Business Cards"]'::jsonb, 
 'PKG-PREMIUM', true, true),

('Build Your Own Package', 'Popular Packages', NULL, 0, 'custom', 'once', 'Customizable company package', 
 '["New Company", "Beneficial Ownership", "BEE Affidavit", "VAT Registration", "Share Certificates", "Tax Clearance", "Website", "Logo Design - Professional", "Trademarks", "Import/Export", "Business Plans", "Domain Name Reg", "Email Setup", "Business Cards", "More..."]'::jsonb, 
 'PKG-CUSTOM', true, true),

-- Industry Packages
('Transport Package', 'Industry Packages', NULL, 3040, 'once', 'once', 'Transport industry registration package', 
 '["New Company", "Bank Ready", "Share Certificates", "Beneficial Ownership", "Public Officer Appoint.", "Tax Clearance Cert.", "BEE Affidavit", "CSD Registration"]'::jsonb, 
 'IND-TRANSPORT', true, true),

('Construction Package', 'Industry Packages', NULL, 4290, 'once', 'once', 'Construction industry registration package', 
 '["New Company", "Bank Ready", "Share Certificates", "Beneficial Ownership", "Public Officer Appoint.", "Tax Clearance Cert.", "BEE Affidavit", "CSD Registration", "CIBD (1 Class Incld)"]'::jsonb, 
 'IND-CONSTRUCTION', true, true),

('Security (PSIRA) Package', 'Industry Packages', NULL, 5620, 'once', 'once', 'Security industry registration package', 
 '["New Company", "Bank Ready", "Share Certificates", "Public Officer Appoint.", "Tax Clearance Cert.", "Mandatory Design Elements", "Authorisation Resolution", "Operational Readiness Resolution", "Security Business Plan"]'::jsonb, 
 'IND-SECURITY', true, true),

-- Company Registrations
('Pty Registration', 'Company Registrations', NULL, 590, 'once', 'once', 'Register a Pty Ltd company (3-5 Days)', 
 '["Complete registration", "CIPC filing", "Registration certificate"]'::jsonb, 
 'REG-PTY', true, true),

('Nonprofit Company Registration', 'Company Registrations', NULL, 1500, 'once', 'once', 'Register a Non Profit company (3-7 Days)', 
 '["Non-profit registration", "CIPC filing", "Registration certificate"]'::jsonb, 
 'REG-NPC', true, true),

('Incorporation Registration', 'Company Registrations', NULL, 1500, 'once', 'once', 'Register an Incorporation (21 Days)', 
 '["Personal liability company", "CIPC filing", "Registration certificate"]'::jsonb, 
 'REG-INC', true, true),

('Company Name Only', 'Company Registrations', NULL, 250, 'once', 'once', 'Reserve company name (1 Day)', 
 '["Name reservation", "COR9.1 form"]'::jsonb, 
 'REG-NAME', true, true),

-- Company Amendments
('Company Name Change', 'Company Amendments', NULL, 650, 'once', 'once', 'Change company name (1-2 Days)', 
 '["Name change filing", "Updated certificates"]'::jsonb, 
 'AMD-NAME', true, true),

('Director/Shareholder Changes', 'Company Amendments', NULL, 850, 'once', 'once', 'Update directors or shareholders (1-7 Days)', 
 '["Change of director/shareholder", "CIPC filing", "Updated documents"]'::jsonb, 
 'AMD-DIRECTOR', true, true),

('CC Changes', 'Company Amendments', NULL, 390, 'once', 'once', 'Close Corporation changes', 
 '["CC amendments", "CIPC filing"]'::jsonb, 
 'AMD-CC', true, true),

('Registered Address Change', 'Company Amendments', NULL, 390, 'once', 'once', 'Change registered address (15 Days)', 
 '["Address change", "CIPC filing"]'::jsonb, 
 'AMD-ADDRESS', true, true),

('Print Share Certificates', 'Company Amendments', NULL, 390, 'once', 'once', 'Professional share certificates (Immediate)', 
 '["Printed certificates", "Company seal"]'::jsonb, 
 'AMD-SHARES', true, true),

('Shareholders Agreement', 'Company Amendments', NULL, 990, 'once', 'once', 'Draft shareholders agreement (1 Day)', 
 '["Legal agreement", "Customized terms"]'::jsonb, 
 'AMD-AGREEMENT', true, true),

('MOI Changes', 'Company Amendments', NULL, 990, 'once', 'once', 'Memorandum of Incorporation amendments (21 Days)', 
 '["MOI amendments", "CIPC filing"]'::jsonb, 
 'AMD-MOI', true, true),

('Change Financial Year End', 'Company Amendments', NULL, 390, 'once', 'once', 'Update financial year end (1 Day)', 
 '["Year-end change", "CIPC filing"]'::jsonb, 
 'AMD-YEAREND', true, true),

('Change CIPC Contact Details', 'Company Amendments', NULL, 390, 'once', 'once', 'Update CIPC contact information', 
 '["Contact update", "CIPC filing"]'::jsonb, 
 'AMD-CONTACT', true, true),

('Company Conversion', 'Company Amendments', NULL, 1500, 'once', 'once', 'Convert company type (2-4 Weeks)', 
 '["Company conversion", "Legal documents", "CIPC filing"]'::jsonb, 
 'AMD-CONVERT', true, true),

-- SARS Registrations
('Tax Clearance Certificate', 'SARS Registrations', NULL, 490, 'once', 'once', 'Obtain tax clearance (1-7 Days)', 
 '["Tax clearance", "Good standing certificate"]'::jsonb, 
 'SARS-TAX-CLEAR', true, true),

('VAT Registration Service', 'SARS Registrations', NULL, 2500, 'once', 'once', 'VAT registration with SARS (6-8 weeks)', 
 '["VAT registration", "Vendor number"]'::jsonb, 
 'SARS-VAT-REG', true, true),

('Import Export Licence', 'SARS Registrations', NULL, 2850, 'once', 'once', 'Import/Export licence (2 Weeks)', 
 '["Import/export code", "Customs registration"]'::jsonb, 
 'SARS-IMPORT-EXPORT', true, true),

('Public Officer Appointment Service', 'SARS Registrations', NULL, 590, 'once', 'once', 'Appoint public officer (6-8 weeks)', 
 '["Public officer appointment", "SARS notification"]'::jsonb, 
 'SARS-PUBLIC-OFFICER', true, true),

('PAYE and UIF Registration', 'SARS Registrations', NULL, 1250, 'once', 'once', 'PAYE and UIF registration (1-3 Days)', 
 '["PAYE registration", "UIF registration"]'::jsonb, 
 'SARS-PAYE-UIF', true, true),

('SDL Registration Service', 'SARS Registrations', NULL, 990, 'once', 'once', 'Skills Development Levy registration (1-3 Days)', 
 '["SDL registration", "SARS filing"]'::jsonb, 
 'SARS-SDL', true, true),

-- Other Registrations
('Annual Returns Filing', 'Other Registrations', NULL, 190, 'once', 'once', 'Annual returns filing (2 days) + CIPC fees', 
 '["Annual return", "CIPC filing"]'::jsonb, 
 'OTHER-ANNUAL', true, true),

('BEE Affidavit', 'Other Registrations', NULL, 390, 'once', 'once', 'BEE affidavit certificate (1 Day)', 
 '["BEE affidavit", "Sworn statement"]'::jsonb, 
 'OTHER-BEE', true, true),

('CSD Registration Service', 'Other Registrations', NULL, 390, 'once', 'once', 'Central Supplier Database registration (1 Day)', 
 '["CSD registration", "Supplier number"]'::jsonb, 
 'OTHER-CSD', true, true),

('Beneficial Ownership Submission', 'Other Registrations', NULL, 590, 'once', 'once', 'Beneficial ownership filing (1-7 Days)', 
 '["BO submission", "CIPC filing"]'::jsonb, 
 'OTHER-BO', true, true),

('PSIRA Assistance', 'Other Registrations', NULL, 5620, 'once', 'once', 'PSiRA registration assistance', 
 '["PSiRA application", "Security business registration"]'::jsonb, 
 'OTHER-PSIRA', true, true),

('Trademark Registration', 'Other Registrations', NULL, 2200, 'once', 'once', 'Trademark registration (10 Days to Receipt)', 
 '["Trademark search", "Application filing"]'::jsonb, 
 'OTHER-TRADEMARK', true, true),

('Restore Company', 'Other Registrations', NULL, 2580, 'once', 'once', 'Restore deregistered company (21 Days)', 
 '["Company restoration", "CIPC filing"]'::jsonb, 
 'OTHER-RESTORE', true, true),

('CIDB Registration Service', 'Other Registrations', NULL, 1250, 'once', 'once', 'Construction Industry Development Board registration', 
 '["CIDB registration", "Grading application"]'::jsonb, 
 'OTHER-CIDB', true, true),

('NHBRC Registration Service', 'Other Registrations', NULL, 1990, 'once', 'once', 'National Home Builders Registration Council (Suspended)', 
 '["NHBRC application"]'::jsonb, 
 'OTHER-NHBRC', true, false),

('Business Plans', 'Other Registrations', NULL, 3500, 'once', 'once', 'Professional business plan (2 Weeks)', 
 '["Market research", "Financial projections", "Executive summary"]'::jsonb, 
 'OTHER-BP', true, true),

('Business Profiles', 'Other Registrations', NULL, 890, 'once', 'once', 'Company profile document (7 Days)', 
 '["Company profile", "Marketing document"]'::jsonb, 
 'OTHER-PROFILE', true, true),

('Web Design Service', 'Other Registrations', NULL, 990, 'once', 'once', 'Website design (5 pages) (7 Days)', 
 '["5-page website", "Responsive design", "Basic SEO"]'::jsonb, 
 'OTHER-WEB', true, true);