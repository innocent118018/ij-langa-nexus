
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SalesOrderPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Sales Order Policy</CardTitle>
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
                <li>Formation of Sales Orders</li>
                <li>Order Amendments & Cancellations</li>
                <li>Service Completion Dependencies</li>
                <li>Communication & Documentation</li>
                <li>Governing Law</li>
                <li>Definitions & Explanation of Terms</li>
                <li>Contact Information</li>
              </ol>
            </nav>

            <section>
              <h2 className="text-xl font-semibold mb-3">1. Overview</h2>
              <p>This Sales Order Policy governs how IJ Langa Consulting processes and confirms client sales orders, applicable to individuals, SMEs, NPOs/NPCs, Trusts, and corporate clients. It ensures compliance with the Electronic Communications and Transactions Act (ECTA), 25 of 2002 and South African commercial law.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Formation of Sales Orders</h2>
              <p>A sales order is considered confirmed once a client accepts a quote and submits payment. This constitutes a binding agreement between the client and IJ Langa Consulting.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Order Amendments & Cancellations</h2>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Changes or cancellations must be requested in writing within 24 hours of order confirmation.</li>
                <li>Requests after this period may not be accepted.</li>
                <li>Orders cannot be cancelled if services have commenced or regulatory submissions have been made.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Service Completion Dependencies</h2>
              <p>Service timelines depend on external regulators (CIPC, SARS, Banks, UIF, COIDA, CIDB, NHBRC). Delays outside our control do not constitute grounds for order cancellation or refunds.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Communication & Documentation</h2>
              <p>All correspondence regarding orders is documented to protect both parties and ensure transparency. This includes quotes, invoices, confirmation emails, and portal messages.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Governing Law</h2>
              <p>Sales orders and agreements are governed by the laws of the Republic of South Africa, including the Companies Act and ECTA.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Definitions & Explanation of Terms</h2>
              <ul className="space-y-2">
                <li><strong>Sales Order:</strong> Formal request by a client for IJ Langa services, confirmed via quote acceptance and payment.</li>
                <li><strong>ECTA:</strong> Electronic Communications and Transactions Act, 25 of 2002.</li>
                <li><strong>Commencement of Work:</strong> Any action performed by IJ Langa to fulfill the sales order.</li>
                <li><strong>Regulator:</strong> CIPC, SARS, UIF, COIDA, CIDB, NHBRC, Banks.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Contact Information</h2>
              <ul className="space-y-1">
                <li><strong>Email:</strong> orders@ijlanga.co.za</li>
                <li><strong>Phone:</strong> 013 004 0620</li>
                <li><strong>Website:</strong> www.ijlanga.co.za</li>
                <li><strong>Office:</strong> 78 Tekatakho, Nelspruit, Mpumalanga, 2350, South Africa</li>
              </ul>
            </section>

            <footer className="mt-8 pt-4 border-t text-xs text-muted-foreground italic">
              This Sales Order Policy forms part of IJ Langa Consulting Terms & Policies and is governed by the laws of the Republic of South Africa.
            </footer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesOrderPolicy;
