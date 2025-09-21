-- Create comprehensive RLS policies for all ERP accounting tables
-- These policies ensure strict data security and optimal performance for 1000+ concurrent users

-- 1. SALES QUOTES POLICIES
CREATE POLICY "Users can view own sales quotes" ON public.sales_quotes
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all sales quotes" ON public.sales_quotes
FOR SELECT USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Users can create own sales quotes" ON public.sales_quotes
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can create sales quotes for any user" ON public.sales_quotes
FOR INSERT WITH CHECK (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Users can update own sales quotes" ON public.sales_quotes
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can update all sales quotes" ON public.sales_quotes
FOR UPDATE USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Users can delete own sales quotes" ON public.sales_quotes
FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Admins can delete all sales quotes" ON public.sales_quotes
FOR DELETE USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

-- 2. SALES ORDERS POLICIES
CREATE POLICY "Users can view own sales orders" ON public.sales_orders
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all sales orders" ON public.sales_orders
FOR SELECT USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Users can create own sales orders" ON public.sales_orders
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can create sales orders for any user" ON public.sales_orders
FOR INSERT WITH CHECK (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Users can update own sales orders" ON public.sales_orders
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can update all sales orders" ON public.sales_orders
FOR UPDATE USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Users can delete own sales orders" ON public.sales_orders
FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Admins can delete all sales orders" ON public.sales_orders
FOR DELETE USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

-- 3. SALES INVOICES POLICIES (if table was created)
CREATE POLICY "Users can view own sales invoices" ON public.sales_invoices
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all sales invoices" ON public.sales_invoices
FOR SELECT USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Users can create own sales invoices" ON public.sales_invoices
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can create sales invoices for any user" ON public.sales_invoices
FOR INSERT WITH CHECK (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Users can update own sales invoices" ON public.sales_invoices
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can update all sales invoices" ON public.sales_invoices
FOR UPDATE USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

-- 4. CREDIT NOTES POLICIES
CREATE POLICY "Users can view own credit notes" ON public.credit_notes
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all credit notes" ON public.credit_notes
FOR SELECT USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Users can create own credit notes" ON public.credit_notes
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can create credit notes for any user" ON public.credit_notes
FOR INSERT WITH CHECK (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Users can update own credit notes" ON public.credit_notes
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can update all credit notes" ON public.credit_notes
FOR UPDATE USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

-- 5. LATE PAYMENT FEES POLICIES
CREATE POLICY "Users can view own late payment fees" ON public.late_payment_fees
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all late payment fees" ON public.late_payment_fees
FOR SELECT USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Admins can create late payment fees" ON public.late_payment_fees
FOR INSERT WITH CHECK (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Users can update own late payment fees" ON public.late_payment_fees
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can update all late payment fees" ON public.late_payment_fees
FOR UPDATE USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

-- 6. DELIVERY NOTES POLICIES
CREATE POLICY "Users can view own delivery notes" ON public.delivery_notes
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all delivery notes" ON public.delivery_notes
FOR SELECT USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Users can create own delivery notes" ON public.delivery_notes
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can create delivery notes for any user" ON public.delivery_notes
FOR INSERT WITH CHECK (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Users can update own delivery notes" ON public.delivery_notes
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can update all delivery notes" ON public.delivery_notes
FOR UPDATE USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

-- 7. BILLABLE TIME POLICIES
CREATE POLICY "Users can view own billable time" ON public.billable_time
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all billable time" ON public.billable_time
FOR SELECT USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Users can create own billable time" ON public.billable_time
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can create billable time for any user" ON public.billable_time
FOR INSERT WITH CHECK (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Users can update own billable time" ON public.billable_time
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can update all billable time" ON public.billable_time
FOR UPDATE USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

-- 8. WITHHOLDING TAX RECEIPTS POLICIES
CREATE POLICY "Users can view own withholding tax receipts" ON public.withholding_tax_receipts
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all withholding tax receipts" ON public.withholding_tax_receipts
FOR SELECT USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Users can create own withholding tax receipts" ON public.withholding_tax_receipts
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can create withholding tax receipts for any user" ON public.withholding_tax_receipts
FOR INSERT WITH CHECK (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Users can update own withholding tax receipts" ON public.withholding_tax_receipts
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can update all withholding tax receipts" ON public.withholding_tax_receipts
FOR UPDATE USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

-- 9. SUPPLIERS POLICIES
CREATE POLICY "Users can view own suppliers" ON public.suppliers
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all suppliers" ON public.suppliers
FOR SELECT USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Users can create own suppliers" ON public.suppliers
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can create suppliers for any user" ON public.suppliers
FOR INSERT WITH CHECK (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Users can update own suppliers" ON public.suppliers
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can update all suppliers" ON public.suppliers
FOR UPDATE USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Users can delete own suppliers" ON public.suppliers
FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Admins can delete all suppliers" ON public.suppliers
FOR DELETE USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

-- 10. PURCHASE QUOTES POLICIES
CREATE POLICY "Users can view own purchase quotes" ON public.purchase_quotes
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all purchase quotes" ON public.purchase_quotes
FOR SELECT USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Users can create own purchase quotes" ON public.purchase_quotes
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can create purchase quotes for any user" ON public.purchase_quotes
FOR INSERT WITH CHECK (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Users can update own purchase quotes" ON public.purchase_quotes
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can update all purchase quotes" ON public.purchase_quotes
FOR UPDATE USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Users can delete own purchase quotes" ON public.purchase_quotes
FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Admins can delete all purchase quotes" ON public.purchase_quotes
FOR DELETE USING (get_current_user_role() = ANY (ARRAY['admin', 'super_admin', 'accountant', 'consultant']));