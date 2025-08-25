
-- First, let's update the users table to ensure we have proper admin roles
-- Update existing admin check to include the new admin emails
UPDATE users 
SET role = 'admin' 
WHERE email IN (
  'info@ijlanga.co.za',
  'orders@ijlanga.co.za', 
  'billings@ijlanga.co.za',
  'correspondence@ijlanga.co.za',
  'ij.langa11@gmail.com'
);

-- Insert admin users if they don't exist (these will be created when they first sign up)
-- Note: We can't directly insert into auth.users table, but we can prepare the users table
INSERT INTO users (id, email, full_name, role, is_active, email_verified)
SELECT 
  gen_random_uuid(),
  email,
  CASE 
    WHEN email = 'info@ijlanga.co.za' THEN 'IJ Langa Info'
    WHEN email = 'orders@ijlanga.co.za' THEN 'IJ Langa Orders'
    WHEN email = 'billings@ijlanga.co.za' THEN 'IJ Langa Billings'
    WHEN email = 'correspondence@ijlanga.co.za' THEN 'IJ Langa Correspondence'
    WHEN email = 'ij.langa11@gmail.com' THEN 'IJ Langa Admin'
  END,
  'admin',
  true,
  true
FROM (VALUES 
  ('info@ijlanga.co.za'),
  ('orders@ijlanga.co.za'),
  ('billings@ijlanga.co.za'), 
  ('correspondence@ijlanga.co.za'),
  ('ij.langa11@gmail.com')
) AS admin_emails(email)
WHERE NOT EXISTS (
  SELECT 1 FROM users WHERE users.email = admin_emails.email
);

-- Update the handle_new_user function to automatically set admin role for these emails
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, email_verified, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    NEW.email_confirmed_at IS NOT NULL,
    CASE 
      WHEN NEW.email IN (
        'info@ijlanga.co.za',
        'orders@ijlanga.co.za', 
        'billings@ijlanga.co.za',
        'correspondence@ijlanga.co.za',
        'ij.langa11@gmail.com'
      ) THEN 'admin'
      ELSE 'client'
    END
  );
  RETURN NEW;
END;
$$;
