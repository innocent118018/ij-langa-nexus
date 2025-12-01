import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ServiceCancellation = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Service Cancellation & Refund Policy</CardTitle>
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
                <li>Client Cancellation Rights</li>
                <li>Cancellation by IJ Langa Consulting</li>
                <li>Short Notice Cancellations</li>
                <li>Non-Refundable Services</li>
                <li>Refund Processing</li>
                <li>Dispute Resolution</li>
                <li>Definitions & Explanation of Terms</li>
                <li>Contact Information</li>
              </ol>
            </nav>

            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p>At IJ Langa Consulting, we value transparency, professionalism, and compliance with South African law, including the Consumer Protection Act (CPA), Companies Act, and other statutory frameworks. This policy explains how service cancellations and refunds are managed for individuals, SMEs, NPOs/NPCs, Trusts, and corporate clients.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Client Cancellation Rights</h2>
              <ul className="space-y-2">
                <li><strong>Cooling-Off Period (7 Days):</strong> Clients who purchase services electronically may cancel within 7 days of purchase if no work has commenced and receive full service credits.</li>
                <li><strong>Before Work Commences:</strong> Full service credit will be issued if cancellation occurs before any professional work begins.</li>
                <li><strong>After Work Commences:</strong> If work has started, clients may be charged for the portion of services already rendered, and any remaining balance may be issued as service credits.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Cancellation by IJ Langa Consulting</h2>
              <p className="mb-2">The company reserves the right to cancel services due to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Non-payment or failed transactions.</li>
                <li>Fraudulent or misleading client information.</li>
                <li>Regulatory or unforeseen circumstances beyond control.</li>
              </ul>
              <p className="mt-2">In such cases, clients will be notified promptly, and advance payments will be refunded as service credits after deducting any costs incurred.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Short Notice Cancellations</h2>
              <p>Cancellations made less than 24 hours before scheduled appointments may incur a 50% cancellation fee to cover administrative and professional time.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Non-Refundable Services</h2>
              <p className="mb-2">Services that are non-refundable once processing has begun include:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>CIPC submissions (Company Registration, Amendments, Annual Returns).</li>
                <li>SARS registrations and tax submissions.</li>
                <li>Certificate applications (B-BBEE, COIDA, NHBRC, CIDB).</li>
                <li>Government or statutory filing fees.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Refund Processing</h2>
              <p>Approved refunds (service credits) are processed within 7–14 working days. Administrative or bank charges may be deducted if applicable. Service credits are valid for 12 months from date of issuance.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Dispute Resolution</h2>
              <p>Clients disputing cancellation or refund outcomes may escalate the matter in writing to <strong>management@ijlanga.co.za</strong>. All disputes are reviewed fairly and in accordance with statutory consumer rights.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Definitions & Explanation of Terms</h2>
              <ul className="space-y-2">
                <li><strong>Service Credits:</strong> Non-cash value issued for future IJ Langa services.</li>
                <li><strong>Commencement of Work:</strong> Any professional action taken by IJ Langa Consulting.</li>
                <li><strong>Short Notice:</strong> Less than 24 hours before scheduled service.</li>
                <li><strong>CPA:</strong> Consumer Protection Act, 68 of 2008.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Contact Information</h2>
              <ul className="space-y-1">
                <li><strong>Email:</strong> order@ijlanga.co.za</li>
                <li><strong>Phone:</strong> 013 004 0620</li>
                <li><strong>Website:</strong> www.ijlanga.co.za</li>
                <li><strong>Office:</strong> 78 Tekatakho, Nelspruit, Mpumalanga, 2350, South Africa</li>
              </ul>
            </section>

            <footer className="mt-8 pt-4 border-t text-xs text-muted-foreground italic">
              This policy forms part of IJ Langa Consulting Terms & Policies and is governed by the laws of South Africa.
            </footer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceCancellation;
