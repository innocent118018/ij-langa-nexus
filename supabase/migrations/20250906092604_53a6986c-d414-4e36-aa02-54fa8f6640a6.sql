-- Create OTP codes table for phone verification
CREATE TABLE public.otp_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone TEXT NOT NULL,
  code TEXT NOT NULL,
  username TEXT,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.otp_codes ENABLE ROW LEVEL SECURITY;

-- Create policies for OTP access (allow public access for verification)
CREATE POLICY "Anyone can insert OTP codes"
ON public.otp_codes
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can select their OTP codes"
ON public.otp_codes
FOR SELECT
USING (true);

CREATE POLICY "Anyone can delete their OTP codes"
ON public.otp_codes
FOR DELETE
USING (true);

-- Add index for efficient lookups
CREATE INDEX idx_otp_codes_phone_code ON public.otp_codes(phone, code);
CREATE INDEX idx_otp_codes_expires_at ON public.otp_codes(expires_at);

-- Add username field to users table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'username') THEN
    ALTER TABLE public.users ADD COLUMN username TEXT UNIQUE;
  END IF;
END $$;