-- Add Company Registration Popular Packages
INSERT INTO services (name, description, price, category, processing_time, requirements, is_active, is_popular) VALUES

-- Company Registration Popular Packages
('Company Registration Package - Starter', 'New Company, Bank Ready, Share Certificates, Public Officer Appoint., Tax Clearance Cert.', 1670, 'company-registration-packages', '5-10 Working Days', 'Company details, Director information, Registered address', true, false),

('Company Registration Package - Tender', 'New Company, Bank Ready, Share Certificates, Beneficial Ownership, Public Officer Appoint., Tax Clearance Cert., BEE Affidavit, CSD Registration', 3040, 'company-registration-packages', '5-10 Working Days', 'Company details, Director information, Registered address, BEE documentation', true, false),

('Company Registration Package - Premium', 'New Company, Bank Ready, Share Certificates, Beneficial Ownership, Public Officer Appoint., Tax Clearance Cert., BEE Affidavit, CSD Registration, Standard Website, Google Map, SEO, Social Media Links, User Access Control, 500 Business Cards', 6155, 'company-registration-packages', '5-10 Working Days', 'Company details, Director information, Registered address, Website requirements, Business card design', true, true),

('Build Your Own Package', 'Customizable package including: New Company, Beneficial Ownership, BEE Affidavit, VAT Registration, Share Certificates, Tax Clearance, Website, Logo Design - Professional, Trademarks, Import/Export, Business Plans, Domain Name Reg, Email Setup, Business Cards, and more...', 0, 'company-registration-packages', 'Variable', 'Custom requirements based on selected services', true, false),

-- Industry Packages
('Company Registration Package - Transport', 'New Company, Bank Ready, Share Certificates, Beneficial Ownership, Public Officer Appoint., Tax Clearance Cert., BEE Affidavit, CSD Registration', 3040, 'industry-packages', '5-10 Working Days', 'Company details, Director information, Transport-specific documentation', true, false),

('Company Registration Package - Construction', 'New Company, Bank Ready, Share Certificates, Beneficial Ownership, Public Officer Appoint., Tax Clearance Cert., BEE Affidavit, CSD Registration, CIBD (1 Class Incld)', 4290, 'industry-packages', '5-10 Working Days', 'Company details, Director information, CIBD requirements', true, false),

('Company Registration Package - Security (PSIRA)', 'New Company, Bank Ready, Share Certificates, Public Officer Appoint., Tax Clearance Cert., Mandatory Design Elements, Authorisation Resolution, Operational Readiness Resolution, Security Business Plan', 5620, 'industry-packages', '5-10 Working Days', 'Company details, Director information, PSIRA requirements, Security business plan', true, false),

-- Company Registrations
('Pty Registration', 'Register a new Proprietary Limited Company', 590, 'company-registrations', '3-5 Days', 'Company name, Director details, MOI', true, false),

('Nonprofit Company Registration', 'Register a Non Profit Company', 1500, 'company-registrations', '3-7 Days', 'Non-profit documentation, MOI, Board members', true, false),

('Incorporation Company Registration', 'Register an Incorporation', 1500, 'company-registrations', '21 Days', 'Incorporation documentation, MOI', true, false),

('Register Name Only', 'Company Name Only Registration', 250, 'company-registrations', '1 Day', 'Proposed company name', true, false),

-- Company Amendments
('Company Name Change', 'Change existing company name', 650, 'company-amendments', '1-2 Days', 'New name preference, existing company details', true, false),

('Director Changes and Shareholders', 'Director/Shareholder changes', 850, 'company-amendments', '1-7 Days', 'New director/shareholder details, resolutions', true, false),

('CC Changes', 'Close Corporation Changes', 390, 'company-amendments', 'Variable', 'CC details, required changes', true, false),

('Registered Address Change', 'Change company registered address', 390, 'company-amendments', '15 Days', 'New address details, company information', true, false),

