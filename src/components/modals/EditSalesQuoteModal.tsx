import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';
import { SalesQuote } from '@/hooks/useSalesQuotes';
import { toast } from 'sonner';

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  taxCode: string;
  taxAmount: number;
  lineTotal: number;
}

interface EditSalesQuoteModalProps {
  quote: SalesQuote | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (quoteId: string, updatedQuote: Partial<SalesQuote>) => void;
}

export const EditSalesQuoteModal: React.FC<EditSalesQuoteModalProps> = ({
  quote,
  open,
  onOpenChange,
  onUpdate
}) => {
  const [formData, setFormData] = useState({
    issueDate: '',
    expiryDate: '',
    reference: '',
    customer: '',
    description: '',
    status: 'Active'
  });

  const [lineItems, setLineItems] = useState<LineItem[]>([]);

  useEffect(() => {
    if (quote) {
      setFormData({
        issueDate: quote.issue_date ? new Date(quote.issue_date).toISOString().split('T')[0] : '',
        expiryDate: quote.expiry_date ? new Date(quote.expiry_date).toISOString().split('T')[0] : '',
        reference: quote.quote_number || '',
        customer: quote.customer_name || '',
        description: quote.description || '',
        status: quote.status || 'Active'
      });

      // Parse line items from quote data
      try {
        const items = quote.line_items || [];
        setLineItems(Array.isArray(items) ? items : []);
      } catch (error) {
        setLineItems([{
          id: '1',
          description: '',
          quantity: 0,
          unitPrice: 0,
          total: 0,
          taxCode: 'No tax',
          taxAmount: 0,
          lineTotal: 0
        }]);
      }
    }
  }, [quote]);

  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 0,
      unitPrice: 0,
      total: 0,
      taxCode: 'No tax',
      taxAmount: 0,
      lineTotal: 0
    };
    setLineItems([...lineItems, newItem]);
  };

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter(item => item.id !== id));
    }
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setLineItems(lineItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Recalculate totals
        if (field === 'quantity' || field === 'unitPrice') {
          updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
          updatedItem.lineTotal = updatedItem.total + updatedItem.taxAmount;
        }
        
        return updatedItem;
      }
      return item;
    }));
  };

  const calculateSubtotal = () => {
    return lineItems.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateTotalTax = () => {
    return lineItems.reduce((sum, item) => sum + item.taxAmount, 0);
  };

  const calculateGrandTotal = () => {
    return calculateSubtotal() + calculateTotalTax();
  };

  const handleSubmit = async () => {
    if (!quote) return;

    try {
      const updatedQuote = {
        quote_number: formData.reference,
        issue_date: formData.issueDate,
        expiry_date: formData.expiryDate,
        customer_name: formData.customer,
        description: formData.description,
        subtotal: calculateSubtotal(),
        vat_amount: calculateTotalTax(),
        total_amount: calculateGrandTotal(),
        status: formData.status,
        line_items: lineItems,
        updated_at: new Date().toISOString()
      };

      onUpdate(quote.id, updatedQuote);
      onOpenChange(false);
      toast.success('Quote updated successfully');
    } catch (error) {
      console.error('Error updating quote:', error);
      toast.error('Failed to update quote');
    }
  };

  if (!quote) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Edit Sales Quote</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Information */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="issueDate">Issue date</Label>
              <Input
                id="issueDate"
                type="date"
                value={formData.issueDate}
                onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry date</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reference">Reference</Label>
              <Input
                id="reference"
                value={formData.reference}
                onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
              />
            </div>
          </div>

          {/* Customer and Description */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customer">Customer</Label>
              <Input
                id="customer"
                value={formData.customer}
                onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Accepted">Accepted</SelectItem>
                  <SelectItem value="Expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Line Items */}
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-7 gap-2 text-sm font-medium text-gray-700 mb-2">
                <div>Description</div>
                <div>Qty</div>
                <div>Unit price</div>
                <div>Total</div>
                <div>Tax Code</div>
                <div>Tax Amount</div>
                <div>Total</div>
              </div>
              
              {lineItems.map((item) => (
                <div key={item.id} className="grid grid-cols-7 gap-2 items-center mb-2">
                  <Input
                    value={item.description}
                    onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                    placeholder="Item description"
                  />
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateLineItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                    className="text-center"
                  />
                  <Input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => updateLineItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                    className="text-right"
                  />
                  <div className="text-right text-sm">R {item.total.toFixed(2)}</div>
                  <Select value={item.taxCode} onValueChange={(value) => updateLineItem(item.id, 'taxCode', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="No tax">No tax</SelectItem>
                      <SelectItem value="VAT 15%">VAT 15%</SelectItem>
                      <SelectItem value="VAT 0%">VAT 0%</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    value={item.taxAmount}
                    onChange={(e) => updateLineItem(item.id, 'taxAmount', parseFloat(e.target.value) || 0)}
                    className="text-right"
                  />
                  <div className="flex items-center justify-between">
                    <div className="text-right text-sm">R {item.lineTotal.toFixed(2)}</div>
                    {lineItems.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLineItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              
              <Button
                variant="outline"
                size="sm"
                onClick={addLineItem}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add line
              </Button>
            </div>
          </div>

          {/* Totals Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-2 text-right">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>R {calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>R {calculateTotalTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Total:</span>
                <span>R {calculateGrandTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Update Quote
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};