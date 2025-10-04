-- Additional accounting tables with admin RLS policies

-- Receipts table
CREATE TABLE public.receipts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  customer_id UUID,
  account_id UUID NOT NULL,
  receipt_date DATE NOT NULL DEFAULT CURRENT_DATE,
  amount NUMERIC NOT NULL DEFAULT 0,
  payment_method TEXT,
  reference TEXT,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending',
  project_id UUID,
  division_id UUID,
  cleared_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  receipt_number TEXT NOT NULL
);

-- Payments table
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  supplier_id UUID NOT NULL,
  account_id UUID NOT NULL,
  payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  amount NUMERIC NOT NULL DEFAULT 0,
  payment_method TEXT,
  reference TEXT,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending',
  project_id UUID,
  division_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  payment_number TEXT NOT NULL
);

-- Inter Account Transfers table
CREATE TABLE public.inter_account_transfers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  from_account_id UUID NOT NULL,
  to_account_id UUID NOT NULL,
  transfer_date DATE NOT NULL DEFAULT CURRENT_DATE,
  amount NUMERIC NOT NULL DEFAULT 0,
  reference TEXT,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  transfer_number TEXT NOT NULL
);

-- Expense Claims table
CREATE TABLE public.expense_claims (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  employee_id UUID NOT NULL,
  claim_date DATE NOT NULL DEFAULT CURRENT_DATE,
  total_amount NUMERIC NOT NULL DEFAULT 0,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending',
  approved_by UUID,
  approved_date DATE,
  reimbursed_date DATE,
  line_items JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  claim_number TEXT NOT NULL
);

-- Sales Orders table (if not exists)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'sales_orders') THEN
    CREATE TABLE public.sales_orders (
      id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id UUID NOT NULL,
      customer_id UUID,
      sales_quote_id UUID,
      order_date DATE NOT NULL DEFAULT CURRENT_DATE,
      delivery_date DATE,
      subtotal NUMERIC NOT NULL DEFAULT 0,
      vat_amount NUMERIC NOT NULL DEFAULT 0,
      total_amount NUMERIC NOT NULL DEFAULT 0,
      line_items JSONB DEFAULT '[]'::jsonb,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      order_number TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL DEFAULT 'Pending',
      delivery_status TEXT NOT NULL DEFAULT 'Pending'
    );
  END IF;
END $$;

-- Delivery Notes table (if not exists)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'delivery_notes') THEN
    CREATE TABLE public.delivery_notes (
      id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id UUID NOT NULL,
      customer_id UUID NOT NULL,
      sales_order_id UUID,
      delivery_date DATE NOT NULL DEFAULT CURRENT_DATE,
      delivery_address TEXT,
      items_count INTEGER DEFAULT 0,
      line_items JSONB DEFAULT '[]'::jsonb,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      delivery_number TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL DEFAULT 'Delivered'
    );
  END IF;
END $$;

-- Billable Time table (if not exists)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'billable_time') THEN
    CREATE TABLE public.billable_time (
      id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id UUID NOT NULL,
      employee_id UUID NOT NULL,
      customer_id UUID,
      project_id UUID,
      date DATE NOT NULL DEFAULT CURRENT_DATE,
      hours NUMERIC NOT NULL DEFAULT 0,
      rate NUMERIC NOT NULL DEFAULT 0,
      total_amount NUMERIC NOT NULL DEFAULT 0,
      description TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Unbilled',
      invoice_id UUID,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
    );
  END IF;
END $$;

-- Bank Reconciliations table (if not exists)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'bank_reconciliations') THEN
    CREATE TABLE public.bank_reconciliations (
      id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id UUID NOT NULL,
      account_id UUID NOT NULL,
      reconciliation_date DATE NOT NULL DEFAULT CURRENT_DATE,
      statement_balance NUMERIC NOT NULL DEFAULT 0,
      book_balance NUMERIC NOT NULL DEFAULT 0,
      difference NUMERIC NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'In Progress',
      completed_by UUID,
      completed_at TIMESTAMP WITH TIME ZONE,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      reconciliation_number TEXT NOT NULL,
      notes TEXT
    );
  END IF;
