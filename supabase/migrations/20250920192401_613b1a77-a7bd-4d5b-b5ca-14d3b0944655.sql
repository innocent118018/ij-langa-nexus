-- Create automation flows and email marketing tables
CREATE TABLE IF NOT EXISTS public.automation_flows (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  flow_type text NOT NULL, -- 'birthday', 'welcome', 'abandoned_cart'
  trigger_conditions jsonb NOT NULL DEFAULT '{}',
  actions jsonb NOT NULL DEFAULT '[]',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create customer contacts table for email automation
CREATE TABLE IF NOT EXISTS public.customer_contacts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  first_name text,
  last_name text,
  birthday date,
  phone text,
  tags text[] DEFAULT ARRAY[]::text[],
  subscribed_at timestamp with time zone NOT NULL DEFAULT now(),
  unsubscribed_at timestamp with time zone,
  is_subscribed boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create automation flow executions to track sent emails
CREATE TABLE IF NOT EXISTS public.flow_executions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  flow_id uuid NOT NULL REFERENCES public.automation_flows(id) ON DELETE CASCADE,
  contact_id uuid NOT NULL REFERENCES public.customer_contacts(id) ON DELETE CASCADE,
  executed_at timestamp with time zone NOT NULL DEFAULT now(),
  execution_data jsonb,
  status text NOT NULL DEFAULT 'completed' -- 'completed', 'failed', 'pending'
);

-- Enable RLS
ALTER TABLE public.automation_flows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flow_executions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for automation_flows
CREATE POLICY "Admins can manage automation flows" ON public.automation_flows
  FOR ALL USING (get_current_user_role() = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

-- RLS Policies for customer_contacts  
CREATE POLICY "Admins can manage all contacts" ON public.customer_contacts
  FOR ALL USING (get_current_user_role() = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Users can manage their own contact info" ON public.customer_contacts
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for flow_executions
CREATE POLICY "Admins can view all flow executions" ON public.flow_executions
  FOR SELECT USING (get_current_user_role() = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "System can insert flow executions" ON public.flow_executions
  FOR INSERT WITH CHECK (true);

-- Insert default automation flows
INSERT INTO public.automation_flows (name, description, flow_type, trigger_conditions, actions) VALUES
(
  'Birthday Celebration Flow',
  'Send birthday wishes and special offers to customers on their birthday',
  'birthday',
  '{"trigger": "birthday", "days_before": 0}',
  '[
    {
      "type": "send_email",
      "template": "birthday_template",
      "subject": "Happy Birthday from Ij Langa Consulting! 🎉",
      "delay_hours": 0
    },
    {
      "type": "add_tag",
      "tag": "birthday_2024",
      "delay_hours": 0
    }
  ]'
),
(
  'Welcome New Contacts',
  'Send welcome email to new subscribers',
  'welcome',
  '{"trigger": "contact_signup"}',
  '[
    {
      "type": "send_email", 
      "template": "welcome_template",
      "subject": "Welcome to Ij Langa Consulting!",
      "delay_hours": 0
    }
  ]'
),
(
  'Abandoned Cart Recovery',
  'Win back customers who abandoned their cart',
  'abandoned_cart', 
  '{"trigger": "cart_abandoned", "delay_hours": 24}',
  '[
    {
      "type": "send_email",
      "template": "abandoned_cart_template", 
      "subject": "Complete Your Purchase - Special Discount Inside!",
      "delay_hours": 24
    }
  ]'
);

