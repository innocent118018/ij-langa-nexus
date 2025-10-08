-- Create service_contracts table if not exists
CREATE TABLE IF NOT EXISTS public.service_contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_id UUID,
  product_id TEXT NOT NULL,
  contract_number TEXT NOT NULL UNIQUE,
  contract_text TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  contract_status TEXT NOT NULL DEFAULT 'pending',
  policy_version TEXT DEFAULT '2025.1',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create contract_clients table if not exists
CREATE TABLE IF NOT EXISTS public.contract_clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  surname TEXT,
  company_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create contract_documents table if not exists (already exists but ensure columns)
CREATE TABLE IF NOT EXISTS public.contract_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID REFERENCES public.service_contracts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  uploaded_at TIMESTAMPTZ DEFAULT now()
);

-- Create otp_codes table
CREATE TABLE IF NOT EXISTS public.otp_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create notifications table if not exists (already exists but ensure structure)
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.service_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contract_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contract_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.otp_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for service_contracts
DROP POLICY IF EXISTS "Users can view own contracts" ON public.service_contracts;
CREATE POLICY "Users can view own contracts" ON public.service_contracts
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create own contracts" ON public.service_contracts;
CREATE POLICY "Users can create own contracts" ON public.service_contracts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all contracts" ON public.service_contracts;
CREATE POLICY "Admins can view all contracts" ON public.service_contracts
  FOR SELECT USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

DROP POLICY IF EXISTS "Admins can update all contracts" ON public.service_contracts;
CREATE POLICY "Admins can update all contracts" ON public.service_contracts
  FOR UPDATE USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- RLS Policies for contract_clients
DROP POLICY IF EXISTS "Users can view own client records" ON public.contract_clients;
CREATE POLICY "Users can view own client records" ON public.contract_clients
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create own client records" ON public.contract_clients;
CREATE POLICY "Users can create own client records" ON public.contract_clients
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all clients" ON public.contract_clients;
CREATE POLICY "Admins can view all clients" ON public.contract_clients
  FOR SELECT USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- RLS Policies for contract_documents (already exist, update if needed)
DROP POLICY IF EXISTS "Users can view own documents" ON public.contract_documents;
CREATE POLICY "Users can view own documents" ON public.contract_documents
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can upload own documents" ON public.contract_documents;
CREATE POLICY "Users can upload own documents" ON public.contract_documents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all documents" ON public.contract_documents;
CREATE POLICY "Admins can view all documents" ON public.contract_documents
  FOR SELECT USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- RLS Policies for otp_codes
DROP POLICY IF EXISTS "OTP codes are publicly readable for verification" ON public.otp_codes;
CREATE POLICY "OTP codes are publicly readable for verification" ON public.otp_codes
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "OTP codes can be created by anyone" ON public.otp_codes;
CREATE POLICY "OTP codes can be created by anyone" ON public.otp_codes
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "OTP codes can be updated by anyone" ON public.otp_codes;
CREATE POLICY "OTP codes can be updated by anyone" ON public.otp_codes
  FOR UPDATE USING (true);

-- RLS Policies for notifications (update existing)
DROP POLICY IF EXISTS "Users can view own notifications" ON public.notifications;
CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own notifications" ON public.notifications;
CREATE POLICY "Users can update own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "System can create notifications" ON public.notifications;
CREATE POLICY "System can create notifications" ON public.notifications
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view all notifications" ON public.notifications;
CREATE POLICY "Admins can view all notifications" ON public.notifications
  FOR SELECT USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_service_contracts_user_id ON public.service_contracts(user_id);
CREATE INDEX IF NOT EXISTS idx_service_contracts_status ON public.service_contracts(contract_status);
CREATE INDEX IF NOT EXISTS idx_contract_documents_contract_id ON public.contract_documents(contract_id);
CREATE INDEX IF NOT EXISTS idx_otp_codes_phone ON public.otp_codes(phone);
CREATE INDEX IF NOT EXISTS idx_otp_codes_expires_at ON public.otp_codes(expires_at);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);

-- Create function to cleanup expired OTP codes
CREATE OR REPLACE FUNCTION cleanup_expired_otp_codes()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.otp_codes WHERE expires_at < now();
END;
$$;