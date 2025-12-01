
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RefundPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Refund Policy</CardTitle>
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
                <li>Eligibility for Refunds</li>
                <li>Refund Method (Service Credits)</li>
                <li>Non‑Refundable Services</li>
                <li>Duplicate or Erroneous Payments</li>
                <li>Refund Request Procedure</li>
                <li>Processing Times & Credit Validity</li>
                <li>Disputes & Appeals</li>
                <li>Definitions & Explanation of Terms</li>
                <li>Contact Information</li>
              </ol>
            </nav>

            <section>
              <h2 className="text-xl font-semibold mb-3">1. Overview</h2>
              <p>IJ Langa Consulting (Pty) Ltd is committed to fair, transparent and legally compliant refund procedures that reflect the nature of professional consulting and statutory services. This Refund Policy is aligned with the Consumer Protection Act, 68 of 2008 ("CPA"), the Companies Act, and applicable financial services regulations (FSP 14279). Because many of our services require immediate professional work and interactions with third‑party regulators (for example CIPC and SARS), refunds are issued primarily as <strong>service credits</strong> rather than cash refunds.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Eligibility for Refunds</h2>
              <p className="mb-2">Refunds (service credits) will only be considered where one of the following applies:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>The client cancels a service <strong>before any professional work has commenced</strong>.</li>
                <li>A payment was made <strong>in error</strong> (for example wrong amount, wrong invoice), and proof is provided.</li>
                <li>A <strong>duplicate payment</strong> is received and verified against our records.</li>
              </ul>
              <p className="mt-2">Clients must submit a written refund request within <strong>seven (7) working days</strong> of the payment date. Requests received after this period will be considered only at the Company's discretion and may be subject to further review.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Refund Method (Service Credits)</h2>
              <p className="mb-2">Approved refunds will be issued as <strong>service credits</strong> to the client's IJ Langa account. Service credits:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>May be applied to any IJ Langa Consulting service (accounting, tax, company registration, payroll, advisory, B‑BBEE services, etc.).</li>
                <li>Expire <strong>12 months</strong> after issuance unless otherwise agreed in writing.</li>
                <li>Are non‑transferable to third parties except where expressly authorised by IJ Langa Consulting in writing.</li>
              </ul>
              <p className="mt-2">The decision to issue credits (rather than cash) is driven by the professional nature of services and the administrative cost of refunding statutory fees already paid to third parties.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Non‑Refundable Services</h2>
              <p className="mb-2">No refunds (credits or cash) will be issued for fees where professional work has commenced or regulatory submissions have been made, including but not limited to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Company registrations or amendments filed with CIPC.</li>
                <li>Tax returns, registrations or submissions to SARS.</li>
                <li>Statutory certificates or applications (B‑BBEE, COIDA, NHBRC, CIDB, etc.) once submitted.</li>
                <li>Any statutory or third‑party fees already paid to regulators or government bodies.</li>
                <li>Work where the client has been given final documents or digital outputs (e.g., signed templates) and has accepted delivery.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Duplicate or Erroneous Payments</h2>
              <p>When duplicate or erroneous payments are identified and verified, IJ Langa Consulting will issue service credits equivalent to the duplicate amount, or—where appropriate and only at the Company's discretion—arrange a cash reimbursement subject to bank processing charges and internal approval.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Refund Request Procedure</h2>
              <p className="mb-2">To request a refund (credit), clients must follow these steps:</p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Submit a written request to <strong>billing@ijlanga.co.za</strong> or via the client portal within seven (7) working days of payment. Include payment proof, invoice number, and a short explanation.</li>
                <li>Our billing team will acknowledge receipt within <strong>3 business days</strong> and begin verification.</li>
                <li>Verification may require additional documentation; failure to provide requested documentation within 7 business days may delay or void the request.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Processing Times & Credit Validity</h2>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Approved refunds (credits) will be processed within <strong>fourteen (14) business days</strong> after verification is complete.</li>
                <li>Credits will appear in the client's IJ Langa account and an email confirmation will be sent.</li>
                <li>If a cash reimbursement is authorised in exceptional cases, bank transfer times and bank fees will apply and may extend processing times.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Disputes & Appeals</h2>
              <p>If a client disputes the outcome of a refund request, they may escalate the matter in writing to <strong>management@ijlanga.co.za</strong> within 14 days of the outcome notification. All appeals will be reviewed by senior management and a written response will be provided within 10 business days. Clients retain their statutory rights under the CPA and may pursue external dispute resolution avenues if appropriate.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Definitions & Explanation of Terms</h2>
              <ul className="space-y-2">
                <li><strong>Service Credits:</strong> Non‑cash value issued by IJ Langa Consulting to a client account, redeemable for future services. Credits are valid for 12 months from the date of issue.</li>
                <li><strong>Commencement of Work:</strong> The moment any professional action is taken by IJ Langa Consulting in relation to a client order, including drafting, filing, verification, communication with regulators, or other preparatory work.</li>
                <li><strong>Statutory Fees:</strong> Fees charged by government, regulatory or third‑party bodies which are paid on behalf of a client (for example CIPC filing fees, SARS penalties, certificate application fees).</li>
                <li><strong>Working Days / Business Days:</strong> Monday to Friday, excluding public holidays in South Africa.</li>
                <li><strong>Consumer Protection Act (CPA):</strong> South African legislation that provides, among other things, cooling‑off rights and consumer remedies for certain electronic transactions.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Contact Information</h2>
              <p className="mb-2">For refund requests, questions or escalation:</p>
              <ul className="space-y-1">
                <li><strong>Billing & Refunds:</strong> billing@ijlanga.co.za</li>
                <li><strong>Escalation / Management:</strong> management@ijlanga.co.za</li>
                <li><strong>Phone:</strong> 013 004 0620</li>
                <li><strong>Postal / Office:</strong> 78 Tekatakho, Nelspruit, Mpumalanga, 2350, South Africa</li>
              </ul>
            </section>

            <footer className="mt-8 pt-4 border-t text-xs text-muted-foreground italic">
              This Refund Policy forms part of the IJ Langa Consulting Terms & Policies and is governed by the laws of the Republic of South Africa.
            </footer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RefundPolicy;
