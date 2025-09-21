-- Insert additional customer accounts
INSERT INTO public.customer_accounts (email, customer_name, billing_address, delivery_address, phone, credit_limit, has_default_due_date_days, default_due_date_days, has_default_hourly_rate, default_hourly_rate, is_primary_account, parent_account_id) VALUES 

('infor@svklaw.co.za', 'THE NEW ST SAMPSON APOSTOLIC CHURCH', 'Stand No 5320\nUitbreiding 9\nEmbalenhle\n2385\n0621173748', 'Stand No 5320\nUitbreiding 9\nEmbalenhle\n2385\n0621173748', '0621173748', 0, true, 7, false, NULL, true, NULL),

('VSAKHILE27@GMAIL.COM', 'THOKOZA NHLANHLA INVESTMENTS', '04 MABUZA STREET\nNOGIYA SECTION EXT 3\nCAROLINA\nMPUMALANGA\n1185', '04 MABUZA STREET\nNOGIYA SECTION EXT 3\nCAROLINA\nMPUMALANGA\n1185', NULL, 0, true, 7, false, NULL, true, NULL),

('mkhulu6@gmail.com', 'THOKOZA SIYAVUMA CONSTRUCTION AND PROJECTS', '735 MTIMKULU STREET\nSIYATHEMBA\nBALFOUR\nMPUMALANGA\n2410', '735 MTIMKULU STREET\nSIYATHEMBA\nBALFOUR\nMPUMALANGA\n2410', NULL, 1500, true, 1, false, NULL, true, NULL),

('Justicemothelesi0@gmail.com', 'TSANTSABANE ENGINEERING SOLUTION PTY LTD', '1693 JACOB RADES STREET\nBOICHOKO\nPOSTMASBURG\nNORTHERN CAPE\n8420', '1693 JACOB RADES STREET\nBOICHOKO\nPOSTMASBURG\nNORTHERN CAPE\n8420', NULL, 0, true, 7, false, NULL, true, NULL),

('lukhanyolukay@gmail.com', 'VILLAGE CINEMA LINE', '2020/771168/07\nSTERKPRUIT\nMAKALAKALENG VILLAGE\n9762\nEASTERN CAPE\n9762\nLUKHANYO MANYANGAZA 9210135923080', '2020/771168/07\nSTERKPRUIT\nMAKALAKALENG VILLAGE\n9762\nEASTERN CAPE\n9762\nLUKHANYO MANYANGAZA 9210135923080', NULL, 0, false, NULL, false, NULL, true, NULL),

('phumlanexaba881@gmail.com', 'Vusisizwe Self Help And Projects', 'Registration No.: 210-621 NPO\n4696 Extension 4\nThusi Village\nErmelo\n2350', '4696 Extension 4\nThusi Village\nErmelo\n2350', NULL, 0, true, 7, false, NULL, true, NULL),

('no-email-provided@placeholder.com', 'WANDILE KITCHEN', 'A32 MABUZA FARM\nERMELO\nERMELO\nMPUMALANGA\n2350\nTHANDAZO PRECIOUS MAVUSO\n9110011344080\n+27 63 469 0093', 'A32 MABUZA FARM\nERMELO\nERMELO\nMPUMALANGA\n2350\nTHANDAZO PRECIOUS MAVUSO\n9110011344080\n+27 63 469 0093', '+27 63 469 0093', 0, true, 7, false, NULL, true, NULL),

('luyolontshwanti@gmail.com', 'WILINGA TRADING (PTY) LTD', '31 MERIMAN STREET\nBUTTERWORTH\nBUTTERWORTH\nEASTERN CAPE\n4960', '31 MERIMAN STREET\nBUTTERWORTH\nBUTTERWORTH\nEASTERN CAPE\n4960', NULL, 0, true, 7, false, NULL, true, NULL),

('muneiyowgaty@gmail.com', 'YOWGATY', '119\nPARK STREET\nSANCO\nLIMPOPO\n0950', '119\nPARK STREET\nSANCO\nLIMPOPO\n0950', NULL, 0, true, 7, false, NULL, true, NULL),

('luthulidn@gmail.com', 'DESIREE NOLWAZI LUTHULI', 'WHITE HILLS BOULAVARD\n38 AVIGNON ESTATE LONEHILL\nJOHANNESBURG\nGAUTENG\n2062', 'WHITE HILLS BOULAVARD\n38 AVIGNON ESTATE LONEHILL\nJOHANNESBURG\nGAUTENG\n2062', NULL, 0, true, 7, false, NULL, true, NULL),