('Share Certificate Printing', 'Print Share Certificates', 390, 'company-amendments', 'Immediate', 'Shareholder details, share structure', true, false),

('Shareholders Agreement', 'Draft Shareholders Agreement', 990, 'company-amendments', '1 Day', 'Shareholder details, agreement terms', true, false),

('MOI Changes', 'Memorandum of Incorporation Changes', 990, 'company-amendments', '21 Days', 'Required changes, company details', true, false),

('Financial Year End Change', 'Change Financial Year End', 390, 'company-amendments', '1 Day', 'New financial year end date', true, false),

('CIPC Contact Change', 'Change CIPC Contact Details', 390, 'company-amendments', 'Variable', 'New contact details', true, false),

('Company Conversion', 'Convert company structure', 1500, 'company-amendments', '2-4 Weeks', 'Conversion requirements, company details', true, false),

-- SARS Registrations
('Tax Clearance Certificate', 'Obtain Tax Clearance Certificate', 490, 'sars-registrations', '1-7 Days', 'Company details, tax compliance documents', true, false),

('VAT Registration', 'Register for VAT with SARS', 2500, 'sars-registrations', '6-8 weeks', 'Company details, financial projections', true, false),

('Import Export Licence', 'Obtain Import/Export Licence', 2850, 'sars-registrations', '2 Weeks', 'Business details, trade requirements', true, false),

('Public Officer Appointment', 'Appoint Public Officer', 590, 'sars-registrations', '6-8 weeks', 'Officer details, company information', true, false),

('PAYE and UIF Registration', 'Register for PAYE and UIF', 1250, 'sars-registrations', '1-3 Days', 'Employee details, payroll information', true, false),

('SDL Registration', 'Skills Development Levy Registration', 990, 'sars-registrations', '1-3 Days', 'Employee details, training requirements', true, false),

-- Professional Rates
('Consultation Services', 'Professional consultation per hour', 1500, 'professional-rates', 'Per Hour', 'Consultation requirements', true, false),

('Partners Rate', 'Partners professional rate per hour', 1000, 'professional-rates', 'Per Hour', 'Professional services required', true, false),

('Accounting Officers/Tax Consultants Rate', 'Accounting Officers/Tax Consultants rate per hour', 650, 'professional-rates', 'Per Hour', 'Professional services required', true, false),

-- Individual Taxation Services
('Notice of Objection (NOO)', 'File Notice of Objection with SARS', 750, 'individual-taxation', 'Variable', 'Tax assessment, objection grounds', true, false),

('Notice of Correction (NOD)', 'File Notice of Correction', 875, 'individual-taxation', 'Variable', 'Tax return details, corrections required', true, false),

('Notice of Appeal (NOA)', 'File Notice of Appeal to SARS', 1250, 'individual-taxation', 'Variable', 'Appeal grounds, supporting documents', true, false),

('ITR12 - Salary Case Under R250,000', 'Income Tax Return for salary under R250,000', 500, 'individual-taxation', 'Variable', 'IRP5, bank statements', true, false),

('ITR12 - Salary Case with Allowances', 'Income Tax Return for salary with allowances and deductions', 1750, 'individual-taxation', 'Variable', 'IRP5, allowance details, supporting documents', true, false),

('ITR12 - Directors/Members/Sole Trader', 'Income Tax Return for Directors/Members/Sole Traders', 1750, 'individual-taxation', 'Variable', 'Financial statements, business records', true, false),

('Submission of Review/Audit Documents (SAD)', 'Submit Review/Audit Documents', 500, 'individual-taxation', 'Variable', 'Audit documents, financial records', true, false),

('Statement of Liabilities Preparation (SAL)', 'Prepare Statement of Liabilities and Reconcile Income Statements', 850, 'individual-taxation', 'Variable', 'Financial records, liability details', true, false),

