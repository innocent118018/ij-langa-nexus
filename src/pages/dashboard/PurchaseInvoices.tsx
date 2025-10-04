import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { usePurchaseInvoices } from '@/hooks/usePurchaseData';
import { CreatePurchaseInvoiceModal } from '@/components/modals/CreatePurchaseInvoiceModal';

export default function PurchaseInvoices() {
  const { invoices, isLoading } = usePurchaseInvoices();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredInvoices = invoices.filter(invoice =>
    invoice.invoice_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.suppliers?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'default';
      case 'Unpaid':
        return 'secondary';
      case 'Overdue':
        return 'destructive';
      case 'Partially Paid':
        return 'outline';
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
          <div className="text-lg">Loading purchase invoices...</div>
        </div>
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Purchase Invoices</h1>
            <p className="text-muted-foreground">
              Track supplier invoices and manage accounts payable
            </p>
          </div>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Purchase Invoice
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Purchase Invoices Overview</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search invoices..." 
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
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      {searchTerm ? 'No invoices found matching your search.' : 'No purchase invoices found. Create your first invoice to get started.'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.invoice_number}</TableCell>
                      <TableCell>{new Date(invoice.invoice_date).toLocaleDateString()}</TableCell>
                      <TableCell>{invoice.suppliers?.name || 'N/A'}</TableCell>
                      <TableCell>{formatCurrency(invoice.total_amount)}</TableCell>
                      <TableCell>{invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : 'N/A'}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(invoice.status)}>
                          {invoice.status}
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

        <CreatePurchaseInvoiceModal
          open={showCreateModal}
          onOpenChange={setShowCreateModal}
        />
      </div>
    </DashboardLayout>
  );
}