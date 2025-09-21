import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  RefreshCw,
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

const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return <Badge className="bg-green-500 text-white">Paid</Badge>;
      case 'Unpaid':
        return <Badge className="bg-red-500 text-white">Unpaid</Badge>;
      case 'Overpaid':
        return <Badge className="bg-orange-500 text-white">Overpaid</Badge>;
      default:
        return <Badge className="bg-gray-500 text-white">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
          <RefreshCw className="h-4 w-4 text-gray-500" />
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="text-gray-600">
            ▷ Advanced Queries
          </Button>
          <div className="flex items-center space-x-2">
            <Input 
              placeholder="Search" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
            <Button variant="outline">
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* New Customer Button */}
      <div className="flex justify-start">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          New Customer
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-900">Name</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-gray-900">Accounts receivable</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-900">Status</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-900"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className={`text-sm font-medium ${
                    Number(customer.accounts_receivable) < 0 
                      ? 'text-orange-600' 
                      : Number(customer.accounts_receivable) > 0 
                        ? 'text-black' 
                        : 'text-blue-600'
                  }`}>
                    {Number(customer.accounts_receivable).toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(customer.status || 'Paid')}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="text-xs border-gray-300">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs border-gray-300">
                      View
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;