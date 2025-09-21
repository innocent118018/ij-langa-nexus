import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useGoodsReceipts } from '@/hooks/usePurchaseData';
import { CreateGoodsReceiptModal } from '@/components/modals/CreateGoodsReceiptModal';

export default function GoodsReceipts() {
  const { receipts, isLoading } = useGoodsReceipts();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredReceipts = receipts.filter(receipt =>
    receipt.receipt_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receipt.suppliers?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receipt.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receipt.purchase_orders?.order_number?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'default';
      case 'Pending':
        return 'secondary';
      case 'Rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading goods receipts...</div>
        </div>
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Goods Receipts</h1>
            <p className="text-muted-foreground">
              Record receipt of goods from suppliers and update inventory
            </p>
          </div>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Goods Receipt
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Goods Receipts Overview</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search receipts..." 
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
                  <TableHead>Receipt #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Purchase Order</TableHead>
                  <TableHead>Qty Received</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReceipts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      {searchTerm ? 'No receipts found matching your search.' : 'No goods receipts found. Create your first receipt to get started.'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReceipts.map((receipt) => (
                    <TableRow key={receipt.id}>
                      <TableCell className="font-medium">{receipt.receipt_number}</TableCell>
                      <TableCell>{new Date(receipt.receipt_date).toLocaleDateString()}</TableCell>
                      <TableCell>{receipt.suppliers?.name || 'N/A'}</TableCell>
                      <TableCell>{receipt.purchase_orders?.order_number || 'N/A'}</TableCell>
                      <TableCell>{receipt.qty_received}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(receipt.quality_status)}>
                          {receipt.quality_status}
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

        <CreateGoodsReceiptModal
          open={showCreateModal}
          onOpenChange={setShowCreateModal}
        />
      </div>
    </DashboardLayout>
  );
}