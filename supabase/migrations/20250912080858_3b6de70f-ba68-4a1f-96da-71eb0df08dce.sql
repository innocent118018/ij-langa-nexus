-- Create user_coupons table for loyalty rewards
CREATE TABLE public.user_coupons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  code TEXT NOT NULL UNIQUE,
  discount_percentage NUMERIC NOT NULL DEFAULT 5,
  used BOOLEAN NOT NULL DEFAULT false,
  used_at TIMESTAMP WITH TIME ZONE,
  order_id UUID REFERENCES public.orders(id),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_coupons ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own coupons" 
ON public.user_coupons 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can use their own coupons" 
ON public.user_coupons 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "System can create coupons for users" 
ON public.user_coupons 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can manage all coupons" 
ON public.user_coupons 
FOR ALL 
USING (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

-- Create trigger for updated_at
CREATE TRIGGER update_user_coupons_updated_at
BEFORE UPDATE ON public.user_coupons
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();