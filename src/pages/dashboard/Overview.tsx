import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/hooks/useApiClient';
import { 
  FileText, 
  DollarSign, 
  ShoppingCart, 
  MessageSquare, 
  Bell,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Calendar,
  Activity
} from 'lucide-react';

const Overview = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Fetch dashboard data
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['dashboard-overview', user?.id],
    queryFn: async () => {
      return await apiClient.getUserData('dashboard-metrics');
    },
    enabled: !!user?.id,
  });

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-4">Loading overview...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const orders = dashboardData?.orders || [];
  const notifications = dashboardData?.notifications || [];
  const invoices = dashboardData?.invoices || [];
  const metrics = dashboardData?.metrics || {
    activeServices: 0,
    pendingOrders: 0,
    unpaidAmount: 0,
    pendingInvoices: 0
  };

  const recentOrders = orders.slice(0, 5);
  const recentNotifications = notifications.slice(0, 3);
  const unpaidInvoices = invoices.filter(invoice => 
    invoice.status === 'Unpaid' || (invoice.balance_due && invoice.balance_due > 0)
  ).slice(0, 3);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'processing':
        return <Activity className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your account activity.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Services</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeServices}</div>
            <p className="text-xs text-muted-foreground">Services in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.pendingOrders}</div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R{metrics.unpaidAmount?.toFixed(2) || '0.00'}</div>
            <p className="text-xs text-muted-foreground">Pending payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.pendingInvoices}</div>
            <p className="text-xs text-muted-foreground">Require payment</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/orders')}>
              View All
            </Button>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <div className="text-center py-6">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No orders yet</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => navigate('/services')}
                >
                  Browse Services
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(order.status)}
                      <div>
                        <p className="font-medium">Order #{order.id.slice(-8)}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                      <p className="text-sm font-medium mt-1">
                        R{order.total_amount?.toFixed(2) || '0.00'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Notifications</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/notifications')}>
              View All
            </Button>
          </CardHeader>
          <CardContent>
            {recentNotifications.length === 0 ? (
              <div className="text-center py-6">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No notifications</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentNotifications.map((notification) => (
                  <div key={notification.id} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{notification.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(notification.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      {!notification.is_read && (
                        <Badge variant="destructive" className="ml-2">New</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Unpaid Invoices */}
      {unpaidInvoices.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-red-600">Outstanding Invoices</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/invoices')}>
              View All Invoices
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {unpaidInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg border-red-200 bg-red-50">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <div>
                      <p className="font-medium">{invoice.reference}</p>
                      <p className="text-sm text-muted-foreground">
                        Due: {new Date(invoice.issue_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600">
                      R{invoice.balance_due?.toFixed(2) || invoice.invoice_amount?.toFixed(2) || '0.00'}
                    </p>
                    <Button size="sm" className="mt-1">
                      Pay Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => navigate('/services')}
            >
              <ShoppingCart className="h-6 w-6" />
              Order Services
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => navigate('/dashboard/documents')}
            >
              <FileText className="h-6 w-6" />
              View Documents
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => navigate('/dashboard/messages')}
            >
              <MessageSquare className="h-6 w-6" />
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;