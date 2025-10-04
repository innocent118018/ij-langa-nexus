-- ================================================
-- Fix Notifications Table Structure
-- ================================================

-- First, drop the trigger to avoid conflicts
DROP TRIGGER IF EXISTS role_permissions_audit_trigger ON role_permissions;

-- Recreate notifications table with correct structure
DROP TABLE IF EXISTS notifications;
CREATE TABLE notifications (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    channel text NOT NULL DEFAULT 'email',          -- 'email' or 'whatsapp'
    recipient text NOT NULL,        -- destination email or phone
    message text NOT NULL,          -- notification content
    status text DEFAULT 'pending', -- pending, sent, failed
    created_at timestamp with time zone DEFAULT now(),
    sent_at timestamp with time zone,
    error_message text
);

-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for notifications
CREATE POLICY "Super admins can view notifications" ON notifications
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND role = 'super_admin'
    )
);

-- System can manage notifications
CREATE POLICY "System can manage notifications" ON notifications
FOR ALL USING (true);

-- Now recreate the function
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

-- Add a sample role permission to test the system
INSERT INTO role_permissions (role_name, resource, can_view, can_create, can_update, can_delete) VALUES
('super_admin', 'settings', TRUE, TRUE, TRUE, TRUE)
ON CONFLICT (role_name, resource) DO NOTHING;