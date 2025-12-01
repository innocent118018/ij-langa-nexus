import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ClientRights = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Client Rights & Responsibilities</CardTitle>
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
                <li>Client Rights</li>
                <li>Client Responsibilities</li>
                <li>Fair Treatment & Transparency</li>
                <li>Dispute Resolution</li>
                <li>Definitions & Explanation of Terms</li>
                <li>Contact Information</li>
              </ol>
            </nav>

            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p>IJ Langa Consulting is committed to providing high-quality services while protecting client interests. This document outlines the rights and responsibilities of clients engaging with our consulting services, including individuals, SMEs, NPOs/NPCs, Trusts, and corporate clients.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Client Rights</h2>
              <p className="mb-2">Clients are entitled to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Receive professional, timely, and accurate services.</li>
                <li>Access their personal and company information in accordance with POPIA.</li>
                <li>Receive clear invoices, quotes, and service agreements.</li>
                <li>Request service refunds or credits according to our Refund and Cancellation Policies.</li>
                <li>Escalate disputes for independent review or management attention.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Client Responsibilities</h2>
              <p className="mb-2">Clients are expected to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Provide complete, accurate, and timely information for all services.</li>
                <li>Make payments promptly according to invoices and quotes.</li>
                <li>Comply with applicable regulations and cooperate with IJ Langa Consulting.</li>
                <li>Notify IJ Langa Consulting of any changes affecting service delivery.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Fair Treatment & Transparency</h2>
              <p>IJ Langa Consulting guarantees transparency, fairness, and accountability. All client interactions, agreements, and communications are documented to ensure legal compliance and mutual understanding.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Dispute Resolution</h2>
              <p>Disputes or complaints may be submitted to <strong>management@ijlanga.co.za</strong>. IJ Langa Consulting ensures fair, unbiased resolution in line with statutory rights and internal policies.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Definitions & Explanation of Terms</h2>
              <ul className="space-y-2">
                <li><strong>Client:</strong> Any individual or entity using IJ Langa Consulting services.</li>
                <li><strong>Service:</strong> Any consulting, statutory, accounting, tax, or compliance service provided.</li>
                <li><strong>Refund / Service Credit:</strong> Non-cash value issued for services canceled or disputed.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Contact Information</h2>
              <ul className="space-y-1">
                <li><strong>Email:</strong> clients@ijlanga.co.za</li>
                <li><strong>Phone:</strong> 013 004 0620</li>
                <li><strong>Website:</strong> www.ijlanga.co.za</li>
                <li><strong>Office:</strong> 78 Tekatakho, Nelspruit, Mpumalanga, 2350, South Africa</li>
              </ul>
            </section>

            <footer className="mt-8 pt-4 border-t text-xs text-muted-foreground italic">
              This document forms part of IJ Langa Consulting Terms & Policies and is governed by South African law.
            </footer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientRights;
