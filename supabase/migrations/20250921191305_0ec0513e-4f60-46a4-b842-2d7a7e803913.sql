-- Drop existing policies and recreate role permissions system
DROP POLICY IF EXISTS "Super admins can manage role permissions" ON role_permissions;

-- Seed default role permissions for admin
INSERT INTO role_permissions (role_name, resource, can_view, can_create, can_update, can_delete) VALUES
('super_admin', 'business_summary', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'bank_accounts', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'receipts', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'payments', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'inter_account_transfers', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'bank_reconciliations', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'expense_claims', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'customers', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'sales_quotes', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'sales_orders', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'sales_invoices', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'credit_notes', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'late_payment_fees', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'billable_time', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'withholding_tax_receipts', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'delivery_notes', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'suppliers', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'purchase_quotes', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'purchase_orders', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'purchase_invoices', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'debit_notes', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'goods_receipts', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'projects', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'inventory_items', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'inventory_transfers', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'inventory_write_offs', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'production_orders', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'employees', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'payslips', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'investments', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'fixed_assets', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'depreciation_entries', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'intangible_assets', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'amortization_entries', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'capital_accounts', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'special_accounts', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'folders', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'journal_entries', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'reports', TRUE, TRUE, TRUE, TRUE),
('super_admin', 'settings', TRUE, TRUE, TRUE, TRUE)
ON CONFLICT (role_name, resource) DO NOTHING;

-- Add user role permissions (view-only for most resources)
INSERT INTO role_permissions (role_name, resource, can_view, can_create, can_update, can_delete) VALUES
('user', 'business_summary', TRUE, FALSE, FALSE, FALSE),
('user', 'bank_accounts', TRUE, FALSE, FALSE, FALSE),
('user', 'receipts', TRUE, FALSE, FALSE, FALSE),
('user', 'payments', TRUE, FALSE, FALSE, FALSE),
('user', 'customers', TRUE, FALSE, FALSE, FALSE),
('user', 'sales_quotes', TRUE, TRUE, TRUE, FALSE),
('user', 'sales_orders', TRUE, TRUE, TRUE, FALSE),
('user', 'sales_invoices', TRUE, FALSE, FALSE, FALSE),
('user', 'reports', TRUE, FALSE, FALSE, FALSE)
ON CONFLICT (role_name, resource) DO NOTHING;

-- Recreate RLS policy
CREATE POLICY "Super admins can manage role permissions" ON role_permissions
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND role = 'super_admin'
    )
);