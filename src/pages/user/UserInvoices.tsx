import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye, DollarSign } from 'lucide-react';

interface Invoice {
  id: string;
  invoice_number: string | null;
  total_amount: number | null;
  status: string | null;
  due_date: string | null;
  created_at: string;
}

export default function UserInvoices() {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchInvoices();
    }
  }, [user]);

  async function fetchInvoices() {
    setLoading(true);
    const { data, error } = await supabase
      .from('sales_invoices')
      .select('id, invoice_number, total_amount, status, due_date, created_at')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setInvoices(data as Invoice[]);
    }
    setLoading(false);
  }

  const getStatusBadge = (status: string | null) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return <Badge className="bg-green-500">Paid</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status || 'Draft'}</Badge>;
    }
  };

  const totalOwed = invoices
    .filter(i => i.status !== 'Paid')
    .reduce((sum, i) => sum + (i.total_amount || 0), 0);

  const totalPaid = invoices
    .filter(i => i.status === 'Paid')
    .reduce((sum, i) => sum + (i.total_amount || 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Invoices</h1>
        <p className="text-muted-foreground">View and manage your invoices</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{invoices.length}</p>
                <p className="text-sm text-muted-foreground">Total Invoices</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-orange-100 text-orange-600">
                <DollarSign className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">R{totalOwed.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Outstanding</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-100 text-green-600">
                <DollarSign className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">R{totalPaid.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Total Paid</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading invoices...</div>
          ) : invoices.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No invoices found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        {invoice.invoice_number || 'N/A'}
                      </div>
                    </TableCell>
                    <TableCell>R{invoice.total_amount?.toFixed(2) || '0.00'}</TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell>
                      {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : '-'}
                    </TableCell>
                    <TableCell>
                      {new Date(invoice.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
