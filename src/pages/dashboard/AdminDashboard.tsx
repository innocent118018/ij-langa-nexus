import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Plus,
  Eye,
  Download
} from 'lucide-react';

export const AdminDashboard = () => {
  const { invoices, customers, orders, metrics, notifications, isLoading } = useDashboardData();
  const navigate = useNavigate();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(amount);
  };

  // Calculate admin metrics
  const adminMetrics = useMemo(() => {
    const totalRevenue = invoices
      .filter(inv => inv.status === 'paid')
      .reduce((sum, inv) => sum + (inv.invoice_amount || 0), 0);
    
    const outstandingBalance = invoices
      .filter(inv => inv.status !== 'paid')
      .reduce((sum, inv) => sum + (inv.balance_due || 0), 0);
    
    const overdueInvoices = invoices.filter(inv => 
      inv.status !== 'paid' && inv.days_overdue > 0
    );

    return {
      totalClients: customers.length,
      totalRevenue,
      outstandingBalance,
      activeInvoices: invoices.filter(inv => inv.status !== 'paid').length,
      overdueCount: overdueInvoices.length,
      totalOrders: orders.length,
      pendingOrders: orders.filter(order => order.status === 'pending').length,
    };
  }, [invoices, customers, orders]);

  const recentActivity = useMemo(() => {
    const activities = [];
    
    // Add recent invoices
    invoices.slice(0, 3).forEach(invoice => {
      activities.push({
        type: 'invoice',
        title: `Invoice #${invoice.reference}`,
        subtitle: `${formatCurrency(invoice.invoice_amount)} - ${invoice.status}`,
        time: new Date(invoice.created_at).toLocaleDateString(),
        status: invoice.status
      });
    });

    // Add recent notifications
    notifications.slice(0, 2).forEach(notification => {
      activities.push({
        type: 'notification',
        title: notification.title,
        subtitle: notification.message,
        time: new Date(notification.created_at).toLocaleDateString(),
        status: 'info'
      });
    });

    return activities.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 5);
  }, [invoices, notifications]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="loading-professional w-12 h-12 rounded-full mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-none">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Complete overview of IJ Langa Consulting operations
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => navigate('/dashboard/document-generation')}>
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Alert for overdue invoices */}
      {adminMetrics.overdueCount > 0 && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <div>
              <h3 className="font-medium text-destructive">Legal Escalation Required</h3>
              <p className="text-sm text-destructive/80">
                {adminMetrics.overdueCount} invoices are overdue and may require legal action.
              </p>
            </div>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => navigate('/dashboard/legal')}
            >
              Review Cases
            </Button>
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminMetrics.totalClients}</div>
            <p className="text-xs text-muted-foreground">
              Active business relationships
            </p>
          </CardContent>
        </Card>

        <Card className="card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(adminMetrics.outstandingBalance)}</div>
            <p className="text-xs text-muted-foreground">
              {adminMetrics.overdueCount} invoices overdue
            </p>
          </CardContent>
        </Card>

        <Card className="card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Invoices</CardTitle>
            <FileText className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminMetrics.activeInvoices}</div>
            <p className="text-xs text-muted-foreground">
              Pending payment
            </p>
          </CardContent>
        </Card>

        <Card className="card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(adminMetrics.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              Year to date
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Activity
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/invoices')}>
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                      ${activity.status === 'paid' ? 'status-paid' : ''}
                      ${activity.status === 'unpaid' || activity.status === 'pending' ? 'status-pending' : ''}
                      ${activity.status === 'overdue' ? 'status-overdue' : ''}
                      ${activity.status === 'info' ? 'bg-blue-100 text-blue-800' : ''}
                    `}>
                      {activity.status}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Business Intelligence */}
        <Card className="card">
          <CardHeader>
            <CardTitle>Business Intelligence</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/dashboard/reports')}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Financial Reports
              </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/dashboard/clients')}
            >
              <Users className="h-4 w-4 mr-2" />
              Client Analytics
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/dashboard/services')}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Service Performance
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/dashboard/legal')}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Legal Escalations
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};