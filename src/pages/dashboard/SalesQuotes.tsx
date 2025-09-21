import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FileEdit, Plus, Search, Eye, Edit, Send, Download } from 'lucide-react';

const SalesQuotes = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const quotes = [
    {
      id: 'QUO-2025-001',
      date: '2025-01-20',
      customer: 'ABC Company Ltd',
      amount: 25750.00,
      validUntil: '2025-02-20',
      status: 'Sent',
      description: 'Legal consultation services'
    },
    {
      id: 'QUO-2025-002',
      date: '2025-01-19',
      customer: 'XYZ Corporation',
      amount: 18500.50,
      validUntil: '2025-02-19',
      status: 'Draft',
      description: 'Company registration package'
    },
    {
      id: 'QUO-2025-003',
      date: '2025-01-18',
      customer: 'DEF Enterprises',
      amount: 32200.75,
      validUntil: '2025-02-18',
      status: 'Accepted',
      description: 'Annual compliance services'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusColors = {
      Draft: 'bg-gray-100 text-gray-800 border-gray-200',
      Sent: 'bg-blue-100 text-blue-800 border-blue-200',
      Accepted: 'bg-green-100 text-green-800 border-green-200',
      Rejected: 'bg-red-100 text-red-800 border-red-200',
      Expired: 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return <Badge className={statusColors[status as keyof typeof statusColors] || statusColors.Draft}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Sales Quotes</h1>
          <p className="text-slate-600">Create and manage sales quotations</p>
        </div>
        <div className="flex space-x-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Quote
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Quote Value</p>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(76451.25)}</p>
                <p className="text-xs text-gray-500 mt-1">Active quotes</p>
              </div>
              <FileEdit className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Quotes</p>
                <p className="text-2xl font-bold text-yellow-900">1</p>
                <p className="text-xs text-gray-500 mt-1">Awaiting response</p>
              </div>
              <FileEdit className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Accepted Quotes</p>
                <p className="text-2xl font-bold text-green-900">1</p>
                <p className="text-xs text-gray-500 mt-1">{formatCurrency(32200.75)} value</p>
              </div>
              <FileEdit className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-purple-900">33%</p>
                <p className="text-xs text-gray-500 mt-1">Quote to order</p>
              </div>
              <FileEdit className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search quotes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quote Management</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">Quote ID</th>
                  <th className="text-left p-4 font-medium text-gray-900">Date</th>
                  <th className="text-left p-4 font-medium text-gray-900">Customer</th>
                  <th className="text-left p-4 font-medium text-gray-900">Description</th>
                  <th className="text-right p-4 font-medium text-gray-900">Amount</th>
                  <th className="text-left p-4 font-medium text-gray-900">Valid Until</th>
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((quote) => (
                  <tr key={quote.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{quote.id}</td>
                    <td className="p-4">{quote.date}</td>
                    <td className="p-4">{quote.customer}</td>
                    <td className="p-4">{quote.description}</td>
                    <td className="p-4 text-right font-medium">{formatCurrency(quote.amount)}</td>
                    <td className="p-4">{quote.validUntil}</td>
                    <td className="p-4">{getStatusBadge(quote.status)}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Send className="h-4 w-4" />
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

export default SalesQuotes;