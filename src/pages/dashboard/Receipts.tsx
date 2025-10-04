import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useReceipts } from '@/hooks/useReceipts';
import { Plus, Search, Filter, Eye } from 'lucide-react';
import { CreateReceiptModal } from '@/components/modals/CreateReceiptModal';

const Receipts = () => {
  const { user, loading } = useAuth();
  const { data: receipts, isLoading } = useReceipts();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-4">Loading receipts...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const filteredReceipts = receipts?.filter(receipt =>
    receipt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receipt.receipt_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receipt.reference?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZA');
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'cleared':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Receipts</h1>
          <p className="text-muted-foreground">
            Manage customer payments and receipts
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Receipt
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Receipts Overview</CardTitle>
          <CardDescription>
            A comprehensive list of all customer receipts and payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search receipts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Receipt #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReceipts.map((receipt) => (
                  <TableRow key={receipt.id}>
                    <TableCell className="font-medium">
                      {receipt.receipt_number}
                    </TableCell>
                    <TableCell>{formatDate(receipt.receipt_date)}</TableCell>
                    <TableCell>{receipt.description}</TableCell>
                    <TableCell>{formatCurrency(receipt.amount)}</TableCell>
                    <TableCell>{receipt.payment_method || 'Bank Transfer'}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(receipt.status)}>
                        {receipt.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <CreateReceiptModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
      />
    </div>
  );
};

export default Receipts;