import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Building2, 
  Users, 
  Search, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard,
  Clock,
  DollarSign,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface CustomerAccount {
  id: string;
  email: string;
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
  created_at: string;
  updated_at: string;
}

interface CustomerSession {
  id: string;
  email: string;
  customer_account_id: string;
  is_active: boolean;
  expires_at: string;
  created_at: string;
  ip_address?: string;
  user_agent?: string;
}

export const CustomerAccountsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

  // Fetch all customer accounts
  const { data: accounts, isLoading: accountsLoading, refetch: refetchAccounts } = useQuery({
    queryKey: ['customer-accounts', searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('customer_accounts')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`customer_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as CustomerAccount[];
    },
  });

  // Fetch active sessions
  const { data: sessions, isLoading: sessionsLoading, refetch: refetchSessions } = useQuery({
    queryKey: ['customer-sessions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customer_sessions')
        .select(`
          *,
          customer_accounts!inner(customer_name)
        `)
        .eq('is_active', true)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as (CustomerSession & { customer_accounts: { customer_name: string } })[];
    },
  });

  // Group accounts by email
  const groupedAccounts = accounts?.reduce((acc, account) => {
    if (!acc[account.email]) {
      acc[account.email] = [];
    }
    acc[account.email].push(account);
    return acc;
  }, {} as Record<string, CustomerAccount[]>) || {};

  // Get account statistics
  const stats = {
    totalAccounts: accounts?.length || 0,
    totalEmails: Object.keys(groupedAccounts).length,
    multiAccountEmails: Object.values(groupedAccounts).filter(accounts => accounts.length > 1).length,
    activeSessions: sessions?.length || 0,
    activeAccounts: accounts?.filter(acc => acc.account_status === 'active').length || 0,
  };

  const handleEndSession = async (sessionId: string) => {
    try {
      const { error } = await supabase
        .from('customer_sessions')
        .update({ 
          is_active: false, 
          ended_at: new Date().toISOString() 
        })
        .eq('id', sessionId);

      if (error) throw error;

      toast.success('Session ended successfully');
      refetchSessions();
    } catch (error: any) {
      toast.error(`Failed to end session: ${error.message}`);
    }
  };

  const handleUpdateAccountStatus = async (accountId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('customer_accounts')
        .update({ account_status: status })
        .eq('id', accountId);

      if (error) throw error;

      toast.success(`Account status updated to ${status}`);
      refetchAccounts();
    } catch (error: any) {
      toast.error(`Failed to update account status: ${error.message}`);
    }
  };

  const formatAddress = (address?: string) => {
    if (!address) return 'Not provided';
    return address.replace(/\n/g, ', ');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Users className="h-6 w-6" />
          Customer Accounts Management
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage customer accounts, sessions, and sub-account relationships
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAccounts}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Unique Emails</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEmails}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Multi-Account Emails</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{stats.multiAccountEmails}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.activeSessions}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.activeAccounts}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by customer name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Active Sessions */}
      {sessions && sessions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-green-500" />
              Active Customer Sessions ({sessions.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Session Started</TableHead>
                  <TableHead>Expires At</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell className="font-medium">{session.email}</TableCell>
                    <TableCell>{session.customer_accounts.customer_name}</TableCell>
                    <TableCell>{formatDate(session.created_at)}</TableCell>
                    <TableCell>{formatDate(session.expires_at)}</TableCell>
                    <TableCell>{session.ip_address || 'Unknown'}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleEndSession(session.id)}
                      >
                        End Session
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Customer Accounts */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          {accountsLoading ? (
            <div className="text-center py-8">Loading accounts...</div>
          ) : (
            <div className="space-y-4">
              {Object.entries(groupedAccounts).map(([email, emailAccounts]) => (
                <div key={email} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{email}</span>
                      {emailAccounts.length > 1 && (
                        <Badge variant="secondary">
                          {emailAccounts.length} accounts
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {emailAccounts.map((account) => (
                      <div key={account.id} className="border rounded p-3 bg-muted/30">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-primary" />
                            <span className="font-medium">{account.customer_name}</span>
                            {account.is_primary_account ? (
                              <Badge variant="default">Primary</Badge>
                            ) : (
                              <Badge variant="secondary">Sub Account</Badge>
                            )}
                            <Badge 
                              variant={account.account_status === 'active' ? 'default' : 
                                     account.account_status === 'suspended' ? 'destructive' : 'secondary'}
                            >
                              {account.account_status}
                            </Badge>
                          </div>
                          
                          <div className="flex gap-2">
                            {account.account_status === 'active' ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateAccountStatus(account.id, 'suspended')}
                              >
                                Suspend
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateAccountStatus(account.id, 'active')}
                              >
                                Activate
                              </Button>
                            )}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            {account.phone && (
                              <div className="flex items-center gap-2">
                                <Phone className="h-3 w-3 text-muted-foreground" />
                                <span>{account.phone}</span>
                              </div>
                            )}
                            
                            <div className="flex items-start gap-2">
                              <MapPin className="h-3 w-3 text-muted-foreground mt-0.5" />
                              <span className="text-xs">{formatAddress(account.billing_address)}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            {account.credit_limit > 0 && (
                              <div className="flex items-center gap-2">
                                <CreditCard className="h-3 w-3 text-muted-foreground" />
                                <span>Credit: R {account.credit_limit.toLocaleString()}</span>
                              </div>
                            )}
                            
                            {account.has_default_due_date_days && account.default_due_date_days && (
                              <div className="flex items-center gap-2">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span>Terms: {account.default_due_date_days} days</span>
                              </div>
                            )}
                            
                            {account.has_default_hourly_rate && account.default_hourly_rate && (
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-3 w-3 text-muted-foreground" />
                                <span>Rate: R {account.default_hourly_rate}/hour</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};