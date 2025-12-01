
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsConditions = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Terms & Conditions</CardTitle>
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
                <li>Introduction</li>
                <li>Key Terms</li>
                <li>Payment Terms & Banking</li>
                <li>Client Obligations</li>
                <li>Intellectual Property & Ownership</li>
                <li>Governing Law</li>
                <li>Dispute Resolution</li>
                <li>Definitions & Explanation of Terms</li>
                <li>Contact Information</li>
              </ol>
            </nav>

            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p>These Terms & Conditions apply to all clients, including individuals, SMEs, NPOs/NPCs, Trusts, and corporate clients. They cover e-commerce consulting, accounting, tax, compliance, and statutory services. By using our services, clients agree to be bound by these terms.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Key Terms</h2>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>All invoices are payable within 1 day unless otherwise agreed.</li>
                <li>Invoices unpaid after 7 days incur a 10% late fee.</li>
                <li>After 21 days, a Letter of Demand (R600) is issued; court action may follow at the client's expense.</li>
                <li>Goods, documents, and outputs remain the property of IJ Langa Consulting until full payment.</li>
                <li>Clients must report invoice discrepancies within 7 working days.</li>
                <li>All quotes are valid for 7 days and require a 50% deposit to accept.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Payment Terms & Banking</h2>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Banking Details:</h4>
                <ul className="space-y-1 text-sm">
                  <li><strong>Bank:</strong> Standard Bank</li>
                  <li><strong>Branch:</strong> Ermelo (2844)</li>
                  <li><strong>Account Holder:</strong> IJ Langa Consulting (Pty) Ltd</li>
                  <li><strong>Acc No:</strong> 10186883984</li>
                  <li><strong>Account Type:</strong> Current Account</li>
                  <li><strong>SWIFT:</strong> SBZAZAJJ</li>
                </ul>
              </div>
              <p className="mt-2">Payments must reference the invoice or order number.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Client Obligations</h2>
              <p>Clients must provide accurate, complete information for all services. Delays, penalties, or additional costs due to incorrect information are the client's responsibility.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Intellectual Property & Ownership</h2>
              <p>All materials, documents, and outputs remain the intellectual property of IJ Langa Consulting until fully paid. Clients are granted a limited license to use outputs only for their intended purpose.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Governing Law</h2>
              <p>These Terms & Conditions are governed by the laws of the Republic of South Africa, including the Companies Act, CPA, and ECTA.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Dispute Resolution</h2>
              <p>Disputes should be submitted in writing to <strong>management@ijlanga.co.za</strong>. Clients retain their statutory rights and may pursue external legal remedies if necessary.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Definitions & Explanation of Terms</h2>
              <ul className="space-y-2">
                <li><strong>Invoice:</strong> A formal request for payment for services rendered.</li>
                <li><strong>Quote:</strong> Estimated cost for requested services.</li>
                <li><strong>Letter of Demand (LOD):</strong> Legal notice to recover unpaid fees.</li>
                <li><strong>Goods & Outputs:</strong> Services, documents, digital or physical materials delivered to clients.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Contact Information</h2>
              <ul className="space-y-1">
                <li><strong>Email:</strong> billings@ijlanga.co.za</li>
                <li><strong>Phone:</strong> 013 004 0620</li>
                <li><strong>Website:</strong> www.ijlanga.co.za</li>
                <li><strong>Office:</strong> 78 Tekatakho, Nelspruit, Mpumalanga, 2350, South Africa</li>
              </ul>
            </section>

            <footer className="mt-8 pt-4 border-t text-xs text-muted-foreground italic">
              These Terms & Conditions form part of IJ Langa Consulting Terms & Policies and are governed by South African law.
            </footer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsConditions;
