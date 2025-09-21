import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  UserCheck, 
  Plus, 
  Search, 
  Filter,
  Mail,
  Phone,
  Building,
  Eye,
  Edit
} from 'lucide-react';
import { useDashboardData } from '@/hooks/useDashboardData';

const Customers = () => {
  const { customers } = useDashboardData();
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string, balance: number) => {
    if (balance < 0) {
      return <Badge className="bg-blue-100 text-blue-800">Credit</Badge>;
    } else if (balance > 0) {
      return <Badge className="bg-red-100 text-red-800">Outstanding</Badge>;
    }
    return <Badge className="bg-green-100 text-green-800">Current</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Customers</h1>
          <p className="text-slate-600">Manage your customer database and relationships</p>
        </div>
        <div className="flex space-x-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-slate-900">{customers.length}</p>
                <p className="text-xs text-gray-500 mt-1">Active accounts</p>
              </div>
              <UserCheck className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Outstanding Balance</p>
                <p className="text-2xl font-bold text-red-900">
                  {formatCurrency(customers.reduce((sum, customer) => {
                    const balance = Number(customer.accounts_receivable) || 0;
                    return sum + (balance > 0 ? balance : 0);
                  }, 0))}
                </p>
                <p className="text-xs text-gray-500 mt-1">Total receivables</p>
              </div>
              <Building className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Customers</p>
                <p className="text-2xl font-bold text-green-900">
                  {customers.filter(c => c.status === 'Active').length}
                </p>
                <p className="text-xs text-gray-500 mt-1">Currently engaged</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Credit Balance</p>
                <p className="text-2xl font-bold text-blue-900">
                  {formatCurrency(Math.abs(customers.reduce((sum, customer) => {
                    const balance = Number(customer.accounts_receivable) || 0;
                    return sum + (balance < 0 ? balance : 0);
                  }, 0)))}
                </p>
                <p className="text-xs text-gray-500 mt-1">Customer prepayments</p>
              </div>
              <Building className="h-8 w-8 text-blue-600" />
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
                placeholder="Search customers by name or email..." 
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
          <CardTitle className="flex items-center space-x-2">
            <UserCheck className="h-5 w-5" />
            <span>Customer Database ({filteredCustomers.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">Customer Name</th>
                  <th className="text-left p-4 font-medium text-gray-900">Contact Information</th>
                  <th className="text-right p-4 font-medium text-gray-900">Balance</th>
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-slate-900">{customer.name}</p>
                        <p className="text-sm text-slate-600">{customer.address}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        {customer.email && (
                          <div className="flex items-center space-x-2 text-sm">
                            <Mail className="h-3 w-3 text-gray-400" />
                            <span>{customer.email}</span>
                          </div>
                        )}
                        {customer.phone && (
                          <div className="flex items-center space-x-2 text-sm">
                            <Phone className="h-3 w-3 text-gray-400" />
                            <span>{customer.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <span className={`font-medium ${
                        Number(customer.accounts_receivable) < 0 
                          ? 'text-blue-600' 
                          : Number(customer.accounts_receivable) > 0 
                            ? 'text-red-600' 
                            : 'text-green-600'
                      }`}>
                        {formatCurrency(Number(customer.accounts_receivable))}
                      </span>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(customer.status || '', Number(customer.accounts_receivable))}
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

export default Customers;