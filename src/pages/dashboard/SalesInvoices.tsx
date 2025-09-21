import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useSalesInvoices, SalesInvoice } from '@/hooks/useSalesInvoices';
import { format } from 'date-fns';

export default function SalesInvoices() {
  const [searchTerm, setSearchTerm] = useState('');
  const { invoices, isLoading } = useSalesInvoices();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(amount).replace('ZAR', 'R');
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'M/d/yyyy');
  };

  const getStatusBadge = (status: string, balance: number) => {
    if (balance === 0 && status === 'Paid') {
      return <Badge className="bg-green-500 text-white hover:bg-green-600">Paid in full</Badge>;
    } else if (balance < 0) {
      return <Badge className="bg-blue-500 text-white hover:bg-blue-600">Overpaid</Badge>;
    } else if (status === 'Overdue') {
      return <Badge className="bg-red-500 text-white hover:bg-red-600">Overdue</Badge>;
    } else if (status === 'Unpaid') {
      return <Badge className="bg-orange-500 text-white hover:bg-orange-600">Coming due</Badge>;
    }
    return <Badge variant="secondary">{status}</Badge>;
  };

  const filteredInvoices = invoices.filter((invoice: any) =>
    invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (invoice.customers?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <p className="text-muted-foreground">Loading sales invoices...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              Sales Invoices 
              <span className="text-sm font-normal text-muted-foreground bg-muted px-2 py-1 rounded">
                {filteredInvoices.length}
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Sales Invoice
            </Button>
            <Button variant="outline">
              <ChevronRight className="mr-2 h-4 w-4" />
              Advanced Queries
            </Button>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search" 
                className="pl-8 w-64" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              Search
            </Button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex items-center gap-4 p-4 bg-muted/20 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Where</span>
            <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
              Balance due
            </Badge>
            <span className="text-sm text-muted-foreground">is less than</span>
            <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
              0
            </Badge>
          </div>
        </div>

        {/* Table Section */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead className="w-12"></TableHead>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Issue date</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-right">Invoice Amount</TableHead>
                  <TableHead className="text-right">Balance due</TableHead>
                  <TableHead className="text-center">Days to Due Date</TableHead>
                  <TableHead className="text-center">Days overdue</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice: any) => (
                  <TableRow key={invoice.id} className="hover:bg-muted/50">
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="w-4 h-4 rounded border"></div>
                    </TableCell>
                    <TableCell>{formatDate(invoice.issue_date)}</TableCell>
                    <TableCell className="font-medium">{invoice.invoice_number}</TableCell>
                    <TableCell>{invoice.customers?.name || 'Unknown Customer'}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(invoice.total_amount)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      <span className={invoice.balance_due === 0 ? 'text-blue-600' : 
                                     invoice.balance_due < 0 ? 'text-blue-600' : 'text-foreground'}>
                        {formatCurrency(Math.abs(invoice.balance_due))}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {invoice.days_to_due_date || ''}
                    </TableCell>
                    <TableCell className="text-center">
                      {invoice.days_overdue > 0 ? invoice.days_overdue : ''}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(invoice.status, invoice.balance_due)}
                    </TableCell>
                  </TableRow>
                ))}
                {filteredInvoices.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={11} className="text-center py-8 text-muted-foreground">
                      No sales invoices found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}