('Mkhizeayanda92@gmail.com', 'FEZEKA CIVIL ENGINEERING AND CONSTRUCTION', 'AA897 MTHOMBENI CRESCENT\nUMLAZI\nDURBAN\nKWA-ZULU NATAL\n4031', 'AA897 MTHOMBENI CRESCENT\nUMLAZI\nDURBAN\nKWA-ZULU NATAL\n4031', NULL, 0, true, 7, false, NULL, true, NULL);

-- Create function to automatically create customer account when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user_as_customer()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert new user as customer account
  INSERT INTO public.customer_accounts (
    email,
    customer_name,
    billing_address,
    delivery_address,
    phone,
    credit_limit,
    has_default_due_date_days,
    default_due_date_days,
    has_default_hourly_rate,
    default_hourly_rate,
    is_primary_account,
    parent_account_id,
    account_status
  ) VALUES (
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'first_name' || ' ' || NEW.raw_user_meta_data->>'last_name',
      split_part(NEW.email, '@', 1) -- Use email prefix as fallback
    ),
    NULL, -- billing_address
    NULL, -- delivery_address  
    NEW.phone,
    0, -- credit_limit
    true, -- has_default_due_date_days
    7, -- default_due_date_days
    false, -- has_default_hourly_rate
    NULL, -- default_hourly_rate
    true, -- is_primary_account
    NULL, -- parent_account_id
    'active' -- account_status
  );
  
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create customer account when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created_as_customer ON auth.users;
CREATE TRIGGER on_auth_user_created_as_customer
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user_as_customer();

-- Create function to sync user updates with customer accounts
CREATE OR REPLACE FUNCTION public.sync_user_updates_to_customer()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Update customer account when user details change
  UPDATE public.customer_accounts 
  SET 
    customer_name = COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'first_name' || ' ' || NEW.raw_user_meta_data->>'last_name',
      split_part(NEW.email, '@', 1)
    ),
    phone = NEW.phone,
    updated_at = now()
  WHERE email = NEW.email AND is_primary_account = true;
  
  RETURN NEW;
END;
$$;

-- Create trigger to sync user updates with customer accounts
DROP TRIGGER IF EXISTS on_auth_user_updated_sync_customer ON auth.users;
CREATE TRIGGER on_auth_user_updated_sync_customer
  AFTER UPDATE ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.sync_user_updates_to_customer();

-- Create function to handle customer account creation from admin
CREATE OR REPLACE FUNCTION public.create_customer_with_auth(
  customer_email TEXT,
  customer_name TEXT,
  billing_address TEXT DEFAULT NULL,
  delivery_address TEXT DEFAULT NULL,
  phone_number TEXT DEFAULT NULL,
  credit_limit_amount NUMERIC DEFAULT 0,
  default_due_days INTEGER DEFAULT 7,
  hourly_rate NUMERIC DEFAULT NULL,
  send_invite BOOLEAN DEFAULT false
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  customer_id UUID;
  existing_customer_count INTEGER;
BEGIN
  -- Check if admin is calling this function
  IF get_current_user_role() != ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant']) THEN
    RAISE EXCEPTION 'Only admins can create customer accounts';
  END IF;
  
  -- Check if customer already exists
  SELECT COUNT(*) INTO existing_customer_count
  FROM public.customer_accounts 
  WHERE email = customer_email;
  
  -- Create customer account
  INSERT INTO public.customer_accounts (
    email,
    customer_name,
    billing_address,
    delivery_address,
    phone,
    credit_limit,
    has_default_due_date_days,
    default_due_date_days,
    has_default_hourly_rate,
    default_hourly_rate,
    is_primary_account,
    parent_account_id,
    account_status
  ) VALUES (
    customer_email,
    customer_name,
    billing_address,
    delivery_address,
    phone_number,
    credit_limit_amount,
    true,
    default_due_days,
    hourly_rate IS NOT NULL,
    hourly_rate,
    existing_customer_count = 0, -- Primary if first account for this email
    CASE WHEN existing_customer_count > 0 THEN 
      (SELECT id FROM public.customer_accounts WHERE email = customer_email AND is_primary_account = true LIMIT 1)
    ELSE NULL END,
    'active'
  ) RETURNING id INTO customer_id;
  
  -- Optionally send authentication invite
  IF send_invite THEN
    -- This would trigger an email invitation (implement via edge function)
    INSERT INTO public.customer_notifications (
      customer_account_id,
      notification_type,
      title,
      message,
      priority
    ) VALUES (
      customer_id,
      'account_created',
      'Account Created',
      'Your customer account has been created. You can now access the customer portal.',
      'high'
    );
  END IF;
  
  RETURN customer_id;
END;
$$;