('Travel Logbook Compilation (TLOG)', 'Compile Travel Logbook for tax purposes', 1000, 'individual-taxation', 'Variable', 'Travel records, vehicle details', true, false),

('Prepare Annexure/Rental Schedule (ANNX)', 'Prepare Annexure and Rental Schedule Income Statements', 1000, 'individual-taxation', 'Variable', 'Rental records, property details', true, false),

('Capital Gains Tax Compilation (CGT)', 'Compile Capital Gains Tax calculations', 850, 'individual-taxation', 'Variable', 'Asset disposal records, valuations', true, false),

('Tax Audits (TAUDITS)', 'Handle Tax Audits - Income Tax, PAYE, SDL, UIF, VAT, WHT', 650, 'individual-taxation', 'Variable', 'All relevant tax records', true, false),

-- Business Entities Services
('IT77 - Administration Details Update', 'Update administration details with SARS', 750, 'business-entities', 'Variable', 'Company details, updated information', true, false),

('IT77 (LET) - Deregistration', 'Deregistration as taxpayer', 1500, 'business-entities', 'Variable', 'Company details, deregistration requirements', true, false),

('ITR14 - Dormant Company', 'Income Tax Return for Dormant Company', 500, 'business-entities', 'Variable', 'Company details, dormant status confirmation', true, false),

('ITR14 - Under R1 Million (Micro)', 'Income Tax Return for companies under R1 Million', 1200, 'business-entities', 'Variable', 'Financial statements, company records', true, false),

('ITR14 - Under R14 Million (Small)', 'Income Tax Return for companies under R14 Million', 1850, 'business-entities', 'Variable', 'Financial statements, company records', true, false),

('ITR14 - Over R15 Million (Med/Large)', 'Income Tax Return for companies over R15 Million', 2450, 'business-entities', 'Variable', 'Audited financial statements, company records', true, false),

('IRP6 - Provisional Tax Non Trading', 'Provisional Tax Return for Non Trading entities', 400, 'business-entities', 'Variable', 'Previous year tax details', true, false),

('IRP6 - Provisional Tax 1st', 'First Provisional Tax Return', 650, 'business-entities', 'Variable', 'Financial projections, previous year details', true, false),

('IRP6 - Provisional Tax 2nd', 'Second Provisional Tax Return', 1000, 'business-entities', 'Variable', 'Current year financials, projections', true, false),

('IRP6(3) - Additional Provisional Tax', 'Additional Provisional Tax Return', 500, 'business-entities', 'Variable', 'Additional income details', true, false),

('IT12TR - Trust Returns', 'Income Tax Return for All Trusts', 1800, 'business-entities', 'Variable', 'Trust deed, financial records', true, false),

('IT12TRD - Trust Returns Dormant', 'Income Tax Return for Dormant Trusts', 950, 'business-entities', 'Variable', 'Trust deed, dormant status confirmation', true, false),

('DTR02 - Dividends Tax Return', 'Dividends Tax Return and Resolution', 950, 'business-entities', 'Variable', 'Dividend details, company resolutions', true, false),

('IT14SD - Supplementary Declaration', 'Supplementary Declaration Return', 1250, 'business-entities', 'Variable', 'Additional income/expense details', true, false),

('Tax Compliance Certificate (TCS)', 'Tax Compliance Certificate for Good Standing/Tender', 950, 'business-entities', 'Variable', 'Company tax compliance records', true, false),

('IT96 - Deferred Payment Arrangement', 'Arrangement for deferred payment of Income Tax', 750, 'business-entities', 'Variable', 'Financial hardship documentation, payment proposal', true, false),

('E-filing Registration', 'SARS eFiling Registration', 250, 'business-entities', 'Variable', 'Company/individual details', true, false),

('Tax Payment Processing', 'Payment of Provisional Tax/Assessed Tax', 110, 'business-entities', 'Immediate', 'Tax assessment, payment details', true, false),

