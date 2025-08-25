
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  DollarSign, 
  FileText, 
  TrendingUp, 
  Bell,
  Plus,
  Upload,
  BarChart3,
  Mail,
  MessageSquare
} from 'lucide-react';
import { useDashboardData } from '@/hooks/useDashboardData';
import { CreateInvoiceModal } from './CreateInvoiceModal';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export const AdminDashboard = () => {
  const { invoices, customers, services, notifications, metrics } = useDashboardData();
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusBadge = (status: string, balanceDue?: number) => {
    if (status === 'Paid in full') {
      return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
    } else if (status === 'Overdue' || (balanceDue && balanceDue > 0)) {
      return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
    } else if (status === 'Overpaid') {
      return <Badge className="bg-blue-100 text-blue-800">Overpaid</Badge>;
    }
    return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">From all invoices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeClients}</div>
            <p className="text-xs text-muted-foreground">Total customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.pendingOrders}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unpaid Invoices</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics.unpaidAmount)}</div>
            <p className="text-xs text-muted-foreground">Outstanding balance</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Invoice Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Invoice Management</span>
              </div>
              <Button size="sm" onClick={() => setIsCreateInvoiceOpen(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Create Invoice
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {invoices.slice(0, 10).map((invoice) => (
                <div key={invoice.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{invoice.customers?.name} - {invoice.reference}</p>
                    <p className="text-sm text-gray-600">
                      {format(new Date(invoice.issue_date), 'MMM dd, yyyy')} - 
                      {invoice.days_overdue ? ` Overdue: ${invoice.days_overdue} days` : ' Current'}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-bold">{formatCurrency(Number(invoice.balance_due))}</p>
                    {getStatusBadge(invoice.status, Number(invoice.balance_due))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Client Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Client Management</span>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Client
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {customers.slice(0, 10).map((customer) => (
                <div key={customer.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{customer.name}</p>
                    <p className="text-sm text-gray-600">
                      Balance: {formatCurrency(Number(customer.accounts_receivable))}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(customer.status)}
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Orders Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Orders Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">CIPC Company Registration</p>
                  <p className="text-sm text-gray-600">Multiple clients pending</p>
                </div>
                <div className="flex items-center space-x-2">
                  <select className="text-xs border rounded px-2 py-1">
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                  <Button size="sm" variant="ghost">Assign</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reports & Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Reports & Analytics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="h-4 w-4 mr-2" />
                Revenue Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Client Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="h-4 w-4 mr-2" />
                Unpaid Balances Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications System */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Recent Notifications & Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="font-medium text-sm">{notification.title}</p>
                    <p className="text-xs text-gray-600">{notification.message}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">
                    {notification.sent_at && format(new Date(notification.sent_at), 'MMM dd, yyyy HH:mm')}
                  </p>
                  <Badge className="bg-green-100 text-green-800">Sent</Badge>
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-4 border-t">
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Send Payment Reminders
            </Button>
            <Button variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              WhatsApp Notifications
            </Button>
            <Button variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              SMS Alerts
            </Button>
          </div>
        </CardContent>
      </Card>

      <CreateInvoiceModal
        isOpen={isCreateInvoiceOpen}
        onClose={() => setIsCreateInvoiceOpen(false)}
        customers={customers}
        services={services}
      />
    </div>
  );
};
