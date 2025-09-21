import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { usePurchaseQuotes } from '@/hooks/usePurchaseData';
import { CreatePurchaseQuoteModal } from '@/components/modals/CreatePurchaseQuoteModal';

export default function PurchaseQuotes() {
  const { quotes, isLoading } = usePurchaseQuotes();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredQuotes = quotes.filter(quote =>
    quote.quote_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.suppliers?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Active':
        return 'secondary';
      case 'Accepted':
        return 'default';
      case 'Cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(amount);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading purchase quotes...</div>
        </div>
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Purchase Quotes</h1>
            <p className="text-muted-foreground">
              Request and manage supplier quotations for goods and services
            </p>
          </div>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Purchase Quote
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Purchase Quotes Overview</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search quotes..." 
                    className="pl-8 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quote #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuotes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      {searchTerm ? 'No quotes found matching your search.' : 'No purchase quotes found. Create your first quote to get started.'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredQuotes.map((quote) => (
                    <TableRow key={quote.id}>
                      <TableCell className="font-medium">{quote.quote_number}</TableCell>
                      <TableCell>{new Date(quote.request_date || quote.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>{quote.suppliers?.name || 'N/A'}</TableCell>
                      <TableCell className="max-w-xs truncate">{quote.description || 'No description'}</TableCell>
                      <TableCell>{formatCurrency(quote.total_amount)}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(quote.status)}>
                          {quote.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <CreatePurchaseQuoteModal
          open={showCreateModal}
          onOpenChange={setShowCreateModal}
        />
      </div>
    </DashboardLayout>
  );
}