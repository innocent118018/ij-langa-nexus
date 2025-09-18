-- Drop existing policies that might conflict
DROP POLICY IF EXISTS "Admins can manage WhatsApp templates" ON public.whatsapp_templates;
DROP POLICY IF EXISTS "Anyone can view active templates" ON public.whatsapp_templates;

-- Update OTP codes table for enhanced functionality
ALTER TABLE public.otp_codes 
ADD COLUMN IF NOT EXISTS method TEXT DEFAULT 'sms',
ADD COLUMN IF NOT EXISTS verification_url TEXT,
ADD COLUMN IF NOT EXISTS template_used TEXT;

-- RLS policies for whatsapp_templates (recreate)
CREATE POLICY "Admins can manage WhatsApp templates" ON public.whatsapp_templates
FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.users 
  WHERE users.id = auth.uid() 
  AND users.role = ANY(ARRAY['admin', 'super_admin', 'consultant', 'accountant'])
));

CREATE POLICY "Anyone can view active templates" ON public.whatsapp_templates
FOR SELECT TO authenticated
USING (status = 'active');

-- Create comprehensive dashboard metrics function
CREATE OR REPLACE FUNCTION public.get_dashboard_metrics(user_uuid UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  metrics JSONB;
  user_role TEXT;
BEGIN
  -- Get user role
  SELECT role INTO user_role FROM public.users WHERE id = user_uuid;
  
  IF user_role = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant']) THEN
    -- Admin metrics
    SELECT jsonb_build_object(
      'total_users', (SELECT COUNT(*) FROM public.users),
      'total_orders', (SELECT COUNT(*) FROM public.orders),
      'pending_orders', (SELECT COUNT(*) FROM public.orders WHERE status = 'pending'),
      'total_revenue', (SELECT COALESCE(SUM(total_amount), 0) FROM public.orders WHERE status = 'completed'),
      'active_clients', (SELECT COUNT(DISTINCT user_id) FROM public.orders WHERE created_at >= now() - INTERVAL '30 days'),
      'recent_orders', (
        SELECT jsonb_agg(
          jsonb_build_object(
            'id', o.id,
            'customer_name', o.customer_name,
            'total_amount', o.total_amount,
            'status', o.status,
            'created_at', o.created_at
          )
        ) FROM (
          SELECT * FROM public.orders 
          ORDER BY created_at DESC 
          LIMIT 10
        ) o
      )
    ) INTO metrics;
  ELSE
    -- Client metrics
    SELECT jsonb_build_object(
      'my_orders', (SELECT COUNT(*) FROM public.orders WHERE user_id = user_uuid),
      'pending_orders', (SELECT COUNT(*) FROM public.orders WHERE user_id = user_uuid AND status = 'pending'),
      'completed_orders', (SELECT COUNT(*) FROM public.orders WHERE user_id = user_uuid AND status = 'completed'),
      'total_spent', (SELECT COALESCE(SUM(total_amount), 0) FROM public.orders WHERE user_id = user_uuid AND status = 'completed'),
      'recent_orders', (
        SELECT jsonb_agg(
          jsonb_build_object(
            'id', o.id,
            'total_amount', o.total_amount,
            'status', o.status,
            'created_at', o.created_at
          )
        ) FROM (
          SELECT * FROM public.orders 
          WHERE user_id = user_uuid
          ORDER BY created_at DESC 
          LIMIT 5
        ) o
      )
    ) INTO metrics;
  END IF;
  
  RETURN metrics;
END;
$$;

-- Insert default WhatsApp templates (only if they don't exist)
INSERT INTO public.whatsapp_templates (name, category, template_body, header_content, footer_text, button_type, button_text) 
SELECT 'login_otp_notification', 'Authentication', 
'Hello {{1}},

Your IJ Langa Consulting login verification code is: *{{2}}*

For security, do not share this code with anyone.
This code will expire in {{3}} minutes.

Click below to continue your login securely.', 
'IJ Langa - Login Verification', 
'IJ Langa Consulting – Success Through Innovation',
'Call to Action', 'Continue Login'
WHERE NOT EXISTS (SELECT 1 FROM public.whatsapp_templates WHERE name = 'login_otp_notification');

INSERT INTO public.whatsapp_templates (name, category, template_body, header_content, footer_text, button_type, button_text)
SELECT 'login_notification', 'Utility',
'Hello {{1}},
A login to your IJ Langa Consulting account was just detected.

📌 Date & Time: {{2}}
📍 Location / Device: {{3}}

If this was you, no action is needed.
If not, please reset your password immediately or contact support.',
'Login Alert', 
'IJ Langa Consulting – Success Through Innovation',
'Quick Reply', 'Reset Password|Contact Support'
WHERE NOT EXISTS (SELECT 1 FROM public.whatsapp_templates WHERE name = 'login_notification');

INSERT INTO public.whatsapp_templates (name, category, template_body, header_content, footer_text, button_type, button_text)
SELECT 'order_confirmation', 'Utility',
'Hello {{1}},
Thank you for your order with IJ Langa Consulting.

📌 Order Number: {{2}}
📦 Service / Package: {{3}}
💰 Amount: {{4}}

We are processing your order and will notify you once it''s completed.

Thank you for trusting us.',
'Order Confirmed',
'IJ Langa Consulting – Success Through Innovation',
'Call to Action', 'View Order'
WHERE NOT EXISTS (SELECT 1 FROM public.whatsapp_templates WHERE name = 'order_confirmation');

INSERT INTO public.whatsapp_templates (name, category, template_body, header_content, footer_text, button_type, button_text)
SELECT 'invoice_issued', 'Utility',
'Hello {{1}},
Your invoice from IJ Langa Consulting has been issued.

📄 Invoice Number: {{2}}
💰 Amount Due: {{3}}
📅 Due Date: {{4}}

Please review the details below:
{{5}}

Click below to view or pay your invoice.',
'Invoice Ready',
'IJ Langa Consulting – Success Through Innovation',
'Call to Action', 'View Invoice|Pay Now'
WHERE NOT EXISTS (SELECT 1 FROM public.whatsapp_templates WHERE name = 'invoice_issued');

INSERT INTO public.whatsapp_templates (name, category, template_body, header_content, footer_text, button_type, button_text)
SELECT 'payment_reminder', 'Utility',
'Hello {{1}},
This is a friendly reminder that payment for your invoice {{2}} is due soon.

💰 Amount: {{3}}
📅 Due Date: {{4}}

To avoid penalties or service interruptions, please make payment before the due date.',
'Payment Reminder',
'IJ Langa Consulting – Success Through Innovation',
'Call to Action', 'Pay Now|Need Help'
WHERE NOT EXISTS (SELECT 1 FROM public.whatsapp_templates WHERE name = 'payment_reminder');

-- Create comprehensive user management function
CREATE OR REPLACE FUNCTION public.get_user_profile_with_activity(user_uuid UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  profile JSONB;
BEGIN
  SELECT jsonb_build_object(
    'user', (
      SELECT jsonb_build_object(
        'id', u.id,
        'email', u.email,
        'full_name', u.full_name,
        'role', u.role,
        'is_active', u.is_active,
        'created_at', u.created_at,
        'last_login', u.last_login
      ) FROM public.users u WHERE u.id = user_uuid
    ),
    'recent_activity', public.get_user_recent_activity(user_uuid, 10),
    'companies', public.get_user_companies(user_uuid),
    'metrics', public.get_dashboard_metrics(user_uuid)
  ) INTO profile;
  
  RETURN profile;
END;
$$;