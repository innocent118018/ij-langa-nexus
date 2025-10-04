-- Create comprehensive role and permission system for IJ Langa Consulting Admin Dashboard
-- Fixed version handling existing data properly

-- First, create enum for user roles
CREATE TYPE public.user_role AS ENUM (
  'super_admin',
  'admin', 
  'manager',
  'accountant',
  'employee',
  'viewer',
  'client'
);

-- Update existing users table role column properly
-- First add a new column with the enum type
ALTER TABLE public.users ADD COLUMN new_role user_role;

-- Update the new column based on existing role values
UPDATE public.users SET new_role = 
  CASE 
    WHEN role = 'super_admin' THEN 'super_admin'::user_role
    WHEN role = 'admin' THEN 'admin'::user_role
    WHEN role = 'manager' THEN 'manager'::user_role
    WHEN role = 'accountant' THEN 'accountant'::user_role
    WHEN role = 'employee' THEN 'employee'::user_role
    WHEN role = 'viewer' THEN 'viewer'::user_role
    WHEN role = 'client' THEN 'client'::user_role
    ELSE 'client'::user_role -- default for any unrecognized roles
  END;

-- Drop the old role column and rename the new one
ALTER TABLE public.users DROP COLUMN role;
ALTER TABLE public.users RENAME COLUMN new_role TO role;

-- Set default value for the role column
ALTER TABLE public.users ALTER COLUMN role SET DEFAULT 'client'::user_role;
ALTER TABLE public.users ALTER COLUMN role SET NOT NULL;

-- Create permissions table
CREATE TABLE public.permissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  module TEXT NOT NULL,
  action TEXT NOT NULL, -- create, read, update, delete, approve, export, etc.
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create role_permissions mapping table
CREATE TABLE public.role_permissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  role user_role NOT NULL,
  permission_id UUID NOT NULL REFERENCES public.permissions(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(role, permission_id)
);

-- Create comprehensive audit logging table
CREATE TABLE public.system_audit_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  actor_id UUID REFERENCES auth.users(id),
  actor_role user_role,
  action TEXT NOT NULL, -- create, update, delete, approve, reject, etc.
  table_name TEXT NOT NULL,
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_email TEXT
);

-- Create notification templates table
CREATE TABLE public.notification_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  event_type TEXT NOT NULL, -- invoice_issued, payment_received, etc.
  channel TEXT NOT NULL, -- email, whatsapp, sms, in_app
  subject TEXT, -- for email
  template_body TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create notification queue table
CREATE TABLE public.notification_queue (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_id UUID NOT NULL REFERENCES public.notification_templates(id),
  recipient_id UUID,
  recipient_email TEXT,
  recipient_phone TEXT,
  data JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending', -- pending, sent, failed
  attempts INTEGER NOT NULL DEFAULT 0,
  error_message TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create system settings table for global configuration
CREATE TABLE public.system_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL, -- accounting, notifications, integrations, etc.
  key TEXT NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  is_encrypted BOOLEAN NOT NULL DEFAULT false,
  updated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(category, key)
);

-- Enable RLS on all new tables
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;