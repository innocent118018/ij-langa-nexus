
import React from 'react';
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
  BarChart3
} from 'lucide-react';

export const AdminDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R 12,450</div>
            <p className="text-xs text-muted-foreground">+15% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">+12 new this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unpaid Invoices</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R 45,230</div>
            <p className="text-xs text-muted-foreground">Overdue: R 12,100</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Invoices & Payments Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Invoice Management</span>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Create Invoice
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">John Doe - Invoice #001</p>
                  <p className="text-sm text-gray-600">CIPC Registration - Due: 2 days</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-600">R 1,200</p>
                  <Button size="sm" variant="outline">Send Reminder</Button>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Jane Smith - Invoice #002</p>
                  <p className="text-sm text-gray-600">VAT Registration - Paid</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">R 1,250</p>
                  <Button size="sm" variant="ghost" disabled>Paid</Button>
                </div>
              </div>
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
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">ABC Company (Pty) Ltd</p>
                  <p className="text-sm text-gray-600">3 Active Services</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">View</Button>
                  <Button size="sm" variant="outline">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">XYZ Trading</p>
                  <p className="text-sm text-gray-600">1 Pending Payment</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">View</Button>
                  <Button size="sm" variant="outline">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
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
                  <p className="text-sm text-gray-600">Client: John Doe</p>
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
                Unpaid Balances
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
            <span>Notifications & Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline">
              Send Payment Reminders
            </Button>
            <Button variant="outline">
              WhatsApp Notifications
            </Button>
            <Button variant="outline">
              SMS Alerts
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
