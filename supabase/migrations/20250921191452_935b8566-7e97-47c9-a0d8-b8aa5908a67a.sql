-- ================================================
-- Fix Notifications Column Issue & Seed Data
-- ================================================

-- First, drop the trigger to avoid conflicts
DROP TRIGGER IF EXISTS role_permissions_audit_trigger ON role_permissions;

-- Check if the notifications table needs the channel column
DO $$
BEGIN
    -- Add channel column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'notifications' 
        AND column_name = 'channel'
    ) THEN
        ALTER TABLE notifications ADD COLUMN channel text NOT NULL DEFAULT 'email';
    END IF;
END $$;

-- Now recreate the function with proper error handling
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

-- Recreate the trigger
CREATE TRIGGER role_permissions_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON role_permissions
FOR EACH ROW EXECUTE FUNCTION log_role_permissions_changes();

-- Seed default role permissions for admin role
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

-- Seed reader role permissions (view-only)
INSERT INTO role_permissions (role_name, resource, can_view, can_create, can_update, can_delete) VALUES
('user', 'business_summary', TRUE, FALSE, FALSE, FALSE),
('user', 'customers', TRUE, FALSE, FALSE, FALSE),
('user', 'sales_invoices', TRUE, FALSE, FALSE, FALSE),
('user', 'reports', TRUE, FALSE, FALSE, FALSE)
ON CONFLICT (role_name, resource) DO NOTHING;