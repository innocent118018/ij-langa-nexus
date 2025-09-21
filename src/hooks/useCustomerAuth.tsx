import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CustomerAccount {
  id: string;
  customer_name: string;
  billing_address: string;
  delivery_address: string;
  phone?: string;
  credit_limit: number;
  has_default_due_date_days: boolean;
  default_due_date_days?: number;
  has_default_hourly_rate: boolean;
  default_hourly_rate?: number;  
  is_primary_account: boolean;
  parent_account_id?: string;
  account_status: string;
  email: string;
}

interface CustomerAuthContextType {
  currentAccount: CustomerAccount | null;
  sessionToken: string | null;
  isLoading: boolean;
  availableAccounts: CustomerAccount[];
  login: (account: CustomerAccount, token: string) => void;
  logout: () => void;
  switchAccount: (accountId: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const CustomerAuthContext = createContext<CustomerAuthContextType | undefined>(undefined);

export const CustomerAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState<CustomerAccount | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [availableAccounts, setAvailableAccounts] = useState<CustomerAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing customer session on mount
    const storedAccount = localStorage.getItem('customer_account');
    const storedToken = localStorage.getItem('customer_session_token');
    
    if (storedAccount && storedToken) {
      try {
        const account = JSON.parse(storedAccount);
        setCurrentAccount(account);
        setSessionToken(storedToken);
      } catch (error) {
        console.error('Error parsing stored customer account:', error);
        localStorage.removeItem('customer_account');
        localStorage.removeItem('customer_session_token');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = (account: CustomerAccount, token: string) => {
    setCurrentAccount(account);
    setSessionToken(token);
    localStorage.setItem('customer_account', JSON.stringify(account));
    localStorage.setItem('customer_session_token', token);
    
    // Fetch available accounts for the same email
    fetchAccountsByEmail(account.email);
  };

  const fetchAccountsByEmail = async (email: string) => {
    try {
      const { data, error } = await supabase.rpc('get_customer_accounts_by_email', {
        customer_email: email
      });
      
      if (error) throw error;
      
      // Add email to each account since the function doesn't return it
      const accountsWithEmail = (data || []).map(account => ({
        ...account,
        email: email
      }));
      
      setAvailableAccounts(accountsWithEmail);
    } catch (error) {
      console.error('Error fetching available accounts:', error);
      setAvailableAccounts([]);
    }
  };

  const switchAccount = async (accountId: string) => {
    if (!currentAccount) return;
    
    const targetAccount = availableAccounts.find(acc => acc.id === accountId);
    if (!targetAccount) return;

    try {
      // Create new session for the target account
      const sessionToken = crypto.randomUUID();
      const { error } = await supabase.rpc('create_customer_session', {
        customer_email: currentAccount.email,
        account_id: accountId,
        session_token: sessionToken,
        client_ip: null,
        client_user_agent: navigator.userAgent,
        session_duration_hours: 24
      });

      if (error) throw error;

      // Update current account and session
      setCurrentAccount(targetAccount);
      setSessionToken(sessionToken);
      localStorage.setItem('customer_account', JSON.stringify(targetAccount));
      localStorage.setItem('customer_session_token', sessionToken);
    } catch (error) {
      console.error('Error switching account:', error);
      throw error;
    }
  };

  const signOut = async () => {
    await logout();
  };

  const logout = async () => {
    if (sessionToken) {
      try {
        // End the session in the database
        await supabase
          .from('customer_sessions')
          .update({ is_active: false, ended_at: new Date().toISOString() })
          .eq('session_token', sessionToken);
      } catch (error) {
        console.error('Error ending session:', error);
      }
    }
    
    setCurrentAccount(null);
    setSessionToken(null);
    setAvailableAccounts([]);
    localStorage.removeItem('customer_account');
    localStorage.removeItem('customer_session_token');
  };

  return (
    <CustomerAuthContext.Provider value={{
      currentAccount,
      sessionToken,
      isLoading,
      availableAccounts,
      login,
      logout,
      switchAccount,
      signOut
    }}>
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