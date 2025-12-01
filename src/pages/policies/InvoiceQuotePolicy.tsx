
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const InvoiceQuotePolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Invoice & Quote Policy</CardTitle>
            <div className="text-center text-muted-foreground space-y-1 text-sm">
              <p><strong>IJ Langa Consulting (Pty) Ltd</strong></p>
              <p>78 Tekatakho, Nelspruit, Mpumalanga, 2350, South Africa</p>
              <p>CSD No.: MAAA0988528 | Reg. No.: 2020/754266/07 | Tax No.: 4540304286</p>
              <p>FSP No.: 14279</p>
              <p><strong>CEO:</strong> Mr. Innocent Joseph Langa</p>
              <p className="text-xs pt-2">Document Version: <strong>Version 1.0 — Effective 01 December 2025</strong></p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <nav className="border-b pb-4">
              <h3 className="font-semibold mb-2">Index</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>Overview</li>
                <li>Quote Validity & Acceptance</li>
                <li>Deposits & Payment Terms</li>
                <li>Late Payment Fees & Legal Steps</li>
                <li>Ownership of Goods & Services</li>
                <li>Invoice Discrepancies</li>
                <li>Definitions & Explanation of Terms</li>
                <li>Contact Information</li>
              </ol>
            </nav>

            <section>
              <h2 className="text-xl font-semibold mb-3">1. Overview</h2>
              <p>This policy governs all quotes and invoices issued by IJ Langa Consulting. It applies to individuals, SMEs, NPOs/NPCs, Trusts, and corporate clients, including e-commerce consulting services.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Quote Validity & Acceptance</h2>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>All quotes are valid for seven (7) days from the date issued.</li>
                <li>Acceptance of a quote requires a 50% deposit unless otherwise stated.</li>
                <li>Quotes may be updated if acceptance occurs after the validity period.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Deposits & Payment Terms</h2>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Deposits secure the service and enable commencement.</li>
                <li>Full payment is due within one (1) day of invoice issuance unless agreed otherwise.</li>
                <li>Payment methods include electronic transfers, EFT, and approved online payments.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Late Payment Fees & Legal Steps</h2>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Invoices unpaid after 7 days incur a 10% late payment fee.</li>
                <li>After 21 days, a Letter of Demand is issued with an additional fee of R600.</li>
                <li>Persistent non-payment may result in handover to Daniel Attorneys, with the client liable for legal costs.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Ownership of Goods & Services</h2>
              <p>Goods, documents, and outputs remain the property of IJ Langa Consulting until full payment is received, in accordance with South African contract law.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Invoice Discrepancies</h2>
              <p>Clients must report any invoice discrepancies within seven (7) working days from receipt. All communications should reference the invoice or order number to ensure accurate resolution.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Definitions & Explanation of Terms</h2>
              <ul className="space-y-2">
                <li><strong>Quote:</strong> A formal statement of estimated cost for requested services.</li>
                <li><strong>Deposit:</strong> Partial upfront payment confirming acceptance.</li>
                <li><strong>Invoice:</strong> A formal request for payment issued upon acceptance of services or work commencement.</li>
                <li><strong>Letter of Demand (LOD):</strong> Formal notice requesting payment before legal action.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Contact Information</h2>
              <ul className="space-y-1">
                <li><strong>Email:</strong> billing@ijlanga.co.za</li>
                <li><strong>Phone:</strong> 013 004 0620</li>
                <li><strong>Website:</strong> www.ijlanga.co.za</li>
                <li><strong>Office:</strong> 78 Tekatakho, Nelspruit, Mpumalanga, 2350, South Africa</li>
              </ul>
            </section>

            <footer className="mt-8 pt-4 border-t text-xs text-muted-foreground italic">
              This Invoice & Quote Policy forms part of IJ Langa Consulting Terms & Policies and is governed by the laws of the Republic of South Africa.
            </footer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvoiceQuotePolicy;
