import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Plus, 
  Search, 
  Filter,
  Calendar,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const payments = [
    {
      id: 'PAY-2025-001',
      date: '2025-01-20',
      supplier: 'Office Supplies Co',
      amount: 5750.00,
      method: 'EFT',
      reference: 'PO-2025-001',
      status: 'Paid',
      dueDate: '2025-01-25'
    },
    {
      id: 'PAY-2025-002',
      date: '2025-01-19',
      supplier: 'Tech Solutions Ltd',
      amount: 25400.50,
      method: 'Bank Transfer',
      reference: 'INV-TS-1001',
      status: 'Pending',
      dueDate: '2025-01-22'
    },
    {
      id: 'PAY-2025-003',
      date: '2025-01-18',
      supplier: 'Marketing Agency',
      amount: 12800.00,
      method: 'Credit Card',
      reference: 'MA-Q1-2025',
      status: 'Processing',
      dueDate: '2025-01-20'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      Paid: { class: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle },
      Pending: { class: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock },
      Processing: { class: 'bg-blue-100 text-blue-800 border-blue-200', icon: Clock },
      Failed: { class: 'bg-red-100 text-red-800 border-red-200', icon: XCircle }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.Pending;
    return <Badge className={config.class}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Payments</h1>
          <p className="text-slate-600">Manage outgoing payments and supplier transactions</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Payment Run
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Payment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Paid Today</p>
                <p className="text-2xl font-bold text-red-900">{formatCurrency(43950.50)}</p>
              </div>
              <CreditCard className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                <p className="text-2xl font-bold text-yellow-900">2</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Due This Week</p>
                <p className="text-2xl font-bold text-orange-900">{formatCurrency(87500.25)}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month Total</p>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(245780.90)}</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search payments..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Schedule</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">Payment ID</th>
                  <th className="text-left p-4 font-medium text-gray-900">Date</th>
                  <th className="text-left p-4 font-medium text-gray-900">Supplier</th>
                  <th className="text-right p-4 font-medium text-gray-900">Amount</th>
                  <th className="text-left p-4 font-medium text-gray-900">Method</th>
                  <th className="text-left p-4 font-medium text-gray-900">Due Date</th>
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{payment.id}</td>
                    <td className="p-4">{payment.date}</td>
                    <td className="p-4">{payment.supplier}</td>
                    <td className="p-4 text-right font-medium">{formatCurrency(payment.amount)}</td>
                    <td className="p-4">{payment.method}</td>
                    <td className="p-4">{payment.dueDate}</td>
                    <td className="p-4">{getStatusBadge(payment.status)}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
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

export default Payments;