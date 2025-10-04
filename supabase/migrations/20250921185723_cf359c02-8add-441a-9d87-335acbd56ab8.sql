-- Create profiles table and authentication functions

-- Create profiles table
CREATE TABLE public.profiles (
  id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  role text DEFAULT 'user',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (id)
);

-- Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles table
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "System can create profiles"
  ON public.profiles
  FOR INSERT
  WITH CHECK (true);

-- Create security definer function to get current user role (prevents infinite recursion)
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

-- Create admin policies using security definer function
CREATE POLICY "Admins can view all profiles"
  ON public.profiles
  FOR SELECT
  USING (get_current_user_role() IN ('admin', 'super_admin', 'accountant', 'consultant'));

CREATE POLICY "Admins can update all profiles"
  ON public.profiles
  FOR UPDATE
  USING (get_current_user_role() IN ('admin', 'super_admin', 'accountant', 'consultant'));

-- Create function to get user profile safely
CREATE OR REPLACE FUNCTION public.get_user_profile()
RETURNS TABLE(
  id uuid,
  full_name text,
  avatar_url text,
  role text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    p.id,
    p.full_name,
    p.avatar_url,
    p.role,
    p.created_at,
    p.updated_at
  FROM public.profiles p
  WHERE p.id = auth.uid();
$$;

-- Create function to check user permissions
CREATE OR REPLACE FUNCTION public.check_user_permission(required_role text)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid() 
    AND (
      p.role = required_role 
      OR p.role = 'super_admin'
      OR (required_role = 'user' AND p.role IS NOT NULL)
    )
  );
$$;