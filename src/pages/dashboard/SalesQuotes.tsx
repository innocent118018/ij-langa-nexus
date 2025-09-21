import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Edit2, Eye, ChevronRight, Search, Plus } from 'lucide-react';
import { useSalesQuotes } from '@/hooks/useSalesQuotes';

const SalesQuotes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { quotes, isLoading } = useSalesQuotes();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      Active: 'bg-green-500 text-white',
      Accepted: 'bg-blue-500 text-white', 
      Expired: 'bg-red-500 text-white'
    };
    return (
      <Badge className={`${statusStyles[status as keyof typeof statusStyles] || 'bg-gray-500 text-white'} px-3 py-1 rounded`}>
        {status}
      </Badge>
    );
  };

  const filteredQuotes = quotes.filter(quote =>
    quote.quote_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading sales quotes...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold text-gray-800">Sales Quotes</h1>
            <Badge variant="secondary" className="bg-gray-100 text-gray-600">
              {filteredQuotes.length}
            </Badge>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              New Sales Quote
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="text-gray-600">
              <ChevronRight className="h-4 w-4 mr-1" />
              Advanced Queries
            </Button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button className="bg-gray-600 hover:bg-gray-700 text-white">
              Search
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gray-50 px-6 py-3 border-b">
            <div className="grid grid-cols-7 gap-4 text-sm font-medium text-gray-600">
              <div>Issue date</div>
              <div>Reference</div>
              <div>Customer</div>
              <div>Description</div>
              <div className="text-right">Amount</div>
              <div>Status</div>
              <div className="text-center">Actions</div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredQuotes.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                {searchTerm ? 'No quotes found matching your search.' : 'No sales quotes found.'}
              </div>
            ) : (
              filteredQuotes.map((quote) => (
                <div key={quote.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="grid grid-cols-7 gap-4 items-center">
                    <div className="text-sm text-gray-900">
                      {formatDate(quote.issue_date)}
                    </div>
                    <div className="text-sm text-gray-900 font-mono">
                      {quote.quote_number}
                    </div>
                    <div className="text-sm text-gray-900">
                      {quote.customer_name}
                    </div>
                    <div className="text-sm text-gray-900 max-w-xs truncate" title={quote.description}>
                      {quote.description}
                    </div>
                    <div className="text-sm text-gray-900 text-right font-medium">
                      {formatCurrency(quote.total_amount)}
                    </div>
                    <div>
                      {getStatusBadge(quote.status)}
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                          <Edit2 className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SalesQuotes;