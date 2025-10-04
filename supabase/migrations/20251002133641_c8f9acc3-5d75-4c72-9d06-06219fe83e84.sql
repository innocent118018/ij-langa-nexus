-- Critical Security Fixes: Role-Based Access Control and Data Protection (Fixed)

-- 1. Create app_role enum for proper role management (if not exists)
DO $$ BEGIN
  CREATE TYPE app_role AS ENUM (
    'super_admin',
    'admin', 
    'accountant',
    'consultant',
    'client',
    'user'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 2. Create user_roles table with proper RLS (if not exists)
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  assigned_by UUID REFERENCES auth.users(id),
  assigned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Super admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Super admins can assign roles" ON public.user_roles;
DROP POLICY IF EXISTS "Super admins can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Super admins can delete roles" ON public.user_roles;

-- Only super_admins can manage roles
CREATE POLICY "Super admins can view all roles"
ON public.user_roles
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'super_admin'
  )
);

CREATE POLICY "Super admins can assign roles"
ON public.user_roles
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'super_admin'
  )
);

CREATE POLICY "Super admins can update roles"
ON public.user_roles
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'super_admin'
  )
);

CREATE POLICY "Super admins can delete roles"
ON public.user_roles
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'super_admin'
  )
);

-- 3. Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- 4. Create function to check if user has any admin role
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id 
    AND role IN ('super_admin', 'admin', 'accountant', 'consultant')
  );
$$;

-- 5. Migrate existing roles from profiles to user_roles
INSERT INTO public.user_roles (user_id, role, assigned_at)
SELECT 
  p.id,
  CASE 
    WHEN p.role = 'super_admin' THEN 'super_admin'::app_role
    WHEN p.role = 'admin' THEN 'admin'::app_role
    WHEN p.role = 'accountant' THEN 'accountant'::app_role
    WHEN p.role = 'consultant' THEN 'consultant'::app_role
    WHEN p.role = 'client' THEN 'client'::app_role
    ELSE 'user'::app_role
  END,
  now()
FROM public.profiles p
WHERE p.role IS NOT NULL
AND NOT EXISTS (
  SELECT 1 FROM public.user_roles ur 
  WHERE ur.user_id = p.id 
  AND ur.role = CASE 
    WHEN p.role = 'super_admin' THEN 'super_admin'::app_role
    WHEN p.role = 'admin' THEN 'admin'::app_role
    WHEN p.role = 'accountant' THEN 'accountant'::app_role
    WHEN p.role = 'consultant' THEN 'consultant'::app_role
    WHEN p.role = 'client' THEN 'client'::app_role
    ELSE 'user'::app_role
  END
);

-- 6. Update get_current_user_role function to use user_roles table
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role::TEXT
  FROM public.user_roles
  WHERE user_id = auth.uid()
  ORDER BY 
    CASE role
      WHEN 'super_admin' THEN 1
      WHEN 'admin' THEN 2
      WHEN 'accountant' THEN 3
      WHEN 'consultant' THEN 4
      WHEN 'client' THEN 5
      ELSE 6
    END
  LIMIT 1;
$$;

-- 7. Fix customers table - remove public access, restrict to admins only
DROP POLICY IF EXISTS "Enable read access for all users" ON public.customers;
DROP POLICY IF EXISTS "Public customers are viewable by everyone" ON public.customers;
DROP POLICY IF EXISTS "Admins can view all customers" ON public.customers;
DROP POLICY IF EXISTS "Admins can create customers" ON public.customers;
DROP POLICY IF EXISTS "Admins can update customers" ON public.customers;
DROP POLICY IF EXISTS "Admins can delete customers" ON public.customers;

-- Enable RLS if not already enabled
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Only admins can view customers
CREATE POLICY "Admins can view all customers"
ON public.customers
FOR SELECT
USING (public.is_admin(auth.uid()));

-- Only admins can create customers
CREATE POLICY "Admins can create customers"
ON public.customers
FOR INSERT
WITH CHECK (public.is_admin(auth.uid()));

-- Only admins can update customers
CREATE POLICY "Admins can update customers"
ON public.customers
FOR UPDATE
USING (public.is_admin(auth.uid()));

-- Only admins can delete customers
CREATE POLICY "Admins can delete customers"
ON public.customers
FOR DELETE
USING (public.is_admin(auth.uid()));

-- 8. Fix customer_accounts table - protect financial data
ALTER TABLE public.customer_accounts ENABLE ROW LEVEL SECURITY;

-- Drop any existing overly permissive policies
DROP POLICY IF EXISTS "Enable read access for all users" ON public.customer_accounts;
DROP POLICY IF EXISTS "Admins and owners can view customer accounts" ON public.customer_accounts;
DROP POLICY IF EXISTS "Admins can create customer accounts" ON public.customer_accounts;
DROP POLICY IF EXISTS "Admins can update customer accounts" ON public.customer_accounts;
DROP POLICY IF EXISTS "Admins can delete customer accounts" ON public.customer_accounts;

-- Only admins or account owners can view
CREATE POLICY "Admins and owners can view customer accounts"
ON public.customer_accounts
FOR SELECT
USING (
  public.is_admin(auth.uid()) 
  OR email IN (
    SELECT email FROM auth.users WHERE id = auth.uid()
  )
);

-- Only admins can create customer accounts
CREATE POLICY "Admins can create customer accounts"
ON public.customer_accounts
FOR INSERT
WITH CHECK (public.is_admin(auth.uid()));

-- Only admins can update customer accounts
CREATE POLICY "Admins can update customer accounts"
ON public.customer_accounts
FOR UPDATE
USING (public.is_admin(auth.uid()));

-- Only admins can delete customer accounts
CREATE POLICY "Admins can delete customer accounts"
ON public.customer_accounts
FOR DELETE
USING (public.is_admin(auth.uid()));

-- 9. Update handle_new_user function to create user_roles entry
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
    admin_emails TEXT[] := ARRAY[
        'info@ijlanga.co.za',
        'billings@ijlanga.co.za', 
        'orders@ijlanga.co.za',
        'innocent@ijlanga.co.za',
        'correspondence@ijlanga.co.za',
        'ij.langa11@gmail.com',
        'ij.langa@live.co.za',
        'ij.langaitc@consultant.com'
    ];
    user_role app_role := 'user';
    user_full_name TEXT;
    user_avatar_url TEXT;
BEGIN
    -- Check if email is in admin list
    IF NEW.email = ANY(admin_emails) THEN
        user_role := 'super_admin';
    END IF;
    
    -- Safely extract metadata
    BEGIN
        user_full_name := COALESCE(
            (NEW.raw_user_meta_data->>'full_name')::TEXT,
            ''
        );
        user_avatar_url := COALESCE(
            (NEW.raw_user_meta_data->>'avatar_url')::TEXT,
            ''
        );
    EXCEPTION WHEN OTHERS THEN
        user_full_name := '';
        user_avatar_url := '';
    END;
    
    -- Insert into profiles table (keep role for backward compatibility temporarily)
    INSERT INTO public.profiles (
        id, 
        full_name, 
        avatar_url, 
        role, 
        created_at, 
        updated_at
    ) VALUES (
        NEW.id,
        user_full_name,
        user_avatar_url,
        user_role::TEXT,
        NOW(),
        NOW()
    );
    
    -- Insert into user_roles table
    INSERT INTO public.user_roles (
        user_id,
        role,
        assigned_at
    ) VALUES (
        NEW.id,
        user_role,
        NOW()
    );
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Error in handle_new_user: %', SQLERRM;
        RETURN NEW;
END;
$function$;