-- Employee Tax Services
('EMP101 - Employer Registration', 'Registration as Employer for Tax, SDL and UIF', 1850, 'employee-tax', 'Variable', 'Company details, employee information', true, false),

('EMP123T - Employer Cancellation', 'Cancellation of Registration as Employer', 1200, 'employee-tax', 'Variable', 'Final employee details, closure requirements', true, false),

('IRP3 - Tax Deduction Directive', 'Request for Tax Deduction Directive', 850, 'employee-tax', 'Variable', 'Employee details, deduction requirements', true, false),

('IRP5/IT3 - Employee Tax Certificates', 'Employee Tax Certificates and General Information Returns', 375, 'employee-tax', 'Variable', 'Employee payroll details', true, false),

('EMP501 - Employee Tax Reconciliation', 'Employee Tax Reconciliation', 750, 'employee-tax', 'Variable', 'Annual payroll records', true, false),

('EMP201 - Monthly Returns', 'Employee Tax/SDL and UIF Monthly Returns', 650, 'employee-tax', 'Variable', 'Monthly payroll details', true, false),

('Tax Admin Updates (TADMIN)', 'Update bank details/admin changes at SARS', 375, 'employee-tax', 'Variable', 'Updated company information', true, false),

('Payroll Taxes Objection (EMPSA)', 'Payroll Taxes Objection and Reconstruction', 850, 'employee-tax', 'Variable', 'Payroll records, objection grounds', true, false),

-- VAT Services
('VAT101 - VAT Registration', 'Register for Value Added Tax', 1500, 'vat-services', 'Variable', 'Business details, financial projections', true, false),

('VAT201 - VAT Returns', 'Monthly/Bi-monthly VAT Returns', 700, 'vat-services', 'Variable', 'Sales and purchase records', true, false),

-- UIF Services
('UF1 - UIF Registration', 'UIF Registration via UFiling', 850, 'uif-services', 'Variable', 'Employee details, company information', true, false),

('UF2 - Monthly UIF Returns', 'Monthly UIF Declaration Returns', 475, 'uif-services', 'Variable', 'Monthly employee details', true, false),

('UF19 - UIF Contribution Returns', 'Monthly UIF Contribution Returns', 400, 'uif-services', 'Variable', 'Employee contribution details', true, false),

-- Accounting Services
('Accounting Officers Certificate', 'Confirmation of Earnings Certificate', 1000, 'accounting-services', 'Variable', 'Financial records, earnings details', true, false),

('EME/QSE Affidavits', 'Exempted Micro Enterprise/Qualifying Small Enterprise Affidavits', 500, 'accounting-services', 'Variable', 'Company financial details', true, false),

-- Annual Administration Fees
('AAF1 - Main Trading Entity', 'Annual Administration Fee for Main Trading Company/CC', 650, 'annual-admin', 'Annual', 'Company records maintenance', true, false),

('AAF2 - 2nd Trading Entity', 'Annual Administration Fee for 2nd Trading Company/CC', 350, 'annual-admin', 'Annual', 'Company records maintenance', true, false),

('AAF3 - 3rd Trading Entity', 'Annual Administration Fee for 3rd Trading Company/CC/Trust/Partnership', 250, 'annual-admin', 'Annual', 'Company records maintenance', true, false),

('AAF4 - Dormant Entity', 'Annual Administration Fee for Dormant Company/CC', 250, 'annual-admin', 'Annual', 'Dormant entity maintenance', true, false),

-- Payroll Administration Services
('Payroll 1-10 Employees', 'Payroll Administration for 1-10 employees', 450, 'payroll-admin', 'Monthly', 'Employee details, payroll information', true, false),

('Payroll 11-50 Employees', 'Payroll Administration for 11-50 employees', 350, 'payroll-admin', 'Monthly', 'Employee details, payroll information', true, false),

('Payroll 50-100 Employees', 'Payroll Administration for 50-100 employees', 250, 'payroll-admin', 'Monthly', 'Employee details, payroll information', true, false),

