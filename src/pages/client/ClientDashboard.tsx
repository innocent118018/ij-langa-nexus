import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { 
  Package, 
  ShoppingCart, 
  FileText, 
  Users,
  TrendingUp,
  ArrowRight,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardData {
  productsCount: number;
  ordersCount: number;
  pendingOrders: number;
  customersCount: number;
  totalRevenue: number;
  recentOrders: Array<{
    id: string;
    total_amount: number | null;
    status: string | null;
    created_at: string;
  }>;
}

async function fetchDashboardData(userId: string): Promise<DashboardData | null> {
  // Get user's company
  const { data: profile } = await supabase
    .from('profiles')
    .select('company_id')
    .eq('id', userId)
    .single();

  if (!profile?.company_id) return null;

  const companyId = profile.company_id;

  // Get products count
  const { count: productsCount } = await supabase
    .from('products')
    .select('id', { count: 'exact', head: true })
    .eq('company_id', companyId);

  // Get orders with totals
  const { data: ordersData } = await supabase
    .from('orders')
    .select('id, total_amount, status, created_at')
    .eq('company_id', companyId)
    .order('created_at', { ascending: false })
    .limit(5);

  // Get pending orders count
  const { count: pendingCount } = await supabase
    .from('orders')
    .select('id', { count: 'exact', head: true })
    .eq('company_id', companyId)
    .eq('status', 'pending');

  // Get customers count - use any to avoid type recursion
  const { count: custCount } = await (supabase as any)
    .from('customers')
    .select('id', { count: 'exact', head: true })
    .eq('company_id', companyId);

  // Calculate revenue
  const { data: revenueData } = await supabase
    .from('orders')
    .select('total_amount')
    .eq('company_id', companyId)
    .eq('status', 'completed');

  const revenueOrders = (revenueData || []) as Array<{ total_amount: number | null }>;
  const totalRevenue = revenueOrders.reduce((sum, o) => sum + (o.total_amount || 0), 0);

  const orders = (ordersData || []) as Array<{
    id: string;
    total_amount: number | null;
    status: string | null;
    created_at: string;
  }>;

  return {
    productsCount: productsCount || 0,
    ordersCount: orders.length,
    pendingOrders: pendingCount || 0,
    customersCount: custCount || 0,
    totalRevenue,
    recentOrders: orders,
  };
}

export default function ClientDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['client-dashboard', user?.id],
    queryFn: () => fetchDashboardData(user!.id),
    enabled: !!user?.id,
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">No Store Setup</h2>
            <p className="text-muted-foreground mb-4">
              You need to set up your store to start selling.
            </p>
            <Button onClick={() => navigate('/client/settings')}>Set Up Store</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Store Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your products, orders, and customers
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/client/products')}>
            <Package className="h-4 w-4 mr-2" />
            Products
          </Button>
          <Button onClick={() => navigate('/client/orders')}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Orders
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/client/products')}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.productsCount}</div>
            <p className="text-xs text-muted-foreground">Active listings</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/client/orders')}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.pendingOrders}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/client/customers')}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.customersCount}</div>
            <p className="text-xs text-muted-foreground">Total customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(dashboardData.totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">Total sales</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks for your store</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/client/products/new')}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Product
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/client/orders')}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              View All Orders
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/client/invoices')}>
              <FileText className="h-4 w-4 mr-2" />
              Generate Invoice
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/client/settings')}>
              <Package className="h-4 w-4 mr-2" />
              Store Settings
            </Button>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest orders from your store</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/client/orders')}>
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            {dashboardData.recentOrders.length > 0 ? (
              <div className="space-y-3">
                {dashboardData.recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Order #{order.id.slice(0, 8)}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(order.total_amount || 0)}</p>
                      <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-4">No orders yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
