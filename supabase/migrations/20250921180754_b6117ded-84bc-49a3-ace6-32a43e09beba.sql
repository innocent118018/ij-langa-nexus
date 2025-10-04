-- Create customer accounts table with sub-account support
CREATE TABLE public.customer_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  billing_address TEXT,
  delivery_address TEXT,
  phone TEXT,
  credit_limit NUMERIC DEFAULT 0,
  has_default_due_date_days BOOLEAN DEFAULT false,
  default_due_date_days INTEGER,
  has_default_hourly_rate BOOLEAN DEFAULT false,
  default_hourly_rate NUMERIC,
  is_primary_account BOOLEAN DEFAULT true,
  parent_account_id UUID REFERENCES public.customer_accounts(id),
  account_status TEXT DEFAULT 'active' CHECK (account_status IN ('active', 'inactive', 'suspended')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create active sessions table to track sign-ins
CREATE TABLE public.customer_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  customer_account_id UUID NOT NULL REFERENCES public.customer_accounts(id) ON DELETE CASCADE,
  session_token TEXT NOT NULL UNIQUE,
  ip_address INET,
  user_agent TEXT,
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ended_at TIMESTAMP WITH TIME ZONE
);

-- Create customer notifications table
CREATE TABLE public.customer_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_account_id UUID NOT NULL REFERENCES public.customer_accounts(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  read_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on all tables
ALTER TABLE public.customer_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_notifications ENABLE ROW LEVEL SECURITY;

-- Create indexes for performance
CREATE INDEX idx_customer_accounts_email ON public.customer_accounts(email);
CREATE INDEX idx_customer_accounts_parent ON public.customer_accounts(parent_account_id);
CREATE INDEX idx_customer_sessions_email ON public.customer_sessions(email);
CREATE INDEX idx_customer_sessions_active ON public.customer_sessions(is_active, expires_at);
CREATE INDEX idx_customer_notifications_account ON public.customer_notifications(customer_account_id);

-- RLS Policies for customer_accounts
CREATE POLICY "Admins can manage all customer accounts" 
ON public.customer_accounts 
FOR ALL 
USING (get_current_user_role() = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Customer accounts are viewable by authenticated users for selection"
ON public.customer_accounts 
FOR SELECT 
USING (true);

-- RLS Policies for customer_sessions
CREATE POLICY "Admins can view all customer sessions" 
ON public.customer_sessions 
FOR SELECT 
USING (get_current_user_role() = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "System can manage customer sessions" 
ON public.customer_sessions 
FOR ALL 
USING (true);

-- RLS Policies for customer_notifications
CREATE POLICY "Admins can manage all customer notifications" 
ON public.customer_notifications 
FOR ALL 
USING (get_current_user_role() = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

-- Create function to get customer accounts by email
CREATE OR REPLACE FUNCTION public.get_customer_accounts_by_email(customer_email TEXT)
RETURNS TABLE(
  id UUID,
  customer_name TEXT,
  billing_address TEXT,
  delivery_address TEXT,
  phone TEXT,
  credit_limit NUMERIC,
  has_default_due_date_days BOOLEAN,
  default_due_date_days INTEGER,
  has_default_hourly_rate BOOLEAN,
  default_hourly_rate NUMERIC,
  is_primary_account BOOLEAN,
  parent_account_id UUID,
  account_status TEXT
)
LANGUAGE SQL
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    ca.id,
    ca.customer_name,
    ca.billing_address,
    ca.delivery_address,
    ca.phone,
    ca.credit_limit,
    ca.has_default_due_date_days,
    ca.default_due_date_days,
    ca.has_default_hourly_rate,
    ca.default_hourly_rate,
    ca.is_primary_account,
    ca.parent_account_id,
    ca.account_status
  FROM public.customer_accounts ca
  WHERE ca.email = customer_email AND ca.account_status = 'active'
  ORDER BY ca.is_primary_account DESC, ca.created_at ASC;
$$;

-- Create function to check if email has active session
CREATE OR REPLACE FUNCTION public.has_active_customer_session(customer_email TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.customer_sessions cs
    WHERE cs.email = customer_email 
      AND cs.is_active = true 
      AND cs.expires_at > now()
  );
$$;

-- Create function to create customer session
CREATE OR REPLACE FUNCTION public.create_customer_session(
  customer_email TEXT,
  account_id UUID,
  session_token TEXT,
  client_ip INET DEFAULT NULL,
  client_user_agent TEXT DEFAULT NULL,
  session_duration_hours INTEGER DEFAULT 24
)
RETURNS UUID
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  session_id UUID;
BEGIN
  -- End any existing active sessions for this email
  UPDATE public.customer_sessions 
  SET is_active = false, ended_at = now()
  WHERE email = customer_email AND is_active = true;
  
  -- Create new session
  INSERT INTO public.customer_sessions (
    email,
    customer_account_id,
    session_token,
    ip_address,
    user_agent,
    expires_at
  ) VALUES (
    customer_email,
    account_id,
    session_token,
    client_ip,
    client_user_agent,
    now() + (session_duration_hours || ' hours')::INTERVAL
  ) RETURNING id INTO session_id;
  
  RETURN session_id;
END;
$$;

-- Create trigger for updated_at on customer_accounts
CREATE TRIGGER update_customer_accounts_updated_at
BEFORE UPDATE ON public.customer_accounts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();