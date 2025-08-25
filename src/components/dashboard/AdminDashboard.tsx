
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
  BarChart3,
  Mail,
  MessageSquare,
  Scale,
  Gavel,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Building
} from 'lucide-react';
import { useDashboardData } from '@/hooks/useDashboardData';
import { CreateInvoiceModal } from './CreateInvoiceModal';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {
  const { invoices, customers, services, notifications, metrics } = useDashboardData();
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);
  const navigate = useNavigate();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusBadge = (status: string, balanceDue?: number) => {
    if (status === 'Paid in full') {
      return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200"><CheckCircle className="h-3 w-3 mr-1" />Paid</Badge>;
    } else if (status === 'Overdue' || (balanceDue && balanceDue > 0)) {
      return <Badge className="bg-red-100 text-red-800 border-red-200"><AlertTriangle className="h-3 w-3 mr-1" />Overdue</Badge>;
    } else if (status === 'Overpaid') {
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200"><TrendingUp className="h-3 w-3 mr-1" />Overpaid</Badge>;
    }
    return <Badge className="bg-amber-100 text-amber-800 border-amber-200"><Clock className="h-3 w-3 mr-1" />{status}</Badge>;
  };

  const overdueInvoices = invoices.filter(inv => inv.status === 'Overdue' || (inv.balance_due && Number(inv.balance_due) > 0));
  const legalEscalationCandidates = overdueInvoices.filter(inv => inv.days_overdue && inv.days_overdue > 90);

  // Navigation handlers
  const handleRevenueClick = () => navigate('/dashboard/reports');
  const handleClientsClick = () => navigate('/dashboard/clients');
  const handleOrdersClick = () => navigate('/dashboard/orders');
  const handleInvoicesClick = () => navigate('/dashboard/invoices');
  const handleLegalEscalationClick = () => navigate('/dashboard/legal');

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Administrative Control Center</h1>
            <p className="text-slate-300">Comprehensive legal consulting management dashboard</p>
          </div>
          <div className="flex items-center space-x-2">
            <Scale className="h-12 w-12 text-amber-400" />
            <Building className="h-12 w-12 text-amber-400" />
          </div>
        </div>
      </div>

      {/* Key Performance Indicators - Now Clickable */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card 
          className="border-l-4 border-l-emerald-500 bg-gradient-to-br from-emerald-50 to-white cursor-pointer hover:shadow-lg transition-shadow"
          onClick={handleRevenueClick}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Total Revenue</CardTitle>
            <DollarSign className="h-5 w-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">{formatCurrency(metrics.totalRevenue)}</div>
            <p className="text-xs text-emerald-600">Click to view revenue reports</p>
          </CardContent>
        </Card>

        <Card 
          className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white cursor-pointer hover:shadow-lg transition-shadow"
          onClick={handleClientsClick}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Registered Clients</CardTitle>
            <Users className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{metrics.activeClients}</div>
            <p className="text-xs text-blue-600">Click to manage clients</p>
          </CardContent>
        </Card>

        <Card 
          className="border-l-4 border-l-amber-500 bg-gradient-to-br from-amber-50 to-white cursor-pointer hover:shadow-lg transition-shadow"
          onClick={handleOrdersClick}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-700">Pending Orders</CardTitle>
            <FileText className="h-5 w-5 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">{metrics.pendingOrders}</div>
            <p className="text-xs text-amber-600">Click to view orders</p>
          </CardContent>
        </Card>

        <Card 
          className="border-l-4 border-l-red-500 bg-gradient-to-br from-red-50 to-white cursor-pointer hover:shadow-lg transition-shadow"
          onClick={handleInvoicesClick}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-700">Unpaid Invoices</CardTitle>
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">{formatCurrency(metrics.unpaidAmount)}</div>
            <p className="text-xs text-red-600">Click to manage invoices</p>
          </CardContent>
        </Card>
      </div>

      {/* Legal Escalation Alert - Now Clickable */}
      {legalEscalationCandidates.length > 0 && (
        <Card className="border-l-4 border-l-red-600 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-800">
              <Gavel className="h-5 w-5" />
              <span>Legal Escalation Required</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700 mb-4">
              {legalEscalationCandidates.length} invoice(s) overdue by 90+ days require escalation to Daniel Attorneys.
            </p>
            <Button 
              className="bg-red-600 hover:bg-red-700"
              onClick={handleLegalEscalationClick}
            >
              <Scale className="h-4 w-4 mr-2" />
              Escalate to Legal
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Invoice Management */}
        <Card className="shadow-lg">
          <CardHeader className="bg-slate-50 border-b">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-slate-700" />
                <span>Invoice Management</span>
              </div>
              <Button 
                size="sm" 
                onClick={() => setIsCreateInvoiceOpen(true)}
                className="bg-slate-900 hover:bg-slate-800"
              >
                <Plus className="h-4 w-4 mr-1" />
                Create Invoice
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {invoices.slice(0, 10).map((invoice) => (
                <div 
                  key={invoice.id} 
                  className="flex justify-between items-center p-4 hover:bg-gray-50 border-b last:border-b-0 cursor-pointer"
                  onClick={() => navigate(`/dashboard/invoices`)}
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-slate-900">{invoice.customers?.name}</p>
                      <span className="text-sm text-slate-500">#{invoice.reference}</span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <p className="text-sm text-slate-600">
                        {format(new Date(invoice.issue_date), 'MMM dd, yyyy')}
                      </p>
                      {invoice.days_overdue && invoice.days_overdue > 0 && (
                        <span className="text-sm text-red-600 font-medium">
                          {invoice.days_overdue} days overdue
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-bold text-slate-900">{formatCurrency(Number(invoice.balance_due))}</p>
                    {getStatusBadge(invoice.status, Number(invoice.balance_due))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Client Management */}
        <Card className="shadow-lg">
          <CardHeader className="bg-slate-50 border-b">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-slate-700" />
                <span>Client Portfolio</span>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={handleClientsClick}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Client
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {customers.slice(0, 10).map((customer) => (
                <div 
                  key={customer.id} 
                  className="flex justify-between items-center p-4 hover:bg-gray-50 border-b last:border-b-0 cursor-pointer"
                  onClick={() => navigate(`/dashboard/clients`)}
                >
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">{customer.name}</p>
                    <p className="text-sm text-slate-600">
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

        {/* Orders & Projects Management */}
        <Card className="shadow-lg">
          <CardHeader className="bg-slate-50 border-b">
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-slate-700" />
              <span>Active Projects</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div 
                className="flex justify-between items-center p-4 bg-amber-50 rounded-lg border border-amber-200 cursor-pointer hover:bg-amber-100 transition-colors"
                onClick={handleOrdersClick}
              >
                <div>
                  <p className="font-medium text-amber-900">Company Registration Services</p>
                  <p className="text-sm text-amber-700">15 clients pending CIPC processing</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-amber-100 text-amber-800">In Progress</Badge>
                  <Button size="sm" variant="outline">Manage</Button>
                </div>
              </div>
              <div 
                className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200 cursor-pointer hover:bg-green-100 transition-colors"
                onClick={handleOrdersClick}
              >
                <div>
                  <p className="font-medium text-green-900">SARS Compliance Services</p>
                  <p className="text-sm text-green-700">8 tax clearance certificates completed</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-100 text-green-800">Completed</Badge>
                  <Button size="sm" variant="outline">Review</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reports & Analytics */}
        <Card className="shadow-lg">
          <CardHeader className="bg-slate-50 border-b">
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-slate-700" />
              <span>Business Intelligence</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex-col"
                onClick={() => navigate('/dashboard/reports')}
              >
                <BarChart3 className="h-6 w-6 mb-2 text-blue-600" />
                <span className="text-sm">Revenue Analytics</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col"
                onClick={() => navigate('/dashboard/clients')}
              >
                <Users className="h-6 w-6 mb-2 text-green-600" />
                <span className="text-sm">Client Reports</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col"
                onClick={() => navigate('/dashboard/invoices')}
              >
                <DollarSign className="h-6 w-6 mb-2 text-amber-600" />
                <span className="text-sm">Collections Report</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col"
                onClick={handleLegalEscalationClick}
              >
                <Scale className="h-6 w-6 mb-2 text-red-600" />
                <span className="text-sm">Legal Escalations</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Communication & Notifications */}
      <Card className="shadow-lg">
        <CardHeader className="bg-slate-50 border-b">
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-slate-700" />
            <span>Client Communications & Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-64 overflow-y-auto mb-6">
            {notifications.slice(0, 8).map((notification) => (
              <div 
                key={notification.id} 
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => navigate('/dashboard/notifications')}
              >
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="font-medium text-sm text-slate-900">{notification.title}</p>
                    <p className="text-xs text-slate-600">{notification.message}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">
                    {notification.sent_at && format(new Date(notification.sent_at), 'MMM dd, HH:mm')}
                  </p>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Sent
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            <Button 
              variant="outline" 
              className="flex items-center justify-center space-x-2"
              onClick={() => navigate('/dashboard/notifications')}
            >
              <Mail className="h-4 w-4" />
              <span>Payment Reminders</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center justify-center space-x-2"
              onClick={() => navigate('/dashboard/support')}
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp Alerts</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center justify-center space-x-2"
              onClick={() => navigate('/dashboard/notifications')}
            >
              <Bell className="h-4 w-4" />
              <span>SMS Notifications</span>
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
