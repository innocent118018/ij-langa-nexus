import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/hooks/useApiClient';
import { 
  FileText, 
  DollarSign, 
  Calendar, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Search,
  Download,
  Eye
} from 'lucide-react';

interface Invoice {
  id: string;
  reference: string;
  issue_date: string;
  invoice_amount: number;
  balance_due: number;
  status: string;
  days_overdue?: number;
  customers?: {
    name: string;
  };
}

const MyInvoices = () => {
  const { user, loading } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Fetch user's invoices
  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ['user-invoices', user?.id],
    queryFn: async () => {
      return await apiClient.getUserData('invoices');
    },
    enabled: !!user?.id,
  });

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-4">Loading invoices...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Filter invoices based on search term and status
  const filteredInvoices = invoices.filter((invoice: Invoice) => {
    const matchesSearch = invoice.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Calculate totals
  const totalAmount = invoices.reduce((sum: number, invoice: Invoice) => sum + (invoice.invoice_amount || 0), 0);
  const totalOutstanding = invoices
    .filter((invoice: Invoice) => invoice.status === 'Unpaid' || (invoice.balance_due && invoice.balance_due > 0))
    .reduce((sum: number, invoice: Invoice) => sum + (invoice.balance_due || 0), 0);
  const overdue = invoices.filter((invoice: Invoice) => invoice.days_overdue && invoice.days_overdue > 0).length;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'unpaid':
        return 'bg-red-100 text-red-800';
      case 'overdue':
        return 'bg-orange-100 text-orange-800';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (invoice: Invoice) => {
    if (invoice.status === 'Paid') {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    } else if (invoice.days_overdue && invoice.days_overdue > 0) {
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    } else {
      return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const handlePayInvoice = (invoice: Invoice) => {
    // This would typically redirect to a payment gateway
    console.log('Pay invoice:', invoice.id);
    // For now, we'll just show an alert
    alert(`Payment for invoice ${invoice.reference} would be processed here.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Invoices</h1>
        <p className="text-muted-foreground">
          View and manage your invoices and payments
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{invoices.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R{totalAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">All invoices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">R{totalOutstanding.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Unpaid amount</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{overdue}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by invoice reference..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="partial">Partially Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Invoices List */}
      <div className="space-y-4">
        {filteredInvoices.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {searchTerm || statusFilter !== 'all' ? 'No Matching Invoices' : 'No Invoices'}
              </h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search criteria or filters.'
                  : 'You don\'t have any invoices yet.'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredInvoices.map((invoice: Invoice) => (
            <Card key={invoice.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(invoice)}
                    <div>
                      <CardTitle className="text-lg">{invoice.reference}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {invoice.customers?.name || 'Invoice'}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(invoice.status)}>
                    {invoice.status}
                    {invoice.days_overdue && invoice.days_overdue > 0 && (
                      <span className="ml-1">({invoice.days_overdue} days)</span>
                    )}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Issue Date</p>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">
                        {new Date(invoice.issue_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="font-bold text-lg">
                      R{invoice.invoice_amount?.toFixed(2) || '0.00'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Balance Due</p>
                    <p className={`font-bold text-lg ${
                      invoice.balance_due && invoice.balance_due > 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      R{invoice.balance_due?.toFixed(2) || '0.00'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    {invoice.balance_due && invoice.balance_due > 0 && (
                      <Button 
                        size="sm"
                        onClick={() => handlePayInvoice(invoice)}
                      >
                        Pay Now
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default MyInvoices;