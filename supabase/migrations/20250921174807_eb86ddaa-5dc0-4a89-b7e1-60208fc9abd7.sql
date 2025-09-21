-- Create comprehensive admin dashboard system for IJ Langa Consulting
-- Working with existing role system without breaking existing policies

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

-- Create role_permissions mapping table (using text for role compatibility)
CREATE TABLE public.role_permissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  role TEXT NOT NULL,
  permission_id UUID NOT NULL REFERENCES public.permissions(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(role, permission_id)
);

-- Create comprehensive audit logging table
CREATE TABLE public.system_audit_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  actor_id UUID REFERENCES auth.users(id),
  actor_role TEXT,
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

-- Create RLS policies for permissions (Admin only)
CREATE POLICY "Admins can manage permissions" ON public.permissions
  FOR ALL USING (get_current_user_role() = ANY(ARRAY['super_admin', 'admin']));

-- Create RLS policies for role_permissions (Admin only)
CREATE POLICY "Admins can manage role permissions" ON public.role_permissions
  FOR ALL USING (get_current_user_role() = ANY(ARRAY['super_admin', 'admin']));

-- Create RLS policies for system_audit_log
CREATE POLICY "Admins can view all audit logs" ON public.system_audit_log
  FOR SELECT USING (get_current_user_role() = ANY(ARRAY['super_admin', 'admin', 'accountant']));

CREATE POLICY "Users can view their own audit logs" ON public.system_audit_log
  FOR SELECT USING (auth.uid() = actor_id);

CREATE POLICY "System can insert audit logs" ON public.system_audit_log
  FOR INSERT WITH CHECK (true);

-- Create RLS policies for notification_templates (Admin only)
CREATE POLICY "Admins can manage notification templates" ON public.notification_templates
  FOR ALL USING (get_current_user_role() = ANY(ARRAY['super_admin', 'admin']));

-- Create RLS policies for notification_queue
CREATE POLICY "System can manage notification queue" ON public.notification_queue
  FOR ALL USING (true);

-- Create RLS policies for system_settings (Super Admin only)
CREATE POLICY "Super admins can manage system settings" ON public.system_settings
  FOR ALL USING (get_current_user_role() = 'super_admin');

CREATE POLICY "Admins can read system settings" ON public.system_settings
  FOR SELECT USING (get_current_user_role() = ANY(ARRAY['super_admin', 'admin']));

-- Insert default permissions for all modules
INSERT INTO public.permissions (name, description, module, action) VALUES
-- Business/Dashboard permissions
('business:read', 'View business dashboard and KPIs', 'business', 'read'),
('business:export', 'Export business reports', 'business', 'export'),

-- Bank & Cash permissions
('bank_accounts:create', 'Create bank accounts', 'bank_accounts', 'create'),
('bank_accounts:read', 'View bank accounts', 'bank_accounts', 'read'),
('bank_accounts:update', 'Update bank accounts', 'bank_accounts', 'update'),
('bank_accounts:delete', 'Delete bank accounts', 'bank_accounts', 'delete'),

-- Receipts permissions
('receipts:create', 'Create receipts', 'receipts', 'create'),
('receipts:read', 'View receipts', 'receipts', 'read'),
('receipts:update', 'Update receipts', 'receipts', 'update'),
('receipts:delete', 'Delete receipts', 'receipts', 'delete'),

-- Payments permissions
('payments:create', 'Create payments', 'payments', 'create'),
('payments:read', 'View payments', 'payments', 'read'),
('payments:update', 'Update payments', 'payments', 'update'),
('payments:delete', 'Delete payments', 'payments', 'delete'),

-- Customer permissions
('customers:create', 'Create customers', 'customers', 'create'),
('customers:read', 'View customers', 'customers', 'read'),
('customers:update', 'Update customers', 'customers', 'update'),
('customers:delete', 'Delete customers', 'customers', 'delete'),
('customers:read_own', 'View own customer record', 'customers', 'read_own'),

