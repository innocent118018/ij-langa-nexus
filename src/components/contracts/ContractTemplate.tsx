import { format } from 'date-fns';

interface ContractTemplateProps {
  clientName: string;
  businessName?: string;
  industry?: string;
  email: string;
  phone: string;
  city?: string;
  country?: string;
  packageName: string;
  price: number;
  packageDescription: string;
  startDate: Date;
  endDate: Date;
  contractDate: Date;
  contractNumber: string;
}

export const ContractTemplate = ({
  clientName,
  businessName,
  industry,
  email,
  phone,
  city,
  country,
  packageName,
  price,
  packageDescription,
  startDate,
  endDate,
  contractDate,
  contractNumber
}: ContractTemplateProps) => {
  const vatAmount = price * 0.15;
  const totalWithVAT = price + vatAmount;
  const totalContract = totalWithVAT * 24; // 24 months

  return (
    <div className="contract-content prose prose-sm max-w-none text-sm">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-primary mb-2">SERVICE AGREEMENT</h1>
        <p className="text-xs text-muted-foreground">Digital Contract - Legally Binding under ECTA 2002</p>
        <p className="text-xs font-semibold">Contract No: {contractNumber}</p>
      </div>

      <p className="mb-4">
        <strong>Agreement Date:</strong> {format(contractDate, 'dd MMMM yyyy')}
      </p>

      <div className="mb-6 p-4 bg-primary/5 rounded-lg">
        <h2 className="text-lg font-bold mb-2">Service Provider:</h2>
        <p className="mb-1"><strong>IJ Langa Consulting (Pty) Ltd</strong></p>
        <p className="text-xs mb-0">Registration No: 2020/754266/07 | Tax No: 4540304286</p>
        <p className="text-xs mb-0">CSD No: MAAA0988528</p>
        <p className="text-xs mb-0">Address: 78 Tekatakho, Nelspruit, Mpumalanga, 2350, South Africa</p>
        <p className="text-xs mb-0">Email: order@ijlanga.co.za | Tel: 013 004 0620</p>
      </div>

      <div className="mb-6 p-4 bg-secondary/5 rounded-lg">
        <h2 className="text-lg font-bold mb-2">Client:</h2>
        <p className="mb-1"><strong>{clientName}</strong></p>
        {businessName && <p className="text-xs mb-0">Business Name: {businessName}</p>}
        {industry && <p className="text-xs mb-0">Industry: {industry}</p>}
        <p className="text-xs mb-0">Email: {email} | Phone: {phone}</p>
        {city && country && <p className="text-xs mb-0">Location: {city}, {country}</p>}
      </div>

      <h2 className="text-lg font-bold mt-6 mb-3">1. Agreement</h2>
      <p className="mb-4">
        This is a digital agreement made between IJ Langa Consulting (Pty) Ltd ("Service Provider") and the Client above ("Client"). 
        By electronically signing below, the Client agrees to be bound by this Agreement and the Company's Terms & Conditions, 
        Policies and applicable South African law.
      </p>

      <h2 className="text-lg font-bold mt-6 mb-3">2. Term</h2>
      <p className="mb-4">
        This Agreement begins on <strong>{format(startDate, 'dd MMMM yyyy')}</strong> and remains in force for{' '}
        <strong>two (2) years</strong> until <strong>{format(endDate, 'dd MMMM yyyy')}</strong> unless earlier terminated 
        in accordance with this Agreement.
      </p>

      <h2 className="text-lg font-bold mt-6 mb-3">3. Services</h2>
      <p className="mb-2">
        Service Provider will deliver the product selected by the Client: <strong>{packageName}</strong>
      </p>
      <div className="mb-4 p-3 bg-muted/50 rounded">
        <p className="text-xs whitespace-pre-wrap">{packageDescription}</p>
      </div>

      <h2 className="text-lg font-bold mt-6 mb-3">4. Fees, Billing and Payment</h2>
      <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded">
        <p className="font-semibold mb-2">4.1 Fee Structure:</p>
        <ul className="list-none space-y-1 text-xs">
          <li>• Monthly Fee (excl. VAT): <strong>R{price.toFixed(2)}</strong></li>
          <li>• VAT (15%): <strong>R{vatAmount.toFixed(2)}</strong></li>
          <li>• <strong>Total per month: R{totalWithVAT.toFixed(2)}</strong></li>
          <li className="pt-2 border-t border-yellow-300 dark:border-yellow-700">
            • <strong className="text-base">Total 24-month contract: R{totalContract.toFixed(2)}</strong>
          </li>
        </ul>
      </div>
      
      <p className="mb-2"><strong>4.2 24-month commitment:</strong> By accepting this agreement, the Client confirms acceptance 
      of a <strong>24-month</strong> payment obligation for the chosen subscription. Payments will be collected digitally monthly.</p>
      
      <p className="mb-2"><strong>4.3 Payment methods:</strong> All payments are collected digitally (iKhokha, EFT, card, PayFast 
      or other authorised gateway). The Client authorises IJ Langa Consulting to charge the provided payment details for recurring 
      monthly payments.</p>
      
      <p className="mb-2"><strong>4.4 Payment due date:</strong> All invoices are due <strong>within 1 day</strong> of issue unless 
      otherwise agreed. Late payments incur:</p>
      <ul className="list-disc ml-6 mb-2 text-xs">
        <li>10% late fee after 7 days</li>
        <li>R600 Letter of Demand fee after 21 days</li>
        <li>Legal action may follow</li>
      </ul>
      
      <p className="mb-4"><strong>4.5 VAT handling:</strong> Fees are exclusive of VAT unless otherwise stated. VAT will be added 
      where applicable.</p>

      <h2 className="text-lg font-bold mt-6 mb-3">5. Performance & Client Obligations</h2>
      <p className="mb-4">
        Client must supply accurate information and upload required documents (selfie holding ID, copy of ID, proof of address) 
        before services commence. Service Provider relies on Client data for filings; delays or penalties from third parties 
        (SARS, CIPC) due to incorrect/incomplete info are the Client's responsibility.
      </p>

      <h2 className="text-lg font-bold mt-6 mb-3">6. Digital Signature & Identity Verification</h2>
      <p className="mb-2">
        <strong>6.1</strong> This Agreement is executed electronically and is governed by the <strong>Electronic Communications 
        and Transactions Act, 2002 (ECTA)</strong>. Electronic signatures (click-to-accept or typed name + timestamp + IP) are 
        binding.
      </p>
      <p className="mb-4">
        <strong>6.2</strong> Prior to activation, Client must upload:
      </p>
      <ul className="list-disc ml-6 mb-4 text-xs">
        <li>Selfie holding ID (image)</li>
        <li>ID Copy (front/back)</li>
        <li>Proof of Address (not older than 3 months)</li>
      </ul>
      <p className="mb-4">
        Uploads must be complete; until verified, services will not commence. Client consents to processing of personal 
        information per privacy policy (POPIA).
      </p>

      <h2 className="text-lg font-bold mt-6 mb-3">7. Termination & Suspension</h2>
      <p className="mb-4">
        Either party may terminate with <strong>60 days' written notice</strong> after the first 24 months. For the initial 
        24-month commitment, early termination by Client does not release the Client from payment obligations except where 
        otherwise agreed in writing. Service Provider may suspend services immediately for non-payment, fraud or material breach.
      </p>

      <h2 className="text-lg font-bold mt-6 mb-3">8. Refunds</h2>
      <p className="mb-4">
        Refunds are subject to the Refund Policy. Services begun (including statutory submissions) are generally non-refundable. 
        See full refund policy at <a href="/policies/refund-policy" className="text-primary underline">ijlanga.co.za/policies/refund-policy</a>
      </p>

      <h2 className="text-lg font-bold mt-6 mb-3">9. Confidentiality & Data Protection</h2>
      <p className="mb-4">
        Parties will keep confidential information secure. Personal data is processed in accordance with <strong>POPIA</strong>. 
        Client consents to necessary disclosures to SARS, CIPC, NHBRC, CIDB or other authorities where required.
      </p>

      <h2 className="text-lg font-bold mt-6 mb-3">10. Limitation of Liability</h2>
      <p className="mb-4">
        The Service Provider's liability is limited as described in the Terms & Conditions; in no event shall liability exceed 
        amounts paid by the Client in the prior six (6) months.
      </p>

      <h2 className="text-lg font-bold mt-6 mb-3">11. Governing Law & Dispute Resolution</h2>
      <p className="mb-4">
        This Agreement is governed by the laws of the <strong>Republic of South Africa</strong>. Disputes shall be settled first 
        by good faith negotiation and then by arbitration in Mpumalanga (<strong>Arbitration Act</strong>).
      </p>

      <h2 className="text-lg font-bold mt-6 mb-3">12. Compliance with South African Law</h2>
      <p className="mb-2">This Agreement complies with:</p>
      <ul className="list-disc ml-6 mb-4 text-xs">
        <li><strong>Electronic Communications and Transactions Act, 25 of 2002 (ECTA)</strong> - Digital signatures</li>
        <li><strong>Consumer Protection Act, 68 of 2008 (CPA)</strong> - Consumer rights</li>
        <li><strong>Protection of Personal Information Act, 4 of 2013 (POPIA)</strong> - Data protection</li>
        <li><strong>Companies Act, 71 of 2008</strong></li>
        <li><strong>Income Tax Act, 58 of 1962</strong></li>
        <li><strong>Value-Added Tax Act, 89 of 1991</strong></li>
        <li><strong>Tax Administration Act, 28 of 2011</strong></li>
      </ul>

      <h2 className="text-lg font-bold mt-6 mb-3">13. Acceptance</h2>
      <p className="mb-4">
        By clicking <strong>Accept & Sign</strong> and submitting the required identity uploads, the Client acknowledges they 
        have read, understood and accepted this Agreement, the company Terms & Conditions, Refund Policy, Services Policy, 
        Invoice & Quote Policy and Privacy Policy.
      </p>

      <div className="mt-8 p-4 bg-muted/30 rounded-lg text-center">
        <p className="text-xs text-muted-foreground mb-2">
          Links to policies available at:
        </p>
        <div className="flex flex-wrap justify-center gap-2 text-xs">
          <a href="/policies/terms-conditions" className="text-primary underline">Terms & Conditions</a>
          <span>•</span>
          <a href="/policies/refund-policy" className="text-primary underline">Refund Policy</a>
          <span>•</span>
          <a href="/policies/privacy-policy" className="text-primary underline">Privacy Policy</a>
          <span>•</span>
          <a href="/policies/services-policy" className="text-primary underline">Services Policy</a>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t-2 border-border">
        <p className="text-xs text-muted-foreground text-center">
          This is a digitally executed agreement. Electronic signature will be captured upon acceptance.
        </p>
      </div>
    </div>
  );
};
