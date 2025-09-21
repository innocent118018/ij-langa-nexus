import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Receipt, 
  Plus, 
  Search, 
  Filter,
  Download,
  Eye,
  Edit
} from 'lucide-react';

const Receipts = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const receipts = [
    {
      id: 'REC-2025-001',
      date: '2025-01-20',
      customer: 'ABC Company Ltd',
      amount: 15500.00,
      paymentMethod: 'Bank Transfer',
      reference: 'INV-2025-001',
      status: 'Cleared'
    },
    {
      id: 'REC-2025-002',
      date: '2025-01-19',
      customer: 'XYZ Corporation',
      amount: 8750.50,
      paymentMethod: 'Cash',
      reference: 'INV-2025-002',
      status: 'Pending'
    },
    {
      id: 'REC-2025-003',
      date: '2025-01-18',
      customer: 'DEF Enterprises',
      amount: 22300.75,
      paymentMethod: 'Credit Card',
      reference: 'INV-2025-003',
      status: 'Cleared'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusColors = {
      Cleared: 'bg-green-100 text-green-800 border-green-200',
      Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Failed: 'bg-red-100 text-red-800 border-red-200'
    };
    return <Badge className={statusColors[status as keyof typeof statusColors] || statusColors.Pending}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Receipts</h1>
          <p className="text-slate-600">Track and manage payment receipts</p>
        </div>
        <div className="flex space-x-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Receipt
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Receipts Today</p>
                <p className="text-2xl font-bold text-green-900">{formatCurrency(46551.25)}</p>
              </div>
              <Receipt className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Receipts</p>
                <p className="text-2xl font-bold text-yellow-900">1</p>
              </div>
              <Receipt className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(387250.80)}</p>
              </div>
              <Receipt className="h-8 w-8 text-blue-600" />
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
                placeholder="Search receipts..." 
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
          <CardTitle>Receipt History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">Receipt ID</th>
                  <th className="text-left p-4 font-medium text-gray-900">Date</th>
                  <th className="text-left p-4 font-medium text-gray-900">Customer</th>
                  <th className="text-right p-4 font-medium text-gray-900">Amount</th>
                  <th className="text-left p-4 font-medium text-gray-900">Payment Method</th>
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {receipts.map((receipt) => (
                  <tr key={receipt.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{receipt.id}</td>
                    <td className="p-4">{receipt.date}</td>
                    <td className="p-4">{receipt.customer}</td>
                    <td className="p-4 text-right font-medium">{formatCurrency(receipt.amount)}</td>
                    <td className="p-4">{receipt.paymentMethod}</td>
                    <td className="p-4">{getStatusBadge(receipt.status)}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
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

export default Receipts;