-- First, let's check and properly fix the RLS policies without creating duplicates
-- Drop all existing policies on users table safely
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Admins can view all user profiles" ON public.users;
    DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
    DROP POLICY IF EXISTS "Users can update only their own profile" ON public.users;
    DROP POLICY IF EXISTS "Users can view only their own profile" ON public.users;
    DROP POLICY IF EXISTS "users_select_own" ON public.users;
    DROP POLICY IF EXISTS "users_update_own" ON public.users;
    DROP POLICY IF EXISTS "admin_users_all" ON public.users;
    
    -- Drop services policies
    DROP POLICY IF EXISTS "Admins can manage services" ON public.services;
    DROP POLICY IF EXISTS "Anyone can view active services" ON public.services;
    DROP POLICY IF EXISTS "services_select_active" ON public.services;
    DROP POLICY IF EXISTS "services_admin_manage" ON public.services;
END $$;

-- Create new, non-recursive policies for users table
CREATE POLICY "users_select_own" ON public.users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "users_update_own" ON public.users
  FOR UPDATE
  USING (auth.uid() = id);

-- Create a simple admin policy that doesn't cause recursion
CREATE POLICY "admin_users_all" ON public.users
  FOR ALL
  USING (
    auth.jwt() ->> 'email' IN (
      'ij.langa11@gmail.com',
      'info@ijlanga.co.za',
      'orders@ijlanga.co.za',
      'billings@ijlanga.co.za',
      'correspondence@ijlanga.co.za'
    )
  );

-- Recreate services policies without recursion
CREATE POLICY "services_select_active" ON public.services
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "services_admin_manage" ON public.services
  FOR ALL
  USING (
    auth.jwt() ->> 'email' IN (
      'ij.langa11@gmail.com',
      'info@ijlanga.co.za',
      'orders@ijlanga.co.za',
      'billings@ijlanga.co.za',
      'correspondence@ijlanga.co.za'
    )
  );