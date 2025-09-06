import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface InvoiceData {
  id: string;
  invoiceNumber: string;
  quoteNumber?: string;
  orderNumber?: string;
  issueDate: string;
  dueDate: string;
  customerName: string;
  customerAddress: string;
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  subtotal: number;
  vat: number;
  total: number;
  balanceDue: number;
  creditNote?: {
    number: string;
    date: string;
    amount: number;
  };
  serviceTitle?: string;
}

interface InvoiceGeneratorProps {
  invoiceData: InvoiceData;
  onPrint?: () => void;
  onDownload?: () => void;
}

export const InvoiceGenerator: React.FC<InvoiceGeneratorProps> = ({
  invoiceData,
  onPrint,
  onDownload
}) => {
  const handlePrint = () => {
    window.print();
    onPrint?.();
  };

  const handleDownload = () => {
    // This would integrate with a PDF generation service
    console.log('Download PDF functionality would be implemented here');
    onDownload?.();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Print Controls */}
      <div className="no-print mb-6 flex gap-4 justify-end">
        <Button variant="outline" onClick={handlePrint}>
          Print Invoice
        </Button>
        <Button onClick={handleDownload}>
          Download PDF
        </Button>
      </div>

      {/* Invoice Template */}
      <Card className="print:shadow-none print:border-none">
        <CardContent className="p-8 font-sans">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Invoice</h1>
          </div>

          {/* Customer and Invoice Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-2">Customer:</h3>
              <p className="text-gray-700">
                <strong>{invoiceData.customerName}</strong><br />
                {invoiceData.customerAddress}
              </p>
            </div>
            
            <div>
              <div className="space-y-1">
                <p><strong>Invoice Date:</strong> {formatDate(invoiceData.issueDate)}</p>
                <p><strong>Due Date:</strong> {formatDate(invoiceData.dueDate)}</p>
                <p><strong>Invoice Number:</strong> {invoiceData.invoiceNumber}</p>
                {invoiceData.quoteNumber && (
                  <p><strong>Quote Number:</strong> {invoiceData.quoteNumber}</p>
                )}
                {invoiceData.orderNumber && (
                  <p><strong>Order Number:</strong> {invoiceData.orderNumber}</p>
                )}
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold text-center mb-4">IJ LANGA CONSULTING (PTY) LTD</h2>
            <div className="text-center text-gray-700">
              <p>78 Tekatakho</p>
              <p>Nelspruit, Mpumalanga, 2350, South Africa</p>
              <p>CSD: MAAA0988528</p>
              <p>Reg: 2020/754266/07</p>
              <p>Tax: 4540304286</p>
            </div>
          </div>

          {/* Service Description */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Service Description</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left">Description</th>
                    <th className="border border-gray-300 p-3 text-right">Qty</th>
                    <th className="border border-gray-300 p-3 text-right">Unit Price</th>
                    <th className="border border-gray-300 p-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.items.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-3">{item.description}</td>
                      <td className="border border-gray-300 p-3 text-right">{item.quantity}</td>
                      <td className="border border-gray-300 p-3 text-right">{formatCurrency(item.unitPrice)}</td>
                      <td className="border border-gray-300 p-3 text-right">{formatCurrency(item.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end mt-4">
              <div className="w-64 space-y-2">
                <div className="flex justify-between">
                  <span>Sub-total:</span>
                  <span>{formatCurrency(invoiceData.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT:</span>
                  <span>{formatCurrency(invoiceData.vat)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>{formatCurrency(invoiceData.total)}</span>
                </div>
                {invoiceData.creditNote && (
                  <div className="flex justify-between text-red-600">
                    <span>Credit Note:</span>
                    <span>-{formatCurrency(invoiceData.creditNote.amount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold border-t pt-2">
                  <span>Balance Due:</span>
                  <span>{formatCurrency(invoiceData.balanceDue)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Terms and Conditions</h2>
            <div className="text-sm text-gray-700 space-y-1">
              <p>1. All invoices are due within 1 day unless stated otherwise.</p>
              <p>2. A 10% late fee applies after 7 days.</p>
              <p>3. A R600 Letter of Demand applies after 21 days.</p>
              <p>4. Legal action may follow unpaid invoices.</p>
              <p>5. Goods remain the property of IJ Langa Consulting until paid in full.</p>
              <p>6. Report discrepancies within 7 days.</p>
              <p>7. Reference invoice/order number and amount when paying.</p>
              <p>8. Quotes valid for 7 days and require a 50% deposit.</p>
            </div>
          </div>

          {/* Banking Details */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Banking Details</h2>
            <div className="text-gray-700">
              <p><strong>Bank Name:</strong> Standard Bank</p>
              <p><strong>Branch:</strong> Ermelo</p>
              <p><strong>Branch Code:</strong> 2844</p>
              <p><strong>Account Holder:</strong> The Director IJ Langa Consulting (Pty) Ltd</p>
              <p><strong>Account Number:</strong> 10186883984</p>
              <p><strong>Account Type:</strong> Current</p>
              <p><strong>SWIFT Code:</strong> SBZAZAJJ</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-center text-gray-700">
            <p><strong>For inquiries:</strong></p>
            <p>Email: Billings@ijlanga.co.za</p>
            <p>Phone: 013 004 0620</p>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};