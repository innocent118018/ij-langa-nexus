-- Create only missing accounting tables with admin RLS policies

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

-- Bank Reconciliations table
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

-- Enable RLS on all new tables
ALTER TABLE public.receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inter_account_transfers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expense_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bank_reconciliations ENABLE ROW LEVEL SECURITY;

-- Create admin RLS policies for new tables
-- Receipts policies
CREATE POLICY "Admins can manage all receipts" ON public.receipts FOR ALL USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));
CREATE POLICY "Users can view own receipts" ON public.receipts FOR SELECT USING (auth.uid() = user_id);

-- Inter Account Transfers policies
CREATE POLICY "Admins can manage all transfers" ON public.inter_account_transfers FOR ALL USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));
CREATE POLICY "Users can view own transfers" ON public.inter_account_transfers FOR SELECT USING (auth.uid() = user_id);

-- Expense Claims policies
CREATE POLICY "Admins can manage all expense claims" ON public.expense_claims FOR ALL USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));
CREATE POLICY "Users can create own expense claims" ON public.expense_claims FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own expense claims" ON public.expense_claims FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can view own expense claims" ON public.expense_claims FOR SELECT USING (auth.uid() = user_id);

-- Bank Reconciliations policies
CREATE POLICY "Admins can manage all bank reconciliations" ON public.bank_reconciliations FOR ALL USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));
CREATE POLICY "Users can view own bank reconciliations" ON public.bank_reconciliations FOR SELECT USING (auth.uid() = user_id);

-- Add RLS policies for existing accounting tables that need admin access
-- Enable RLS and add admin policies for existing payments table
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can manage all payments" ON public.payments;
CREATE POLICY "Admins can manage all payments" ON public.payments FOR ALL USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));
DROP POLICY IF EXISTS "Users can view own payments" ON public.payments;
CREATE POLICY "Users can view own payments" ON public.payments FOR SELECT USING (auth.uid() = user_id);

-- Sales Orders policies (if table exists)
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'sales_orders') THEN
    ALTER TABLE public.sales_orders ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Admins can manage all sales orders" ON public.sales_orders;
    CREATE POLICY "Admins can manage all sales orders" ON public.sales_orders FOR ALL USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));
    DROP POLICY IF EXISTS "Users can view own sales orders" ON public.sales_orders;
    CREATE POLICY "Users can view own sales orders" ON public.sales_orders FOR SELECT USING (auth.uid() = user_id);
  END IF;

  -- Delivery Notes policies (if table exists)
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'delivery_notes') THEN
    ALTER TABLE public.delivery_notes ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Admins can manage all delivery notes" ON public.delivery_notes;
    CREATE POLICY "Admins can manage all delivery notes" ON public.delivery_notes FOR ALL USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));
    DROP POLICY IF EXISTS "Users can view own delivery notes" ON public.delivery_notes;
    CREATE POLICY "Users can view own delivery notes" ON public.delivery_notes FOR SELECT USING (auth.uid() = user_id);
  END IF;

  -- Billable Time policies (if table exists)
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'billable_time') THEN
    ALTER TABLE public.billable_time ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Admins can manage all billable time" ON public.billable_time;
    CREATE POLICY "Admins can manage all billable time" ON public.billable_time FOR ALL USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));
    DROP POLICY IF EXISTS "Users can view own billable time" ON public.billable_time;
    CREATE POLICY "Users can view own billable time" ON public.billable_time FOR SELECT USING (auth.uid() = user_id);
  END IF;
END $$;

-- Create updated_at triggers for new tables
CREATE TRIGGER update_receipts_updated_at BEFORE UPDATE ON public.receipts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_inter_account_transfers_updated_at BEFORE UPDATE ON public.inter_account_transfers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_expense_claims_updated_at BEFORE UPDATE ON public.expense_claims FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_bank_reconciliations_updated_at BEFORE UPDATE ON public.bank_reconciliations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();