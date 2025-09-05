-- Add customer fields to orders table to support guest checkout
ALTER TABLE public.orders 
ADD COLUMN customer_name TEXT,
ADD COLUMN customer_email TEXT,
ADD COLUMN customer_phone TEXT,
ADD COLUMN customer_address TEXT,
ADD COLUMN subtotal NUMERIC DEFAULT 0;

-- Make user_id nullable to support guest orders
ALTER TABLE public.orders ALTER COLUMN user_id DROP NOT NULL;

-- Make service_id nullable since orders can have products
ALTER TABLE public.orders ALTER COLUMN service_id DROP NOT NULL;