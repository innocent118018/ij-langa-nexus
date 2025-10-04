-- ================================================
-- Seed Role Permissions Data & Fix Security Issues
-- ================================================

-- 1. Seed default role permissions for admin role
INSERT INTO role_permissions (role_name, resource, can_view, can_create, can_update, can_delete) VALUES
('admin', 'business_summary', TRUE, TRUE, TRUE, TRUE),
('admin', 'bank_accounts', TRUE, TRUE, TRUE, TRUE),
('admin', 'receipts', TRUE, TRUE, TRUE, TRUE),
('admin', 'payments', TRUE, TRUE, TRUE, TRUE),
('admin', 'inter_account_transfers', TRUE, TRUE, TRUE, TRUE),
('admin', 'bank_reconciliations', TRUE, TRUE, TRUE, TRUE),
('admin', 'expense_claims', TRUE, TRUE, TRUE, TRUE),
('admin', 'customers', TRUE, TRUE, TRUE, TRUE),
('admin', 'sales_quotes', TRUE, TRUE, TRUE, TRUE),
('admin', 'sales_orders', TRUE, TRUE, TRUE, TRUE),
('admin', 'sales_invoices', TRUE, TRUE, TRUE, TRUE),
('admin', 'credit_notes', TRUE, TRUE, TRUE, TRUE),
('admin', 'late_payment_fees', TRUE, TRUE, TRUE, TRUE),
('admin', 'billable_time', TRUE, TRUE, TRUE, TRUE),
('admin', 'withholding_tax_receipts', TRUE, TRUE, TRUE, TRUE),
('admin', 'delivery_notes', TRUE, TRUE, TRUE, TRUE),
('admin', 'suppliers', TRUE, TRUE, TRUE, TRUE),
('admin', 'purchase_quotes', TRUE, TRUE, TRUE, TRUE),
('admin', 'purchase_orders', TRUE, TRUE, TRUE, TRUE),
('admin', 'purchase_invoices', TRUE, TRUE, TRUE, TRUE),
('admin', 'debit_notes', TRUE, TRUE, TRUE, TRUE),
('admin', 'goods_receipts', TRUE, TRUE, TRUE, TRUE),
('admin', 'projects', TRUE, TRUE, TRUE, TRUE),
('admin', 'inventory_items', TRUE, TRUE, TRUE, TRUE),
('admin', 'inventory_transfers', TRUE, TRUE, TRUE, TRUE),
('admin', 'inventory_write_offs', TRUE, TRUE, TRUE, TRUE),
('admin', 'production_orders', TRUE, TRUE, TRUE, TRUE),
('admin', 'employees', TRUE, TRUE, TRUE, TRUE),
('admin', 'payslips', TRUE, TRUE, TRUE, TRUE),
('admin', 'investments', TRUE, TRUE, TRUE, TRUE),
('admin', 'fixed_assets', TRUE, TRUE, TRUE, TRUE),
('admin', 'depreciation_entries', TRUE, TRUE, TRUE, TRUE),
('admin', 'intangible_assets', TRUE, TRUE, TRUE, TRUE),
('admin', 'amortization_entries', TRUE, TRUE, TRUE, TRUE),
('admin', 'capital_accounts', TRUE, TRUE, TRUE, TRUE),
('admin', 'special_accounts', TRUE, TRUE, TRUE, TRUE),
('admin', 'folders', TRUE, TRUE, TRUE, TRUE),
('admin', 'journal_entries', TRUE, TRUE, TRUE, TRUE),
('admin', 'reports', TRUE, TRUE, TRUE, TRUE),
('admin', 'settings', TRUE, TRUE, TRUE, TRUE)
ON CONFLICT (role_name, resource) DO NOTHING;

