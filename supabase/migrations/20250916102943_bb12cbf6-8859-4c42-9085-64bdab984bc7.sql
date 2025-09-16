-- Create ClerkIQ AI Bank Statement Processing system tables

-- Create credits table for managing page processing credits
CREATE TABLE public.clerkiq_credits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  credits_purchased INTEGER NOT NULL DEFAULT 0,
  credits_used INTEGER NOT NULL DEFAULT 0,
  credits_remaining INTEGER NOT NULL DEFAULT 0,
  purchase_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  price_paid DECIMAL(10,2),
  payment_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.clerkiq_credits ENABLE ROW LEVEL SECURITY;

-- Create policies for credits
CREATE POLICY "Users can view their own credits" 
ON public.clerkiq_credits 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own credits" 
ON public.clerkiq_credits 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own credits" 
ON public.clerkiq_credits 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create bank_statements table for storing processed statements
CREATE TABLE public.bank_statements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  filename TEXT NOT NULL,
  file_path TEXT,
  pages_processed INTEGER NOT NULL DEFAULT 0,
  credits_used INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending',
  processing_started_at TIMESTAMP WITH TIME ZONE,
  processing_completed_at TIMESTAMP WITH TIME ZONE,
  extracted_data JSONB,
  verification_results JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bank_statements ENABLE ROW LEVEL SECURITY;

-- Create policies for bank statements
CREATE POLICY "Users can view their own bank statements" 
ON public.bank_statements 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bank statements" 
ON public.bank_statements 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bank statements" 
ON public.bank_statements 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create team_members table for team management
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID NOT NULL,
  user_id UUID NOT NULL,
  role TEXT NOT NULL DEFAULT 'member',
  invited_by UUID,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'active',
  permissions JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(team_id, user_id)
);

-- Enable RLS
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Create policies for team members
CREATE POLICY "Users can view team members they belong to" 
ON public.team_members 
FOR SELECT 
USING (auth.uid() = user_id OR EXISTS (
  SELECT 1 FROM public.team_members tm 
  WHERE tm.team_id = team_members.team_id 
  AND tm.user_id = auth.uid()
));

CREATE POLICY "Team owners can manage members" 
ON public.team_members 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.team_members tm 
  WHERE tm.team_id = team_members.team_id 
  AND tm.user_id = auth.uid() 
  AND tm.role = 'owner'
));

-- Create teams table
CREATE TABLE public.teams (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  owner_id UUID NOT NULL,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

-- Create policies for teams
CREATE POLICY "Users can view teams they belong to" 
ON public.teams 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.team_members tm 
  WHERE tm.team_id = id 
  AND tm.user_id = auth.uid()
));

CREATE POLICY "Team owners can manage teams" 
ON public.teams 
FOR ALL 
USING (auth.uid() = owner_id);

-- Add ClerkIQ credit packages to services table
INSERT INTO public.services (name, description, price, category, is_active, processing_time, requirements) VALUES
('ClerkIQ Small', 'Perfect for teams of all sizes - 50 page processing credits', 175, 'clerkiq-credits', true, 'Instant', 'None'),
('ClerkIQ Medium', 'Perfect for teams of all sizes - 100 page processing credits', 300, 'clerkiq-credits', true, 'Instant', 'None'),
('ClerkIQ Large', 'Perfect for teams of all sizes - 500 page processing credits', 1250, 'clerkiq-credits', true, 'Instant', 'None'),
('ClerkIQ Enterprise', 'Perfect for teams of all sizes - 1000 page processing credits', 1750, 'clerkiq-credits', true, 'Instant', 'None');

-- Create trigger for automatic timestamp updates on clerkiq_credits
CREATE TRIGGER update_clerkiq_credits_updated_at
BEFORE UPDATE ON public.clerkiq_credits
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for automatic timestamp updates on bank_statements
CREATE TRIGGER update_bank_statements_updated_at
BEFORE UPDATE ON public.bank_statements
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for automatic timestamp updates on team_members
CREATE TRIGGER update_team_members_updated_at
BEFORE UPDATE ON public.team_members
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for automatic timestamp updates on teams
CREATE TRIGGER update_teams_updated_at
BEFORE UPDATE ON public.teams
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();