-- Invoice permissions
('invoices:create', 'Create invoices', 'invoices', 'create'),
('invoices:read', 'View invoices', 'invoices', 'read'),
('invoices:update', 'Update invoices', 'invoices', 'update'),
('invoices:delete', 'Delete invoices', 'invoices', 'delete'),
('invoices:read_own', 'View own invoices', 'invoices', 'read_own'),
('invoices:approve', 'Approve invoices', 'invoices', 'approve'),

-- Employee & HR permissions
('employees:create', 'Create employees', 'employees', 'create'),
('employees:read', 'View employees', 'employees', 'read'),
('employees:update', 'Update employees', 'employees', 'update'),
('employees:delete', 'Delete employees', 'employees', 'delete'),
('payslips:read', 'View payslips', 'payslips', 'read'),
('payslips:read_own', 'View own payslips', 'payslips', 'read_own'),

-- Time tracking permissions
('time_entries:create', 'Create time entries', 'time_entries', 'create'),
('time_entries:read', 'View time entries', 'time_entries', 'read'),
('time_entries:approve', 'Approve time entries', 'time_entries', 'approve'),

-- Reports permissions
('reports:read', 'View reports', 'reports', 'read'),
('reports:export', 'Export reports', 'reports', 'export'),

-- System administration
('users:create', 'Create users', 'users', 'create'),
('users:read', 'View users', 'users', 'read'),
('users:update', 'Update users', 'users', 'update'),
('users:delete', 'Delete users', 'users', 'delete'),
('settings:read', 'View system settings', 'settings', 'read'),
('settings:update', 'Update system settings', 'settings', 'update'),
('audit:read', 'View audit logs', 'audit', 'read'),

-- Additional module permissions
('inventory:create', 'Create inventory items', 'inventory', 'create'),
('inventory:read', 'View inventory', 'inventory', 'read'),
('inventory:update', 'Update inventory', 'inventory', 'update'),
('inventory:delete', 'Delete inventory', 'inventory', 'delete'),
('projects:create', 'Create projects', 'projects', 'create'),
('projects:read', 'View projects', 'projects', 'read'),
('projects:update', 'Update projects', 'projects', 'update'),
('projects:delete', 'Delete projects', 'projects', 'delete');

-- Insert default role permissions based on the specification
INSERT INTO public.role_permissions (role, permission_id)
SELECT 
  'super_admin',
  p.id
FROM public.permissions p; -- Super Admin gets all permissions

-- Admin permissions (all except super admin settings)
INSERT INTO public.role_permissions (role, permission_id)
SELECT 
  'admin',
  p.id
FROM public.permissions p
WHERE p.name NOT IN ('settings:update'); -- Admin can't update critical system settings

-- Accountant permissions (finance focused)
INSERT INTO public.role_permissions (role, permission_id)
SELECT 
  'accountant',
  p.id
FROM public.permissions p
WHERE p.module IN ('invoices', 'receipts', 'payments', 'bank_accounts', 'reports', 'customers')
   OR p.name IN ('business:read', 'audit:read');

-- Manager permissions (operations focused)
INSERT INTO public.role_permissions (role, permission_id)
SELECT 
  'manager',
  p.id
FROM public.permissions p
WHERE p.module IN ('customers', 'employees', 'time_entries', 'reports', 'projects')
   OR p.name IN ('business:read', 'invoices:read', 'time_entries:approve');

-- Employee permissions (limited)
INSERT INTO public.role_permissions (role, permission_id)
SELECT 
  'employee',
  p.id
FROM public.permissions p
WHERE p.name IN ('time_entries:create', 'payslips:read_own', 'business:read');

-- Viewer permissions (read-only)
INSERT INTO public.role_permissions (role, permission_id)
SELECT 
  'viewer',
  p.id
FROM public.permissions p
WHERE p.action = 'read' AND p.module IN ('reports', 'customers', 'invoices');

-- Client permissions (portal access only)
INSERT INTO public.role_permissions (role, permission_id)
SELECT 
  'client',
  p.id
FROM public.permissions p
WHERE p.name IN ('invoices:read_own', 'customers:read_own');