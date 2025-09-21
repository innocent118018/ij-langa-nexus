import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Users, Building2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

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
}

interface CustomerAuthProps {
  onLogin: (account: CustomerAccount, sessionToken: string) => void;
}

export const CustomerAuth: React.FC<CustomerAuthProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [accounts, setAccounts] = useState<CustomerAccount[]>([]);
  const [showAccountSelector, setShowAccountSelector] = useState(false);
  const [error, setError] = useState('');

  const checkForExistingSession = async (customerEmail: string) => {
    try {
      const { data, error } = await supabase.rpc('has_active_customer_session', {
        customer_email: customerEmail
      });
      
      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Error checking session:', error);
      return false;
    }
  };

  const fetchCustomerAccounts = async (customerEmail: string): Promise<CustomerAccount[]> => {
    try {
      const { data, error } = await supabase.rpc('get_customer_accounts_by_email', {
        customer_email: customerEmail
      });
      
      if (error) throw error;
      return data || [];
    } catch (error: any) {
      console.error('Error fetching accounts:', error);
      return [];
    }
  };

  const createSession = async (customerEmail: string, accountId: string) => {
    try {
      const sessionToken = crypto.randomUUID();
      const { data, error } = await supabase.rpc('create_customer_session', {
        customer_email: customerEmail,
        account_id: accountId,
        session_token: sessionToken,
        client_ip: null,
        client_user_agent: navigator.userAgent,
        session_duration_hours: 24
      });
      
      if (error) throw error;
      return sessionToken;
    } catch (error: any) {
      console.error('Error creating session:', error);
      throw error;
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      // Check if email has active session
      const hasActiveSession = await checkForExistingSession(email);
      
      if (hasActiveSession) {
        setError('This email is already signed in. Please end the existing session first.');
        setIsLoading(false);
        return;
      }

      // Fetch customer accounts for this email
      const customerAccounts = await fetchCustomerAccounts(email);
      
      if (customerAccounts.length === 0) {
        setError('No customer accounts found for this email address.');
        setIsLoading(false);
        return;
      }

      if (customerAccounts.length === 1) {
        // Single account - login directly
        const sessionToken = await createSession(email, customerAccounts[0].id);
        const accountWithEmail = { ...customerAccounts[0], email };
        onLogin(accountWithEmail, sessionToken);
        toast.success(`Welcome, ${customerAccounts[0].customer_name}!`);
      } else {
        // Multiple accounts - show selector
        setAccounts(customerAccounts);
        setShowAccountSelector(true);
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred during authentication');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccountSelect = async (account: CustomerAccount) => {
    setIsLoading(true);
    
    try {
      const sessionToken = await createSession(email, account.id);
      const accountWithEmail = { ...account, email };
      onLogin(accountWithEmail, sessionToken);
      toast.success(`Welcome, ${account.customer_name}!`);
      setShowAccountSelector(false);
    } catch (error: any) {
      setError(error.message || 'Failed to create session');
    } finally {
      setIsLoading(false);
    }
  };

  const formatAddress = (address: string) => {
    if (!address) return 'No address provided';
    return address.split('\n').slice(0, 2).join(', ');
  };

  return (
    <>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Users className="h-6 w-6" />
            Customer Portal Login
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter your email to access your customer account
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !email.trim()}
            >
              {isLoading ? 'Checking Account...' : 'Access Account'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Only registered customers can access the portal.</p>
            <p>Contact support if you need assistance.</p>
          </div>
        </CardContent>
      </Card>

      {/* Account Selector Dialog */}
      <Dialog open={showAccountSelector} onOpenChange={setShowAccountSelector}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Select Customer Account
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Multiple accounts found for <strong>{email}</strong>. Please select which account you'd like to access:
            </p>
            
            <div className="space-y-3">
              {accounts.map((account, index) => (
                <Card 
                  key={account.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-primary/50"
                  onClick={() => handleAccountSelect(account)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{account.customer_name}</h3>
                          {account.is_primary_account && (
                            <Badge variant="default">Primary</Badge>
                          )}
                          {!account.is_primary_account && (
                            <Badge variant="secondary">Sub-account</Badge>
                          )}
                        </div>
                        
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>📍 {formatAddress(account.billing_address)}</p>
                          {account.phone && <p>📞 {account.phone}</p>}
                          {account.credit_limit > 0 && (
                            <p>💳 Credit Limit: R{account.credit_limit.toLocaleString()}</p>
                          )}
                          {account.has_default_due_date_days && (
                            <p>📅 Default Due Days: {account.default_due_date_days}</p>
                          )}
                          {account.has_default_hourly_rate && (
                            <p>⏰ Hourly Rate: R{account.default_hourly_rate}/hr</p>
                          )}
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={isLoading}
                      >
                        Select
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={() => setShowAccountSelector(false)}
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};