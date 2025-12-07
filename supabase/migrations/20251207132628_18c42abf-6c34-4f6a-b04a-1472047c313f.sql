-- Add missing columns to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS sku TEXT UNIQUE;
ALTER TABLE products ADD COLUMN IF NOT EXISTS vat_rate NUMERIC(5,2) DEFAULT 15.00;

-- Accounting Ledger Tables
CREATE TABLE IF NOT EXISTS accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('asset', 'liability', 'equity', 'income', 'expense')),
  normal_balance TEXT DEFAULT 'debit' CHECK (normal_balance IN ('debit', 'credit')),
  parent_account_id uuid REFERENCES accounts(id),
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS journal_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference TEXT NOT NULL,
  entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
  narration TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'posted', 'reversed')),
  created_by uuid REFERENCES auth.users(id),
  posted_by uuid REFERENCES auth.users(id),
  posted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS journal_lines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  journal_entry_id uuid REFERENCES journal_entries(id) ON DELETE CASCADE,
  account_id uuid REFERENCES accounts(id),
  debit NUMERIC(15,2) DEFAULT 0,
  credit NUMERIC(15,2) DEFAULT 0,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_lines ENABLE ROW LEVEL SECURITY;

-- RLS Policies for accounts (admin only)
DROP POLICY IF EXISTS "accounts_admin_all" ON accounts;
CREATE POLICY "accounts_admin_all" ON accounts
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin', 'accountant'))
  );

-- RLS Policies for journal_entries
DROP POLICY IF EXISTS "journal_entries_admin_all" ON journal_entries;
CREATE POLICY "journal_entries_admin_all" ON journal_entries
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin', 'accountant'))
  );

-- RLS Policies for journal_lines
DROP POLICY IF EXISTS "journal_lines_admin_all" ON journal_lines;
CREATE POLICY "journal_lines_admin_all" ON journal_lines
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin', 'accountant'))
  );

-- Indexes
CREATE INDEX IF NOT EXISTS idx_accounts_code ON accounts(code);
CREATE INDEX IF NOT EXISTS idx_journal_entries_date ON journal_entries(entry_date);
CREATE INDEX IF NOT EXISTS idx_journal_lines_entry ON journal_lines(journal_entry_id);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);

-- Triggers for updated_at (only create if not exists)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_accounts_updated_at') THEN
    CREATE TRIGGER update_accounts_updated_at
      BEFORE UPDATE ON accounts
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_journal_entries_updated_at') THEN
    CREATE TRIGGER update_journal_entries_updated_at
      BEFORE UPDATE ON journal_entries
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;