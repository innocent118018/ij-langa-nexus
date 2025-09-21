-- ================================================
-- IJ Langa Role Permissions System (Supabase)
-- ================================================

-- 1. Create role_permissions table
CREATE TABLE IF NOT EXISTS role_permissions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    role_name text NOT NULL,
    resource text NOT NULL,
    can_view boolean DEFAULT FALSE,
    can_create boolean DEFAULT FALSE,
    can_update boolean DEFAULT FALSE,
    can_delete boolean DEFAULT FALSE,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    UNIQUE(role_name, resource)
);

-- Enable RLS
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;

-- 2. Create audit table
CREATE TABLE IF NOT EXISTS role_permissions_audit (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    action_type text NOT NULL,         -- INSERT, UPDATE, DELETE
    role_permission_id uuid,
    role_name text,
    resource text,
    can_view boolean,
    can_create boolean,
    can_update boolean,
    can_delete boolean,
    changed_by uuid REFERENCES auth.users(id),
    changed_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE role_permissions_audit ENABLE ROW LEVEL SECURITY;

-- 3. Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    channel text NOT NULL,          -- 'email' or 'whatsapp'
    recipient text NOT NULL,        -- destination email or phone
    message text NOT NULL,          -- notification content
    status text DEFAULT 'pending', -- pending, sent, failed
    created_at timestamp with time zone DEFAULT now(),
    sent_at timestamp with time zone,
    error_message text
);

-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS policies
-- Only super_admin can manage role permissions
CREATE POLICY "Super admins can manage role permissions" ON role_permissions
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND role = 'super_admin'
    )
);

-- Super admins can view audit logs
CREATE POLICY "Super admins can view audit logs" ON role_permissions_audit
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND role = 'super_admin'
    )
);

-- System can insert audit logs
CREATE POLICY "System can insert audit logs" ON role_permissions_audit
FOR INSERT WITH CHECK (true);

-- Super admins can view notifications
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

-- 5. Create trigger function for audit and notifications
CREATE OR REPLACE FUNCTION log_role_permissions_changes()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Create trigger
CREATE TRIGGER role_permissions_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON role_permissions
FOR EACH ROW EXECUTE FUNCTION log_role_permissions_changes();

-- 7. Create function to check user permissions
CREATE OR REPLACE FUNCTION check_user_resource_permission(
    user_role text,
    resource_name text,
    permission_type text
) RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
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