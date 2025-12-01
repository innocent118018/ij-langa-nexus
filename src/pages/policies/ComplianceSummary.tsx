import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ComplianceSummary = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Compliance Summary Page</CardTitle>
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
                <li>Regulatory Compliance Overview</li>
                <li>Key Legal Registrations</li>
                <li>Professional Memberships</li>
                <li>Consumer Protection Compliance</li>
                <li>Data Protection Compliance (POPIA)</li>
                <li>Compliance Summary Table</li>
                <li>Contact Information</li>
              </ol>
            </nav>

            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p>This page summarizes IJ Langa Consulting's compliance with South African statutory, regulatory, and professional obligations. It is designed for transparency and to assure clients of our legal and professional adherence.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Regulatory Compliance Overview</h2>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Registered in terms of Companies Act, 71 of 2008</li>
                <li>Tax Registration with SARS (Tax No.: 4540304286)</li>
                <li>Financial Services Provider Registration (FSP 14279) for financial and consulting services</li>
                <li>Compliance with Consumer Protection Act, 68 of 2008</li>
                <li>Data protection compliance with POPIA, Act 4 of 2013</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Key Legal Registrations</h2>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Company Registration:</strong> 2020/754266/07</li>
                <li><strong>CSD Registration:</strong> MAAA0988528</li>
                <li><strong>Tax Reference:</strong> 4540304286</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Professional Memberships</h2>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Full Member of SAIPA (Membership No.: 92**4)</li>
                <li>Associate General Accountant at SAICA (ID: 31803869)</li>
                <li>CIBA Membership: CIBA202106-3818</li>
                <li>UIF / Labour Practitioner No.: UP59*****94</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Consumer Protection Compliance</h2>
              <p>IJ Langa Consulting adheres to the CPA with clear refund, service cancellation, and invoice policies, ensuring fair treatment and transparency for all clients.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Data Protection Compliance (POPIA)</h2>
              <p>Client data is securely stored, and all processing is aligned with POPIA standards. Clients retain rights to access, correct, and request deletion of personal information.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Compliance Summary Table</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-semibold">Compliance Area</th>
                      <th className="text-left p-2 font-semibold">Status</th>
                      <th className="text-left p-2 font-semibold">Legislation / Standard</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b">
                      <td className="p-2">Company Registration</td>
                      <td className="p-2 text-green-600 font-medium">Compliant</td>
                      <td className="p-2">Companies Act 2008</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Tax Registration</td>
                      <td className="p-2 text-green-600 font-medium">Compliant</td>
                      <td className="p-2">Income Tax Act 1962</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Financial Services</td>
                      <td className="p-2 text-green-600 font-medium">Compliant</td>
                      <td className="p-2">FSP 14279</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Consumer Rights</td>
                      <td className="p-2 text-green-600 font-medium">Compliant</td>
                      <td className="p-2">CPA 2008</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Data Protection</td>
                      <td className="p-2 text-green-600 font-medium">Compliant</td>
                      <td className="p-2">POPIA 2013</td>
                    </tr>
                    <tr>
                      <td className="p-2">Professional Membership</td>
                      <td className="p-2 text-green-600 font-medium">Active</td>
                      <td className="p-2">SAIPA / SAICA / CIBA</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Contact Information</h2>
              <ul className="space-y-1">
                <li><strong>Email:</strong> compliance@ijlanga.co.za</li>
                <li><strong>Phone:</strong> 013 004 0620</li>
                <li><strong>Website:</strong> www.ijlanga.co.za</li>
                <li><strong>Office:</strong> 78 Tekatakho, Nelspruit, Mpumalanga, 2350, South Africa</li>
              </ul>
            </section>

            <footer className="mt-8 pt-4 border-t text-xs text-muted-foreground italic">
              This page is intended for website use to provide clients and visitors with a transparent overview of IJ Langa Consulting's compliance status.
            </footer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComplianceSummary;
