import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { InvoiceGenerator } from '@/components/documents/InvoiceGenerator';
import { Plus, Trash2 } from 'lucide-react';

interface AdminInvoiceGeneratorProps {
  clientData: {
    user: {
      full_name: string;
      email: string;
      company_name?: string;
    };
    customer?: {
      name: string;
      address?: string;
    };
  };
  onInvoiceCreate?: (invoiceData: any) => void;
}

export const AdminInvoiceGenerator: React.FC<AdminInvoiceGeneratorProps> = ({
  clientData,
  onInvoiceCreate
}) => {
  const [showGenerator, setShowGenerator] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: `INV-${Date.now()}`,
    quoteNumber: '',
    orderNumber: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
    customerName: clientData.customer?.name || clientData.user.full_name,
    customerAddress: clientData.customer?.address || '',
    serviceTitle: 'Professional Services',
    items: [
      {
        description: 'Professional Services',
        quantity: 1,
        unitPrice: 0,
        total: 0
      }
    ],
    subtotal: 0,
    vat: 0,
    total: 0,
    balanceDue: 0
  });

  const updateItem = (index: number, field: keyof typeof invoiceData.items[0], value: any) => {
    const newItems = [...invoiceData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    if (field === 'quantity' || field === 'unitPrice') {
      newItems[index].total = newItems[index].quantity * newItems[index].unitPrice;
    }
    
    calculateTotals(newItems);
  };

  const addItem = () => {
    const newItems = [...invoiceData.items, {
      description: '',
      quantity: 1,
      unitPrice: 0,
      total: 0
    }];
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const removeItem = (index: number) => {
    const newItems = invoiceData.items.filter((_, i) => i !== index);
    calculateTotals(newItems);
  };

  const calculateTotals = (items: typeof invoiceData.items) => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const vat = subtotal * 0.15; // 15% VAT
    const total = subtotal + vat;
    
    setInvoiceData(prev => ({
      ...prev,
      items,
      subtotal,
      vat,
      total,
      balanceDue: total
    }));
  };

  const handleCreateInvoice = () => {
    if (onInvoiceCreate) {
      onInvoiceCreate(invoiceData);
    }
    setShowGenerator(true);
  };

  if (showGenerator) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Generated Invoice</h3>
          <Button variant="outline" onClick={() => setShowGenerator(false)}>
            Back to Form
          </Button>
        </div>
        <InvoiceGenerator
          invoiceData={{
            id: Date.now().toString(),
            ...invoiceData
          }}
        />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Invoice</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Invoice Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="invoiceNumber">Invoice Number</Label>
            <Input
              id="invoiceNumber"
              value={invoiceData.invoiceNumber}
              onChange={(e) => setInvoiceData({ ...invoiceData, invoiceNumber: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="issueDate">Issue Date</Label>
            <Input
              id="issueDate"
              type="date"
              value={invoiceData.issueDate}
              onChange={(e) => setInvoiceData({ ...invoiceData, issueDate: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={invoiceData.dueDate}
              onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quoteNumber">Quote Number (Optional)</Label>
            <Input
              id="quoteNumber"
              value={invoiceData.quoteNumber}
              onChange={(e) => setInvoiceData({ ...invoiceData, quoteNumber: e.target.value })}
            />
          </div>
        </div>

        {/* Customer Details */}
        <div className="space-y-4">
          <h4 className="font-medium">Customer Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={invoiceData.customerName}
                onChange={(e) => setInvoiceData({ ...invoiceData, customerName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerAddress">Customer Address</Label>
              <Textarea
                id="customerAddress"
                value={invoiceData.customerAddress}
                onChange={(e) => setInvoiceData({ ...invoiceData, customerAddress: e.target.value })}
                className="min-h-[80px]"
              />
            </div>
          </div>
        </div>

        {/* Invoice Items */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Invoice Items</h4>
            <Button variant="outline" size="sm" onClick={addItem}>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
          
          <div className="space-y-4">
            {invoiceData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-5 space-y-2">
                  <Label>Description</Label>
                  <Input
                    value={item.description}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                    placeholder="Service description"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))}
                    min="1"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label>Unit Price</Label>
                  <Input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => updateItem(index, 'unitPrice', Number(e.target.value))}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label>Total</Label>
                  <Input
                    value={`R${item.total.toFixed(2)}`}
                    readOnly
                    className="bg-muted"
                  />
                </div>
                <div className="col-span-1">
                  {invoiceData.items.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Totals Summary */}
        <div className="border-t pt-4">
          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>R{invoiceData.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>VAT (15%):</span>
                <span>R{invoiceData.vat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total:</span>
                <span>R{invoiceData.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button variant="outline">Save as Draft</Button>
          <Button onClick={handleCreateInvoice}>
            Generate Invoice
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};