('Payroll 100-500 Employees', 'Payroll Administration for 100-500 employees', 150, 'payroll-admin', 'Monthly', 'Employee details, payroll information', true, false),

('Employment Contracts', 'Draft Employment Contracts to specification', 0, 'payroll-admin', 'Variable', 'Employment terms, company policies', true, false),

-- CIPC Services (detailed breakdown)
('Name Reservation (COR9.1)', 'Reserve company name with CIPC', 250, 'cipc-services', '1-2 Days', 'Proposed company names', true, false),

('Name Reservation Extension (COR9.2)', 'Extend company name reservation', 500, 'cipc-services', '1-2 Days', 'Current reservation details', true, false),

('Defensive Name Application (COR10.1)', 'Apply for defensive name registration', 500, 'cipc-services', 'Variable', 'Name and trademark details', true, false),

('Defensive Name Renewal (COR10.2)', 'Renew defensive name registration', 700, 'cipc-services', 'Variable', 'Current defensive name details', true, false),

('Notice of Incorporation (COR15.1)', 'File Notice of Incorporation and MOI', 1250, 'cipc-services', 'Variable', 'Company details, MOI, director information', true, false),

('MOI Amendment (COR15.2)', 'Amend Memorandum of Incorporation', 750, 'cipc-services', 'Variable', 'Amendment details, resolutions', true, false),

('MOI Alteration (COR15.3)', 'Alter Memorandum of Incorporation', 650, 'cipc-services', 'Variable', 'Alteration requirements', true, false),

('MOI Translation (COR15.4)', 'Translate Memorandum of Incorporation', 650, 'cipc-services', 'Variable', 'Translation requirements', true, false),

('MOI Consolidation (COR15.5)', 'Consolidate Memorandum of Incorporation', 650, 'cipc-services', 'Variable', 'Consolidation requirements', true, false),

('Financial Year End Change (COR16.1)', 'Change Financial Year End with CIPC', 650, 'cipc-services', 'Variable', 'New financial year end details', true, false),

('Ratification Vote Result (COR16.2)', 'File result of ratification vote', 500, 'cipc-services', 'Variable', 'Vote results, resolutions', true, false),

('Foreign Company Transfer (COR17.1)', 'Transfer foreign company registration to SA', 2500, 'cipc-services', 'Variable', 'Foreign company details, transfer requirements', true, false),

('CC Conversion (COR18.1)', 'Convert Close Corporation to Company', 850, 'cipc-services', 'Variable', 'CC details, conversion requirements', true, false),

('External Company Registration (CoR20.1)', 'Register External Company', 0, 'cipc-services', 'Variable', 'External company details', true, false),

('Director Change Notice (CoR39)', 'File notice of director changes', 850, 'cipc-services', 'Variable', 'Director details, resolutions', true, false),

('Solvent Winding Up (CoR40.1)', 'File notice of solvent company winding up', 1000, 'cipc-services', 'Variable', 'Winding up resolution, company details', true, false),

('Foreign Transfer (CoR40.2)', 'Transfer company registration to foreign jurisdiction', 1200, 'cipc-services', 'Variable', 'Transfer requirements, foreign jurisdiction details', true, false),

('Inactive Company Demand (CoR40.3)', 'Handle demand letter to inactive company', 750, 'cipc-services', 'Variable', 'Company status, reactivation requirements', true, false),

('De-registration Notice (CoR40.4)', 'Handle CIPC notice of pending de-registration', 250, 'cipc-services', 'Variable', 'Company details, compliance requirements', true, false),

('Company Re-instatement (CoR40.5)', 'Apply for re-instatement of de-registered company', 1000, 'cipc-services', 'Variable', 'De-registration details, reinstatement grounds', true, false),

('Auditor Appointment (CoR44)', 'File required appointment of auditor/accountant', 750, 'cipc-services', 'Variable', 'Professional details, appointment resolution', true, false),

('Company Register Management', 'Create and populate company registers', 650, 'cipc-services', 'Variable', 'Company details, shareholder information', true, false),

('Company Register Updates', 'Update company registers per category', 350, 'cipc-services', 'Variable', 'Updated information, category details', true, false),

('Share Certificates Issue', 'Issue share certificates per shareholder', 500, 'cipc-services', 'Variable', 'Shareholder details, share allocation', true, false),

('Resolutions Drafting', 'Draft shareholders/directors resolutions', 475, 'cipc-services', 'Variable', 'Resolution requirements, company details', true, false),

('CIPC Confirmation Certificates', 'Obtain confirmation certificates from CIPC', 200, 'cipc-services', 'Variable', 'Company details, certificate requirements', true, false),

('Power of Attorney - Directors', 'Draft Power of Attorney for directors', 350, 'cipc-services', 'Variable', 'Director details, authorization scope', true, false),

('Deregistration - Dormant Company', 'Deregister dormant company (approximate costs)', 1500, 'cipc-services', 'Variable', 'Company details, dormant status confirmation', true, false),

('Deregistration - Trading Company', 'Deregister trading company (approximate costs)', 2200, 'cipc-services', 'Variable', 'Company details, final accounts', true, false),

('Deregistration - Close Corporation', 'Deregister Close Corporation (approximate costs)', 800, 'cipc-services', 'Variable', 'CC details, final accounts', true, false),

('IT77 Deregistration', 'SARS IT77 Deregistration (approximate costs)', 375, 'cipc-services', 'Variable', 'Tax compliance, deregistration requirements', true, false),

('Priority Fee - Urgent Lodgements', 'Priority fee for urgent lodgements with CIPC/SARS', 1300, 'cipc-services', 'Priority Processing', 'Urgent processing requirements', true, false);

-- Create monthly compliance packages
INSERT INTO services (name, description, price, category, processing_time, requirements, is_active, is_popular) VALUES
('Beginner Compliance Package', 'Monthly compliance package including: Bookkeeping - Once A Month, Dedicated Account Manager, Full Payroll Service (up to 10 employees), Sage Accounting Online Subscription, Up to 100 Transactions P/M, VAT Returns, All Tax Returns, CIPC Services, Financial Statements', 4876, 'monthly-compliance', 'Monthly', 'Company registration, employee details, accounting records', true, false),

('Enhanced Compliance Package', 'Monthly compliance package including: Bookkeeping - Once A Week, Dedicated Account Manager, Full Payroll Service (up to 20 employees), Sage Accounting Online Subscription, Up to 200 Transactions P/M, Supplier Invoice Capturing, VAT Returns, 1 Performance Meeting Per Year', 7854, 'monthly-compliance', 'Monthly', 'Company registration, employee details, accounting records', true, true),

('Ultimate Compliance Package', 'Monthly compliance package including: Bookkeeping - Once a Week, Dedicated Account Manager, Full Payroll Service (up to 30 employees), Sage Accounting Online Subscription, Up to 300 Transactions P/M, Supplier Invoice Capturing, 2 Performance Meetings Per Year', 10379, 'monthly-compliance', 'Monthly', 'Company registration, employee details, accounting records', true, false);

-- Create individual tax return packages
INSERT INTO services (name, description, price, category, processing_time, requirements, is_active, is_popular) VALUES
('Basic Income Tax Return', 'Individual tax return for IRP5s, medical aid expenses, retirement contributions, interest income, and share sales.', 702, 'individual-tax-returns', 'Variable', 'IRP5 certificates, medical aid certificates, retirement annuity certificates', true, false),

('Advanced Income Tax Return', 'Comprehensive individual tax return including all income sources, deductions, and complex tax situations.', 1173, 'individual-tax-returns', 'Variable', 'All income documentation, expense records, supporting documents', true, false);