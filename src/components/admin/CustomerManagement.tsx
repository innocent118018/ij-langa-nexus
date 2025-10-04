import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, Building2, Mail, Phone, CreditCard, Clock, AlertCircle, Search, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface CustomerAccount {
  id: string;
  email: string;
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
  created_at: string;
  updated_at: string;
}

interface CustomerSession {
  id: string;
  email: string;
  customer_account_id: string;
  session_token: string;
  ip_address?: string;
  user_agent?: string;
  is_active: boolean;
  expires_at: string;
  created_at: string;
  ended_at?: string;
}

export const CustomerManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerAccount | null>(null);

  // Fetch customer accounts
  const { data: customers, isLoading: customersLoading, refetch: refetchCustomers } = useQuery({
    queryKey: ['customer-accounts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customer_accounts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as CustomerAccount[];
    },
  });

  // Fetch active customer sessions
  const { data: activeSessions, isLoading: sessionsLoading } = useQuery({
    queryKey: ['customer-sessions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customer_sessions')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as CustomerSession[];
    },
  });

  const handleEndSession = async (session: CustomerSession) => {
    try {
      const { error } = await supabase
        .from('customer_sessions')
        .update({ 
          is_active: false, 
          ended_at: new Date().toISOString() 
        })
        .eq('id', session.id);

      if (error) throw error;
      
      toast.success('Session ended successfully');
      // Refresh the sessions data
      window.location.reload();
    } catch (error: any) {
      toast.error(`Failed to end session: ${error.message}`);
    }
  };

  const handleSuspendAccount = async (customer: CustomerAccount) => {
    try {
      const { error } = await supabase
        .from('customer_accounts')
        .update({ account_status: 'suspended' })
        .eq('id', customer.id);

      if (error) throw error;
      
      toast.success(`Account ${customer.customer_name} suspended`);
      refetchCustomers();
    } catch (error: any) {
      toast.error(`Failed to suspend account: ${error.message}`);
    }
  };

  const handleActivateAccount = async (customer: CustomerAccount) => {
    try {
      const { error } = await supabase
        .from('customer_accounts')
        .update({ account_status: 'active' })
        .eq('id', customer.id);

      if (error) throw error;
      
      toast.success(`Account ${customer.customer_name} activated`);
      refetchCustomers();
    } catch (error: any) {
      toast.error(`Failed to activate account: ${error.message}`);
    }
  };

  const filteredCustomers = customers?.filter(customer =>
    customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const getAccountsByEmail = (email: string) => {
    return customers?.filter(c => c.email === email) || [];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatAddress = (address: string) => {
    if (!address) return 'No address provided';
    return address.split('\n').slice(0, 2).join(', ');
  };

  if (customersLoading || sessionsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Users className="h-12 w-12 animate-pulse mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading customer data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6" />
            Customer Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage customer accounts, sessions, and access control
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="outline">
            {customers?.length || 0} Total Customers
          </Badge>
          <Badge variant="default">
            {activeSessions?.length || 0} Active Sessions
          </Badge>
        </div>
      </div>

      {/* Active Sessions Alert */}
      {activeSessions && activeSessions.length > 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>{activeSessions.length}</strong> customers are currently signed in.
          </AlertDescription>
        </Alert>
      )}

      {/* Active Sessions Table */}
      {activeSessions && activeSessions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Active Customer Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Started</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeSessions.map((session) => {
                  const customer = customers?.find(c => c.id === session.customer_account_id);
                  return (
                    <TableRow key={session.id}>
                      <TableCell>{session.email}</TableCell>
                      <TableCell>
                        {customer ? customer.customer_name : 'Unknown Account'}
                      </TableCell>
                      <TableCell>{formatDate(session.created_at)}</TableCell>
                      <TableCell>{formatDate(session.expires_at)}</TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleEndSession(session)}
                        >
                          End Session
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Customer Accounts Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Customer Accounts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Credit Limit</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => {
                const accountsByEmail = getAccountsByEmail(customer.email);
                const isMultiAccount = accountsByEmail.length > 1;
                
                return (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {customer.customer_name}
                        {isMultiAccount && (
                          <Badge variant="secondary" className="text-xs">
                            {accountsByEmail.length} accounts
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {customer.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={customer.is_primary_account ? "default" : "secondary"}>
                        {customer.is_primary_account ? "Primary" : "Sub-account"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          customer.account_status === 'active' ? 'default' :
                          customer.account_status === 'suspended' ? 'destructive' :
                          'secondary'
                        }
                      >
                        {customer.account_status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {customer.credit_limit > 0 ? (
                        <div className="flex items-center gap-1">
                          <CreditCard className="h-4 w-4" />
                          R{customer.credit_limit.toLocaleString()}
                        </div>
                      ) : (
                        'No limit'
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedCustomer(customer)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Customer Account Details</DialogTitle>
                            </DialogHeader>
                            {selectedCustomer && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <strong>Customer Name:</strong>
                                    <p>{selectedCustomer.customer_name}</p>
                                  </div>
                                  <div>
                                    <strong>Email:</strong>
                                    <p>{selectedCustomer.email}</p>
                                  </div>
                                  <div>
                                    <strong>Phone:</strong>
                                    <p>{selectedCustomer.phone || 'Not provided'}</p>
                                  </div>
                                  <div>
                                    <strong>Credit Limit:</strong>
                                    <p>R{selectedCustomer.credit_limit.toLocaleString()}</p>
                                  </div>
                                </div>
                                <div>
                                  <strong>Billing Address:</strong>
                                  <p className="whitespace-pre-line">{selectedCustomer.billing_address || 'Not provided'}</p>
                                </div>
                                <div>
                                  <strong>Delivery Address:</strong>
                                  <p className="whitespace-pre-line">{selectedCustomer.delivery_address || 'Not provided'}</p>
                                </div>
                                {isMultiAccount && (
                                  <div>
                                    <strong>Related Accounts:</strong>
                                    <div className="mt-2 space-y-1">
                                      {getAccountsByEmail(selectedCustomer.email).map((acc) => (
                                        <Badge key={acc.id} variant="outline" className="mr-2">
                                          {acc.customer_name}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        {customer.account_status === 'active' ? (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleSuspendAccount(customer)}
                          >
                            Suspend
                          </Button>
                        ) : (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleActivateAccount(customer)}
                          >
                            Activate
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};