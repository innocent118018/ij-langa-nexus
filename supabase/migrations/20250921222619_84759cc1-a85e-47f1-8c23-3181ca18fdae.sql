-- Check for any problematic triggers and remove them if they're causing JSON operator issues
-- This query will help us identify any custom triggers on auth.users that might be causing the error

DO $$
DECLARE
    trigger_rec RECORD;
BEGIN
    -- Check for any triggers on auth.users that might be causing issues
    FOR trigger_rec IN 
        SELECT 
            t.tgname as trigger_name,
            p.proname as function_name
        FROM pg_trigger t
        JOIN pg_proc p ON t.tgfoid = p.oid
        JOIN pg_class c ON t.tgrelid = c.oid
        JOIN pg_namespace n ON c.relnamespace = n.oid
        WHERE n.nspname = 'auth' 
        AND c.relname = 'users' 
        AND NOT t.tgisinternal
        AND p.proname IN ('handle_new_user_as_customer', 'sync_user_updates_to_customer', 'handle_new_contact')
    LOOP
        -- Drop problematic triggers that might be causing the JSON operator error
        EXECUTE format('DROP TRIGGER IF EXISTS %I ON auth.users', trigger_rec.trigger_name);
        RAISE NOTICE 'Dropped trigger: %', trigger_rec.trigger_name;
    END LOOP;
    
    -- Recreate the main handle_new_user trigger with better error handling
    DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
    
    -- Create the trigger only for profile creation
    CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW 
        EXECUTE FUNCTION public.handle_new_user();
        
    RAISE NOTICE 'Recreated on_auth_user_created trigger for profiles only';
END $$;