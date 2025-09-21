-- Complete the remaining components for the admin dashboard system
-- Only create what doesn't exist yet

-- Insert default notification templates (if they don't exist)
INSERT INTO public.notification_templates (name, event_type, channel, subject, template_body) VALUES
('invoice_issued_email', 'invoice_issued', 'email', 
 'Invoice #{{invoice.number}} from IJ Langa Consulting',
 'Hello {{customer.name}},\n\nPlease find your invoice ({{invoice.number}}) for R{{invoice.total}} due {{invoice.due_date}}.\nDownload: {{invoice.pdf_url}}\nPay now: {{payment_link}}\n\nThank you,\nIJ Langa Consulting'),

('invoice_issued_whatsapp', 'invoice_issued', 'whatsapp', 
 null,
 'IJ Langa Consulting\nInvoice #{{invoice.number}} for R{{invoice.total}} issued. Due {{invoice.due_date}}.\nView: https://ijlanga.co.za/invoices/{{invoice.id}}'),

('payment_received_email', 'payment_received', 'email',
 'Payment received — Invoice #{{invoice.number}}',
 'Hello {{customer.name}},\n\nWe have received your payment of R{{amount}} for Invoice #{{invoice.number}}. Your updated balance is R{{customer.balance}}.\nReceipt: {{receipt.pdf_url}}\n\nRegards,\nIJ Langa Consulting'),

('payment_received_whatsapp', 'payment_received', 'whatsapp',
 null,
 'Payment received. Invoice #{{invoice.number}} paid R{{amount}}. Thank you.'),

('payslip_issued_email', 'payslip_issued', 'email',
 'Your payslip for {{pay_period}} is ready',
 'Hello {{employee.name}},\n\nYour payslip for {{pay_period}} is available. Download: {{payslip.pdf_url}}\n\nRegards,\nPayroll — IJ Langa Consulting'),

('low_balance_alert_whatsapp', 'low_balance_alert', 'whatsapp',
 null,
 'Alert: Bank account {{bank.name}} balance R{{bank.balance}} is below the threshold R{{threshold}}.')
ON CONFLICT (name) DO NOTHING;

-- Create function to check user permissions (enhanced version)
CREATE OR REPLACE FUNCTION public.check_user_permission(user_id UUID, permission_name TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.users u
    JOIN public.role_permissions rp ON u.role = rp.role
    JOIN public.permissions p ON rp.permission_id = p.id
    WHERE u.id = user_id AND p.name = permission_name
  );
$$;

-- Create audit logging trigger function
CREATE OR REPLACE FUNCTION public.audit_trigger_function()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    user_role_val TEXT;
    user_email_val TEXT;
BEGIN
    -- Get user role and email
    SELECT role, email INTO user_role_val, user_email_val
    FROM public.users 
    WHERE id = auth.uid();
    
    INSERT INTO public.system_audit_log (
        actor_id,
        actor_role,
        action,
        table_name,
        record_id,
        old_values,
        new_values,
        ip_address,
        user_email
    ) VALUES (
        auth.uid(),
        user_role_val,
        TG_OP,
        TG_TABLE_NAME,
        COALESCE(NEW.id, OLD.id),
        CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN to_jsonb(OLD) ELSE NULL END,
        CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN to_jsonb(NEW) ELSE NULL END,
        inet_client_addr(),
        user_email_val
    );
    
    RETURN COALESCE(NEW, OLD);
END;
$$;

-- Add audit triggers to key tables (only if they don't exist)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'audit_customers') THEN
    CREATE TRIGGER audit_customers 
      AFTER INSERT OR UPDATE OR DELETE ON public.customers
      FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_function();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'audit_sales_invoices') THEN
    CREATE TRIGGER audit_sales_invoices 
      AFTER INSERT OR UPDATE OR DELETE ON public.sales_invoices
      FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_function();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'audit_users_system') THEN
    CREATE TRIGGER audit_users_system
      AFTER INSERT OR UPDATE OR DELETE ON public.users
      FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_function();
  END IF;
END $$;

-- Insert default system settings
INSERT INTO public.system_settings (category, key, value, description) VALUES
('accounting', 'default_currency', '"ZAR"', 'Default currency for all transactions'),
('accounting', 'tax_rate_standard', '15', 'Standard VAT rate percentage'),
('accounting', 'invoice_number_prefix', '"INV-"', 'Prefix for invoice numbers'),
('notifications', 'email_enabled', 'true', 'Enable email notifications'),
('notifications', 'whatsapp_enabled', 'true', 'Enable WhatsApp notifications'),
('integrations', 'whatsapp_api_url', '"https://api.whatsapp.com"', 'WhatsApp API base URL'),
('security', 'session_timeout', '3600', 'Session timeout in seconds'),
('security', 'max_login_attempts', '5', 'Maximum login attempts before lockout')
ON CONFLICT (category, key) DO NOTHING;