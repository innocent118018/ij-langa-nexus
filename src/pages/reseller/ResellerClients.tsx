import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Search, UserPlus, MoreHorizontal, Mail, Phone, Building } from 'lucide-react';
import { format } from 'date-fns';

export default function ResellerClients() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: clients, isLoading } = useQuery({
    queryKey: ['reseller-clients', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      // Get reseller ID first
      const { data: reseller } = await supabase
        .from('resellers')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!reseller) return [];

      // Get clients
      const { data } = await supabase
        .from('reseller_clients')
        .select('*')
        .eq('reseller_id', reseller.id)
        .order('created_at', { ascending: false });

      return data || [];
    },
    enabled: !!user?.id,
  });

  const filteredClients = clients?.filter(client => {
    const searchLower = searchTerm.toLowerCase();
    return client.client_email?.toLowerCase().includes(searchLower);
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'trial': return 'bg-blue-100 text-blue-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Clients</h1>
          <p className="text-muted-foreground">
            Manage your referred clients and track their activity
          </p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Refer New Client
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients by name, email, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Referred Clients</CardTitle>
          <CardDescription>
            {filteredClients?.length || 0} total clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredClients && filteredClients.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Onboarded</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{client.client_email || 'N/A'}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {client.client_email || 'No email'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        Client
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor('active')}>
                        active
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {client.created_at 
                        ? format(new Date(client.created_at), 'dd MMM yyyy')
                        : 'N/A'
                      }
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No clients found.</p>
              <p className="text-sm">Start referring clients to grow your network!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
