-- ================================================
-- Fix Notifications System - Simple Fix
-- ================================================

-- Create user_notifications table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_notifications (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title text NOT NULL,
    message text NOT NULL,
    type text NOT NULL DEFAULT 'info',
    is_read boolean DEFAULT FALSE,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS if not already enabled
DO $$ 
BEGIN 
    IF NOT EXISTS (
        SELECT 1 FROM pg_class c 
        JOIN pg_namespace n ON n.oid = c.relnamespace 
        WHERE n.nspname = 'public' AND c.relname = 'user_notifications' AND c.relrowsecurity = true
    ) THEN
        ALTER TABLE user_notifications ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- Create policies only if they don't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'user_notifications' AND policyname = 'Users can view their own notifications'
    ) THEN
        CREATE POLICY "Users can view their own notifications" ON user_notifications
        FOR SELECT USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'user_notifications' AND policyname = 'Users can update their own notifications'  
    ) THEN
        CREATE POLICY "Users can update their own notifications" ON user_notifications
        FOR UPDATE USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'user_notifications' AND policyname = 'System can manage notifications'
    ) THEN
        CREATE POLICY "System can manage notifications" ON user_notifications
        FOR ALL USING (true);
    END IF;
END $$;

-- Update the security trigger function to use the renamed table
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

    -- Queue security notifications 
    INSERT INTO security_notifications (channel, recipient, message) VALUES
    ('email', 'info@ijlanga.co.za', msg),
    ('whatsapp', '+27720000000', msg);

    RETURN COALESCE(NEW, OLD);
END;
$$;