-- 2. Seed reader role permissions (view-only)
INSERT INTO role_permissions (role_name, resource, can_view, can_create, can_update, can_delete) VALUES
('user', 'business_summary', TRUE, FALSE, FALSE, FALSE),
('user', 'bank_accounts', TRUE, FALSE, FALSE, FALSE),
('user', 'receipts', TRUE, FALSE, FALSE, FALSE),
('user', 'payments', TRUE, FALSE, FALSE, FALSE),
('user', 'inter_account_transfers', TRUE, FALSE, FALSE, FALSE),
('user', 'bank_reconciliations', TRUE, FALSE, FALSE, FALSE),
('user', 'expense_claims', TRUE, FALSE, FALSE, FALSE),
('user', 'customers', TRUE, FALSE, FALSE, FALSE),
('user', 'sales_quotes', TRUE, FALSE, FALSE, FALSE),
('user', 'sales_orders', TRUE, FALSE, FALSE, FALSE),
('user', 'sales_invoices', TRUE, FALSE, FALSE, FALSE),
('user', 'credit_notes', TRUE, FALSE, FALSE, FALSE),
('user', 'late_payment_fees', TRUE, FALSE, FALSE, FALSE),
('user', 'billable_time', TRUE, FALSE, FALSE, FALSE),
('user', 'withholding_tax_receipts', TRUE, FALSE, FALSE, FALSE),
('user', 'delivery_notes', TRUE, FALSE, FALSE, FALSE),
('user', 'suppliers', TRUE, FALSE, FALSE, FALSE),
('user', 'purchase_quotes', TRUE, FALSE, FALSE, FALSE),
('user', 'purchase_orders', TRUE, FALSE, FALSE, FALSE),
('user', 'purchase_invoices', TRUE, FALSE, FALSE, FALSE),
('user', 'debit_notes', TRUE, FALSE, FALSE, FALSE),
('user', 'goods_receipts', TRUE, FALSE, FALSE, FALSE),
('user', 'projects', TRUE, FALSE, FALSE, FALSE),
('user', 'inventory_items', TRUE, FALSE, FALSE, FALSE),
('user', 'inventory_transfers', TRUE, FALSE, FALSE, FALSE),
('user', 'inventory_write_offs', TRUE, FALSE, FALSE, FALSE),
('user', 'production_orders', TRUE, FALSE, FALSE, FALSE),
('user', 'employees', TRUE, FALSE, FALSE, FALSE),
('user', 'payslips', TRUE, FALSE, FALSE, FALSE),
('user', 'investments', TRUE, FALSE, FALSE, FALSE),
('user', 'fixed_assets', TRUE, FALSE, FALSE, FALSE),
('user', 'depreciation_entries', TRUE, FALSE, FALSE, FALSE),
('user', 'intangible_assets', TRUE, FALSE, FALSE, FALSE),
('user', 'amortization_entries', TRUE, FALSE, FALSE, FALSE),
('user', 'capital_accounts', TRUE, FALSE, FALSE, FALSE),
('user', 'special_accounts', TRUE, FALSE, FALSE, FALSE),
('user', 'folders', TRUE, FALSE, FALSE, FALSE),
('user', 'journal_entries', TRUE, FALSE, FALSE, FALSE),
('user', 'reports', TRUE, FALSE, FALSE, FALSE),
('user', 'settings', TRUE, FALSE, FALSE, FALSE)
ON CONFLICT (role_name, resource) DO NOTHING;

-- 3. Fix security definer functions by adding SET search_path
CREATE OR REPLACE FUNCTION log_role_permissions_changes()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    msg text;
    user_email text;
BEGIN
    -- Get user email for the message
    SELECT email INTO user_email FROM auth.users WHERE id = auth.uid();
    
    -- Construct the message
    msg := format(
        '🔒 Security Alert: Role Permission Change [%s]
Role: %s
Resource: %s
Permissions - View: %s, Create: %s, Update: %s, Delete: %s
Changed by: %s
Time: %s',
        TG_OP,
        COALESCE(NEW.role_name, OLD.role_name),
        COALESCE(NEW.resource, OLD.resource),
        COALESCE(NEW.can_view::text, OLD.can_view::text),
        COALESCE(NEW.can_create::text, OLD.can_create::text),
        COALESCE(NEW.can_update::text, OLD.can_update::text),
        COALESCE(NEW.can_delete::text, OLD.can_delete::text),
        COALESCE(user_email, 'System'),
        now()
    );

    -- Insert into audit trail
    IF (TG_OP = 'INSERT') THEN
        INSERT INTO role_permissions_audit (action_type, role_permission_id, role_name, resource, can_view, can_create, can_update, can_delete, changed_by)
        VALUES ('INSERT', NEW.id, NEW.role_name, NEW.resource, NEW.can_view, NEW.can_create, NEW.can_update, NEW.can_delete, auth.uid());
    ELSIF (TG_OP = 'UPDATE') THEN
        INSERT INTO role_permissions_audit (action_type, role_permission_id, role_name, resource, can_view, can_create, can_update, can_delete, changed_by)
        VALUES ('UPDATE', NEW.id, NEW.role_name, NEW.resource, NEW.can_view, NEW.can_create, NEW.can_update, NEW.can_delete, auth.uid());
    ELSIF (TG_OP = 'DELETE') THEN
        INSERT INTO role_permissions_audit (action_type, role_permission_id, role_name, resource, can_view, can_create, can_update, can_delete, changed_by)
        VALUES ('DELETE', OLD.id, OLD.role_name, OLD.resource, OLD.can_view, OLD.can_create, OLD.can_update, OLD.can_delete, auth.uid());
    END IF;

    -- Queue notifications (superadmin email + WhatsApp)
    INSERT INTO notifications (channel, recipient, message) VALUES
    ('email', 'info@ijlanga.co.za', msg),
    ('whatsapp', '+27720000000', msg);

    RETURN COALESCE(NEW, OLD);
END;
$$;

-- 4. Fix check_user_resource_permission function
CREATE OR REPLACE FUNCTION check_user_resource_permission(
    user_role text,
    resource_name text,
    permission_type text
) RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    has_permission boolean := false;
BEGIN
    -- Super admin has all permissions
    IF user_role = 'super_admin' THEN
        RETURN true;
    END IF;
    
    -- Check specific permission
    SELECT 
        CASE permission_type
            WHEN 'view' THEN can_view
            WHEN 'create' THEN can_create
            WHEN 'update' THEN can_update
            WHEN 'delete' THEN can_delete
            ELSE false
        END
    INTO has_permission
    FROM role_permissions
    WHERE role_name = user_role AND resource = resource_name;
    
    RETURN COALESCE(has_permission, false);
END;
$$;