-- Clean setup of role permissions system
-- Drop existing objects if they exist
DROP TRIGGER IF EXISTS role_permissions_audit_trigger ON role_permissions;
DROP FUNCTION IF EXISTS log_role_permissions_changes();
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS role_permissions_audit CASCADE;
DROP TABLE IF EXISTS role_permissions CASCADE;

-- 1. Create role_permissions table
CREATE TABLE role_permissions (
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

ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;

-- 2. Create audit table
CREATE TABLE role_permissions_audit (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    action_type text NOT NULL,
    role_permission_id uuid,
    role_name text,
    resource text,
    can_view boolean,
    can_create boolean,
    can_update boolean,
    can_delete boolean,
    changed_by uuid,
    changed_at timestamp with time zone DEFAULT now()
);

ALTER TABLE role_permissions_audit ENABLE ROW LEVEL SECURITY;

-- 3. Create notifications table
CREATE TABLE notifications (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    channel text NOT NULL,
    recipient text NOT NULL,
    message text NOT NULL,
    status text DEFAULT 'pending',
    created_at timestamp with time zone DEFAULT now(),
    sent_at timestamp with time zone,
    error_message text
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS policies
CREATE POLICY "Super admins can manage role permissions" ON role_permissions
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND role = 'super_admin'
    )
);

CREATE POLICY "Super admins can view audit logs" ON role_permissions_audit
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND role = 'super_admin'
    )
);

CREATE POLICY "System can insert audit logs" ON role_permissions_audit
FOR INSERT WITH CHECK (true);

CREATE POLICY "Super admins can view notifications" ON notifications
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND role = 'super_admin'
    )
);

CREATE POLICY "System can manage notifications" ON notifications
FOR ALL USING (true);