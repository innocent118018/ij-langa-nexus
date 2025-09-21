import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  Users, 
  FileText, 
  DollarSign, 
  ShoppingCart, 
  MessageSquare,
  Settings,
  Eye,
  Download,
  Upload,
  Mail,
  Phone,
  Building,
  Calendar,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Clock,
  LayoutDashboard
} from 'lucide-react';
import { ClientManagementModal } from '@/components/admin/ClientManagementModal';

const AdminClientPortalView = () => {
  const { user, loading } = useAuth();
  const { clientId } = useParams();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isManagementModalOpen, setIsManagementModalOpen] = useState(false);

  // Check if user is admin
  const { data: userRole } = useQuery({
    queryKey: ['user-role', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();
      if (error) throw error;
      return data.role;
    },
    enabled: !!user?.id,
  });

  const isAdmin = userRole && ['admin', 'super_admin', 'accountant', 'consultant'].includes(userRole);

  // Fetch client data
  const { data: clientData, isLoading: clientLoading } = useQuery({
    queryKey: ['admin-client-data', clientId],
    queryFn: async () => {
      if (!clientId) throw new Error('No client ID provided');
      
      // Get client user data
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', clientId)
        .single();

      if (userError) throw userError;

      // Get customer data
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .select('*')
        .eq('email', userData.email)
        .maybeSingle();

      // Get client orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', clientId)
        .order('created_at', { ascending: false });

      // Get client invoices
      const { data: invoicesData, error: invoicesError } = await supabase
        .from('invoices')
        .select('*')
        .eq('customer_id', customerData?.id)
        .order('issue_date', { ascending: false });

      // Get client documents
      const { data: documentsData, error: documentsError } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', clientId)
        .order('created_at', { ascending: false });

      // Get client notifications
      const { data: notificationsData, error: notificationsError } = await supabase
        .from('user_notifications')
        .select('*')
        .eq('user_id', clientId)
        .order('created_at', { ascending: false })
        .limit(10);

      return {
        user: userData,
        customer: customerData,
        orders: ordersData || [],
        invoices: invoicesData || [],
        documents: documentsData || [],
        notifications: notificationsData || []
      };
    },
    enabled: !!clientId && isAdmin,
  });

  if (loading || clientLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-4">Loading client data...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  if (!clientData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Client Not Found</h3>
            <p className="text-muted-foreground">The requested client could not be found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'paid': { variant: 'default' as const, icon: CheckCircle },
      'pending': { variant: 'secondary' as const, icon: Clock },
      'overdue': { variant: 'destructive' as const, icon: AlertCircle },
      'draft': { variant: 'outline' as const, icon: FileText },
    };
    
    const config = statusConfig[status.toLowerCase() as keyof typeof statusConfig] || 
                  { variant: 'outline' as const, icon: FileText };
    
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  const clientMetrics = {
    totalOrders: clientData.orders.length,
    pendingOrders: clientData.orders.filter(o => o.status === 'pending').length,
    totalInvoices: clientData.invoices.length,
    unpaidInvoices: clientData.invoices.filter(i => i.status !== 'paid').length,
    outstandingBalance: clientData.invoices
      .filter(i => i.status !== 'paid')
      .reduce((sum, i) => sum + (i.balance_due || 0), 0),
    totalDocuments: clientData.documents.length,
    unreadNotifications: clientData.notifications.filter(n => !n.is_read).length
  };

  const tabData = {
    overview: {
      title: 'Overview',
      icon: LayoutDashboard,
      content: (
        <div className="space-y-6">
          {/* Client Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Client Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                  <p className="font-medium">{clientData.user.full_name}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {clientData.user.email}
                  </p>
                </div>
                {clientData.user.phone && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {clientData.user.phone}
                    </p>
                  </div>
                )}
                {clientData.user.company_name && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Company</p>
                    <p className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      {clientData.user.company_name}
                    </p>
                  </div>
                )}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                  <p className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(clientData.user.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge variant={clientData.user.is_active ? "default" : "secondary"}>
                    {clientData.user.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{clientMetrics.totalOrders}</div>
                <p className="text-xs text-muted-foreground">
                  {clientMetrics.pendingOrders} pending
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Invoices</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{clientMetrics.totalInvoices}</div>
                <p className="text-xs text-muted-foreground">
                  {clientMetrics.unpaidInvoices} unpaid
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(clientMetrics.outstandingBalance)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Documents</CardTitle>
                <Upload className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{clientMetrics.totalDocuments}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    invoices: {
      title: 'Invoices & Payments',
      icon: DollarSign,
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Client Invoices</CardTitle>
            <CardDescription>All invoices for this client</CardDescription>
          </CardHeader>
          <CardContent>
            {clientData.invoices.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Reference</th>
                      <th className="text-left p-2">Date</th>
                      <th className="text-left p-2">Amount</th>
                      <th className="text-left p-2">Balance Due</th>
                      <th className="text-left p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientData.invoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b hover:bg-muted/50">
                        <td className="p-2 font-medium">{invoice.reference}</td>
                        <td className="p-2">{new Date(invoice.issue_date).toLocaleDateString()}</td>
                        <td className="p-2">{formatCurrency(invoice.invoice_amount)}</td>
                        <td className="p-2">{formatCurrency(invoice.balance_due)}</td>
                        <td className="p-2">{getStatusBadge(invoice.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No invoices found</p>
            )}
          </CardContent>
        </Card>
      )
    },
    orders: {
      title: 'Orders',
      icon: ShoppingCart,
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Client Orders</CardTitle>
            <CardDescription>All orders placed by this client</CardDescription>
          </CardHeader>
          <CardContent>
            {clientData.orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Order Date</th>
                      <th className="text-left p-2">Amount</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientData.orders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-muted/50">
                        <td className="p-2">{new Date(order.created_at).toLocaleDateString()}</td>
                        <td className="p-2">{formatCurrency(order.total_amount || 0)}</td>
                        <td className="p-2">{getStatusBadge(order.status)}</td>
                        <td className="p-2">{order.notes || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No orders found</p>
            )}
          </CardContent>
        </Card>
      )
    },
    documents: {
      title: 'Documents',
      icon: FileText,
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Client Documents</CardTitle>
            <CardDescription>All documents for this client</CardDescription>
          </CardHeader>
          <CardContent>
            {clientData.documents.length > 0 ? (
              <div className="space-y-4">
                {clientData.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <h4 className="font-medium">{doc.file_name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {doc.document_type} • {new Date(doc.created_at).toLocaleDateString()}
                        </p>
                        {doc.description && (
                          <p className="text-sm text-muted-foreground mt-1">{doc.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{doc.category}</Badge>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No documents found</p>
            )}
          </CardContent>
        </Card>
      )
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Client Portal: {clientData.user.full_name}
          </h1>
          <p className="text-muted-foreground">
            Administrative view of client's portal data
          </p>
        </div>
        <Button onClick={() => setIsManagementModalOpen(true)}>
          <Settings className="h-4 w-4 mr-2" />
          Manage Client
        </Button>
      </div>

      {/* Tab Selection */}
      <div className="border-b">
        <nav className="-mb-px flex space-x-8">
          {Object.entries(tabData).map(([key, tab]) => (
            <button
              key={key}
              onClick={() => setSelectedTab(key)}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === key
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4 inline mr-2" />
              {tab.title}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {tabData[selectedTab as keyof typeof tabData]?.content}

      {/* Management Modal */}
      <ClientManagementModal
        isOpen={isManagementModalOpen}
        onClose={() => setIsManagementModalOpen(false)}
        clientId={clientId}
        clientData={clientData.user}
      />
    </div>
  );
};

export default AdminClientPortalView;