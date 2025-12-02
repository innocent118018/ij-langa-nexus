-- 1. Companies table (if not exists)
CREATE TABLE IF NOT EXISTS public.companies (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  registration_number text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Company users/memberships
CREATE TABLE IF NOT EXISTS public.company_users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id uuid REFERENCES public.companies(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role text DEFAULT 'member', -- owner, director, member
  created_at timestamptz DEFAULT now(),
  UNIQUE(company_id, user_id)
);

-- 3. Company documents (links to storage)
CREATE TABLE IF NOT EXISTS public.company_documents (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id uuid REFERENCES public.companies(id) ON DELETE CASCADE,
  uploaded_by uuid REFERENCES auth.users(id),
  storage_path text NOT NULL,
  filename text,
  mime_type text,
  size integer,
  category text,
  created_at timestamptz DEFAULT now()
);

-- 4. Audit trail for compliance
CREATE TABLE IF NOT EXISTS public.audit_trail (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id uuid REFERENCES public.companies(id),
  actor_id uuid REFERENCES auth.users(id),
  action text NOT NULL,
  details jsonb,
  ip_address inet,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_trail ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "companies_select_members_admins" ON public.companies;
DROP POLICY IF EXISTS "companies_insert_authenticated" ON public.companies;
DROP POLICY IF EXISTS "companies_update_admins" ON public.companies;
DROP POLICY IF EXISTS "company_users_select" ON public.company_users;
DROP POLICY IF EXISTS "company_users_insert_admins" ON public.company_users;
DROP POLICY IF EXISTS "company_users_update_admins" ON public.company_users;
DROP POLICY IF EXISTS "company_users_delete_admins" ON public.company_users;
DROP POLICY IF EXISTS "company_documents_select" ON public.company_documents;
DROP POLICY IF EXISTS "company_documents_insert" ON public.company_documents;
DROP POLICY IF EXISTS "company_documents_delete_admins" ON public.company_documents;
DROP POLICY IF EXISTS "audit_trail_select" ON public.audit_trail;
DROP POLICY IF EXISTS "audit_trail_insert" ON public.audit_trail;

-- POLICIES: companies
CREATE POLICY "companies_select_members_admins" ON public.companies
  FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.company_users cu WHERE cu.company_id = companies.id AND cu.user_id = auth.uid())
    OR is_admin(auth.uid())
  );

CREATE POLICY "companies_insert_authenticated" ON public.companies
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "companies_update_admins" ON public.companies
  FOR UPDATE TO authenticated
  USING (is_admin(auth.uid()) OR created_by = auth.uid());

-- POLICIES: company_users
CREATE POLICY "company_users_select" ON public.company_users
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR is_admin(auth.uid()));

CREATE POLICY "company_users_insert_admins" ON public.company_users
  FOR INSERT TO authenticated
  WITH CHECK (is_admin(auth.uid()) OR user_id = auth.uid());

CREATE POLICY "company_users_update_admins" ON public.company_users
  FOR UPDATE TO authenticated
  USING (is_admin(auth.uid()));

CREATE POLICY "company_users_delete_admins" ON public.company_users
  FOR DELETE TO authenticated
  USING (is_admin(auth.uid()));

-- POLICIES: company_documents
CREATE POLICY "company_documents_select" ON public.company_documents
  FOR SELECT TO authenticated
  USING (
    uploaded_by = auth.uid()
    OR EXISTS (SELECT 1 FROM public.company_users cu WHERE cu.company_id = company_documents.company_id AND cu.user_id = auth.uid())
    OR is_admin(auth.uid())
  );

CREATE POLICY "company_documents_insert" ON public.company_documents
  FOR INSERT TO authenticated
  WITH CHECK (uploaded_by = auth.uid() OR is_admin(auth.uid()));

CREATE POLICY "company_documents_delete_admins" ON public.company_documents
  FOR DELETE TO authenticated
  USING (is_admin(auth.uid()));

-- POLICIES: audit_trail
CREATE POLICY "audit_trail_select" ON public.audit_trail
  FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.company_users cu WHERE cu.company_id = audit_trail.company_id AND cu.user_id = auth.uid())
    OR is_admin(auth.uid())
  );

CREATE POLICY "audit_trail_insert" ON public.audit_trail
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Storage policy for user folders
DROP POLICY IF EXISTS "users_access_own_storage" ON storage.objects;
CREATE POLICY "users_access_own_storage" ON storage.objects
  FOR ALL TO authenticated
  USING (
    bucket_id = 'user-files' AND (
      split_part(name, '/', 1) = auth.uid()::text
      OR is_admin(auth.uid())
    )
  );