-- Create email templates table
CREATE TABLE IF NOT EXISTS public.email_templates (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  template_type text NOT NULL, -- 'birthday', 'welcome', 'abandoned_cart'  
  subject text NOT NULL,
  html_content text NOT NULL,
  merge_tags text[] DEFAULT ARRAY[]::text[],
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage email templates" ON public.email_templates
  FOR ALL USING (get_current_user_role() = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

-- Insert default email templates
INSERT INTO public.email_templates (name, template_type, subject, html_content, merge_tags) VALUES
(
  'Birthday Template',
  'birthday',
  'Happy Birthday @@Customer@@! 🎉',
  '<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Happy Birthday</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #007BFF;">🎉 Happy Birthday @@Customer@@! 🎉</h2>
        
        <p>Dear @@Customer@@,</p>
        
        <p>We hope you have a wonderful birthday filled with joy, laughter, and all your favorite things!</p>
        
        <p>As a special birthday treat, we''re offering you <strong>15% off</strong> any of our services this month. Use code: <strong>BIRTHDAY15</strong></p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3>🎁 Your Birthday Offer:</h3>
            <ul>
                <li>15% discount on all services</li>
                <li>Valid for 30 days from @@Date@@</li>
                <li>Use code: BIRTHDAY15</li>
            </ul>
        </div>
        
        <p>Thank you for being a valued customer. We look forward to serving you!</p>
        
        <p>Best wishes,<br>
        The Ij Langa Consulting Team<br>
        📞 0130040620 | 📧 info@ijlanga.co.za<br>
        🌐 www.ijlanga.co.za</p>
    </div>
</body>
</html>',
  ARRAY['@@Customer@@', '@@Date@@']
),
(
  'Welcome Template', 
  'welcome',
  'Welcome to Ij Langa Consulting!',
  '<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Welcome</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #007BFF;">Welcome to Ij Langa Consulting! 👋</h2>
        
        <p>Dear @@Customer@@,</p>
        
        <p>Thank you for subscribing to our newsletter! We''re excited to have you as part of our community.</p>
        
        <p>At Ij Langa Consulting, we provide comprehensive business consulting, accounting, and compliance services to help your business thrive.</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3>🎯 What to Expect:</h3>
            <ul>
                <li>Monthly business tips and insights</li>
                <li>Compliance reminders and updates</li>
                <li>Special offers on our services</li>
                <li>Industry news and regulatory changes</li>
            </ul>
        </div>
        
        <p>If you have any questions or need assistance, don''t hesitate to reach out to us.</p>
        
        <p>Welcome aboard!<br>
        The Ij Langa Consulting Team<br>
        📞 0130040620 | 📧 info@ijlanga.co.za<br>
        🌐 www.ijlanga.co.za</p>
    </div>
</body>
</html>',
  ARRAY['@@Customer@@']
),
(
  'Abandoned Cart Template',
  'abandoned_cart',
  'Complete Your Purchase - @@OrderAmount@@ Waiting!',
  '<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Complete Your Purchase</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #007BFF;">Don''t Miss Out! Complete Your Purchase 🛒</h2>
        
        <p>Dear @@Customer@@,</p>
        
        <p>You left some great services in your cart! We''ve saved them for you.</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3>📋 Your Cart Contains:</h3>
            <p><strong>Order Amount:</strong> @@OrderAmount@@</p>
            <p><strong>Reference:</strong> @@Reference@@</p>
        </div>
        
        <div style="background: #e7f5ff; padding: 20px; border-radius: 5px; margin: 20px 0; text-align: center;">
            <h3 style="color: #007BFF;">🎁 Special Offer Just For You!</h3>
            <p><strong>Get 10% Off</strong> when you complete your purchase in the next 48 hours!</p>
            <p>Use code: <strong>SAVE10</strong></p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="https://ijlanga.co.za/checkout?ref=@@Reference@@" style="background: #007BFF; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Complete Purchase Now</a>
        </div>
        
        <p>If you have any questions about our services, our team is here to help!</p>
        
        <p>Thank you for choosing Ij Langa Consulting!<br>
        The Ij Langa Consulting Team<br>
        📞 0130040620 | 📧 info@ijlanga.co.za<br>
        🌐 www.ijlanga.co.za</p>
    </div>
</body>
</html>',
  ARRAY['@@Customer@@', '@@OrderAmount@@', '@@Reference@@']
);

-- Update support_tickets table to be used properly
UPDATE public.support_tickets SET status = 'open' WHERE status IS NULL;

-- Create trigger to auto-populate customer_contacts when users sign up
CREATE OR REPLACE FUNCTION public.handle_new_contact()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.customer_contacts (user_id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', split_part(COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'), ' ', 1)),
    COALESCE(NEW.raw_user_meta_data->>'last_name', split_part(COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'), ' ', 2))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created_contact ON auth.users;
CREATE TRIGGER on_auth_user_created_contact
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_contact();