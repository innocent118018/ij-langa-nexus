import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  ShoppingCart, 
  DollarSign, 
  FileText, 
  TrendingUp, 
  TrendingDown,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Download,
  Settings
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { AdminLayout } from '@/components/admin/AdminLayout';

// Mock data - replace with real API calls
const mockMetrics = {
  totalUsers: 1234,
  totalOrders: 856,
  totalRevenue: 125000,
  totalInvoices: 432,
  userGrowth: 12.5,
  orderGrowth: 8.3,
  revenueGrowth: 15.2,
  invoiceGrowth: 6.7
};

const mockRecentActivity = [
  { id: 1, type: 'order', description: 'New order #12345 from Acme Corp', time: '2 minutes ago', status: 'pending' },
  { id: 2, type: 'user', description: 'New user registration: john@example.com', time: '5 minutes ago', status: 'active' },
  { id: 3, type: 'payment', description: 'Payment received for invoice #INV-001', time: '10 minutes ago', status: 'completed' },
  { id: 4, type: 'invoice', description: 'Invoice #INV-002 sent to client', time: '15 minutes ago', status: 'sent' },
  { id: 5, type: 'alert', description: 'System backup completed successfully', time: '30 minutes ago', status: 'completed' },
];

const mockChartData = [
  { name: 'Jan', revenue: 4000, orders: 240, users: 180 },
  { name: 'Feb', revenue: 3000, orders: 198, users: 220 },
  { name: 'Mar', revenue: 2000, orders: 180, users: 190 },
  { name: 'Apr', revenue: 2780, orders: 220, users: 250 },
  { name: 'May', revenue: 1890, orders: 160, users: 280 },
  { name: 'Jun', revenue: 2390, orders: 200, users: 320 },
];

const mockPieData = [
  { name: 'Active Users', value: 400, color: '#0088FE' },
  { name: 'Pending Orders', value: 300, color: '#00C49F' },
  { name: 'Completed Orders', value: 300, color: '#FFBB28' },
  { name: 'Cancelled Orders', value: 200, color: '#FF8042' }
];

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [isLoading, setIsLoading] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'active':
        return <Activity className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(amount);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Comprehensive business overview and management</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setTimeRange('7d')}>
              Last 7 Days
            </Button>
            <Button variant="outline" onClick={() => setTimeRange('30d')}>
              Last 30 Days
            </Button>
            <Button variant="outline" onClick={() => setTimeRange('90d')}>
              Last 90 Days
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockMetrics.totalUsers.toLocaleString()}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +{mockMetrics.userGrowth}% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockMetrics.totalOrders.toLocaleString()}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +{mockMetrics.orderGrowth}% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(mockMetrics.totalRevenue)}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +{mockMetrics.revenueGrowth}% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockMetrics.totalInvoices.toLocaleString()}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +{mockMetrics.invoiceGrowth}% from last month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue & Orders Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="orders" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={mockPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    dataKey="value"
                  >
                    {mockPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
                    {getStatusIcon(activity.status)}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.description}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Database</span>
                  <span className="text-green-600">Healthy</span>
                </div>
                <Progress value={98} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>API Response</span>
                  <span className="text-green-600">Fast</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Storage</span>
                  <span className="text-yellow-600">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Memory</span>
                  <span className="text-green-600">Good</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Button variant="outline" className="flex flex-col h-20 space-y-2">
                <Users className="h-5 w-5" />
                <span className="text-xs">Add User</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-20 space-y-2">
                <FileText className="h-5 w-5" />
                <span className="text-xs">New Invoice</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-20 space-y-2">
                <ShoppingCart className="h-5 w-5" />
                <span className="text-xs">View Orders</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-20 space-y-2">
                <Eye className="h-5 w-5" />
                <span className="text-xs">Analytics</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-20 space-y-2">
                <Settings className="h-5 w-5" />
                <span className="text-xs">Settings</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-20 space-y-2">
                <Download className="h-5 w-5" />
                <span className="text-xs">Export</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;