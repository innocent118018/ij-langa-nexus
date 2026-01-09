import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function ResellerCommissions() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['reseller-commissions', user?.id],
    queryFn: async () => {
      if (!user?.id) return { commissions: [], totals: { pending: 0, approved: 0, paid: 0 } };

      // Get reseller ID first
      const { data: reseller } = await supabase
        .from('resellers')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!reseller) return { commissions: [], totals: { pending: 0, approved: 0, paid: 0 } };

      // Get all commissions
      const { data: commissions } = await supabase
        .from('reseller_commissions')
        .select('*')
        .eq('reseller_id', reseller.id)
        .order('created_at', { ascending: false });

      // Calculate totals
      const totals = {
        pending: 0,
        approved: 0,
        paid: 0,
      };

      commissions?.forEach(c => {
        if (c.status === 'pending') totals.pending += c.commission_amount;
        if (c.status === 'approved') totals.approved += c.commission_amount;
        if (c.status === 'paid') totals.paid += c.commission_amount;
      });

      return { commissions: commissions || [], totals };
    },
    enabled: !!user?.id,
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'paid':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><DollarSign className="h-3 w-3 mr-1" />Paid</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200"><XCircle className="h-3 w-3 mr-1" />Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  const { commissions, totals } = data || { commissions: [], totals: { pending: 0, approved: 0, paid: 0 } };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Commissions</h1>
        <p className="text-muted-foreground">
          Track your earnings from referred clients
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-600">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totals.pending)}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totals.approved)}</div>
            <p className="text-xs text-muted-foreground">Ready for payout</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-600">Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totals.paid)}</div>
            <p className="text-xs text-muted-foreground">Total received</p>
          </CardContent>
        </Card>
      </div>

      {/* Commissions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Commission History</CardTitle>
          <CardDescription>
            All your commission transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {commissions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Invoice Amount</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Paid Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commissions.map((commission) => (
                  <TableRow key={commission.id}>
                    <TableCell>
                      {format(new Date(commission.created_at), 'dd MMM yyyy')}
                    </TableCell>
                    <TableCell>{formatCurrency(commission.invoice_amount)}</TableCell>
                    <TableCell>{commission.commission_rate}%</TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(commission.commission_amount)}
                    </TableCell>
                    <TableCell>{getStatusBadge(commission.status)}</TableCell>
                    <TableCell>
                      {commission.paid_at 
                        ? format(new Date(commission.paid_at), 'dd MMM yyyy')
                        : '-'
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No commissions yet.</p>
              <p className="text-sm">Refer clients to start earning!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
