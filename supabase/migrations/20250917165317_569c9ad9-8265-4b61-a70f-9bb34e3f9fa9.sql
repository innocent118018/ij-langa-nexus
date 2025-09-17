-- Create admin activity log table for tracking all administrative actions
CREATE TABLE IF NOT EXISTS admin_activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  action_type TEXT NOT NULL,
  table_name TEXT,
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  description TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_activity_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin activity logs
CREATE POLICY "Super admins can view all activity logs"
  ON admin_activity_logs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'super_admin'
    )
  );

CREATE POLICY "Admins can view admin activity logs"
  ON admin_activity_logs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "System can insert activity logs"
  ON admin_activity_logs
  FOR INSERT
  WITH CHECK (true);

-- Create ClerkIQ security policies and settings
CREATE TABLE IF NOT EXISTS clerkiq_security_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  mfa_enabled BOOLEAN DEFAULT false,
  mfa_secret TEXT,
  recovery_codes TEXT[],
  login_attempts INTEGER DEFAULT 0,
  locked_until TIMESTAMPTZ,
  last_login TIMESTAMPTZ,
  session_timeout INTEGER DEFAULT 3600, -- 1 hour in seconds
  ip_whitelist INET[],
  failed_login_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE clerkiq_security_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for ClerkIQ security settings
CREATE POLICY "Users can manage their own security settings"
  ON clerkiq_security_settings
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all security settings"
  ON clerkiq_security_settings
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('admin', 'super_admin')
    )
  );

-- Create ClerkIQ audit trail
CREATE TABLE IF NOT EXISTS clerkiq_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  session_id TEXT,
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id UUID,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  success BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE clerkiq_audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for ClerkIQ audit logs
CREATE POLICY "Users can view their own audit logs"
  ON clerkiq_audit_logs
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all audit logs"
  ON clerkiq_audit_logs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "System can insert audit logs"
  ON clerkiq_audit_logs
  FOR INSERT
  WITH CHECK (true);

-- Create bank statement processing history
CREATE TABLE IF NOT EXISTS bank_statement_processing_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  team_id UUID,
  file_name TEXT NOT NULL,
  file_size BIGINT,
  pages_processed INTEGER,
  credits_used INTEGER,
  processing_status TEXT DEFAULT 'pending',
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  error_message TEXT,
  extracted_data JSONB,
  validation_results JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE bank_statement_processing_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for bank statement processing history
CREATE POLICY "Users can view their own processing history"
  ON bank_statement_processing_history
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Team members can view team processing history"
  ON bank_statement_processing_history
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM team_members tm
      WHERE tm.team_id = bank_statement_processing_history.team_id
      AND tm.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create processing records"
  ON bank_statement_processing_history
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Add updated_at trigger for security settings
CREATE TRIGGER update_clerkiq_security_settings_updated_at
  BEFORE UPDATE ON clerkiq_security_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create index for performance
CREATE INDEX idx_admin_activity_logs_user_id ON admin_activity_logs(user_id);
CREATE INDEX idx_admin_activity_logs_created_at ON admin_activity_logs(created_at);
CREATE INDEX idx_clerkiq_audit_logs_user_id ON clerkiq_audit_logs(user_id);
CREATE INDEX idx_clerkiq_audit_logs_created_at ON clerkiq_audit_logs(created_at);
CREATE INDEX idx_bank_statement_processing_user_id ON bank_statement_processing_history(user_id);
CREATE INDEX idx_bank_statement_processing_team_id ON bank_statement_processing_history(team_id);

-- High-security RLS policies for sensitive admin operations
-- Update existing tables with enhanced security

-- Enhanced invoice policies
DROP POLICY IF EXISTS "Enhanced admin invoice access" ON invoices;
CREATE POLICY "Enhanced admin invoice access"
  ON invoices
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('admin', 'super_admin')
      AND users.is_active = true
    )
  );

-- Enhanced user management policies
DROP POLICY IF EXISTS "Enhanced admin user management" ON users;
CREATE POLICY "Enhanced admin user management"
  ON users
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users admin_user
      WHERE admin_user.id = auth.uid() 
      AND admin_user.role IN ('admin', 'super_admin')
      AND admin_user.is_active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users admin_user
      WHERE admin_user.id = auth.uid() 
      AND admin_user.role IN ('admin', 'super_admin')
      AND admin_user.is_active = true
    )
  );

-- Enhanced document access policies
DROP POLICY IF EXISTS "Enhanced admin document access" ON documents;
CREATE POLICY "Enhanced admin document access"
  ON documents
  FOR ALL
  USING (
    (auth.uid() = user_id) OR 
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('admin', 'super_admin', 'accountant', 'consultant')
      AND users.is_active = true
    )
  );

-- Add ClerkIQ specific security constraints
ALTER TABLE clerkiq_credits ADD CONSTRAINT check_credits_non_negative 
  CHECK (credits_purchased >= 0 AND credits_used >= 0 AND credits_remaining >= 0);

-- Add security validation trigger for ClerkIQ
CREATE OR REPLACE FUNCTION validate_clerkiq_access()
RETURNS TRIGGER AS $$
BEGIN
  -- Log access attempt
  INSERT INTO clerkiq_audit_logs (
    user_id, 
    action, 
    resource_type, 
    resource_id, 
    details,
    ip_address
  ) VALUES (
    auth.uid(),
    TG_OP,
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    jsonb_build_object(
      'old', to_jsonb(OLD),
      'new', to_jsonb(NEW)
    ),
    inet_client_addr()
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply security validation to ClerkIQ tables
CREATE TRIGGER clerkiq_credits_security_audit
  AFTER INSERT OR UPDATE OR DELETE ON clerkiq_credits
  FOR EACH ROW EXECUTE FUNCTION validate_clerkiq_access();

CREATE TRIGGER bank_statements_security_audit
  AFTER INSERT OR UPDATE OR DELETE ON bank_statements
  FOR EACH ROW EXECUTE FUNCTION validate_clerkiq_access();