
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ServicesPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Services Policy</CardTitle>
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
                <li>Overview of Services</li>
                <li>Service Commencement</li>
                <li>Client Responsibilities</li>
                <li>Third-Party Regulatory Timelines</li>
                <li>Suspension or Termination of Services</li>
                <li>Non-Liability Clause</li>
                <li>Definitions & Explanation of Terms</li>
                <li>Contact Information</li>
              </ol>
            </nav>

            <section>
              <h2 className="text-xl font-semibold mb-3">1. Overview of Services</h2>
              <p className="mb-2">IJ Langa Consulting provides accounting, taxation, payroll, company registration, statutory compliance, advisory services, B-BBEE support, NPO/NPC consulting, Trust and E-commerce consulting services. Services are delivered in compliance with:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Companies Act, 71 of 2008</li>
                <li>Income Tax Act, 1962</li>
                <li>Value-Added Tax Act, 1991</li>
                <li>FSP Regulations (14279)</li>
                <li>Other applicable statutory frameworks</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Service Commencement</h2>
              <p>All services commence upon payment confirmation. Timelines may vary based on third-party regulatory bodies such as SARS, CIPC, Banks, UIF, COIDA, CIDB, and NHBRC.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Client Responsibilities</h2>
              <p>Clients must provide accurate, complete and timely information. Delays or penalties arising from incomplete or incorrect information are the client's responsibility.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Third-Party Regulatory Timelines</h2>
              <p>IJ Langa Consulting is not responsible for delays caused by third-party institutions. All statutory and compliance deadlines are subject to the processing times of regulators.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Suspension or Termination of Services</h2>
              <p className="mb-2">The company reserves the right to suspend or terminate services due to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Non-payment of fees.</li>
                <li>Fraudulent client information.</li>
                <li>Breach of agreement or regulatory restrictions.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Non-Liability Clause</h2>
              <p>IJ Langa Consulting shall not be liable for losses resulting from third-party delays, client negligence, or regulatory decisions. Professional advice is rendered with due care, but no outcome guarantees are implied.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Definitions & Explanation of Terms</h2>
              <ul className="space-y-2">
                <li><strong>Commencement of Work:</strong> Any action taken by IJ Langa Consulting to fulfill a client order.</li>
                <li><strong>Regulator:</strong> CIPC, SARS, UIF, COIDA, CIDB, NHBRC, Banks, or similar statutory bodies.</li>
                <li><strong>Client Responsibilities:</strong> Actions required from the client to ensure accurate and timely service delivery.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Contact Information</h2>
              <ul className="space-y-1">
                <li><strong>Email:</strong> services@ijlanga.co.za</li>
                <li><strong>Phone:</strong> 013 004 0620</li>
                <li><strong>Website:</strong> www.ijlanga.co.za</li>
                <li><strong>Office:</strong> 78 Tekatakho, Nelspruit, Mpumalanga, 2350, South Africa</li>
              </ul>
            </section>

            <footer className="mt-8 pt-4 border-t text-xs text-muted-foreground italic">
              This Services Policy forms part of IJ Langa Consulting Terms & Policies and is governed by the laws of the Republic of South Africa.
            </footer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServicesPolicy;
