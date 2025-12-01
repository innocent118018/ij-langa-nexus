
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Privacy Policy (POPIA-Aligned)</CardTitle>
            <div className="text-center text-muted-foreground space-y-1 text-sm">
              <p><strong>IJ Langa Consulting (Pty) Ltd</strong></p>
              <p>78 Tekatakho, Nelspruit, Mpumalanga, 2350, South Africa</p>
              <p>CSD No.: MAAA0988528 | Reg. No.: 2020/754266/07 | Tax No.: 4540304286</p>
              <p>FSP No.: 14279</p>
              <p><strong>CEO & Information Officer:</strong> Mr. Innocent Joseph Langa</p>
              <p className="text-xs pt-2">Document Version: <strong>Version 1.0 — Effective 01 December 2025</strong></p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <nav className="border-b pb-4">
              <h3 className="font-semibold mb-2">Index</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>Introduction</li>
                <li>Personal Information Collection</li>
                <li>Use of Information</li>
                <li>Data Sharing & Third Parties</li>
                <li>Client Rights</li>
                <li>Security Measures</li>
                <li>Definitions & Explanation of Terms</li>
                <li>Contact Information</li>
              </ol>
            </nav>

            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p>IJ Langa Consulting is committed to protecting the privacy and confidentiality of all personal and corporate information in accordance with the Protection of Personal Information Act (POPIA), Act 4 of 2013, and other relevant legislation. This policy applies to all clients, including individuals, SMEs, NPOs/NPCs, Trusts, and corporate entities.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Personal Information Collection</h2>
              <p className="mb-2">Information collected may include:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Identity numbers, addresses, and contact details</li>
                <li>Company registration documents and business information</li>
                <li>Financial records and tax information</li>
                <li>Any data necessary for regulatory compliance and service delivery</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Use of Information</h2>
              <p className="mb-2">Collected information is used for:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Service delivery (accounting, tax, registration, compliance)</li>
                <li>Statutory reporting to regulators (SARS, CIPC, UIF, COIDA, CIDB, NHBRC)</li>
                <li>Communication regarding client services</li>
                <li>Internal business administration and audits</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Data Sharing & Third Parties</h2>
              <p>Client information is shared only when legally required with regulatory authorities. Authorized IJ Langa staff bound by confidentiality may access client data for legitimate business purposes.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Client Rights</h2>
              <p className="mb-2">Clients have the right to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Access their personal information</li>
                <li>Request corrections or updates</li>
                <li>Request deletion of personal data, subject to regulatory obligations</li>
              </ul>
              <p className="mt-2">Requests must be submitted to <strong>privacy@ijlanga.co.za</strong> in accordance with POPIA Sections 18–23.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Security Measures</h2>
              <p>IJ Langa Consulting employs administrative, technical, and physical safeguards to protect personal and corporate information against unauthorized access, loss, or disclosure.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Definitions & Explanation of Terms</h2>
              <ul className="space-y-2">
                <li><strong>POPIA:</strong> Protection of Personal Information Act, Act 4 of 2013</li>
                <li><strong>Personal Information:</strong> Any information relating to an identifiable individual or entity</li>
                <li><strong>Regulatory Compliance:</strong> Obligations to report or provide data to government or statutory bodies</li>
                <li><strong>Authorized Staff:</strong> Employees or contractors who require access to perform their duties and are bound by confidentiality.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Contact Information</h2>
              <ul className="space-y-1">
                <li><strong>Email:</strong> privacy@ijlanga.co.za</li>
                <li><strong>Phone:</strong> 013 004 0620</li>
                <li><strong>Website:</strong> www.ijlanga.co.za</li>
                <li><strong>Office:</strong> 78 Tekatakho, Nelspruit, Mpumalanga, 2350, South Africa</li>
              </ul>
            </section>

            <footer className="mt-8 pt-4 border-t text-xs text-muted-foreground italic">
              This Privacy Policy forms part of IJ Langa Consulting Terms & Policies and is governed by the laws of the Republic of South Africa.
            </footer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
