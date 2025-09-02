import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  DollarSign, 
  ShoppingCart, 
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Eye,
  CreditCard
} from 'lucide-react';

export const ClientDashboard = () => {
  const { invoices, orders, metrics, notifications, isLoading } = useDashboardData();
  const navigate = useNavigate();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(amount);
  };

  // Calculate client metrics
  const clientMetrics = useMemo(() => {
    const unpaidInvoices = invoices.filter(inv => inv.status !== 'paid');
    const outstandingBalance = unpaidInvoices.reduce((sum, inv) => sum + (inv.balance_due || 0), 0);
    const overdueInvoices = invoices.filter(inv => inv.status !== 'paid' && inv.days_overdue > 0);
    
    return {
      totalInvoices: invoices.length,
      unpaidCount: unpaidInvoices.length,
      outstandingBalance,
      totalOrders: orders.length,
      pendingOrders: orders.filter(order => order.status === 'pending').length,
      overdueCount: overdueInvoices.length,
    };
  }, [invoices, orders]);

  const recentInvoices = useMemo(() => {
    return invoices
      .slice(0, 5)
      .map(invoice => ({
        id: invoice.id,
        reference: invoice.reference,
        amount: invoice.invoice_amount,
        balance: invoice.balance_due,
        status: invoice.status,
        issueDate: invoice.issue_date,
        daysOverdue: invoice.days_overdue,
      }));
  }, [invoices]);

  const complianceStatus = useMemo(() => {
    const criticalNotifications = notifications.filter(n => n.type === 'compliance' || n.type === 'deadline');
    if (criticalNotifications.length > 0) return 'Action Required';
    if (clientMetrics.overdueCount > 0) return 'Overdue Payments';
    return 'Up to Date';
  }, [notifications, clientMetrics.overdueCount]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="loading-professional w-12 h-12 rounded-full mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-none">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome to Your Client Portal</h1>
        <p className="text-primary-foreground/90">
          Manage your legal services, track compliance, and stay up-to-date with IJ Langa Consulting
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Services</CardTitle>
            <ShoppingCart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientMetrics.pendingOrders}</div>
            <p className="text-xs text-muted-foreground">
              {clientMetrics.totalOrders} total orders
            </p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-2 p-0 h-auto text-xs"
              onClick={() => navigate('/dashboard/orders')}
            >
              View Details
            </Button>
          </CardContent>
        </Card>

        <Card className="card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
            <FileText className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientMetrics.unpaidCount}</div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(clientMetrics.outstandingBalance)} outstanding
            </p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-2 p-0 h-auto text-xs"
              onClick={() => navigate('/dashboard/invoices')}
            >
              Pay Now
            </Button>
          </CardContent>
        </Card>

        <Card className="card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Compliance Status</CardTitle>
            {complianceStatus === 'Up to Date' ? (
              <CheckCircle className="h-4 w-4 text-emerald-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-destructive" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">{complianceStatus}</div>
            <p className="text-xs text-muted-foreground">
              Legal compliance tracking
            </p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-2 p-0 h-auto text-xs"
              onClick={() => navigate('/dashboard/documents')}
            >
              View Documents
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Invoices */}
        <Card className="lg:col-span-2 card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Invoices
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/invoices')}>
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentInvoices.length > 0 ? (
              <div className="space-y-4">
                {recentInvoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                    <div className="flex-1">
                      <p className="font-medium text-sm">Invoice #{invoice.reference}</p>
                      <p className="text-xs text-muted-foreground">
                        Issued: {new Date(invoice.issueDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm font-medium">
                        {formatCurrency(invoice.amount)}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                        ${invoice.status === 'paid' ? 'status-paid' : ''}
                        ${invoice.status === 'unpaid' || invoice.status === 'pending' ? 'status-pending' : ''}
                        ${invoice.status === 'overdue' || invoice.daysOverdue > 0 ? 'status-overdue' : ''}
                      `}>
                        {invoice.daysOverdue > 0 ? `Overdue ${invoice.daysOverdue}d` : invoice.status}
                      </div>
                      {invoice.status !== 'paid' && invoice.balance > 0 && (
                        <Button 
                          size="sm" 
                          className="mt-2"
                          onClick={() => navigate('/dashboard/invoices')}
                        >
                          <CreditCard className="h-3 w-3 mr-1" />
                          Pay
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No invoices yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card className="card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/products')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Order New Service
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/dashboard/documents')}
              >
                <FileText className="h-4 w-4 mr-2" />
                View Documents
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/dashboard/support')}
              >
                <Eye className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/dashboard/profile')}
              >
                <Eye className="h-4 w-4 mr-2" />
                Update Profile
              </Button>
            </CardContent>
          </Card>

          {/* Legal Notice */}
          <Card className="card">
            <CardHeader>
              <CardTitle className="text-sm">Legal Notice</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Ensure all compliance deadlines are met. Contact us immediately if you receive any legal correspondence or have questions about regulatory requirements.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};