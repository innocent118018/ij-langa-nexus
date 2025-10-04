import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreatePurchaseInvoice, useSuppliers, usePurchaseOrders } from '@/hooks/usePurchaseData';
import { useAuth } from '@/hooks/useAuth';

interface CreatePurchaseInvoiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreatePurchaseInvoiceModal: React.FC<CreatePurchaseInvoiceModalProps> = ({
  open,
  onOpenChange,
}) => {
  const { user } = useAuth();
  const { suppliers } = useSuppliers();
  const { orders } = usePurchaseOrders();
  const createInvoice = useCreatePurchaseInvoice();
  
  const [formData, setFormData] = useState({
    supplier_id: '',
    purchase_order_id: '',
    invoice_number: '',
    issue_date: new Date().toISOString().split('T')[0],
    due_date: '',
    description: '',
    subtotal: 0,
    vat_amount: 0,
    discount_amount: 0,
    withholding_tax: 0,
    total_amount: 0,
    balance_due: 0,
    reference: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    await createInvoice.mutateAsync({
      ...formData,
      user_id: user.id,
      status: 'Unpaid',
      line_items: [],
      days_overdue: 0,
      closed_invoice: false,
      purchase_order_id: formData.purchase_order_id || null,
    });

    onOpenChange(false);
    setFormData({
      supplier_id: '',
      purchase_order_id: '',
      invoice_number: '',
      issue_date: new Date().toISOString().split('T')[0],
      due_date: '',
      description: '',
      subtotal: 0,
      vat_amount: 0,
      discount_amount: 0,
      withholding_tax: 0,
      total_amount: 0,
      balance_due: 0,
      reference: '',
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-calculate totals
      if (['subtotal', 'vat_amount', 'discount_amount', 'withholding_tax'].includes(field)) {
        const subtotal = field === 'subtotal' ? parseFloat(value) || 0 : updated.subtotal;
        const vatAmount = field === 'vat_amount' ? parseFloat(value) || 0 : updated.vat_amount;
        const discountAmount = field === 'discount_amount' ? parseFloat(value) || 0 : updated.discount_amount;
        const withholdingTax = field === 'withholding_tax' ? parseFloat(value) || 0 : updated.withholding_tax;
        
        updated.total_amount = subtotal + vatAmount - discountAmount - withholdingTax;
        updated.balance_due = updated.total_amount;
      }
      
      return updated;
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Purchase Invoice</DialogTitle>
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
              <Label htmlFor="invoice_number">Invoice Number</Label>
              <Input
                id="invoice_number"
                value={formData.invoice_number}
                onChange={(e) => handleInputChange('invoice_number', e.target.value)}
                placeholder="PI-001"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reference">Reference</Label>
              <Input
                id="reference"
                value={formData.reference}
                onChange={(e) => handleInputChange('reference', e.target.value)}
                placeholder="Optional reference"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="issue_date">Issue Date</Label>
              <Input
                id="issue_date"
                type="date"
                value={formData.issue_date}
                onChange={(e) => handleInputChange('issue_date', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="due_date">Due Date</Label>
              <Input
                id="due_date"
                type="date"
                value={formData.due_date}
                onChange={(e) => handleInputChange('due_date', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Invoice description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subtotal">Subtotal</Label>
              <Input
                id="subtotal"
                type="number"
                step="0.01"
                value={formData.subtotal}
                onChange={(e) => handleInputChange('subtotal', e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vat_amount">VAT Amount</Label>
              <Input
                id="vat_amount"
                type="number"
                step="0.01"
                value={formData.vat_amount}
                onChange={(e) => handleInputChange('vat_amount', e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="discount_amount">Discount Amount</Label>
              <Input
                id="discount_amount"
                type="number"
                step="0.01"
                value={formData.discount_amount}
                onChange={(e) => handleInputChange('discount_amount', e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="withholding_tax">Withholding Tax</Label>
              <Input
                id="withholding_tax"
                type="number"
                step="0.01"
                value={formData.withholding_tax}
                onChange={(e) => handleInputChange('withholding_tax', e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="total_amount">Total Amount</Label>
              <Input
                id="total_amount"
                type="number"
                step="0.01"
                value={formData.total_amount}
                readOnly
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="balance_due">Balance Due</Label>
              <Input
                id="balance_due"
                type="number"
                step="0.01"
                value={formData.balance_due}
                readOnly
                className="bg-muted"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createInvoice.isPending || !formData.supplier_id || !formData.invoice_number}>
              {createInvoice.isPending ? 'Creating...' : 'Create Invoice'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};