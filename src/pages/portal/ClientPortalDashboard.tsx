import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import {
  FileText, CreditCard, Calendar, Download,
  Upload, MessageSquare, RefreshCw, ArrowRight,
  AlertCircle, CheckCircle, Clock
} from 'lucide-react';

interface ClientStats {
  outstandingBalance: number;
  lastPaymentAmount: number;
  lastPaymentDate: string | null;
  nextDeadline: string | null;
  activeServices: number;
  pendingInvoices: number;
  recentInvoices: Array<{
    id: string;
    invoice_number: string;
    total: number;
    status: string;
    due_date: string;
  }>;
}

export default function ClientPortalDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<ClientStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClientData();
  }, [user]);

  const fetchClientData = async () => {
    if (!user) return;

    try {
      // Fetch client's invoices
      const { data: invoicesData } = await supabase
        .from('invoices')
        .select('id, total_amount, status, due_date, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      // Fetch client's payments
      const { data: paymentsData } = await supabase
        .from('payments')
        .select('amount, created_at')
        .order('created_at', { ascending: false })
        .limit(1);

      const allInvoices = (invoicesData || []) as any[];
      const pendingInvoices = allInvoices.filter(
        (i: any) => i.status === 'unpaid' || i.status === 'pending'
      );
      
      const outstandingBalance = pendingInvoices.reduce(
        (sum: number, inv: any) => sum + (Number(inv.total_amount) || 0), 
        0
      );

      const lastPayment = (paymentsData as any[])?.[0];

      const mappedInvoices = allInvoices.slice(0, 5).map((inv: any) => ({
        id: inv.id,
        invoice_number: `INV-${inv.id.slice(0, 8)}`,
        total: Number(inv.total_amount) || 0,
        status: inv.status || 'pending',
        due_date: inv.due_date || '',
      }));

      setStats({
        outstandingBalance,
        lastPaymentAmount: Number(lastPayment?.amount) || 0,
        lastPaymentDate: lastPayment?.created_at || null,
        nextDeadline: pendingInvoices[0]?.due_date || null,
        activeServices: 0,
        pendingInvoices: pendingInvoices.length,
        recentInvoices: mappedInvoices,
      });
    } catch (error) {
      console.error('Error fetching client data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(amount);
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-ZA', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <RefreshCw className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">
            {user?.email}
          </p>
        </div>
        <Button onClick={() => fetchClientData()}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className={stats?.outstandingBalance && stats.outstandingBalance > 0 
          ? "border-amber-500/50 bg-amber-50/50" 
          : "border-emerald-500/50 bg-emerald-50/50"
        }>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Outstanding Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              stats?.outstandingBalance && stats.outstandingBalance > 0 
                ? 'text-amber-600' 
                : 'text-emerald-600'
            }`}>
              {formatCurrency(stats?.outstandingBalance || 0)}
            </div>
            {(stats?.pendingInvoices || 0) > 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                {stats?.pendingInvoices} unpaid invoice(s)
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Last Payment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats?.lastPaymentAmount || 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {formatDate(stats?.lastPaymentDate)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Next Deadline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.nextDeadline 
                ? formatDate(stats.nextDeadline) 
                : 'None'}
            </div>
            {stats?.nextDeadline && (
              <p className="text-xs text-muted-foreground mt-1">
                Payment due
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.activeServices || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Subscribed services
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="h-auto py-4 flex-col gap-2"
                onClick={() => navigate('/portal/invoices')}
              >
                <FileText className="h-6 w-6 text-primary" />
                <span className="text-sm">View Invoices</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-4 flex-col gap-2"
                onClick={() => navigate('/portal/payments')}
              >
                <CreditCard className="h-6 w-6 text-primary" />
                <span className="text-sm">Make Payment</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-4 flex-col gap-2"
                onClick={() => navigate('/portal/documents')}
              >
                <Upload className="h-6 w-6 text-primary" />
                <span className="text-sm">Upload Docs</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-4 flex-col gap-2"
                onClick={() => navigate('/portal/support')}
              >
                <MessageSquare className="h-6 w-6 text-primary" />
                <span className="text-sm">Get Support</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Invoices */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Recent Invoices</CardTitle>
              <CardDescription>Your latest invoices</CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/portal/invoices')}
            >
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats?.recentInvoices?.length ? (
                stats.recentInvoices.map((invoice) => (
                  <div 
                    key={invoice.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/portal/invoices/${invoice.id}`)}
                  >
                    <div className="flex items-center gap-3">
                      {invoice.status === 'paid' ? (
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                      ) : invoice.status === 'overdue' ? (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-amber-500" />
                      )}
                      <div>
                        <p className="font-medium text-sm">{invoice.invoice_number}</p>
                        <p className="text-xs text-muted-foreground">
                          Due: {formatDate(invoice.due_date)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(invoice.total)}</p>
                      <Badge 
                        variant={invoice.status === 'paid' ? 'default' : 'secondary'}
                        className={
                          invoice.status === 'paid' 
                            ? 'bg-emerald-500' 
                            : invoice.status === 'overdue'
                            ? 'bg-red-500'
                            : 'bg-amber-500'
                        }
                      >
                        {invoice.status}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No invoices yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Assistant Prompt */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary/20">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Need Help with Compliance?</h3>
              <p className="text-muted-foreground text-sm">
                Our AI assistant can answer questions about your compliance deadlines and requirements.
              </p>
            </div>
          </div>
          <Button onClick={() => navigate('/portal/compliance')}>
            Ask AI Assistant
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
