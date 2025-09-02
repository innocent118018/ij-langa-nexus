import React from 'react';

interface DocumentItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface DocumentTemplateProps {
  type: 'invoice' | 'quote' | 'order' | 'statement';
  documentNumber: string;
  quoteNumber?: string;
  orderNumber?: string;
  documentDate: string;
  dueDate?: string;
  customer: {
    name: string;
    address: string;
  };
  title: string;
  items: DocumentItem[];
  subtotal: number;
  vat: number;
  total: number;
  balanceDue?: number;
  creditNote?: {
    number: string;
    date: string;
    amount: number;
  };
  termsOverride?: string[];
}

export const DocumentTemplate: React.FC<DocumentTemplateProps> = ({
  type,
  documentNumber,
  quoteNumber,
  orderNumber,
  documentDate,
  dueDate,
  customer,
  title,
  items,
  subtotal,
  vat,
  total,
  balanceDue,
  creditNote,
  termsOverride
}) => {
  const formatCurrency = (amount: number) => `R${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;

  const getTermsAndConditions = () => {
    if (termsOverride) return termsOverride;
    
    switch (type) {
      case 'quote':
        return [
          'All quotes are valid for 7 days unless otherwise stated.',
          'A 50% deposit is required to confirm the order.',
          'Prices exclude VAT unless otherwise specified.',
          'Delivery times are estimates and may vary.',
          'Please use Quote Number when accepting this quote.',
          'Goods remain the property of IJ Langa Consulting until full payment is received.',
          'Any changes to specifications may affect pricing and delivery.',
          'Acceptance of this quote constitutes agreement to these terms.'
        ];
      case 'order':
        return [
          'Order confirmation required within 24 hours.',
          'Any changes must be communicated immediately.',
          'Delivery schedule will be confirmed upon order acceptance.',
          'Payment terms as per original quote apply.',
          'Please use Order Number for all correspondence.',
          'Cancellation charges may apply for work already commenced.',
          'Client responsible for providing accurate information.',
          'Completion certificates issued upon full payment.'
        ];
      case 'statement':
        return [
          'This statement reflects your account position as at the date shown.',
          'Please verify all entries and report discrepancies within 7 days.',
          'Interest may be charged on overdue accounts.',
          'Payment terms as per individual invoices apply.',
          'Please remit payment for all outstanding amounts.',
          'Use invoice numbers when making payments.',
          'Contact our billing department for payment arrangements.',
          'Regular statements issued monthly.'
        ];
      default: // invoice
        return [
          `All invoices are due for payment within 1 day (by ${documentDate}) unless otherwise stated.`,
          `If an invoice is not paid within 7 days (by ${dueDate}), a 10% late payment fee will be added.`,
          'After 21 days of non-payment, a Letter of Demand will be issued at a cost of R600.',
          'Failure to pay may result in legal action and additional charges.',
          'Goods remain the property of IJ Langa Consulting until full payment is received.',
          'Discrepancies must be reported within 7 days of receiving the invoice.',
          `Please use Invoice/Order Number ${documentNumber} and amount ${formatCurrency(balanceDue || total)} when making payments.`,
          'Quotes are valid for 7 days and require a 50% deposit to confirm.'
        ];
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 print:p-4 text-sm">
      <style>{`
        @media print {
          body { margin: 0; }
          .no-print { display: none; }
        }
      `}</style>

      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold uppercase mb-4">{type}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <p><strong>Customer:</strong> {customer.name}</p>
          <p className="whitespace-pre-line">{customer.address}</p>
        </div>

        <div>
          <p><strong>{type === 'invoice' ? 'Invoice' : type === 'quote' ? 'Quote' : type === 'order' ? 'Order' : 'Statement'} Date:</strong> {documentDate}</p>
          {dueDate && <p><strong>Due Date:</strong> {dueDate}</p>}
          <p><strong>{type === 'invoice' ? 'Invoice' : type === 'quote' ? 'Quote' : type === 'order' ? 'Order' : 'Statement'} Number:</strong> {documentNumber}</p>
          {quoteNumber && <p><strong>Quote Number:</strong> {quoteNumber}</p>}
          {orderNumber && <p><strong>Order Number:</strong> {orderNumber}</p>}
        </div>
      </div>

      <div className="text-center mb-8 border-t border-b py-4">
        <h2 className="text-xl font-bold">IJ LANGA CONSULTING (PTY) LTD</h2>
        <p className="mt-2">
          78 Tekatakho<br />
          Nelspruit, Mpumalanga, 2350, South Africa<br />
          CSD: MAAA0988528<br />
          Reg: 2020/754266/07<br />
          Tax: 4540304286
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-400 p-2 text-left">Description</th>
              <th className="border border-gray-400 p-2 text-center">Qty</th>
              <th className="border border-gray-400 p-2 text-right">Unit Price</th>
              <th className="border border-gray-400 p-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-400 p-2">{item.description}</td>
                <td className="border border-gray-400 p-2 text-center">{item.quantity}</td>
                <td className="border border-gray-400 p-2 text-right">{formatCurrency(item.unitPrice)}</td>
                <td className="border border-gray-400 p-2 text-right">{formatCurrency(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right mt-4 space-y-1">
          <p><strong>Sub-total: {formatCurrency(subtotal)}</strong></p>
          <p><strong>VAT: {formatCurrency(vat)}</strong></p>
          <p><strong>Total: {formatCurrency(total)}</strong></p>
          {creditNote && (
            <p><strong>Credit Note ({creditNote.number} – {creditNote.date}): -{formatCurrency(creditNote.amount)}</strong></p>
          )}
          {balanceDue !== undefined && (
            <p className="text-lg mt-2">
              <strong>Balance Due: {formatCurrency(balanceDue)}</strong>
            </p>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">Terms and Conditions</h2>
        <div className="text-xs space-y-1">
          {getTermsAndConditions().map((term, index) => (
            <p key={index}>{index + 1}. {term}</p>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">Banking Details</h2>
        <p>
          Bank Name: Standard Bank<br />
          Branch: Ermelo<br />
          Branch Code: 2844<br />
          Account Holder: The Director IJ Langa Consulting (Pty) Ltd<br />
          Account Number: 10186883984<br />
          Account Type: Current<br />
          SWIFT Code: SBZAZAJJ
        </p>
      </div>

      <div>
        <p><strong>For inquiries:</strong></p>
        <p>
          Email: Billings@ijlanga.co.za<br />
          Phone: 013 004 0620
        </p>
      </div>
    </div>
  );
};