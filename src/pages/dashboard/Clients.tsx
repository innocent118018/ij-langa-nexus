
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { 
  Users, 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  Building,
  DollarSign,
  Filter,
  Edit,
  Eye,
  FileText
} from 'lucide-react';
import { useDashboardData } from '@/hooks/useDashboardData';
import EditClientModal from '@/components/clients/EditClientModal';
import { useNavigate } from 'react-router-dom';

interface Customer {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  status: string | null;
  accounts_receivable: number;
}

const Clients = () => {
  const { customers } = useDashboardData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusBadge = (status: string, balance: number) => {
    if (balance < 0) {
      return <Badge className="bg-blue-100 text-blue-800">Overpaid</Badge>;
    } else if (balance > 0) {
      return <Badge className="bg-red-100 text-red-800">Unpaid</Badge>;
    }
    return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClient = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsEditModalOpen(true);
  };

  const handleViewDocuments = (customer: Customer) => {
    // Navigate to documents page filtered by user
    navigate(`/dashboard/documents?user=${customer.email}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Client Management</h1>
            <p className="text-slate-600">Manage and monitor all client accounts</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add New Client
            </Button>
            <Button className="bg-slate-900 hover:bg-slate-800">
              <FileText className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search clients by name or email..." 
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Clients</p>
                  <p className="text-2xl font-bold text-slate-900">{customers.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
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
                </div>
                <DollarSign className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Clients</p>
                  <p className="text-2xl font-bold text-green-900">
                    {customers.filter(c => c.status === 'Active').length}
                  </p>
                </div>
                <Building className="h-8 w-8 text-green-600" />
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
                </div>
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Clients Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>All Clients ({filteredCustomers.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-900">Client Name</th>
                    <th className="text-left p-4 font-medium text-gray-900">Contact</th>
                    <th className="text-left p-4 font-medium text-gray-900">Accounts Receivable</th>
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
                      <td className="p-4">
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
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditClient(customer)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewDocuments(customer)}
                          >
                            <Eye className="h-4 w-4" />
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

        <EditClientModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          customer={selectedCustomer}
        />
      </div>
    </DashboardLayout>
  );
};

export default Clients;
