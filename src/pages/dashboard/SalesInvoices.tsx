import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useSalesInvoices } from '@/hooks/useSalesInvoices';
import { format } from 'date-fns';

const formatCurrency = (amount: number) => {
  return `${amount.toLocaleString('en-ZA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

const formatDate = (dateString: string) => {
  return format(new Date(dateString), 'M/d/yyyy');
};

const getStatusBadge = (status: string, balanceDue: number) => {
  // Map database status to display status and colors
  if (status === 'Paid' && balanceDue === 0) {
    return <Badge className="bg-green-500 hover:bg-green-600 text-white">Paid in full</Badge>;
  }
  if (status === 'Paid' && balanceDue < 0) {
    return <Badge className="bg-blue-500 hover:bg-blue-600 text-white">Overpaid</Badge>;
  }
  if (status === 'Overdue') {
    return <Badge className="bg-red-500 hover:bg-red-600 text-white">Overdue</Badge>;
  }
  if (status === 'Unpaid' && balanceDue > 0) {
    return <Badge className="bg-orange-500 hover:bg-orange-600 text-white">Coming due</Badge>;
  }
  return <Badge variant="secondary">{status}</Badge>;
};

export default function SalesInvoices() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterByBalance, setFilterByBalance] = useState(false);
  const { invoices, isLoading } = useSalesInvoices();

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = !searchTerm || 
      invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBalanceFilter = !filterByBalance || invoice.balance_due < 0;
    
    return matchesSearch && matchesBalanceFilter;
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading sales invoices...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Sales Invoices</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <ChevronRight className="mr-2 h-4 w-4" />
              Advanced Queries
            </Button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search" 
                className="pl-10 w-64" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Sales Invoice
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch 
            id="balance-filter" 
            checked={filterByBalance}
            onCheckedChange={setFilterByBalance}
          />
          <Label htmlFor="balance-filter" className="text-sm">
            Where <span className="font-medium">Balance due</span> is less than <span className="font-medium">0</span>
          </Label>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="text-center w-12">{/* Icons */}</TableHead>
                  <TableHead className="text-center w-12">{/* Icons */}</TableHead>
                  <TableHead className="text-center w-12">{/* Icons */}</TableHead>
                  <TableHead>Issue date</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-right">Invoice Amount</TableHead>
                  <TableHead className="text-right">Balance due</TableHead>
                  <TableHead className="text-center">Days to Due Date</TableHead>
                  <TableHead className="text-center">Days overdue</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={11} className="text-center py-8 text-muted-foreground">
                      {searchTerm || filterByBalance ? 'No invoices match your search criteria.' : 'No sales invoices found.'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id} className="hover:bg-gray-50">
                      <TableCell className="text-center">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          📝
                        </Button>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button variant="outline" size="sm" className="text-xs px-2 py-1">
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button variant="outline" size="sm" className="text-xs px-2 py-1">
                          View
                        </Button>
                      </TableCell>
                      <TableCell>{formatDate(invoice.issue_date)}</TableCell>
                      <TableCell className="font-medium">{invoice.invoice_number}</TableCell>
                      <TableCell>{invoice.customer_name}</TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(invoice.total_amount)}
                      </TableCell>
                      <TableCell className="text-right font-medium text-blue-600">
                        {formatCurrency(invoice.balance_due)}
                      </TableCell>
                      <TableCell className="text-center">
                        {invoice.days_to_due_date || ''}
                      </TableCell>
                      <TableCell className="text-center">
                        {invoice.days_overdue > 0 ? invoice.days_overdue : ''}
                      </TableCell>
                      <TableCell className="text-center">
                        {getStatusBadge(invoice.status, invoice.balance_due)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}