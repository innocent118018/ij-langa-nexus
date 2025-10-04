-- Fix the database error with user's last_sign_in field
-- The error suggests there's an issue with JSONB operations on text fields

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