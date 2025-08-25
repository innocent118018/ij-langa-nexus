
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const InvoiceQuotePolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Invoice & Quote Policy</CardTitle>
            <div className="text-center text-gray-600 space-y-1">
              <p><strong>IJ Langa Consulting (Pty) Ltd</strong></p>
              <p>78 Tekatakho, Nelspruit, Mpumalanga, 2350, South Africa</p>
              <p>CSD No.: MAAA0988528 | Reg. No.: 2020/754266/07 | Tax No.: 4540304286</p>
              <p><strong>CEO:</strong> Mr. Innocent Joseph Langa</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p>
              All quotes are valid for seven (7) days from the issue date and require a 50% deposit to confirm acceptance. Quotes are subject to change if not accepted within the validity period.
            </p>
            
            <p>
              Invoices are payable within one (1) day of issue unless otherwise agreed. According to the <strong>Prescription Act (1969)</strong> and <strong>Companies Act (2008)</strong>, overdue invoices incur a <strong>10% late payment fee after 7 days</strong>. After twenty-one (21) days, a <strong>Letter of Demand</strong> is issued with an additional fee of R600.
            </p>
            
            <p>
              Unpaid accounts may be handed over to <strong>Daniel Attorneys</strong>, our legal partner, in line with the <strong>Magistrates' Courts Act (1944)</strong>. Clients will be liable for all legal costs incurred.
            </p>
            
            <p>
              Goods and services remain the property of IJ Langa Consulting until full payment has been made, as per South African contract law.
            </p>
            
            <p>
              Clients must report invoice discrepancies within seven (7) working days and reference invoice/order numbers when making payment.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvoiceQuotePolicy;
