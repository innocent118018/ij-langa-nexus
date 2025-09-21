import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CustomerAccount {
  id: string;
  customer_name: string;
  billing_address?: string;
  delivery_address?: string;
  phone?: string;
  credit_limit: number;
  has_default_due_date_days: boolean;
  default_due_date_days?: number;
  has_default_hourly_rate: boolean;
  default_hourly_rate?: number;
  is_primary_account: boolean;
  parent_account_id?: string;
  account_status: string;
}

interface CustomerSession {
  id: string;
  email: string;
  customer_account_id: string;
  session_token: string;
  expires_at: string;
  is_active: boolean;
}

interface CustomerAuthContextType {
  currentAccount: CustomerAccount | null;
  availableAccounts: CustomerAccount[];
  currentSession: CustomerSession | null;
  isLoading: boolean;
  getAccountsByEmail: (email: string) => Promise<CustomerAccount[]>;
  hasActiveSession: (email: string) => Promise<boolean>;
  signInToAccount: (email: string, accountId: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  switchAccount: (accountId: string) => Promise<{ success: boolean; error?: string }>;
}

const CustomerAuthContext = createContext<CustomerAuthContextType | undefined>(undefined);

export const CustomerAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentAccount, setCurrentAccount] = useState<CustomerAccount | null>(null);
  const [availableAccounts, setAvailableAccounts] = useState<CustomerAccount[]>([]);
  const [currentSession, setCurrentSession] = useState<CustomerSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on load
    checkExistingSession();
  }, []);

  const checkExistingSession = async () => {
    try {
      const sessionToken = localStorage.getItem('customer_session_token');
      const email = localStorage.getItem('customer_email');
      
      if (sessionToken && email) {
        // Verify session is still valid
        const { data: sessionData, error } = await supabase
          .from('customer_sessions')
          .select(`
            *,
            customer_accounts (*)
          `)
          .eq('session_token', sessionToken)
          .eq('is_active', true)
          .gt('expires_at', new Date().toISOString())
          .single();

        if (sessionData && !error) {
          setCurrentSession(sessionData);
          setCurrentAccount(sessionData.customer_accounts);
          
          // Load available accounts for this email
          const accounts = await getAccountsByEmail(email);
          setAvailableAccounts(accounts);
        } else {
          // Session expired or invalid
          localStorage.removeItem('customer_session_token');
          localStorage.removeItem('customer_email');
        }
      }
    } catch (error) {
      console.error('Error checking existing session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAccountsByEmail = async (email: string): Promise<CustomerAccount[]> => {
    try {
      const { data, error } = await supabase.rpc('get_customer_accounts_by_email', {
        customer_email: email
      });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching accounts:', error);
      return [];
    }
  };

  const hasActiveSession = async (email: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.rpc('has_active_customer_session', {
        customer_email: email
      });

      if (error) throw error;
      return data || false;
    } catch (error) {
      console.error('Error checking active session:', error);
      return false;
    }
  };

  const generateSessionToken = (): string => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  const signInToAccount = async (
    email: string, 
    accountId: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);

      // Check if email already has active session
      const hasActive = await hasActiveSession(email);
      if (hasActive) {
        return { success: false, error: 'This email already has an active session. Please sign out first.' };
      }

      // Generate session token
      const sessionToken = generateSessionToken();

      // Create session
      const { data: sessionId, error: sessionError } = await supabase.rpc('create_customer_session', {
        customer_email: email,
        account_id: accountId,
        session_token: sessionToken,
        client_ip: null,
        client_user_agent: navigator.userAgent,
        session_duration_hours: 24
      });

      if (sessionError) throw sessionError;

      // Get account details
      const { data: accountData, error: accountError } = await supabase
        .from('customer_accounts')
        .select('*')
        .eq('id', accountId)
        .single();

      if (accountError) throw accountError;

      // Get session details
      const { data: sessionData, error: getSessionError } = await supabase
        .from('customer_sessions')
        .select('*')
        .eq('id', sessionId)
        .single();

      if (getSessionError) throw getSessionError;

      // Store session locally
      localStorage.setItem('customer_session_token', sessionToken);
      localStorage.setItem('customer_email', email);

      // Update state
      setCurrentAccount(accountData);
      setCurrentSession(sessionData);
      
      // Load all accounts for this email
      const accounts = await getAccountsByEmail(email);
      setAvailableAccounts(accounts);

      toast.success(`Signed in as ${accountData.customer_name}`);
      return { success: true };

    } catch (error: any) {
      console.error('Sign in error:', error);
      return { success: false, error: error.message || 'Failed to sign in' };
    } finally {
      setIsLoading(false);
    }
  };

  const switchAccount = async (accountId: string): Promise<{ success: boolean; error?: string }> => {
    if (!currentSession) {
      return { success: false, error: 'No active session' };
    }

    try {
      setIsLoading(true);

      // Get new account details
      const { data: accountData, error: accountError } = await supabase
        .from('customer_accounts')
        .select('*')
        .eq('id', accountId)
        .eq('email', currentSession.email)
        .single();

      if (accountError) throw accountError;

      // Update current session to point to new account
      const { error: updateError } = await supabase
        .from('customer_sessions')
        .update({ customer_account_id: accountId })
        .eq('id', currentSession.id);

      if (updateError) throw updateError;

      // Update state
      setCurrentAccount(accountData);
      setCurrentSession({ ...currentSession, customer_account_id: accountId });

      toast.success(`Switched to ${accountData.customer_name}`);
      return { success: true };

    } catch (error: any) {
      console.error('Switch account error:', error);
      return { success: false, error: error.message || 'Failed to switch account' };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      if (currentSession) {
        // End the session
        await supabase
          .from('customer_sessions')
          .update({ 
            is_active: false, 
            ended_at: new Date().toISOString() 
          })
          .eq('id', currentSession.id);
      }

      // Clear local storage
      localStorage.removeItem('customer_session_token');
      localStorage.removeItem('customer_email');

      // Clear state
      setCurrentAccount(null);
      setCurrentSession(null);
      setAvailableAccounts([]);

      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Error signing out');
    }
  };

  const value: CustomerAuthContextType = {
    currentAccount,
    availableAccounts,
    currentSession,
    isLoading,
    getAccountsByEmail,
    hasActiveSession,
    signInToAccount,
    signOut,
    switchAccount,
  };

  return (
    <CustomerAuthContext.Provider value={value}>
      {children}
    </CustomerAuthContext.Provider>
  );
};

export const useCustomerAuth = () => {
  const context = useContext(CustomerAuthContext);
  if (context === undefined) {
    throw new Error('useCustomerAuth must be used within a CustomerAuthProvider');
  }
  return context;
};