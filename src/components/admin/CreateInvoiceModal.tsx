import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Minus, Calendar, FileText, Send, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
  tax_code: string;
  tax_amount: number;
}

interface CreateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  customers: any[];
}

export const CreateInvoiceModal: React.FC<CreateInvoiceModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  customers
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [invoiceType, setInvoiceType] = useState('invoice');
  const [formData, setFormData] = useState({
    issue_date: new Date().toISOString().split('T')[0],
    due_date: '',
    net_days: 1,
    reference: '',
    customer_id: '',
    billing_address: '',
    description: ''
  });
  const [lineItems, setLineItems] = useState<LineItem[]>([
    {
      id: '1',
      description: '',
      quantity: 1,
      unit_price: 0,
      total: 0,
      tax_code: 'VAT',
      tax_amount: 0
    }
  ]);

  // Auto-calculate due date based on net days
  useEffect(() => {
    if (formData.issue_date && formData.net_days) {
      const issueDate = new Date(formData.issue_date);
      const dueDate = new Date(issueDate);
      dueDate.setDate(issueDate.getDate() + formData.net_days);
      setFormData(prev => ({
        ...prev,
        due_date: dueDate.toISOString().split('T')[0]
      }));
    }
  }, [formData.issue_date, formData.net_days]);

  // Generate reference number
  useEffect(() => {
    const prefix = invoiceType === 'invoice' ? 'INV' : 
                  invoiceType === 'quote' ? 'QUO' :
                  invoiceType === 'sales_order' ? 'SO' : 'CN';
    const number = Date.now().toString().slice(-6);
    setFormData(prev => ({ ...prev, reference: `${prefix}-${number}` }));
  }, [invoiceType]);

  const calculateLineItem = (item: LineItem) => {
    const total = item.quantity * item.unit_price;
    const taxAmount = total * (item.tax_code === 'VAT' ? 0.15 : 0);
    return {
      ...item,
      total,
      tax_amount: taxAmount
    };
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setLineItems(prev => 
      prev.map(item => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          return calculateLineItem(updated);
        }
        return item;
      })
    );
  };

  const addLineItem = () => {
    setLineItems(prev => [...prev, {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unit_price: 0,
      total: 0,
      tax_code: 'VAT',
      tax_amount: 0
    }]);
  };

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const calculateTotals = () => {
    const subtotal = lineItems.reduce((sum, item) => sum + item.total, 0);
    const vatAmount = lineItems.reduce((sum, item) => sum + item.tax_amount, 0);
    return {
      subtotal,
      vatAmount,
      total: subtotal + vatAmount
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const totals = calculateTotals();
      
      // Create invoice
      const { data: invoice, error: invoiceError } = await supabase
        .from('invoices')
        .insert({
          reference: formData.reference,
          customer_id: formData.customer_id,
          issue_date: formData.issue_date,
          due_date: formData.due_date,
          invoice_amount: totals.total,
          balance_due: totals.total,
          subtotal: totals.subtotal,
          vat_amount: totals.vatAmount,
          status: 'Unpaid',
          invoice_type: invoiceType
        })
        .select()
        .single();

      if (invoiceError) throw invoiceError;

      // Create line items
      const lineItemsToInsert = lineItems.map(item => ({
        invoice_id: invoice.id,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unit_price,
        line_total: item.total,
        tax_code: item.tax_code,
        tax_amount: item.tax_amount
      }));

      const { error: lineItemsError } = await supabase
        .from('invoice_line_items')
        .insert(lineItemsToInsert);

      if (lineItemsError) throw lineItemsError;

      toast({
        title: "Invoice Created",
        description: `${invoiceType.charAt(0).toUpperCase() + invoiceType.slice(1)} ${formData.reference} has been created successfully.`,
      });

      onSuccess();
      onClose();
      
      // Reset form
      setFormData({
        issue_date: new Date().toISOString().split('T')[0],
        due_date: '',
        net_days: 1,
        reference: '',
        customer_id: '',
        billing_address: '',
        description: ''
      });
      setLineItems([{
        id: '1',
        description: '',
        quantity: 1,
        unit_price: 0,
        total: 0,
        tax_code: 'VAT',
        tax_amount: 0
      }]);

    } catch (error: any) {
      console.error('Error creating invoice:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create invoice",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const totals = calculateTotals();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Create New {invoiceType.charAt(0).toUpperCase() + invoiceType.slice(1)}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Invoice Type Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="invoice_type">Document Type</Label>
              <Select value={invoiceType} onValueChange={setInvoiceType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="invoice">Sales Invoice</SelectItem>
                  <SelectItem value="quote">Sales Quote</SelectItem>
                  <SelectItem value="sales_order">Sales Order</SelectItem>
                  <SelectItem value="credit_note">Credit Note</SelectItem>
                  <SelectItem value="statement">Statement</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="reference">Reference</Label>
              <Input
                id="reference"
                value={formData.reference}
                onChange={(e) => setFormData(prev => ({ ...prev, reference: e.target.value }))}
                required
              />
            </div>
          </div>

          {/* Date Fields */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="issue_date">Issue Date</Label>
              <Input
                id="issue_date"
                type="date"
                value={formData.issue_date}
                onChange={(e) => setFormData(prev => ({ ...prev, issue_date: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="net_days">Net Days</Label>
              <Input
                id="net_days"
                type="number"
                value={formData.net_days}
                onChange={(e) => setFormData(prev => ({ ...prev, net_days: parseInt(e.target.value) || 0 }))}
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="due_date">Due Date</Label>
              <Input
                id="due_date"
                type="date"
                value={formData.due_date}
                onChange={(e) => setFormData(prev => ({ ...prev, due_date: e.target.value }))}
                required
              />
            </div>
          </div>

          {/* Customer Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customer">Customer</Label>
              <Select value={formData.customer_id} onValueChange={(value) => setFormData(prev => ({ ...prev, customer_id: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name} - {customer.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="billing_address">Billing Address</Label>
              <Textarea
                id="billing_address"
                value={formData.billing_address}
                onChange={(e) => setFormData(prev => ({ ...prev, billing_address: e.target.value }))}
                rows={3}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Optional description for this invoice"
            />
          </div>

          {/* Line Items */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Line Items</h3>
                <Button type="button" onClick={addLineItem} size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Item
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-2 text-sm font-medium text-gray-600">
                  <div className="col-span-5">Description</div>
                  <div className="col-span-1">Qty</div>
                  <div className="col-span-2">Unit Price</div>
                  <div className="col-span-2">Total</div>
                  <div className="col-span-1">Tax</div>
                  <div className="col-span-1"></div>
                </div>

                {lineItems.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                    <Input
                      className="col-span-5"
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                      required
                    />
                    <Input
                      className="col-span-1"
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateLineItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                    />
                    <Input
                      className="col-span-2"
                      type="number"
                      value={item.unit_price}
                      onChange={(e) => updateLineItem(item.id, 'unit_price', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                    />
                    <Input
                      className="col-span-2"
                      value={`R ${item.total.toFixed(2)}`}
                      readOnly
                    />
                    <Select
                      value={item.tax_code}
                      onValueChange={(value) => updateLineItem(item.id, 'tax_code', value)}
                    >
                      <SelectTrigger className="col-span-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="VAT">VAT</SelectItem>
                        <SelectItem value="ZERO">Zero</SelectItem>
                        <SelectItem value="EXEMPT">Exempt</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLineItem(item.id)}
                      disabled={lineItems.length === 1}
                      className="col-span-1"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-6 space-y-2 text-right">
                <div className="flex justify-end items-center gap-4">
                  <span className="text-sm font-medium">Subtotal:</span>
                  <span className="text-lg">R {totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-end items-center gap-4">
                  <span className="text-sm font-medium">VAT (15%):</span>
                  <span className="text-lg">R {totals.vatAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-end items-center gap-4 text-xl font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>R {totals.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>Creating...</>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Create {invoiceType.charAt(0).toUpperCase() + invoiceType.slice(1)}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};