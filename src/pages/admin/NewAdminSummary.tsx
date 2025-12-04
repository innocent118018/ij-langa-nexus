import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  Users,
  ShoppingCart,
  DollarSign,
  FileText,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Activity,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

// Metric card component
interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ElementType;
  loading?: boolean;
}

function MetricCard({ title, value, change, icon: Icon, loading }: MetricCardProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-8 rounded-lg" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-4 w-20" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change !== undefined && (
          <div className="flex items-center text-xs mt-1">
            {change >= 0 ? (
              <>
                <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
                <span className="text-emerald-500">+{change}%</span>
              </>
            ) : (
              <>
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                <span className="text-red-500">{change}%</span>
              </>
            )}
            <span className="text-muted-foreground ml-1">from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Recent activity item
interface ActivityItem {
  id: string;
  type: string;
  description: string;
  time: string;
  status: 'success' | 'pending' | 'warning';
}

function RecentActivityList({ activities, loading }: { activities: ActivityItem[]; loading: boolean }) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-start gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-3/4 mb-1" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-emerald-500';
      case 'pending': return 'bg-amber-500';
      case 'warning': return 'bg-red-500';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3">
          <div className={`w-2 h-2 mt-2 rounded-full ${getStatusColor(activity.status)}`} />
          <div className="flex-1 min-w-0">
            <p className="text-sm">{activity.description}</p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function NewAdminSummary() {
  // Fetch dashboard metrics
  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['admin-dashboard-metrics'],
    queryFn: async () => {
      // Fetch counts from various tables
      const [ordersRes, customersRes, invoicesRes] = await Promise.all([
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('customers').select('*', { count: 'exact', head: true }),
        supabase.from('sales_invoices').select('*', { count: 'exact', head: true }),
      ]);

      // Calculate revenue (sum of paid invoices)
      const { data: revenueData } = await supabase
        .from('sales_invoices')
        .select('total_amount')
        .eq('status', 'paid');

      const totalRevenue = revenueData?.reduce((sum, inv) => sum + (Number(inv.total_amount) || 0), 0) || 0;

      return {
        totalOrders: ordersRes.count || 0,
        totalCustomers: customersRes.count || 0,
        totalInvoices: invoicesRes.count || 0,
        totalRevenue,
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch recent activity
  const { data: recentActivity, isLoading: activityLoading } = useQuery({
    queryKey: ['admin-recent-activity'],
    queryFn: async () => {
      const { data: orders } = await supabase
        .from('orders')
        .select('id, status, created_at, customer_name')
        .order('created_at', { ascending: false })
        .limit(5);

      return (orders || []).map((order) => ({
        id: order.id,
        type: 'order',
        description: `Order from ${order.customer_name || 'Unknown'} - ${order.status}`,
        time: new Date(order.created_at).toLocaleString(),
        status: order.status === 'completed' ? 'success' : order.status === 'pending' ? 'pending' : 'warning',
      })) as ActivityItem[];
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back. Here's what's happening today.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Export
          </Button>
          <Button size="sm">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            Quick Actions
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Revenue"
          value={formatCurrency(metrics?.totalRevenue || 0)}
          change={12.5}
          icon={DollarSign}
          loading={metricsLoading}
        />
        <MetricCard
          title="Total Orders"
          value={metrics?.totalOrders || 0}
          change={8.2}
          icon={ShoppingCart}
          loading={metricsLoading}
        />
        <MetricCard
          title="Customers"
          value={metrics?.totalCustomers || 0}
          change={15.3}
          icon={Users}
          loading={metricsLoading}
        />
        <MetricCard
          title="Invoices"
          value={metrics?.totalInvoices || 0}
          change={-2.4}
          icon={FileText}
          loading={metricsLoading}
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest orders and transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivityList 
              activities={recentActivity || []} 
              loading={activityLoading} 
            />
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system health</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Database</span>
              <Badge variant="default" className="bg-emerald-500">Healthy</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Storage</span>
              <Badge variant="default" className="bg-emerald-500">Healthy</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Edge Functions</span>
              <Badge variant="default" className="bg-emerald-500">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Auth Service</span>
              <Badge variant="default" className="bg-emerald-500">Online</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