END $$;

-- Enable RLS on all tables
ALTER TABLE public.receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inter_account_transfers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expense_claims ENABLE ROW LEVEL SECURITY;

-- Create admin RLS policies for all tables
-- Receipts policies
CREATE POLICY "Admins can manage all receipts" ON public.receipts FOR ALL USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));
CREATE POLICY "Users can view own receipts" ON public.receipts FOR SELECT USING (auth.uid() = user_id);

-- Payments policies
CREATE POLICY "Admins can manage all payments" ON public.payments FOR ALL USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));
CREATE POLICY "Users can view own payments" ON public.payments FOR SELECT USING (auth.uid() = user_id);

-- Inter Account Transfers policies
CREATE POLICY "Admins can manage all transfers" ON public.inter_account_transfers FOR ALL USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));
CREATE POLICY "Users can view own transfers" ON public.inter_account_transfers FOR SELECT USING (auth.uid() = user_id);

-- Expense Claims policies
CREATE POLICY "Admins can manage all expense claims" ON public.expense_claims FOR ALL USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));
CREATE POLICY "Users can create own expense claims" ON public.expense_claims FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own expense claims" ON public.expense_claims FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can view own expense claims" ON public.expense_claims FOR SELECT USING (auth.uid() = user_id);

-- Add RLS policies for other accounting tables if they exist but don't have admin policies
DO $$ 
BEGIN
  -- Sales Orders policies
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'sales_orders') THEN
    ALTER TABLE public.sales_orders ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Admins can manage all sales orders" ON public.sales_orders;
    CREATE POLICY "Admins can manage all sales orders" ON public.sales_orders FOR ALL USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));
    DROP POLICY IF EXISTS "Users can view own sales orders" ON public.sales_orders;
    CREATE POLICY "Users can view own sales orders" ON public.sales_orders FOR SELECT USING (auth.uid() = user_id);
  END IF;

  -- Delivery Notes policies
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'delivery_notes') THEN
    ALTER TABLE public.delivery_notes ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Admins can manage all delivery notes" ON public.delivery_notes;
    CREATE POLICY "Admins can manage all delivery notes" ON public.delivery_notes FOR ALL USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));
    DROP POLICY IF EXISTS "Users can view own delivery notes" ON public.delivery_notes;
    CREATE POLICY "Users can view own delivery notes" ON public.delivery_notes FOR SELECT USING (auth.uid() = user_id);
  END IF;

  -- Billable Time policies
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'billable_time') THEN
    ALTER TABLE public.billable_time ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Admins can manage all billable time" ON public.billable_time;
    CREATE POLICY "Admins can manage all billable time" ON public.billable_time FOR ALL USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));
    DROP POLICY IF EXISTS "Users can view own billable time" ON public.billable_time;
    CREATE POLICY "Users can view own billable time" ON public.billable_time FOR SELECT USING (auth.uid() = user_id);
  END IF;

  -- Bank Reconciliations policies
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'bank_reconciliations') THEN
    ALTER TABLE public.bank_reconciliations ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Admins can manage all bank reconciliations" ON public.bank_reconciliations;
    CREATE POLICY "Admins can manage all bank reconciliations" ON public.bank_reconciliations FOR ALL USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));
    DROP POLICY IF EXISTS "Users can view own bank reconciliations" ON public.bank_reconciliations;
    CREATE POLICY "Users can view own bank reconciliations" ON public.bank_reconciliations FOR SELECT USING (auth.uid() = user_id);
  END IF;
END $$;

-- Create updated_at triggers for new tables
CREATE TRIGGER update_receipts_updated_at BEFORE UPDATE ON public.receipts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_inter_account_transfers_updated_at BEFORE UPDATE ON public.inter_account_transfers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_expense_claims_updated_at BEFORE UPDATE ON public.expense_claims FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();