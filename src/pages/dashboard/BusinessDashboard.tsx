import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  DollarSign, TrendingUp, TrendingDown, AlertTriangle, 
  Plus, Receipt, FileText, Users, Calendar, Banknote
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface KPIData {
  revenue: number;
  expenses: number;
  cashBalance: number;
  accountsReceivable: number;
  accountsPayable: number;
  profit: number;
  revenueChange: number;
  expenseChange: number;
}

interface RecentActivity {
  id: string;
  type: 'invoice' | 'payment' | 'receipt' | 'expense';
  description: string;
  amount: number;
  date: string;
  status: string;
}

export const BusinessDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Fetch KPI data
  const { data: kpiData, isLoading: kpiLoading } = useQuery({
    queryKey: ['business-kpis'],
    queryFn: async (): Promise<KPIData> => {
      // Aggregate financial data from multiple tables
      const [invoicesResult, paymentsResult, receiptsResult] = await Promise.all([
        supabase.from('sales_invoices').select('total_amount, status, created_at'),
        supabase.from('bank_payments').select('amount, status, payment_date'),
        supabase.from('bank_receipts').select('amount, status, receipt_date')
      ]);

      const revenue = invoicesResult.data?.reduce((sum, inv) => 
        inv.status === 'paid' ? sum + (inv.total_amount || 0) : sum, 0) || 0;
      
      const expenses = paymentsResult.data?.reduce((sum, pay) => 
        pay.status === 'paid' ? sum + (pay.amount || 0) : sum, 0) || 0;
      
      const cashReceived = receiptsResult.data?.reduce((sum, rec) => 
        sum + (rec.amount || 0), 0) || 0;

      return {
        revenue,
        expenses,
        cashBalance: cashReceived - expenses,
        accountsReceivable: invoicesResult.data?.reduce((sum, inv) => 
          inv.status === 'pending' ? sum + (inv.total_amount || 0) : sum, 0) || 0,
        accountsPayable: paymentsResult.data?.reduce((sum, pay) => 
          pay.status === 'pending' ? sum + (pay.amount || 0) : sum, 0) || 0,
        profit: revenue - expenses,
        revenueChange: 12.5, // Mock data - would calculate from previous period
        expenseChange: -8.2
      };
    },
    refetchInterval: 300000, // Refresh every 5 minutes
  });

  // Fetch recent activity
  const { data: recentActivity, isLoading: activityLoading } = useQuery({
    queryKey: ['recent-activity'],
    queryFn: async (): Promise<RecentActivity[]> => {
      // Get recent transactions from multiple sources
      const [invoices, payments, receipts] = await Promise.all([
        supabase.from('sales_invoices')
          .select('id, invoice_number, total_amount, status, created_at')
          .order('created_at', { ascending: false })
          .limit(5),
        supabase.from('bank_payments')
          .select('id, amount, description, status, payment_date')
          .order('payment_date', { ascending: false })
          .limit(5),
        supabase.from('bank_receipts')
          .select('id, amount, description, status, receipt_date')
          .order('receipt_date', { ascending: false })
          .limit(5)
      ]);

      const activities: RecentActivity[] = [
        ...(invoices.data || []).map(inv => ({
          id: inv.id,
          type: 'invoice' as const,
          description: `Invoice ${inv.invoice_number}`,
          amount: inv.total_amount || 0,
          date: inv.created_at,
          status: inv.status
        })),
        ...(payments.data || []).map(pay => ({
          id: pay.id,
          type: 'payment' as const,
          description: pay.description || 'Payment',
          amount: pay.amount || 0,
          date: pay.payment_date,
          status: pay.status
        })),
        ...(receipts.data || []).map(rec => ({
          id: rec.id,
          type: 'receipt' as const,
          description: rec.description || 'Receipt',
          amount: rec.amount || 0,
          date: rec.receipt_date,
          status: rec.status
        }))
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);

      return activities;
    }
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'invoice': return <FileText className="h-4 w-4" />;
      case 'payment': return <DollarSign className="h-4 w-4" />;
      case 'receipt': return <Receipt className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': case 'completed': return 'default';
      case 'pending': return 'secondary';
      case 'overdue': return 'destructive';
      default: return 'outline';
    }
  };

  if (kpiLoading || activityLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <DollarSign className="h-12 w-12 animate-pulse mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading business overview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Business Dashboard</h1>
          <p className="text-muted-foreground">Financial overview and key performance indicators</p>
        </div>
        
        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button onClick={() => navigate('/dashboard/sales-invoices')} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Button>
          <Button onClick={() => navigate('/dashboard/receipts')} variant="outline" size="sm">
            <Receipt className="h-4 w-4 mr-2" />
            Record Receipt
          </Button>
          <Button onClick={() => navigate('/dashboard/payments')} variant="outline" size="sm">
            <DollarSign className="h-4 w-4 mr-2" />
            Make Payment
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(kpiData?.revenue || 0)}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              {kpiData?.revenueChange || 0}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(kpiData?.expenses || 0)}</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingDown className="h-3 w-3 mr-1" />
              {Math.abs(kpiData?.expenseChange || 0)}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cash Balance</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(kpiData?.cashBalance || 0)}</div>
            {(kpiData?.cashBalance || 0) < 50000 && (
              <div className="flex items-center text-xs text-amber-600">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Low cash warning
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accounts Receivable</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(kpiData?.accountsReceivable || 0)}</div>
            <div className="text-xs text-muted-foreground">Outstanding invoices</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accounts Payable</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(kpiData?.accountsPayable || 0)}</div>
            <div className="text-xs text-muted-foreground">Pending payments</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(kpiData?.profit || 0)}</div>
            <div className={`text-xs ${(kpiData?.profit || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {(kpiData?.profit || 0) >= 0 ? 'Profitable' : 'Loss'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Cash Warning */}
      {(kpiData?.cashBalance || 0) < 50000 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800">
              <AlertTriangle className="h-5 w-5" />
              Cash Flow Alert
            </CardTitle>
          </CardHeader>
          <CardContent className="text-amber-700">
            <p>Your cash balance is below the recommended threshold of R50,000.</p>
            <div className="mt-3 flex gap-2">
              <Button onClick={() => navigate('/dashboard/receipts')} variant="outline" size="sm">
                Record Receipts
              </Button>
              <Button onClick={() => navigate('/dashboard/bank-reconciliations')} variant="outline" size="sm">
                Reconcile Accounts
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivity?.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getActivityIcon(activity.type)}
                      <span className="capitalize">{activity.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{activity.description}</TableCell>
                  <TableCell>{formatCurrency(activity.amount)}</TableCell>
                  <TableCell>{formatDate(activity.date)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(activity.status)}>
                      {activity.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};