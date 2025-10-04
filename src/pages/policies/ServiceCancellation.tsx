import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ServiceCancellation = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Service Cancellation & Refund Policy</CardTitle>
            <div className="text-center text-muted-foreground space-y-1 mt-4">
              <p><strong>IJ Langa Consulting (Pty) Ltd</strong></p>
              <p>78 Tekatakho, Nelspruit, Mpumalanga, 2350, South Africa</p>
              <p>CSD No.: MAAA0988528 | Reg. No.: 2020/754266/07 | Tax No.: 4540304286</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                At IJ Langa Consulting (Pty) Ltd, we value transparency and fairness in all our dealings with clients. This policy explains how cancellations and refunds are handled.
              </AlertDescription>
            </Alert>

            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Client Cancellations</h2>
              
              <div className="space-y-4 ml-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Cooling-Off Period (7 Days)</h3>
                  <p>
                    In accordance with the <strong>Consumer Protection Act (CPA)</strong>, clients who purchase services via electronic communication (e.g., website, email, WhatsApp) may cancel within <strong>7 days of purchase</strong> and receive a full refund, provided work has not commenced.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Before Work Commences</h3>
                  <p>
                    If the client cancels before any work or submission has started, a <strong>full refund</strong> will be issued.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">After Work Commences</h3>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>If work has started but is incomplete, the client will be charged for work already performed, and the balance may be refunded.</li>
                    <li>If services have been fully rendered (e.g., documents submitted to SARS, CIPC, or other authorities), <strong>no refund will be issued</strong>.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Short Notice Cancellations</h3>
                  <p>
                    For cancellations made less than 24 hours before a scheduled consultation/appointment, a <strong>50% cancellation fee</strong> may apply.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Cancellation by IJ Langa Consulting</h2>
              <p className="mb-3">The Company reserves the right to cancel a service in cases of:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Non-payment or failed transactions</li>
                <li>Fraudulent or misleading client information</li>
                <li>Circumstances beyond our control (e.g., regulatory restrictions)</li>
              </ul>
              <p className="mt-3">
                In such cases, clients will be notified promptly, and any advance payments (less costs incurred) will be refunded.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Non-Refundable Services</h2>
              <p className="mb-3">The following services are non-refundable once processing has begun:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>CIPC submissions</strong> (Company Registration, Amendments, Annual Returns)</li>
                <li><strong>SARS registrations</strong>, tax return submissions, and compliance filings</li>
                <li><strong>Certificate applications</strong> (B-BBEE, COIDA, NHBRC, CIDB, etc.)</li>
                <li><strong>Any government/statutory filing fees</strong></li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Refund Processing</h2>
              <ul className="list-disc ml-6 space-y-2">
                <li>Approved refunds will be processed within <strong>7–14 working days</strong> via the original payment method.</li>
                <li>Administrative or bank charges may be deducted where applicable.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Dispute Resolution</h2>
              <p>
                If a client disputes a cancellation or refund outcome, the matter may be escalated in writing to{' '}
                <a href="mailto:management@ijlanga.co.za" className="text-primary hover:underline">
                  management@ijlanga.co.za
                </a>
                . Disputes will be reviewed fairly, and clients retain their rights under the Consumer Protection Act.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Contact Us</h2>
              <p className="mb-3">For cancellations, rescheduling, or refund requests, please contact us at:</p>
              <div className="space-y-2 ml-4">
                <p>📧 Email: <a href="mailto:order@ijlanga.co.za" className="text-primary hover:underline">order@ijlanga.co.za</a></p>
                <p>📞 Phone: 013 004 0620</p>
                <p>🌐 Website: <a href="https://www.ijlanga.co.za" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.ijlanga.co.za</a></p>
              </div>
            </section>

            <Alert className="mt-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>⚖️ Legal Note:</strong> This policy is in line with the Consumer Protection Act (CPA), 2008, and other relevant South African regulations.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceCancellation;
