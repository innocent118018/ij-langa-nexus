import React, { useState } from 'react';
import { useCustomerAuth } from '@/hooks/useCustomerAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Building2, Mail, MapPin, Phone, CreditCard, Clock, DollarSign } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

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

export const CustomerLogin = () => {
  const { 
    getAccountsByEmail, 
    hasActiveSession, 
    signInToAccount, 
    isLoading 
  } = useCustomerAuth();
  
  const [email, setEmail] = useState('');
  const [accounts, setAccounts] = useState<CustomerAccount[]>([]);
  const [step, setStep] = useState<'email' | 'account-select'>('email');
  const [error, setError] = useState('');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    try {
      // Check if email has active session
      const hasActive = await hasActiveSession(email);
      if (hasActive) {
        setError('This email already has an active session. Please contact support if you need to access your account.');
        return;
      }

      // Get accounts for this email
      const customerAccounts = await getAccountsByEmail(email);
      
      if (customerAccounts.length === 0) {
        setError('No customer accounts found for this email address. Please contact support.');
        return;
      }

      setAccounts(customerAccounts);
      setStep('account-select');
    } catch (error: any) {
      setError(error.message || 'Failed to verify email');
    }
  };

  const handleAccountSelect = async (accountId: string) => {
    try {
      const result = await signInToAccount(email, accountId);
      
      if (!result.success) {
        setError(result.error || 'Failed to sign in');
      }
      // If successful, the auth context will handle navigation
    } catch (error: any) {
      setError(error.message || 'Failed to sign in to account');
    }
  };

  const handleBackToEmail = () => {
    setStep('email');
    setAccounts([]);
    setError('');
  };

  const formatAddress = (address?: string) => {
    if (!address) return 'Not provided';
    return address.replace(/\n/g, ', ');
  };

  if (step === 'email') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Customer Portal</CardTitle>
            <p className="text-muted-foreground">
              Enter your email to access your account
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Checking...' : 'Continue'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={handleBackToEmail}
            className="mb-4"
          >
            ← Back to Email
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Select Your Account</h1>
            <p className="text-muted-foreground mb-2">
              Multiple accounts found for <strong>{email}</strong>
            </p>
            <p className="text-sm text-orange-600 font-medium">
              ⚠️ Only one account can be active at a time per email
            </p>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6">
          {accounts.map((account) => (
            <Card 
              key={account.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/50"
              onClick={() => handleAccountSelect(account.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-6 w-6 text-primary" />
                    <div>
                      <CardTitle className="text-xl">{account.customer_name}</CardTitle>
                      <div className="flex gap-2 mt-2">
                        {account.is_primary_account && (
                          <Badge variant="default">Primary Account</Badge>
                        )}
                        {!account.is_primary_account && (
                          <Badge variant="secondary">Sub Account</Badge>
                        )}
                        <Badge 
                          variant={account.account_status === 'active' ? 'default' : 'destructive'}
                        >
                          {account.account_status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-muted-foreground">{email}</p>
                      </div>
                    </div>
                    
                    {account.phone && (
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-muted-foreground">{account.phone}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Billing Address</p>
                        <p className="text-muted-foreground text-xs">
                          {formatAddress(account.billing_address)}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {account.credit_limit > 0 && (
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Credit Limit</p>
                          <p className="text-muted-foreground">R {account.credit_limit.toLocaleString()}</p>
                        </div>
                      </div>
                    )}
                    
                    {account.has_default_due_date_days && account.default_due_date_days && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Payment Terms</p>
                          <p className="text-muted-foreground">{account.default_due_date_days} days</p>
                        </div>
                      </div>
                    )}
                    
                    {account.has_default_hourly_rate && account.default_hourly_rate && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Hourly Rate</p>
                          <p className="text-muted-foreground">R {account.default_hourly_rate}/hour</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <Button 
                  className="w-full" 
                  disabled={isLoading || account.account_status !== 'active'}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAccountSelect(account.id);
                  }}
                >
                  {isLoading ? 'Signing In...' : 'Sign In to This Account'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};