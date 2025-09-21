
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Search,
  Plus,
  Users,
  FileText,
  Settings,
  BarChart,
  Building2,
  Calendar,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {
  const { invoices, customers } = useDashboardData();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Work and Case Accounts');
  const navigate = useNavigate();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusBadge = (balance: number) => {
    if (balance === 0) {
      return <Badge className="bg-green-100 text-green-800 border-green-200">Paid</Badge>;
    } else if (balance > 0) {
      return <Badge className="bg-red-100 text-red-800 border-red-200">Overdue</Badge>;
    } else {
      return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Credit</Badge>;
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sidebarCategories = [
    { name: 'Summary', icon: BarChart, count: null },
    { name: 'Work and Case Accounts', icon: Users, count: customers.length },
    { name: 'Receivables', icon: DollarSign, count: 245 },
    { name: 'Payables', icon: AlertCircle, count: 78 },
    { name: 'Trust Accounts', icon: Building2, count: 156 },
    { name: 'Safe Custody', icon: FileText, count: 89 },
    { name: 'Online Conveyancing', icon: Calendar, count: 23 },
    { name: 'Trust Reconciliations', icon: Settings, count: 12 },
    { name: 'Correspondence', icon: FileText, count: 456 },
    { name: 'Credit Control', icon: AlertCircle, count: 67 },
    { name: 'Lead Incentive', icon: Users, count: 34 },
    { name: 'Secretary Routine', icon: Settings, count: 89 },
    { name: 'Disbursements', icon: DollarSign, count: 123 }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-slate-900">IJ Langa Consulting</h1>
          <p className="text-sm text-gray-500">Practice</p>
        </div>

        {/* Navigation Categories */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4 space-y-1">
            {sidebarCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                    activeCategory === category.name
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-4 w-4" />
                    <span>{category.name}</span>
                  </div>
                  {category.count !== null && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">Summary</Button>
              <Button variant="outline" size="sm">Assignments</Button>
              <Button variant="outline" size="sm">Registry</Button>
              <Button variant="outline" size="sm">Sandbox</Button>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="default" 
                size="sm"
                onClick={() => navigate('/dashboard/clients')}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Customer
              </Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold text-gray-900">{activeCategory}</h2>
              <Badge variant="outline">{filteredCustomers.length} Active Accounts</Badge>
            </div>
            <div className="text-sm text-gray-500">
              Account Representative: IJ Langa
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto">
          <Card className="m-6 border-0 shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Outstanding Balance
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Account Representative
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCustomers.map((customer) => {
                      const balance = Number(customer.accounts_receivable) || 0;
                      return (
                        <tr 
                          key={customer.id} 
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => navigate(`/dashboard/clients?client=${customer.id}`)}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8">
                                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                  <span className="text-xs font-medium text-gray-600">
                                    {customer.name.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">
                                  {customer.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {customer.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className={`text-sm font-medium ${
                              balance > 0 ? 'text-red-600' : 
                              balance < 0 ? 'text-orange-600' : 
                              'text-green-600'
                            }`}>
                              {formatCurrency(Math.abs(balance))}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            IJ Langa
                          </td>
                          <td className="px-6 py-4">
                            {getStatusBadge(balance)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
