import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  DollarSign, 
  Users, 
  FileText, 
  TrendingUp, 
  AlertTriangle,
  BarChart3,
  PieChart,
  Calculator,
  Settings,
  Database,
  Shield,
  Bell,
  Download,
  Filter,
  Search,
  Plus
} from 'lucide-react';
import { useDashboardData } from '@/hooks/useDashboardData';

const ComprehensiveAdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');
  const [activeTab, setActiveTab] = useState('overview');
  const { invoices, customers, orders, services, notifications, metrics, isLoading } = useDashboardData();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const kpiCards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(2450000),
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Active Clients',
      value: '248',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Outstanding Invoices',
      value: formatCurrency(890000),
      change: '-5.1%',
      trend: 'down',
      icon: FileText,
      color: 'text-orange-600'
    },
    {
      title: 'Conversion Rate',
      value: '68.4%',
      change: '+2.3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  const recentActivities = [
    { type: 'invoice', description: 'Invoice INV-2024-001 created for Client ABC', time: '2 minutes ago' },
    { type: 'payment', description: 'Payment received from XYZ Corp - R15,000', time: '15 minutes ago' },
    { type: 'quote', description: 'Quote QUO-2024-045 accepted by New Client', time: '1 hour ago' },
    { type: 'client', description: 'New client registration: Tech Solutions Ltd', time: '2 hours ago' },
    { type: 'system', description: 'Monthly compliance reminder sent to all clients', time: '3 hours ago' }
  ];

  const businessIntelligence = [
    { title: 'Financial Reports', description: 'Comprehensive P&L, Balance Sheet, and Cash Flow reports', icon: BarChart3 },
    { title: 'Client Analytics', description: 'Client performance, retention, and segmentation analysis', icon: Users },
    { title: 'Service Performance', description: 'Service utilization, profitability, and efficiency metrics', icon: PieChart },
    { title: 'Compliance Tracking', description: 'Regulatory compliance status and upcoming deadlines', icon: Shield },
    { title: 'Revenue Analytics', description: 'Revenue trends, forecasting, and variance analysis', icon: Calculator },
    { title: 'System Health', description: 'System performance, uptime, and security monitoring', icon: Database }
  ];

  const quickActions = [
    { title: 'Create Invoice', description: 'Generate new client invoice', action: 'invoice' },
    { title: 'Add Client', description: 'Register new client account', action: 'client' },
    { title: 'Generate Quote', description: 'Create service quotation', action: 'quote' },
    { title: 'Process Payment', description: 'Record client payment', action: 'payment' },
    { title: 'Compliance Check', description: 'Run compliance audit', action: 'compliance' },
    { title: 'Export Data', description: 'Generate system reports', action: 'export' }
  ];

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading dashboard...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Comprehensive business management and analytics</p>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="today">Today</option>
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
              <option value="this-quarter">This Quarter</option>
              <option value="this-year">This Year</option>
            </select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Alert Banner */}
        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-orange-400 mr-2" />
            <div className="flex-1">
              <p className="text-sm font-medium text-orange-800">
                Compliance Alert: 12 clients have overdue CIPC returns due within 7 days
              </p>
            </div>
            <Button variant="outline" size="sm" className="ml-4">
              Review Cases
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiCards.map((kpi, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{kpi.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                    <div className="flex items-center mt-2">
                      <span className={`text-sm font-medium ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {kpi.change}
                      </span>
                      <span className="text-xs text-gray-500 ml-1">vs last period</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-50 ${kpi.color}`}>
                    <kpi.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Business Intelligence */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Business Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {businessIntelligence.map((item, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <item.icon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{item.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => console.log(`Action: ${action.action}`)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    <div className="text-left">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-xs text-gray-500">{action.description}</div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Recent Activity
              </CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Filter activities..." className="pl-10 w-64" />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'invoice' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'payment' ? 'bg-green-100 text-green-600' :
                    activity.type === 'quote' ? 'bg-purple-100 text-purple-600' :
                    activity.type === 'client' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                  <Badge variant={activity.type === 'payment' ? 'default' : 'secondary'} className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">System Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-green-600">99.9%</span>
                <Badge className="bg-green-100 text-green-800">Healthy</Badge>
              </div>
              <p className="text-xs text-gray-500 mt-2">Uptime last 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Security Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">A+</span>
                <Badge className="bg-blue-100 text-blue-800">Excellent</Badge>
              </div>
              <p className="text-xs text-gray-500 mt-2">Last security audit</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Data Backup</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-green-600">✓</span>
                <Badge className="bg-green-100 text-green-800">Current</Badge>
              </div>
              <p className="text-xs text-gray-500 mt-2">Last backup: 2 hours ago</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ComprehensiveAdminDashboard;