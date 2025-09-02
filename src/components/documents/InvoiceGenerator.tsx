import React from 'react';
import { DocumentTemplate } from './DocumentTemplate';

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

  return (
    <div>
      <div className="no-print mb-4 flex gap-4">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Print Invoice
        </button>
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Download PDF
        </button>
      </div>

      <DocumentTemplate
        type="invoice"
        documentNumber={invoiceData.invoiceNumber}
        quoteNumber={invoiceData.quoteNumber}
        orderNumber={invoiceData.orderNumber}
        documentDate={invoiceData.issueDate}
        dueDate={invoiceData.dueDate}
        customer={{
          name: invoiceData.customerName,
          address: invoiceData.customerAddress
        }}
        title={invoiceData.serviceTitle || "Professional Services"}
        items={invoiceData.items}
        subtotal={invoiceData.subtotal}
        vat={invoiceData.vat}
        total={invoiceData.total}
        balanceDue={invoiceData.balanceDue}
        creditNote={invoiceData.creditNote}
      />
    </div>
  );
};