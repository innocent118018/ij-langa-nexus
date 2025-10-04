import React from 'react';
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AdminDashboardSidebar } from './AdminDashboardSidebar';
import { PermissionsProvider } from '@/hooks/usePermissions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, Users, CreditCard, Receipt, AlertCircle, 
  TrendingUp, DollarSign, Calendar, FileText, Settings,
  Shield, Bell, Zap, Target, Package, Clock
} from 'lucide-react';
import { PermissionGate } from './PermissionGate';

// KPI Cards Component
const KPICards = () => {
  const kpis = [
    {
      title: "Total Revenue",
      value: "R 2,847,650",
      change: "+12.5%",
      icon: DollarSign,
      permission: "business:read"
    },
    {
      title: "Active Customers",
      value: "342",
      change: "+8.2%",
      icon: Users,
      permission: "customers:read"
    },
    {
      title: "Pending Invoices",
      value: "47",
      change: "-15.3%",
      icon: FileText,
      permission: "invoices:read"
    },
    {
      title: "Outstanding Amount",
      value: "R 186,420",
      change: "+3.7%",
      icon: AlertCircle,
      permission: "invoices:read"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpis.map((kpi, index) => (
        <PermissionGate key={index} permission={kpi.permission} showMessage={false}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={kpi.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                  {kpi.change}
                </span>{' '}
                from last month
              </p>
            </CardContent>
          </Card>
        </PermissionGate>
      ))}
    </div>
  );
};

// Quick Actions Component
const QuickActions = () => {
  const actions = [
    {
      title: "Create Invoice",
      description: "Generate a new sales invoice",
      icon: FileText,
      permission: "invoices:create",
      action: () => console.log("Create invoice")
    },
    {
      title: "Add Customer",
      description: "Register a new customer",
      icon: Users,
      permission: "customers:create",
      action: () => console.log("Add customer")
    },
    {
      title: "Record Payment",
      description: "Log a customer payment",
      icon: CreditCard,
      permission: "receipts:create",
      action: () => console.log("Record payment")
    },
    {
      title: "Generate Report",
      description: "Create financial reports",
      icon: BarChart3,
      permission: "reports:read",
      action: () => console.log("Generate report")
    }
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Quick Actions
        </CardTitle>
        <CardDescription>
          Frequently used operations for efficient workflow
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <PermissionGate key={index} permission={action.permission} showMessage={false}>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-start text-left"
                onClick={action.action}
              >
                <action.icon className="h-6 w-6 mb-2 text-primary" />
                <div className="font-semibold">{action.title}</div>
                <div className="text-xs text-muted-foreground">{action.description}</div>
              </Button>
            </PermissionGate>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Recent Activity Component
const RecentActivity = () => {
  const activities = [
    {
      type: "invoice",
      description: "Invoice INV-2024-001 created for Acme Corp",
      time: "2 minutes ago",
      status: "pending"
    },
    {
      type: "payment",
      description: "Payment R15,000 received from Tech Solutions",
      time: "15 minutes ago",
      status: "completed"
    },
    {
      type: "customer",
      description: "New customer Global Industries added",
      time: "1 hour ago",
      status: "new"
    },
    {
      type: "report",
      description: "Monthly P&L report generated",
      time: "2 hours ago",
      status: "completed"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'new': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
        <CardDescription>
          Latest system activities and updates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <Badge className={getStatusColor(activity.status)}>
                {activity.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Main Dashboard Component
export const EnhancedAdminDashboard = () => {
  return (
    <PermissionsProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AdminDashboardSidebar />
          
          <main className="flex-1 overflow-auto">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-background border-b px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <SidebarTrigger />
                  <div>
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                    <p className="text-muted-foreground">
                      IJ Langa Consulting — Comprehensive Business Management
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <PermissionGate permission="business:read" showMessage={false}>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Today: {new Date().toLocaleDateString()}
                    </Button>
                  </PermissionGate>
                  
                  <PermissionGate permission="settings:read" showMessage={false}>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </PermissionGate>
                  
                  <Button variant="outline" size="sm">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </Button>
                </div>
              </div>
            </header>
            
            {/* Main Content */}
            <div className="p-6">
              <PermissionGate permission="business:read">
                <KPICards />
                <QuickActions />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <RecentActivity />
                  
                  {/* System Status */}
                  <PermissionGate permission="audit:read" showMessage={false}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="h-5 w-5" />
                          System Status
                        </CardTitle>
                        <CardDescription>
                          System health and security monitoring
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Database</span>
                            <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Backups</span>
                            <Badge className="bg-green-100 text-green-800">Up to Date</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Security</span>
                            <Badge className="bg-green-100 text-green-800">Secure</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">API Status</span>
                            <Badge className="bg-green-100 text-green-800">Online</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </PermissionGate>
                </div>
              </PermissionGate>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </PermissionsProvider>
  );
};