-- Add monthly compliance packages to services table
INSERT INTO public.services (name, description, price, category, processing_time, requirements, is_active) VALUES
-- Monthly Compliance Packages
('Beginner Compliance Package', 'Monthly compliance package with bookkeeping once a month, dedicated account manager, full payroll service (up to 10 employees), Sage Accounting Online subscription, up to 100 transactions per month, and all basic tax returns.', 4240.00, 'monthly-compliance', '1 month', 'Company registration details, bank statements, employee information', true),
('Enhanced Compliance Package', 'Monthly compliance package with bookkeeping once a week, dedicated account manager, full payroll service (up to 20 employees), Sage Accounting Online subscription, up to 200 transactions per month, supplier invoice capturing, and strategy meeting.', 6830.00, 'monthly-compliance', '1 week', 'Company registration details, bank statements, employee information, supplier invoices', true),
('Ultimate Compliance Package', 'Monthly compliance package with weekly bookkeeping, dedicated account manager, full payroll service (up to 30 employees), Sage Accounting Online subscription, up to 300 transactions per month, and 2 strategy meetings per year.', 9025.00, 'monthly-compliance', '1 week', 'Company registration details, bank statements, employee information, supplier invoices', true),

-- Individual Tax Returns
('Basic Income Tax Return', 'Individual tax return for IRP5s, medical aid expenses, retirement contributions, interest income, and share sales.', 610.00, 'individual-tax', '5-10 business days', 'IRP5 certificates, medical aid statements, retirement fund certificates, IT3(b) certificates', true),
('Advanced Income Tax Return', 'Advanced individual tax return including rental income, company car allowances, property sales, cryptocurrencies, and home office expenses.', 1020.00, 'individual-tax', '7-14 business days', 'All basic return documents plus rental agreements, travel logbooks, property sale documents, crypto statements, home office receipts', true),
('Trade Income Tax Return', 'Comprehensive individual tax return for sole proprietors, partnerships, and commission income earners.', 1360.00, 'individual-tax', '10-21 business days', 'All previous return documents plus business financial statements, partnership agreements, commission statements', true),

-- Business Growth Plans  
('STARTS Business Plan', 'Ideal for companies not actively trading month to month with turnover less than R350,000 per year. Includes CIPC services, basic tax compliance, and BBBEE templates.', 295.00, 'business-growth', 'Ongoing monthly', 'Company registration, annual turnover confirmation', true),
('ACCURATE Business Plan', 'For actively trading companies with turnover less than R1 million per year. Includes Xero software, SimplePay, bookkeeping, and dedicated account manager.', 1445.00, 'business-growth', 'Ongoing monthly', 'Company registration, bank statements, trading history', true),
('GO BRAVE Business Plan', 'For companies with turnover above R1 million per year. Includes comprehensive accounting, payroll, tax services, and dedicated specialists.', 3990.00, 'business-growth', 'Ongoing monthly', 'Company registration, detailed financial records, employee information', true);

-- Update existing services to mark them as recurring subscriptions
UPDATE public.services 
SET description = description || ' (Monthly Subscription Service)'
WHERE name IN (
  'Beginner Compliance Package',
  'Enhanced Compliance Package', 
  'Ultimate Compliance Package',
  'STARTS Business Plan',
  'ACCURATE Business Plan',
  'GO BRAVE Business Plan'
);

-- Add products table entries for physical products if needed
INSERT INTO public.products (name, description, price, category, stock_quantity, is_active) VALUES
('BBBEE Affidavit Template', 'Pre-formatted BBBEE affidavit template for small businesses', 150.00, 'templates', 999, true),
('Company Share Certificates', 'Professional company share certificates (set of 10)', 250.00, 'legal-documents', 100, true),
('Sage Accounting Online License', 'Annual Sage Accounting Online software license', 2400.00, 'software', 50, true),
('Xero Accounting Software License', 'Annual Xero accounting software subscription', 1800.00, 'software', 100, true);