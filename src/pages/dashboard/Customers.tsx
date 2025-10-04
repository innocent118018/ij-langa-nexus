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
import { useCustomers } from '@/hooks/useCustomers';
import CreateClientModal from '@/components/admin/CreateClientModal';

const Customers = () => {
  const { data: customers = [], isLoading, refetch } = useCustomers();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Customer
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="h-6 w-6 animate-spin text-gray-400 mr-2" />
            <span className="text-gray-500">Loading customers...</span>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-900">Name</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-900">Email</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-900">Phone</th>
                <th className="text-right px-6 py-3 text-sm font-medium text-gray-900">Credit Limit</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-900">Status</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    {searchTerm ? 'No customers found matching your search.' : 'No customers found. Click "New Customer" to add one.'}
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{customer.customer_name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">{customer.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">{customer.phone || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(customer.credit_limit)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge 
                        className={`${
                          customer.account_status === 'active' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-red-500 text-white'
                        }`}
                      >
                        {customer.account_status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="text-xs border-gray-300">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs border-gray-300">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <CreateClientModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          refetch();
          setIsCreateModalOpen(false);
        }}
      />
    </div>
  );
};

export default Customers;