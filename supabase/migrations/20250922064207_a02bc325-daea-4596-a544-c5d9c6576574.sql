-- Create sales_quotes table with comprehensive structure
CREATE TABLE IF NOT EXISTS public.sales_quotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_number TEXT NOT NULL UNIQUE,
  issue_date DATE NOT NULL,
  expiry_date DATE,
  customer_id UUID REFERENCES public.customer_accounts(id),
  customer_name TEXT,
  description TEXT,
  subtotal DECIMAL(15,2) DEFAULT 0,
  vat_amount DECIMAL(15,2) DEFAULT 0,
  total_amount DECIMAL(15,2) DEFAULT 0,
  status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Accepted', 'Expired', 'Cancelled')),
  line_items JSONB,
  terms_conditions TEXT,
  notes TEXT,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sales_quotes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own quotes" 
ON public.sales_quotes 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own quotes" 
ON public.sales_quotes 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own quotes" 
ON public.sales_quotes 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own quotes" 
ON public.sales_quotes 
FOR DELETE 
USING (auth.uid() = user_id);

-- Admins can access all quotes
CREATE POLICY "Admins can view all quotes" 
ON public.sales_quotes 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'super_admin', 'accountant', 'consultant')
  )
);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_sales_quotes_updated_at
BEFORE UPDATE ON public.sales_quotes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_sales_quotes_user_id ON public.sales_quotes(user_id);
CREATE INDEX IF NOT EXISTS idx_sales_quotes_status ON public.sales_quotes(status);
CREATE INDEX IF NOT EXISTS idx_sales_quotes_issue_date ON public.sales_quotes(issue_date);
CREATE INDEX IF NOT EXISTS idx_sales_quotes_quote_number ON public.sales_quotes(quote_number);