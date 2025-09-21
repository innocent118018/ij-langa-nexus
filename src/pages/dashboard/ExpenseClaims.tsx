import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Wallet, Plus, Search, Eye, Edit, Check, X } from 'lucide-react';

const ExpenseClaims = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const claims = [
    {
      id: 'EXP-2025-001',
      employee: 'John Smith',
      date: '2025-01-18',
      description: 'Client meeting travel expenses',
      amount: 750.50,
      status: 'Pending',
      category: 'Travel'
    },
    {
      id: 'EXP-2025-002',
      employee: 'Jane Doe',
      date: '2025-01-17',
      description: 'Office supplies purchase',
      amount: 325.75,
      status: 'Approved',
      category: 'Office Supplies'
    },
    {
      id: 'EXP-2025-003',
      employee: 'Mike Johnson',
      date: '2025-01-16',
      description: 'Client lunch meeting',
      amount: 850.00,
      status: 'Rejected',
      category: 'Entertainment'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusColors = {
      Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Approved: 'bg-green-100 text-green-800 border-green-200',
      Rejected: 'bg-red-100 text-red-800 border-red-200',
      Paid: 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return <Badge className={statusColors[status as keyof typeof statusColors] || statusColors.Pending}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Expense Claims</h1>
          <p className="text-slate-600">Manage employee expense claims and reimbursements</p>
        </div>
        <div className="flex space-x-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Claim
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Claims</p>
                <p className="text-2xl font-bold text-yellow-900">1</p>
                <p className="text-xs text-gray-500 mt-1">{formatCurrency(750.50)} total</p>
              </div>
              <Wallet className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved Claims</p>
                <p className="text-2xl font-bold text-green-900">1</p>
                <p className="text-xs text-gray-500 mt-1">{formatCurrency(325.75)} total</p>
              </div>
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month Total</p>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(1926.25)}</p>
                <p className="text-xs text-gray-500 mt-1">All claims combined</p>
              </div>
              <Wallet className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected Claims</p>
                <p className="text-2xl font-bold text-red-900">1</p>
                <p className="text-xs text-gray-500 mt-1">{formatCurrency(850.00)} total</p>
              </div>
              <X className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search expense claims..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expense Claims</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">Claim ID</th>
                  <th className="text-left p-4 font-medium text-gray-900">Employee</th>
                  <th className="text-left p-4 font-medium text-gray-900">Date</th>
                  <th className="text-left p-4 font-medium text-gray-900">Description</th>
                  <th className="text-left p-4 font-medium text-gray-900">Category</th>
                  <th className="text-right p-4 font-medium text-gray-900">Amount</th>
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {claims.map((claim) => (
                  <tr key={claim.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{claim.id}</td>
                    <td className="p-4">{claim.employee}</td>
                    <td className="p-4">{claim.date}</td>
                    <td className="p-4">{claim.description}</td>
                    <td className="p-4">
                      <Badge variant="outline">{claim.category}</Badge>
                    </td>
                    <td className="p-4 text-right font-medium">{formatCurrency(claim.amount)}</td>
                    <td className="p-4">{getStatusBadge(claim.status)}</td>
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

export default ExpenseClaims;