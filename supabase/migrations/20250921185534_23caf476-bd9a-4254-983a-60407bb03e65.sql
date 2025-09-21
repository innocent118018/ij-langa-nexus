-- Fix the database error and add proper authentication support

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

CREATE POLICY "Admins can view all profiles"
  ON public.profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() 
      AND p.role IN ('admin', 'super_admin', 'accountant', 'consultant')
    )
  );

CREATE POLICY "Admins can update all profiles"
  ON public.profiles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() 
      AND p.role IN ('admin', 'super_admin', 'accountant', 'consultant')
    )
  );

CREATE POLICY "System can create profiles"
  ON public.profiles
  FOR INSERT
  WITH CHECK (true);

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

-- Create function to safely get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role_safe()
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER  
SET search_path = public
AS $$
  SELECT COALESCE(p.role, 'user')
  FROM public.profiles p
  WHERE p.id = auth.uid();
$$;

-- Update handle_new_user function to be more robust
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
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
    user_role TEXT := 'user';
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
    
    -- Insert into profiles table
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
        user_role,
        NOW(),
        NOW()
    );
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Log the error but don't fail the user creation
        RAISE WARNING 'Error in handle_new_user: %', SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Ensure the trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function for authentication validation
CREATE OR REPLACE FUNCTION public.validate_user_authentication(user_email text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    user_profile jsonb;
    auth_user_id uuid;
BEGIN
    -- Get auth user ID
    SELECT au.id INTO auth_user_id
    FROM auth.users au
    WHERE au.email = user_email;
    
    IF auth_user_id IS NULL THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', 'User not found'
        );
    END IF;
    
    -- Get user profile
    SELECT jsonb_build_object(
        'id', p.id,
        'full_name', p.full_name,
        'avatar_url', p.avatar_url,
        'role', p.role,
        'email', user_email,
        'created_at', p.created_at
    ) INTO user_profile
    FROM public.profiles p
    WHERE p.id = auth_user_id;
    
    IF user_profile IS NULL THEN
        -- Create profile if missing
        INSERT INTO public.profiles (id, full_name, role, created_at, updated_at)
        VALUES (auth_user_id, '', 'user', NOW(), NOW());
        
        SELECT jsonb_build_object(
            'id', auth_user_id,
            'full_name', '',
            'avatar_url', '',
            'role', 'user',
            'email', user_email,
            'created_at', NOW()
        ) INTO user_profile;
    END IF;
    
    RETURN jsonb_build_object(
        'success', true,
        'user', user_profile
    );
    
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object(
        'success', false,
        'error', SQLERRM
    );
END;
$$;