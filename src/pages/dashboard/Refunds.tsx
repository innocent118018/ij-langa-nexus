
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  RotateCcw, 
  Search, 
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  User,
  Filter,
  RefreshCw
} from 'lucide-react';

const Refunds = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock refund data
  const refundRequests = [
    {
      id: 'REF001',
      customerName: 'Global Business Solutions',
      invoiceRef: '20202595',
      amount: 2978.50,
      reason: 'Service not commenced',
      requestDate: '2025-01-15',
      status: 'Pending',
      type: 'Full Refund'
    },
    {
      id: 'REF002',
      customerName: 'TECHLOGIX',
      invoiceRef: '20202594',
      amount: 345.00,
      reason: 'Duplicate payment',
      requestDate: '2025-01-10',
      status: 'Approved',
      type: 'Duplicate Payment'
    },
    {
      id: 'REF003',
      customerName: 'Suzan Ramapulane',
      invoiceRef: '20202588',
      amount: 1621.86,
      reason: 'Service cancellation',
      requestDate: '2025-01-08',
      status: 'Rejected',
      type: 'Cancellation'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'Rejected':
        return <Badge className="bg-red-100 text-red-800"><AlertTriangle className="h-3 w-3 mr-1" />Rejected</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'Processing':
        return <Badge className="bg-blue-100 text-blue-800"><RefreshCw className="h-3 w-3 mr-1" />Processing</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Refunds & Cancellations</h1>
          <p className="text-slate-600">Manage refund requests and service cancellations</p>
        </div>
        <Button className="bg-slate-900 hover:bg-slate-800">
          <RotateCcw className="h-4 w-4 mr-2" />
          Process Refund
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search refunds by customer name or invoice reference..." 
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
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-slate-900">{refundRequests.length}</p>
              </div>
              <RotateCcw className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Amount</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {formatCurrency(refundRequests.filter(r => r.status === 'Pending').reduce((sum, r) => sum + r.amount, 0))}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved This Month</p>
                <p className="text-2xl font-bold text-green-900">
                  {refundRequests.filter(r => r.status === 'Approved').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Refunded</p>
                <p className="text-2xl font-bold text-blue-900">
                  {formatCurrency(refundRequests.filter(r => r.status === 'Approved').reduce((sum, r) => sum + r.amount, 0))}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Refunds Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <RotateCcw className="h-5 w-5" />
            <span>Refund Requests</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">Refund ID</th>
                  <th className="text-left p-4 font-medium text-gray-900">Customer</th>
                  <th className="text-left p-4 font-medium text-gray-900">Invoice Ref</th>
                  <th className="text-left p-4 font-medium text-gray-900">Amount</th>
                  <th className="text-left p-4 font-medium text-gray-900">Reason</th>
                  <th className="text-left p-4 font-medium text-gray-900">Request Date</th>
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {refundRequests.map((refund) => (
                  <tr key={refund.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <span className="font-medium text-blue-600">#{refund.id}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-slate-900">{refund.customerName}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-medium">{refund.invoiceRef}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-red-600">{formatCurrency(refund.amount)}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-gray-600">{refund.reason}</span>
                    </td>
                    <td className="p-4 text-sm">{refund.requestDate}</td>
                    <td className="p-4">
                      {getStatusBadge(refund.status)}
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        {refund.status === 'Pending' && (
                          <>
                            <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700">
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                              Reject
                            </Button>
                          </>
                        )}
                        <Button size="sm" variant="ghost">
                          View
                        </Button>
                      </div>
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

export default Refunds;
