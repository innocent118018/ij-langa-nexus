import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  ShoppingCart, FileText, DollarSign, Clock,
  CheckCircle, AlertCircle, MessageSquare, User,
  Download, Bell, Settings, RefreshCw,
  Package, CreditCard, Calendar, HelpCircle
} from 'lucide-react';

interface ClientMetrics {
  my_orders: number;
  pending_orders: number;
  completed_orders: number;
  total_spent: number;
  recent_orders: any[];
}

export const EnhancedClientPortal: React.FC = () => {
  const [metrics, setMetrics] = useState<ClientMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  useEffect(() => {
    loadClientData();
  }, []);

  const loadClientData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase.rpc('get_dashboard_metrics', {
        user_uuid: user.id
      });

      if (error) throw error;
      setMetrics(data as unknown as ClientMetrics);
    } catch (error: any) {
      console.error('Error loading client data:', error);
      toast({
        title: "Error",
        description: "Failed to load your data",
        variant: "destructive",
      });
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'pending': return 'secondary';
      case 'processing': return 'outline';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Client Portal</h1>
            <p className="text-muted-foreground">
              Welcome back! Manage your services and track progress.
            </p>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={loadClientData}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button>
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics?.my_orders || 0}</div>
              <p className="text-xs text-muted-foreground">
                Total service orders
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {metrics?.pending_orders || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Awaiting processing
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {metrics?.completed_orders || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Successfully delivered
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(metrics?.total_spent || 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Lifetime investment
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Portal Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">My Services</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="h-4 w-4 mr-2" />
                    Recent Orders
                  </CardTitle>
                  <CardDescription>Your latest service orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {metrics?.recent_orders?.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Order #{order.id.slice(0, 8)}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatCurrency(order.total_amount)}</p>
                          <Badge variant={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                    {(!metrics?.recent_orders || metrics.recent_orders.length === 0) && (
                      <p className="text-center text-muted-foreground py-8">
                        No orders yet. Browse our services to get started!
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>Common tasks and services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-16 flex-col">
                      <ShoppingCart className="h-6 w-6 mb-2" />
                      Browse Services
                    </Button>
                    <Button variant="outline" className="h-16 flex-col">
                      <FileText className="h-6 w-6 mb-2" />
                      View Documents
                    </Button>
                    <Button variant="outline" className="h-16 flex-col">
                      <CreditCard className="h-6 w-6 mb-2" />
                      Pay Invoice
                    </Button>
                    <Button variant="outline" className="h-16 flex-col">
                      <MessageSquare className="h-6 w-6 mb-2" />
                      Contact Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Service Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Service Progress
                </CardTitle>
                <CardDescription>Track your ongoing services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Annual Financial Statements</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <p className="text-xs text-muted-foreground">Expected completion: 2 weeks</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>VAT Registration</span>
                      <span>40%</span>
                    </div>
                    <Progress value={40} className="h-2" />
                    <p className="text-xs text-muted-foreground">Expected completion: 1 week</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Monthly Bookkeeping</span>
                      <span>100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                    <p className="text-xs text-green-600">✓ Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>My Services</CardTitle>
                <CardDescription>Manage your active and requested services</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Service management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices">
            <Card>
              <CardHeader>
                <CardTitle>Invoices & Payments</CardTitle>
                <CardDescription>View and manage your invoices and payment history</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Invoice management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>Track all your service orders and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Order history interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>My Documents</CardTitle>
                <CardDescription>Access and download your completed documents</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Document management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages & Support</CardTitle>
                <CardDescription>Communicate with our team and get support</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Messages interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your account information and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Profile management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};