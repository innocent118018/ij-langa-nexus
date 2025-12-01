import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LegalDisclaimer = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Legal Disclaimer & Liability Clause</CardTitle>
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
                <li>Scope of Liability</li>
                <li>Limitation of Liability</li>
                <li>Professional Advice Disclaimer</li>
                <li>Third-Party Links & Services</li>
                <li>Governing Law</li>
                <li>Definitions & Explanation of Terms</li>
                <li>Contact Information</li>
              </ol>
            </nav>

            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p>This Legal Disclaimer & Liability Clause applies to all services, communications, and online interactions provided by IJ Langa Consulting. It aims to limit legal exposure while providing clear terms to clients, including individuals, SMEs, NPOs/NPCs, Trusts, and corporate entities.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Scope of Liability</h2>
              <p className="mb-2">IJ Langa Consulting shall exercise due care in providing professional services. However, the company is not liable for:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Losses due to third-party delays (SARS, CIPC, Banks, UIF, COIDA, NHBRC, CIDB).</li>
                <li>Losses or penalties arising from inaccurate or incomplete information provided by clients.</li>
                <li>Consequential, indirect, or incidental damages.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Limitation of Liability</h2>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Maximum liability is limited to the fees paid for the specific service rendered.</li>
                <li>IJ Langa Consulting is not responsible for client business decisions made using our advice or information.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Professional Advice Disclaimer</h2>
              <p>All advice is provided based on the information supplied and prevailing laws at the time. Clients must verify all regulatory and statutory requirements independently. No guarantee of specific outcomes is implied.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Third-Party Links & Services</h2>
              <p>IJ Langa Consulting may reference or link to third-party services. We are not responsible for the content, accuracy, or actions of such third parties.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Governing Law</h2>
              <p>This Disclaimer & Liability Clause is governed by the laws of the Republic of South Africa.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Definitions & Explanation of Terms</h2>
              <ul className="space-y-2">
                <li><strong>Liability:</strong> Legal responsibility for damages or losses.</li>
                <li><strong>Consequential Damages:</strong> Indirect losses arising from service use.</li>
                <li><strong>Professional Advice:</strong> Guidance or recommendations given by IJ Langa Consulting.</li>
                <li><strong>Third-Party:</strong> Any entity or service provider outside IJ Langa Consulting.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Contact Information</h2>
              <ul className="space-y-1">
                <li><strong>Email:</strong> legal@ijlanga.co.za</li>
                <li><strong>Phone:</strong> 013 004 0620</li>
                <li><strong>Website:</strong> www.ijlanga.co.za</li>
                <li><strong>Office:</strong> 78 Tekatakho, Nelspruit, Mpumalanga, 2350, South Africa</li>
              </ul>
            </section>

            <footer className="mt-8 pt-4 border-t text-xs text-muted-foreground italic">
              This Legal Disclaimer & Liability Clause forms part of IJ Langa Consulting Terms & Policies and is governed by South African law.
            </footer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LegalDisclaimer;
