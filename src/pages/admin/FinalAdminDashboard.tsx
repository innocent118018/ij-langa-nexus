import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAdminDashboardData } from '@/hooks/useAdminDashboardData';
import { useNavigate } from 'react-router-dom';
import {
  Users, ShoppingCart, FileText, DollarSign, 
  TrendingUp, AlertTriangle, Bell, RefreshCw,
  Building2, UserCheck, ClipboardCheck, CreditCard,
  BarChart3, PieChart, Calendar, ArrowUpRight
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RechartsPie, Pie, Cell, LineChart, Line, Legend
} from 'recharts';

const CHART_COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(142, 76%, 36%)', 'hsl(38, 92%, 50%)'];

export default function FinalAdminDashboard() {
  const { data, isLoading, refetch } = useAdminDashboardData();
  const navigate = useNavigate();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  const kpis = data?.kpis;
  const invoiceStatusData = [
    { name: 'Paid', value: kpis?.paidInvoices || 0, color: 'hsl(142, 76%, 36%)' },
    { name: 'Unpaid', value: kpis?.unpaidInvoices || 0, color: 'hsl(38, 92%, 50%)' },
    { name: 'Overdue', value: kpis?.overdueInvoices || 0, color: 'hsl(0, 84%, 60%)' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Platform overview and management
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
        </div>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-5 w-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {formatCurrency(kpis?.totalRevenue || 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-600 font-medium">
                {formatCurrency(kpis?.monthlyRevenue || 0)}
              </span> this month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Invoices</CardTitle>
            <FileText className="h-5 w-5 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(kpis?.paidInvoices || 0) + (kpis?.unpaidInvoices || 0)}
            </div>
            <div className="flex gap-2 mt-1">
              <Badge variant="default" className="bg-emerald-500">
                {kpis?.paidInvoices || 0} Paid
              </Badge>
              <Badge variant="secondary" className="bg-amber-500 text-white">
                {kpis?.unpaidInvoices || 0} Unpaid
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {kpis?.activeClients || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-blue-600">{kpis?.activeResellers || 0}</span> active resellers
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {(kpis?.pendingOrders || 0) + (kpis?.completedOrders || 0)}
            </div>
            <div className="flex gap-2 mt-1">
              <Badge variant="outline" className="text-amber-600 border-amber-600">
                {kpis?.pendingOrders || 0} Pending
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Revenue by Month
            </CardTitle>
            <CardDescription>Last 6 months revenue trend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.revenueByMonth || []}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis 
                    className="text-xs"
                    tickFormatter={(value) => `R${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), 'Revenue']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar 
                    dataKey="revenue" 
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Invoice Status Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Invoice Status Distribution
            </CardTitle>
            <CardDescription>Paid vs Unpaid vs Overdue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie
                    data={invoiceStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {invoiceStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RechartsPie>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Invoices */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Invoices</CardTitle>
              <CardDescription>Latest invoice activity</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/admin/invoices')}>
              View All <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data?.recentInvoices?.slice(0, 5).map((invoice) => (
                <div 
                  key={invoice.id} 
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm">{invoice.customer_name}</p>
                    <p className="text-xs text-muted-foreground">{invoice.invoice_number}</p>
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
              )) || (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No recent invoices
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Alerts & Quick Actions
            </CardTitle>
            <CardDescription>Pending items requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {(kpis?.overdueInvoices || 0) > 0 && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-red-500/20">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Overdue Invoices</p>
                    <p className="text-xs text-muted-foreground">
                      {kpis?.overdueInvoices} invoices need follow-up
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => navigate('/admin/invoices')}>
                  Review
                </Button>
              </div>
            )}

            {(kpis?.pendingOrders || 0) > 0 && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-amber-500/20">
                    <ShoppingCart className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Pending Orders</p>
                    <p className="text-xs text-muted-foreground">
                      {kpis?.pendingOrders} orders awaiting processing
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => navigate('/admin/orders')}>
                  Process
                </Button>
              </div>
            )}

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button 
                variant="outline" 
                className="h-auto py-3 flex-col"
                onClick={() => navigate('/admin/clients')}
              >
                <Users className="h-5 w-5 mb-1" />
                <span className="text-xs">Manage Clients</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-3 flex-col"
                onClick={() => navigate('/admin/invoices')}
              >
                <FileText className="h-5 w-5 mb-1" />
                <span className="text-xs">Create Invoice</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-3 flex-col"
                onClick={() => navigate('/admin/reports')}
              >
                <BarChart3 className="h-5 w-5 mb-1" />
                <span className="text-xs">View Reports</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-3 flex-col"
                onClick={() => navigate('/admin/settings')}
              >
                <ClipboardCheck className="h-5 w-5 mb-1" />
                <span className="text-xs">Compliance</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Failed Payments (if any) */}
      {data?.failedPayments && data.failedPayments.length > 0 && (
        <Card className="border-red-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <CreditCard className="h-5 w-5" />
              Failed Payments
            </CardTitle>
            <CardDescription>Payments requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.failedPayments.map((payment) => (
                <div 
                  key={payment.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-red-500/20 bg-red-500/5"
                >
                  <div>
                    <p className="font-medium text-sm">Invoice: {payment.invoice_id.slice(0, 8)}</p>
                    <p className="text-xs text-muted-foreground">{payment.error}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-red-600">{formatCurrency(payment.amount)}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(payment.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
