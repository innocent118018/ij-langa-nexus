import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Landmark, 
  Plus, 
  Search, 
  Edit, 
  Eye,
  DollarSign,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

const BankCashAccounts = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const accounts = [
    {
      id: 1,
      name: 'FNB Business Cheque Account',
      type: 'Bank',
      accountNumber: '****1234',
      balance: 125450.50,
      currency: 'ZAR',
      status: 'Active',
      lastReconciled: '2025-01-15'
    },
    {
      id: 2,
      name: 'Standard Bank Savings',
      type: 'Bank',
      accountNumber: '****5678',
      balance: 89230.75,
      currency: 'ZAR',
      status: 'Active',
      lastReconciled: '2025-01-10'
    },
    {
      id: 3,
      name: 'Petty Cash',
      type: 'Cash',
      accountNumber: 'CASH-001',
      balance: 2500.00,
      currency: 'ZAR',
      status: 'Active',
      lastReconciled: '2025-01-18'
    },
    {
      id: 4,
      name: 'USD Business Account',
      type: 'Bank',
      accountNumber: '****9876',
      balance: 15650.25,
      currency: 'USD',
      status: 'Active',
      lastReconciled: '2025-01-12'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusColors = {
      Active: 'bg-green-100 text-green-800 border-green-200',
      Inactive: 'bg-gray-100 text-gray-800 border-gray-200',
      Closed: 'bg-red-100 text-red-800 border-red-200'
    };
    return <Badge className={statusColors[status as keyof typeof statusColors] || statusColors.Active}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Bank & Cash Accounts</h1>
          <p className="text-slate-600">Manage your banking and cash accounts</p>
        </div>
        <div className="flex space-x-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Account
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Balance (ZAR)</p>
                <p className="text-2xl font-bold text-slate-900">{formatCurrency(217181.25)}</p>
                <p className="text-xs text-gray-500 mt-1">Across all ZAR accounts</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Accounts</p>
                <p className="text-2xl font-bold text-green-900">{accounts.filter(acc => acc.status === 'Active').length}</p>
                <p className="text-xs text-gray-500 mt-1">Ready for transactions</p>
              </div>
              <Landmark className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Change</p>
                <p className="text-2xl font-bold text-green-900">+12.4%</p>
                <p className="text-xs text-gray-500 mt-1">Compared to last month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search accounts by name or number..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accounts Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Landmark className="h-5 w-5" />
            <span>All Accounts ({accounts.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">Account Name</th>
                  <th className="text-left p-4 font-medium text-gray-900">Type</th>
                  <th className="text-left p-4 font-medium text-gray-900">Account Number</th>
                  <th className="text-right p-4 font-medium text-gray-900">Balance</th>
                  <th className="text-left p-4 font-medium text-gray-900">Last Reconciled</th>
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) => (
                  <tr key={account.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium text-slate-900">{account.name}</div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">{account.type}</Badge>
                    </td>
                    <td className="p-4 text-gray-600">{account.accountNumber}</td>
                    <td className="p-4 text-right">
                      <span className="font-medium">
                        {account.currency === 'ZAR' ? formatCurrency(account.balance) : `$${account.balance.toFixed(2)}`}
                      </span>
                      <div className="text-xs text-gray-500">{account.currency}</div>
                    </td>
                    <td className="p-4 text-gray-600">{account.lastReconciled}</td>
                    <td className="p-4">{getStatusBadge(account.status)}</td>
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

export default BankCashAccounts;