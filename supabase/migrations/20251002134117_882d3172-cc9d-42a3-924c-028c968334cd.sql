-- Fix Critical Security Issues: RLS Recursion and Missing Policies

-- 1. Create security definer function to check team membership (fixes recursion)
CREATE OR REPLACE FUNCTION public.is_team_member(_user_id UUID, _team_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.team_members
    WHERE user_id = _user_id AND team_id = _team_id
  );
$$;

-- 2. Drop existing team_members policies that cause recursion
DROP POLICY IF EXISTS "Users can view team members they belong to" ON public.team_members;
DROP POLICY IF EXISTS "Team admins can manage members" ON public.team_members;

-- 3. Create new team_members policies using security definer function
CREATE POLICY "Users can view their own team memberships"
ON public.team_members
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Team owners can manage team members"
ON public.team_members
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.teams t
    WHERE t.id = team_members.team_id 
    AND t.owner_id = auth.uid()
  )
);

CREATE POLICY "Admins can manage all team members"
ON public.team_members
FOR ALL
USING (public.is_admin(auth.uid()));

-- 4. Add RLS policies for bank_cash_accounts
CREATE POLICY "Admins can manage all bank accounts"
ON public.bank_cash_accounts
FOR ALL
USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can manage own bank accounts"
ON public.bank_cash_accounts
FOR ALL
USING (auth.uid() = user_id);

-- 5. Add RLS policies for bank_payments
CREATE POLICY "Admins can manage all bank payments"
ON public.bank_payments
FOR ALL
USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can manage own bank payments"
ON public.bank_payments
FOR ALL
USING (auth.uid() = user_id);

-- 6. Add RLS policies for bank_receipts
CREATE POLICY "Admins can manage all bank receipts"
ON public.bank_receipts
FOR ALL
USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can manage own bank receipts"
ON public.bank_receipts
FOR ALL
USING (auth.uid() = user_id);

-- 7. Add RLS policies for debit_notes
CREATE POLICY "Admins can manage all debit notes"
ON public.debit_notes
FOR ALL
USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can manage own debit notes"
ON public.debit_notes
FOR ALL
USING (auth.uid() = user_id);

-- 8. Add RLS policies for goods_receipts
CREATE POLICY "Admins can manage all goods receipts"
ON public.goods_receipts
FOR ALL
USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can manage own goods receipts"
ON public.goods_receipts
FOR ALL
USING (auth.uid() = user_id);

-- 9. Add RLS policies for inventory_items
CREATE POLICY "Admins can manage all inventory items"
ON public.inventory_items
FOR ALL
USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can manage own inventory items"
ON public.inventory_items
FOR ALL
USING (auth.uid() = user_id);

-- 10. Add RLS policies for purchase_invoices
CREATE POLICY "Admins can manage all purchase invoices"
ON public.purchase_invoices
FOR ALL
USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can manage own purchase invoices"
ON public.purchase_invoices
FOR ALL
USING (auth.uid() = user_id);

-- 11. Add RLS policies for purchase_orders
CREATE POLICY "Admins can manage all purchase orders"
ON public.purchase_orders
FOR ALL
USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can manage own purchase orders"
ON public.purchase_orders
FOR ALL
USING (auth.uid() = user_id);