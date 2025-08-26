
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PaymentButton } from '@/components/payments/PaymentButton';
import { 
  DollarSign, 
  Search, 
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Filter,
  Download
} from 'lucide-react';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useAuth } from '@/hooks/useAuth';

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { invoices } = useDashboardData();
  const { user } = useAuth();
  
  // Check if user is admin
  const adminEmails = [
    'info@ijlanga.co.za',
    'orders@ijlanga.co.za', 
    'billings@ijlanga.co.za',
    'correspondence@ijlanga.co.za',
    'ij.langa11@gmail.com'
  ];
  const isAdmin = adminEmails.includes(user?.email?.toLowerCase() || '');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusBadge = (status: string, balanceDue: number, daysOverdue: number = 0) => {
    if (status === 'Paid in full' || balanceDue === 0) {
      return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Paid</Badge>;
    } else if (status === 'Overdue' || daysOverdue > 0) {
      return <Badge className="bg-red-100 text-red-800"><AlertTriangle className="h-3 w-3 mr-1" />Overdue</Badge>;
    } else if (balanceDue < 0) {
      return <Badge className="bg-blue-100 text-blue-800"><TrendingUp className="h-3 w-3 mr-1" />Overpaid</Badge>;
    }
    return <Badge className="bg-amber-100 text-amber-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
  };

  // Filter invoices based on search term
  const filteredInvoices = invoices.filter(invoice => 
    invoice.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.customers?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate stats
  const totalInvoiced = invoices.reduce((sum, inv) => sum + Number(inv.invoice_amount || 0), 0);
  const totalOutstanding = invoices.reduce((sum, inv) => sum + Math.max(0, Number(inv.balance_due || 0)), 0);
  const overdueCount = invoices.filter(inv => inv.days_overdue && inv.days_overdue > 0).length;
  const paidCount = invoices.filter(inv => inv.status === 'Paid in full').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {isAdmin ? 'Invoice Management' : 'My Invoices'}
          </h1>
          <p className="text-slate-600">
            {isAdmin ? 'Manage invoices and track payment status' : 'View and pay your outstanding invoices'}
          </p>
        </div>
        {isAdmin && (
          <Button className="bg-slate-900 hover:bg-slate-800">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        )}
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search invoices by reference or customer..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Invoiced</p>
                <p className="text-2xl font-bold text-slate-900">
                  {formatCurrency(totalInvoiced)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Outstanding</p>
                <p className="text-2xl font-bold text-red-900">
                  {formatCurrency(totalOutstanding)}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue Invoices</p>
                <p className="text-2xl font-bold text-orange-900">{overdueCount}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Paid Invoices</p>
                <p className="text-2xl font-bold text-green-900">{paidCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>{isAdmin ? 'All Invoices' : 'My Invoices'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">Issue Date</th>
                  <th className="text-left p-4 font-medium text-gray-900">Reference</th>
                  {isAdmin && <th className="text-left p-4 font-medium text-gray-900">Customer</th>}
                  <th className="text-left p-4 font-medium text-gray-900">Amount</th>
                  <th className="text-left p-4 font-medium text-gray-900">Balance Due</th>
                  {isAdmin && <th className="text-left p-4 font-medium text-gray-900">Days Overdue</th>}
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 text-sm">{invoice.issue_date}</td>
                    <td className="p-4">
                      <span className="font-medium text-blue-600">#{invoice.reference}</span>
                    </td>
                    {isAdmin && (
                      <td className="p-4">
                        <span className="font-medium text-slate-900">{invoice.customers?.name}</span>
                      </td>
                    )}
                    <td className="p-4">
                      <span className="font-medium">{formatCurrency(Number(invoice.invoice_amount))}</span>
                    </td>
                    <td className="p-4">
                      <span className={`font-medium ${
                        Number(invoice.balance_due) < 0 ? 'text-blue-600' : 
                        Number(invoice.balance_due) > 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {formatCurrency(Number(invoice.balance_due))}
                      </span>
                    </td>
                    {isAdmin && (
                      <td className="p-4">
                        {invoice.days_overdue && invoice.days_overdue > 0 && (
                          <span className="text-red-600 font-medium">{invoice.days_overdue} days</span>
                        )}
                      </td>
                    )}
                    <td className="p-4">
                      {getStatusBadge(invoice.status, Number(invoice.balance_due), invoice.days_overdue)}
                    </td>
                    <td className="p-4">
                      {Number(invoice.balance_due) > 0 ? (
                        <PaymentButton
                          invoiceId={invoice.id}
                          amount={Number(invoice.balance_due)}
                          description={`Invoice ${invoice.reference}`}
                          className="text-xs px-3 py-1"
                        />
                      ) : (
                        <span className="text-sm text-gray-500">Paid</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Invoices;
