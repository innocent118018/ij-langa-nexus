-- Create missing tables for purchase management

-- Create purchase_quotes table
CREATE TABLE public.purchase_quotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  supplier_id UUID NOT NULL,
  quote_date DATE NOT NULL DEFAULT CURRENT_DATE,
  expiry_date DATE,
  subtotal NUMERIC NOT NULL DEFAULT 0,
  vat_amount NUMERIC NOT NULL DEFAULT 0,
  total_amount NUMERIC NOT NULL DEFAULT 0,
  line_items JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  quote_number TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'Active',
  notes TEXT,
  reference TEXT
);

-- Create purchase_invoices table
CREATE TABLE public.purchase_invoices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  supplier_id UUID NOT NULL,
  purchase_order_id UUID,
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE,
  subtotal NUMERIC NOT NULL DEFAULT 0,
  vat_amount NUMERIC NOT NULL DEFAULT 0,
  discount_amount NUMERIC DEFAULT 0,
  withholding_tax NUMERIC DEFAULT 0,
  total_amount NUMERIC NOT NULL DEFAULT 0,
  balance_due NUMERIC NOT NULL DEFAULT 0,
  days_to_due_date INTEGER,
  days_overdue INTEGER DEFAULT 0,
  line_items JSONB DEFAULT '[]'::jsonb,
  project_id UUID,
  division_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  invoice_number TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'Unpaid',
  reference TEXT,
  closed_invoice BOOLEAN DEFAULT false
);

-- Create debit_notes table
CREATE TABLE public.debit_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  supplier_id UUID NOT NULL,
  purchase_invoice_id UUID,
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  subtotal NUMERIC NOT NULL DEFAULT 0,
  vat_amount NUMERIC NOT NULL DEFAULT 0,
  total_amount NUMERIC NOT NULL DEFAULT 0,
  line_items JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  debit_note_number TEXT NOT NULL,
  description TEXT NOT NULL,
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'Applied',
  reference TEXT
);

-- Enable RLS on all tables
ALTER TABLE public.purchase_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchase_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.debit_notes ENABLE ROW LEVEL SECURITY;

-- RLS policies for purchase_quotes
CREATE POLICY "Users can view own purchase quotes" 
ON public.purchase_quotes 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own purchase quotes" 
ON public.purchase_quotes 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own purchase quotes" 
ON public.purchase_quotes 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own purchase quotes" 
ON public.purchase_quotes 
FOR DELETE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all purchase quotes" 
ON public.purchase_quotes 
FOR ALL 
USING (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

-- RLS policies for purchase_invoices
CREATE POLICY "Users can view own purchase invoices" 
ON public.purchase_invoices 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own purchase invoices" 
ON public.purchase_invoices 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own purchase invoices" 
ON public.purchase_invoices 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all purchase invoices" 
ON public.purchase_invoices 
FOR ALL 
USING (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

-- RLS policies for debit_notes
CREATE POLICY "Users can view own debit notes" 
ON public.debit_notes 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own debit notes" 
ON public.debit_notes 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own debit notes" 
ON public.debit_notes 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all debit notes" 
ON public.debit_notes 
FOR ALL 
USING (get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

-- Create updated_at triggers
CREATE TRIGGER update_purchase_quotes_updated_at
BEFORE UPDATE ON public.purchase_quotes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_purchase_invoices_updated_at
BEFORE UPDATE ON public.purchase_invoices
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_debit_notes_updated_at
BEFORE UPDATE ON public.debit_notes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();