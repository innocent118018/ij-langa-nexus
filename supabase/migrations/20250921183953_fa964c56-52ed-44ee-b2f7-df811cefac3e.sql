-- Fix the database error with user's last_sign_in field
-- The error suggests there's an issue with JSONB operations on text fields

-- First, let's check if we need to update the auth.users trigger
-- The error indicates the last_sign_in field handling is problematic

-- Update the handle_new_user function to avoid JSONB operations on text fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, email_verified, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      CASE 
        WHEN NEW.raw_user_meta_data IS NOT NULL AND jsonb_typeof(NEW.raw_user_meta_data) = 'object' 
        THEN NEW.raw_user_meta_data->>'full_name'
        ELSE NULL 
      END,
      'User'
    ),
    NEW.email_confirmed_at IS NOT NULL,
    CASE 
      WHEN NEW.email IN (
        'info@ijlanga.co.za',
        'billings@ijlanga.co.za', 
        'orders@ijlanga.co.za',
        'innocent@ijlanga.co.za',
        'correspondence@ijlanga.co.za',
        'ij.langa11@gmail.com',
        'ij.langa@live.co.za',
        'ij.langaitc@consultant.com'
      ) THEN 'super_admin'
      ELSE 'client'
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update existing admin users to super_admin role
UPDATE public.users 
SET role = 'super_admin' 
WHERE email IN (
  'info@ijlanga.co.za',
  'billings@ijlanga.co.za', 
  'orders@ijlanga.co.za',
  'innocent@ijlanga.co.za',
  'correspondence@ijlanga.co.za',
  'ij.langa11@gmail.com',
  'ij.langa@live.co.za',
  'ij.langaitc@consultant.com'
);

-- Create a function to safely create admin users
CREATE OR REPLACE FUNCTION public.create_admin_user(
  user_email TEXT,
  user_password TEXT DEFAULT 'Innocent118018@12345679'
)
RETURNS TEXT AS $$
DECLARE
  user_exists BOOLEAN;
  result_message TEXT;
BEGIN
  -- Check if user already exists in auth.users
  SELECT EXISTS(
    SELECT 1 FROM auth.users WHERE email = user_email
  ) INTO user_exists;
  
  IF user_exists THEN
    -- Update existing user to admin role
    UPDATE public.users 
    SET role = 'super_admin', updated_at = now()
    WHERE email = user_email;
    
    result_message := 'Updated existing user ' || user_email || ' to super_admin';
  ELSE
    -- Note: We cannot directly insert into auth.users from SQL
    -- This will need to be handled by the application layer
    result_message := 'User ' || user_email || ' needs to be created via application signup';
  END IF;
  
  RETURN result_message;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;</Parameter>
</invoke>