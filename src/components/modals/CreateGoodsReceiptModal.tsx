import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateGoodsReceipt, useSuppliers, usePurchaseOrders } from '@/hooks/usePurchaseData';
import { useAuth } from '@/hooks/useAuth';

interface CreateGoodsReceiptModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateGoodsReceiptModal: React.FC<CreateGoodsReceiptModalProps> = ({
  open,
  onOpenChange,
}) => {
  const { user } = useAuth();
  const { suppliers } = useSuppliers();
  const { orders } = usePurchaseOrders();
  const createReceipt = useCreateGoodsReceipt();
  
  const [formData, setFormData] = useState({
    supplier_id: '',
    purchase_order_id: '',
    receipt_number: '',
    receipt_date: new Date().toISOString().split('T')[0],
    delivery_note_number: '',
    description: '',
    qty_received: 0,
    inventory_location_id: '',
    inspection_notes: '',
    quality_status: 'Approved' as 'Approved' | 'Rejected' | 'Pending',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    await createReceipt.mutateAsync({
      ...formData,
      user_id: user.id,
      line_items: [],
      purchase_order_id: formData.purchase_order_id || null,
      inventory_location_id: formData.inventory_location_id || null,
    });

    onOpenChange(false);
    setFormData({
      supplier_id: '',
      purchase_order_id: '',
      receipt_number: '',
      receipt_date: new Date().toISOString().split('T')[0],
      delivery_note_number: '',
      description: '',
      qty_received: 0,
      inventory_location_id: '',
      inspection_notes: '',
      quality_status: 'Approved',
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Goods Receipt</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="supplier">Supplier</Label>
            <Select
              value={formData.supplier_id}
              onValueChange={(value) => handleInputChange('supplier_id', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select supplier" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map((supplier) => (
                  <SelectItem key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="purchase_order">Purchase Order (Optional)</Label>
            <Select
              value={formData.purchase_order_id}
              onValueChange={(value) => handleInputChange('purchase_order_id', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select purchase order" />
              </SelectTrigger>
              <SelectContent>
                {orders.map((order) => (
                  <SelectItem key={order.id} value={order.id}>
                    {order.order_number} - {order.suppliers?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="receipt_number">Receipt Number</Label>
              <Input
                id="receipt_number"
                value={formData.receipt_number}
                onChange={(e) => handleInputChange('receipt_number', e.target.value)}
                placeholder="GR-001"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="delivery_note_number">Delivery Note Number</Label>
              <Input
                id="delivery_note_number"
                value={formData.delivery_note_number}
                onChange={(e) => handleInputChange('delivery_note_number', e.target.value)}
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="receipt_date">Receipt Date</Label>
              <Input
                id="receipt_date"
                type="date"
                value={formData.receipt_date}
                onChange={(e) => handleInputChange('receipt_date', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qty_received">Quantity Received</Label>
              <Input
                id="qty_received"
                type="number"
                value={formData.qty_received}
                onChange={(e) => handleInputChange('qty_received', parseInt(e.target.value) || 0)}
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quality_status">Quality Status</Label>
            <Select
              value={formData.quality_status}
              onValueChange={(value) => handleInputChange('quality_status', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Receipt description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="inspection_notes">Inspection Notes</Label>
            <Textarea
              id="inspection_notes"
              value={formData.inspection_notes}
              onChange={(e) => handleInputChange('inspection_notes', e.target.value)}
              placeholder="Any inspection notes or remarks"
              rows={2}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createReceipt.isPending || !formData.supplier_id || !formData.receipt_number}>
              {createReceipt.isPending ? 'Creating...' : 'Create Receipt'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};