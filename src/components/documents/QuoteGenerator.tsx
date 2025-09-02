import React from 'react';
import { DocumentTemplate } from './DocumentTemplate';

interface QuoteData {
  id: string;
  quoteNumber: string;
  quoteDate: string;
  validUntil: string;
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
  serviceTitle?: string;
  notes?: string;
}

interface QuoteGeneratorProps {
  quoteData: QuoteData;
  onAccept?: () => void;
  onPrint?: () => void;
  onDownload?: () => void;
}

export const QuoteGenerator: React.FC<QuoteGeneratorProps> = ({
  quoteData,
  onAccept,
  onPrint,
  onDownload
}) => {
  const handlePrint = () => {
    window.print();
    onPrint?.();
  };

  const handleDownload = () => {
    console.log('Download PDF functionality would be implemented here');
    onDownload?.();
  };

  const customTerms = [
    `This quote is valid until ${quoteData.validUntil}.`,
    'A 50% deposit is required to confirm the order.',
    'Prices exclude VAT unless otherwise specified.',
    'Delivery times are estimates and may vary.',
    `Please use Quote Number ${quoteData.quoteNumber} when accepting this quote.`,
    'Goods remain the property of IJ Langa Consulting until full payment is received.',
    'Any changes to specifications may affect pricing and delivery.',
    'Acceptance of this quote constitutes agreement to these terms.'
  ];

  return (
    <div>
      <div className="no-print mb-4 flex gap-4">
        <button
          onClick={onAccept}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Accept Quote
        </button>
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Print Quote
        </button>
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Download PDF
        </button>
      </div>

      <DocumentTemplate
        type="quote"
        documentNumber={quoteData.quoteNumber}
        documentDate={quoteData.quoteDate}
        customer={{
          name: quoteData.customerName,
          address: quoteData.customerAddress
        }}
        title={quoteData.serviceTitle || "Professional Services Quote"}
        items={quoteData.items}
        subtotal={quoteData.subtotal}
        vat={quoteData.vat}
        total={quoteData.total}
        termsOverride={customTerms}
      />
      
      {quoteData.notes && (
        <div className="mt-8 p-4 bg-gray-50 rounded">
          <h3 className="font-bold mb-2">Additional Notes:</h3>
          <p className="text-sm">{quoteData.notes}</p>
        </div>
      )}
    </div>
  );
};