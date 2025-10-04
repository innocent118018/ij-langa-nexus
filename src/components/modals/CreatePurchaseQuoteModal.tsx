import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreatePurchaseQuote, useSuppliers } from '@/hooks/usePurchaseData';
import { useAuth } from '@/hooks/useAuth';

interface CreatePurchaseQuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreatePurchaseQuoteModal: React.FC<CreatePurchaseQuoteModalProps> = ({
  open,
  onOpenChange,
}) => {
  const { user } = useAuth();
  const { suppliers } = useSuppliers();
  const createQuote = useCreatePurchaseQuote();
  
  const [formData, setFormData] = useState({
    supplier_id: '',
    quote_number: '',
    quote_date: new Date().toISOString().split('T')[0],
    expiry_date: '',
    description: '',
    subtotal: 0,
    vat_amount: 0,
    total_amount: 0,
    notes: '',
    reference: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    await createQuote.mutateAsync({
      ...formData,
      user_id: user.id,
      status: 'Active',
      line_items: [],
    });

    onOpenChange(false);
    setFormData({
      supplier_id: '',
      quote_number: '',
      quote_date: new Date().toISOString().split('T')[0],
      expiry_date: '',
      description: '',
      subtotal: 0,
      vat_amount: 0,
      total_amount: 0,
      notes: '',
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
          <DialogTitle>Create Purchase Quote</DialogTitle>
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quote_number">Quote Number</Label>
              <Input
                id="quote_number"
                value={formData.quote_number}
                onChange={(e) => handleInputChange('quote_number', e.target.value)}
                placeholder="PQ-001"
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
              <Label htmlFor="quote_date">Quote Date</Label>
              <Input
                id="quote_date"
                type="date"
                value={formData.quote_date}
                onChange={(e) => handleInputChange('quote_date', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiry_date">Expiry Date</Label>
              <Input
                id="expiry_date"
                type="date"
                value={formData.expiry_date}
                onChange={(e) => handleInputChange('expiry_date', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Quote description"
              rows={3}
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

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Additional notes"
              rows={2}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createQuote.isPending || !formData.supplier_id || !formData.quote_number}>
              {createQuote.isPending ? 'Creating...' : 'Create Quote'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};