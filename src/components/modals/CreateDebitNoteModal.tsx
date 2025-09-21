import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateDebitNote, useSuppliers, usePurchaseInvoices } from '@/hooks/usePurchaseData';
import { useAuth } from '@/hooks/useAuth';

interface CreateDebitNoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateDebitNoteModal: React.FC<CreateDebitNoteModalProps> = ({
  open,
  onOpenChange,
}) => {
  const { user } = useAuth();
  const { suppliers } = useSuppliers();
  const { invoices } = usePurchaseInvoices();
  const createDebitNote = useCreateDebitNote();
  
  const [formData, setFormData] = useState({
    supplier_id: '',
    purchase_invoice_id: '',
    debit_note_number: '',
    issue_date: new Date().toISOString().split('T')[0],
    description: '',
    reason: '',
    subtotal: 0,
    vat_amount: 0,
    total_amount: 0,
    reference: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    await createDebitNote.mutateAsync({
      ...formData,
      user_id: user.id,
      status: 'Applied',
      line_items: [],
      purchase_invoice_id: formData.purchase_invoice_id || null,
    });

    onOpenChange(false);
    setFormData({
      supplier_id: '',
      purchase_invoice_id: '',
      debit_note_number: '',
      issue_date: new Date().toISOString().split('T')[0],
      description: '',
      reason: '',
      subtotal: 0,
      vat_amount: 0,
      total_amount: 0,
      reference: '',
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-calculate totals
      if (field === 'subtotal' || field === 'vat_amount') {
        const subtotal = field === 'subtotal' ? parseFloat(value) || 0 : updated.subtotal;
        const vatAmount = field === 'vat_amount' ? parseFloat(value) || 0 : updated.vat_amount;
        updated.total_amount = subtotal + vatAmount;
      }
      
      return updated;
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Debit Note</DialogTitle>
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
            <Label htmlFor="purchase_invoice">Purchase Invoice (Optional)</Label>
            <Select
              value={formData.purchase_invoice_id}
              onValueChange={(value) => handleInputChange('purchase_invoice_id', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select purchase invoice" />
              </SelectTrigger>
              <SelectContent>
                {invoices.map((invoice) => (
                  <SelectItem key={invoice.id} value={invoice.id}>
                    {invoice.invoice_number} - {invoice.suppliers?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="debit_note_number">Debit Note Number</Label>
              <Input
                id="debit_note_number"
                value={formData.debit_note_number}
                onChange={(e) => handleInputChange('debit_note_number', e.target.value)}
                placeholder="DN-001"
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
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Debit note description"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => handleInputChange('reason', e.target.value)}
              placeholder="Reason for debit note (e.g., damaged goods, pricing error)"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
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
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createDebitNote.isPending || !formData.supplier_id || !formData.debit_note_number || !formData.description}>
              {createDebitNote.isPending ? 'Creating...' : 'Create Debit Note'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};