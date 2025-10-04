-- Fix the last_sign_in field handling in the handle_new_user function
CREATE OR REPLACE FUNCTION handle_new_user()
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
BEGIN
    -- Check if email is in admin list
    IF NEW.email = ANY(admin_emails) THEN
        user_role := 'super_admin';
    END IF;
    
    -- Insert into profiles table with proper JSONB handling
    INSERT INTO public.profiles (id, full_name, avatar_url, role, created_at, updated_at)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
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
$$ LANGUAGE plpgsql SECURITY DEFINER;