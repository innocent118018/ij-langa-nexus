-- Fix document policies and add new document categories
-- Add missing RLS policies for comprehensive document management

-- Update documents table policies to allow admin access for document management
DROP POLICY IF EXISTS "Users can create only their own documents" ON documents;
DROP POLICY IF EXISTS "Users can create own documents" ON documents;

-- Create comprehensive document policies
CREATE POLICY "Users can create documents" ON documents 
FOR INSERT 
WITH CHECK (
  auth.uid() = user_id OR 
  get_current_user_role() = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
);

CREATE POLICY "Admin can create documents for any user" ON documents 
FOR INSERT 
WITH CHECK (
  get_current_user_role() = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant'])
);

-- Create messages table for client-admin communication
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  thread_id UUID DEFAULT NULL,
  attachment_urls TEXT[] DEFAULT ARRAY[]::TEXT[]
);

-- Enable RLS on messages
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Messages policies
CREATE POLICY "Users can view their own messages" ON messages
FOR SELECT 
USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Admins can view all messages" ON messages
FOR SELECT 
USING (get_current_user_role() = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Users can send messages" ON messages
FOR INSERT 
WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update their own messages" ON messages
FOR UPDATE 
USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

-- Create support tickets table
CREATE TABLE IF NOT EXISTS public.support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  assigned_to UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ,
  category TEXT DEFAULT 'general'
);

-- Enable RLS on support tickets
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- Support tickets policies
CREATE POLICY "Users can view their own tickets" ON support_tickets
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all tickets" ON support_tickets
FOR SELECT 
USING (get_current_user_role() = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

CREATE POLICY "Users can create tickets" ON support_tickets
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tickets" ON support_tickets
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all tickets" ON support_tickets
FOR ALL 
USING (get_current_user_role() = ANY(ARRAY['admin', 'super_admin', 'accountant', 'consultant']));

-- Create user preferences/settings table
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email_notifications BOOLEAN DEFAULT TRUE,
  sms_notifications BOOLEAN DEFAULT FALSE,
  marketing_emails BOOLEAN DEFAULT TRUE,
  language TEXT DEFAULT 'en',
  timezone TEXT DEFAULT 'Africa/Johannesburg',
  theme TEXT DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'system')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on user preferences
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- User preferences policies
CREATE POLICY "Users can manage their own preferences" ON user_preferences
FOR ALL 
USING (auth.uid() = user_id);

-- Add updated_at triggers
CREATE TRIGGER update_messages_updated_at
  BEFORE UPDATE ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_support_tickets_updated_at
  BEFORE UPDATE ON support_tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();