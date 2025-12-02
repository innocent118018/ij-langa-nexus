-- ===== Additional admin feature tables =====

-- Access Tokens
CREATE TABLE IF NOT EXISTS public.access_tokens (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text,
  token text,
  description text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Billable Expenses
CREATE TABLE IF NOT EXISTS public.billable_expenses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id uuid REFERENCES public.companies(id),
  description text,
  amount numeric,
  date date,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Chart of Accounts
CREATE TABLE IF NOT EXISTS public.chart_of_accounts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  code text,
  name text,
  type text,
  created_at timestamptz DEFAULT now()
);

-- Folders table (metadata for user-files folders)
CREATE TABLE IF NOT EXISTS public.folders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id uuid REFERENCES auth.users(id),
  path text NOT NULL,
  label text,
  created_at timestamptz DEFAULT now()
);

-- Payroll Settings
CREATE TABLE IF NOT EXISTS public.payroll_settings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id uuid REFERENCES public.companies(id),
  settings jsonb,
  created_at timestamptz DEFAULT now()
);

-- Tax Codes
CREATE TABLE IF NOT EXISTS public.tax_codes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  code text,
  description text,
  rate numeric,
  created_at timestamptz DEFAULT now()
);

-- Themes
CREATE TABLE IF NOT EXISTS public.themes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text,
  settings jsonb,
  created_at timestamptz DEFAULT now()
);

-- ===== Enable RLS on new tables =====
ALTER TABLE public.access_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.billable_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chart_of_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payroll_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tax_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.themes ENABLE ROW LEVEL SECURITY;

-- ===== RLS Policies =====

-- Access Tokens: admin-only
CREATE POLICY "access_tokens_admins_only" ON public.access_tokens
  FOR ALL TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- Billable Expenses: company members or admins can view; creators or admins can insert
CREATE POLICY "billable_expenses_select" ON public.billable_expenses
  FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.company_users cu WHERE cu.company_id = billable_expenses.company_id AND cu.user_id = auth.uid())
    OR is_admin(auth.uid())
  );

CREATE POLICY "billable_expenses_insert" ON public.billable_expenses
  FOR INSERT TO authenticated
  WITH CHECK (created_by = auth.uid() OR is_admin(auth.uid()));

CREATE POLICY "billable_expenses_update" ON public.billable_expenses
  FOR UPDATE TO authenticated
  USING (created_by = auth.uid() OR is_admin(auth.uid()));

CREATE POLICY "billable_expenses_delete" ON public.billable_expenses
  FOR DELETE TO authenticated
  USING (is_admin(auth.uid()));

-- Chart of Accounts: admin-only
CREATE POLICY "chart_of_accounts_admins" ON public.chart_of_accounts
  FOR ALL TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- Tax Codes: admin-only
CREATE POLICY "tax_codes_admins" ON public.tax_codes
  FOR ALL TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- Themes: admin-only
CREATE POLICY "themes_admins" ON public.themes
  FOR ALL TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- Folders: owner or admin
CREATE POLICY "folders_select_owner_or_admin" ON public.folders
  FOR SELECT TO authenticated
  USING (owner_id = auth.uid() OR is_admin(auth.uid()));

CREATE POLICY "folders_insert_owner" ON public.folders
  FOR INSERT TO authenticated
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "folders_update_admin" ON public.folders
  FOR UPDATE TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "folders_delete_admin" ON public.folders
  FOR DELETE TO authenticated
  USING (is_admin(auth.uid()));

-- Payroll Settings: company members or admin
CREATE POLICY "payroll_settings_select" ON public.payroll_settings
  FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.company_users cu WHERE cu.company_id = payroll_settings.company_id AND cu.user_id = auth.uid())
    OR is_admin(auth.uid())
  );

CREATE POLICY "payroll_settings_manage_admin" ON public.payroll_settings
  FOR ALL TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));