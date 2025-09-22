import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';
import { useCreateSalesQuote } from '@/hooks/useSalesQuotes';
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

interface CreateSalesQuoteModalProps {
  children: React.ReactNode;
}

export const CreateSalesQuoteModal: React.FC<CreateSalesQuoteModalProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const createQuote = useCreateSalesQuote();
  
  const [formData, setFormData] = useState({
    issueDate: new Date().toISOString().split('T')[0],
    expiryDays: 7,
    reference: '',
    customer: '',
    billingAddress: '',
    description: '',
    amountsTaxInclusive: false,
    rounding: false,
    lineNumber: false,
    discount: false,
    withholdingTax: false,
    hideTotalAmount: false,
    customTheme: false,
    customTitle: false,
    showItemImages: false,
    showTaxAmountColumn: false,
    footers: true,
    cancelled: false
  });

  const [lineItems, setLineItems] = useState<LineItem[]>([
    {
      id: '1',
      description: '',
      quantity: 0,
      unitPrice: 0,
      total: 0,
      taxCode: 'No tax',
      taxAmount: 0,
      lineTotal: 0
    }
  ]);

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
    try {
      const quoteData = {
        quote_number: formData.reference || `QUO-${Date.now()}`,
        issue_date: formData.issueDate,
        expiry_date: new Date(new Date(formData.issueDate).getTime() + formData.expiryDays * 24 * 60 * 60 * 1000).toISOString(),
        customer_name: formData.customer,
        description: formData.description,
        subtotal: calculateSubtotal(),
        vat_amount: calculateTotalTax(),
        total_amount: calculateGrandTotal(),
        status: 'Active',
        line_items: lineItems,
        terms_conditions: 'Standard terms and conditions apply',
        notes: formData.billingAddress
      };

      await createQuote.mutateAsync(quoteData);
      setOpen(false);
      
      // Reset form
      setFormData({
        issueDate: new Date().toISOString().split('T')[0],
        expiryDays: 7,
        reference: '',
        customer: '',
        billingAddress: '',
        description: '',
        amountsTaxInclusive: false,
        rounding: false,
        lineNumber: false,
        discount: false,
        withholdingTax: false,
        hideTotalAmount: false,
        customTheme: false,
        customTitle: false,
        showItemImages: false,
        showTaxAmountColumn: false,
        footers: true,
        cancelled: false
      });
      
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
      
    } catch (error) {
      console.error('Error creating quote:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Sales Quote</DialogTitle>
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
              <Label htmlFor="expiry">Expiry date</Label>
              <div className="flex items-center space-x-2">
                <span className="text-sm">Valid for</span>
                <Input
                  type="number"
                  value={formData.expiryDays}
                  onChange={(e) => setFormData({ ...formData, expiryDays: parseInt(e.target.value) })}
                  className="w-20"
                />
                <span className="text-sm">days</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reference">Reference</Label>
              <Input
                id="reference"
                value={formData.reference}
                onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                placeholder="2020752744"
              />
            </div>
          </div>

          {/* Customer Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customer">Customer</Label>
              <Select value={formData.customer} onValueChange={(value) => setFormData({ ...formData, customer: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer1">Customer 1</SelectItem>
                  <SelectItem value="customer2">Customer 2</SelectItem>
                  <SelectItem value="customer3">Customer 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="billingAddress">Billing address</Label>
              <Textarea
                id="billingAddress"
                value={formData.billingAddress}
                onChange={(e) => setFormData({ ...formData, billingAddress: e.target.value })}
                rows={3}
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
              
              {lineItems.map((item, index) => (
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
                  <div className="text-right text-sm">{item.total.toFixed(2)}</div>
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
                    <div className="text-right text-sm">{item.lineTotal.toFixed(2)}</div>
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

          {/* Options */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="amountsTaxInclusive"
                  checked={formData.amountsTaxInclusive}
                  onCheckedChange={(checked) => setFormData({ ...formData, amountsTaxInclusive: !!checked })}
                />
                <Label htmlFor="amountsTaxInclusive">Amounts are tax inclusive</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rounding"
                  checked={formData.rounding}
                  onCheckedChange={(checked) => setFormData({ ...formData, rounding: !!checked })}
                />
                <Label htmlFor="rounding">Rounding</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lineNumber"
                  checked={formData.lineNumber}
                  onCheckedChange={(checked) => setFormData({ ...formData, lineNumber: !!checked })}
                />
                <Label htmlFor="lineNumber">Column — Line number</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="discount"
                  checked={formData.discount}
                  onCheckedChange={(checked) => setFormData({ ...formData, discount: !!checked })}
                />
                <Label htmlFor="discount">Column — Discount</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="withholdingTax"
                  checked={formData.withholdingTax}
                  onCheckedChange={(checked) => setFormData({ ...formData, withholdingTax: !!checked })}
                />
                <Label htmlFor="withholdingTax">Withholding tax</Label>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hideTotalAmount"
                  checked={formData.hideTotalAmount}
                  onCheckedChange={(checked) => setFormData({ ...formData, hideTotalAmount: !!checked })}
                />
                <Label htmlFor="hideTotalAmount">Hide total amount</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="customTheme"
                  checked={formData.customTheme}
                  onCheckedChange={(checked) => setFormData({ ...formData, customTheme: !!checked })}
                />
                <Label htmlFor="customTheme">Custom theme</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="customTitle"
                  checked={formData.customTitle}
                  onCheckedChange={(checked) => setFormData({ ...formData, customTitle: !!checked })}
                />
                <Label htmlFor="customTitle">Custom title</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showItemImages"
                  checked={formData.showItemImages}
                  onCheckedChange={(checked) => setFormData({ ...formData, showItemImages: !!checked })}
                />
                <Label htmlFor="showItemImages">Show item images</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showTaxAmountColumn"
                  checked={formData.showTaxAmountColumn}
                  onCheckedChange={(checked) => setFormData({ ...formData, showTaxAmountColumn: !!checked })}
                />
                <Label htmlFor="showTaxAmountColumn">Show tax amount column</Label>
              </div>
            </div>
          </div>

          {/* Footer Options */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="footers"
                checked={formData.footers}
                onCheckedChange={(checked) => setFormData({ ...formData, footers: !!checked })}
              />
              <Label htmlFor="footers">Footers</Label>
            </div>
            
            {formData.footers && (
              <div className="ml-6">
                <Input 
                  value="IJ Langa Consulting Billing System"
                  disabled
                  className="bg-gray-100"
                />
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="cancelled"
                checked={formData.cancelled}
                onCheckedChange={(checked) => setFormData({ ...formData, cancelled: !!checked })}
              />
              <Label htmlFor="cancelled">Cancelled</Label>
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
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={createQuote.isPending}>
            {createQuote.isPending ? 'Creating...' : 'Create Quote'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};