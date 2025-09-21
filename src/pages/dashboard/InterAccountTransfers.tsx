import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeftRight, Plus, Search, Eye, Edit } from 'lucide-react';

const InterAccountTransfers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const transfers = [
    {
      id: 'TRF-2025-001',
      date: '2025-01-20',
      fromAccount: 'FNB Business Cheque',
      toAccount: 'Standard Bank Savings',
      amount: 50000.00,
      reference: 'Monthly savings transfer',
      status: 'Completed'
    },
    {
      id: 'TRF-2025-002',
      date: '2025-01-19',
      fromAccount: 'Petty Cash',
      toAccount: 'FNB Business Cheque',
      amount: 1500.00,
      reference: 'Cash deposit',
      status: 'Processing'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Inter Account Transfers</h1>
          <p className="text-slate-600">Transfer funds between your accounts</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Transfer
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search transfers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transfer History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">Transfer ID</th>
                  <th className="text-left p-4 font-medium text-gray-900">Date</th>
                  <th className="text-left p-4 font-medium text-gray-900">From Account</th>
                  <th className="text-left p-4 font-medium text-gray-900">To Account</th>
                  <th className="text-right p-4 font-medium text-gray-900">Amount</th>
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transfers.map((transfer) => (
                  <tr key={transfer.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{transfer.id}</td>
                    <td className="p-4">{transfer.date}</td>
                    <td className="p-4">{transfer.fromAccount}</td>
                    <td className="p-4">{transfer.toAccount}</td>
                    <td className="p-4 text-right font-medium">{formatCurrency(transfer.amount)}</td>
                    <td className="p-4">
                      <Badge className={transfer.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {transfer.status}
                      </Badge>
                    </td>
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

export default InterAccountTransfers;