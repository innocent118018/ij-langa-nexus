-- Add missing columns to customer_accounts for statement scheduling
ALTER TABLE public.customer_accounts 
ADD COLUMN IF NOT EXISTS last_statement_sent timestamptz DEFAULT NULL;

ALTER TABLE public.customer_accounts 
ADD COLUMN IF NOT EXISTS statement_enabled boolean DEFAULT true;