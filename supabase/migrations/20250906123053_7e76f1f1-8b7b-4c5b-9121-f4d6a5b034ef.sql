-- Drop existing problematic policies on users table
DROP POLICY IF EXISTS "users_select_policy" ON public.users;
DROP POLICY IF EXISTS "admin_users_all" ON public.users;

-- Create a simplified select policy that doesn't cause recursion
CREATE POLICY "users_select_own_or_admin_by_email" 
ON public.users 
FOR SELECT 
USING (
  auth.uid() = id 
  OR 
  (auth.jwt() ->> 'email'::text) = ANY (ARRAY[
    'ij.langa11@gmail.com'::text, 
    'info@ijlanga.co.za'::text, 
    'orders@ijlanga.co.za'::text, 
    'billings@ijlanga.co.za'::text, 
    'correspondence@ijlanga.co.za'::text
  ])
);

-- Create admin management policy using email check to avoid recursion
CREATE POLICY "admin_users_manage_by_email" 
ON public.users 
FOR ALL 
USING (
  (auth.jwt() ->> 'email'::text) = ANY (ARRAY[
    'ij.langa11@gmail.com'::text, 
    'info@ijlanga.co.za'::text, 
    'orders@ijlanga.co.za'::text, 
    'billings@ijlanga.co.za'::text, 
    'correspondence@ijlanga.co.za'::text
  ])
);