-- Create WhatsApp messages table
CREATE TABLE public.whatsapp_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wa_id TEXT NOT NULL,
  message_id TEXT UNIQUE,
  from_number TEXT NOT NULL,
  to_number TEXT NOT NULL,
  message_type TEXT NOT NULL DEFAULT 'text',
  content TEXT,
  media_url TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'received',
  direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  user_id UUID REFERENCES public.users(id),
  order_id UUID REFERENCES public.orders(id),
  invoice_id UUID REFERENCES public.invoices(id),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create WhatsApp templates table
CREATE TABLE public.whatsapp_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'en',
  status TEXT NOT NULL DEFAULT 'active',
  template_body TEXT NOT NULL,
  header_type TEXT,
  header_content TEXT,
  footer_text TEXT,
  button_type TEXT,
  button_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create WhatsApp business settings table
CREATE TABLE public.whatsapp_business_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  business_phone_number_id TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  display_name TEXT,
  verified_name TEXT,
  quality_rating TEXT,
  webhook_url TEXT,
  verify_token TEXT,
  access_token_encrypted TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.whatsapp_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_business_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for whatsapp_messages
CREATE POLICY "Admins can manage all WhatsApp messages" 
ON public.whatsapp_messages 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM users 
  WHERE users.id = auth.uid() 
  AND users.role = ANY(ARRAY['admin', 'super_admin', 'consultant', 'accountant'])
));

CREATE POLICY "Users can view their own WhatsApp messages" 
ON public.whatsapp_messages 
FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

-- RLS Policies for whatsapp_templates
CREATE POLICY "Admins can manage WhatsApp templates" 
ON public.whatsapp_templates 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM users 
  WHERE users.id = auth.uid() 
  AND users.role = ANY(ARRAY['admin', 'super_admin', 'consultant', 'accountant'])
));

CREATE POLICY "Anyone can view active templates" 
ON public.whatsapp_templates 
FOR SELECT 
USING (status = 'active');

-- RLS Policies for whatsapp_business_settings
CREATE POLICY "Only super admins can manage business settings" 
ON public.whatsapp_business_settings 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM users 
  WHERE users.id = auth.uid() 
  AND users.role = 'super_admin'
));

-- Create triggers for updated_at
CREATE TRIGGER update_whatsapp_messages_updated_at
  BEFORE UPDATE ON public.whatsapp_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_whatsapp_templates_updated_at
  BEFORE UPDATE ON public.whatsapp_templates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_whatsapp_business_settings_updated_at
  BEFORE UPDATE ON public.whatsapp_business_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default WhatsApp templates
INSERT INTO public.whatsapp_templates (name, category, template_body, header_content, footer_text) VALUES
('otp_verification', 'AUTHENTICATION', 'Your verification code is: {{1}}. Valid for 10 minutes.', 'IJ Langa Verification', 'Do not share this code with anyone.'),
('order_confirmation', 'TRANSACTIONAL', 'Thank you for your order! Order #{{1}} has been received and is being processed. Total: R{{2}}', 'Order Confirmation', 'Contact us for any queries.'),
('invoice_ready', 'TRANSACTIONAL', 'Your invoice #{{1}} is ready. Amount due: R{{2}}. Due date: {{3}}. View: {{4}}', 'Invoice Ready', 'Pay securely through our portal.'),
('payment_received', 'TRANSACTIONAL', 'Payment confirmed! Amount: R{{1}} for invoice #{{2}}. Thank you for your business!', 'Payment Received', 'IJ Langa Consulting'),
('order_cancelled', 'TRANSACTIONAL', 'Order #{{1}} has been cancelled as requested. Reason: {{2}}', 'Order Cancelled', 'Contact support for assistance.');

-- Enable realtime for WhatsApp messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.whatsapp_messages;