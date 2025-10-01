import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { DocumentUploadStep } from './DocumentUploadStep';
import { ServiceApplicationForm } from './ServiceApplicationForm';
import { Loader2, FileText, Download, Share2, Printer, Mail } from 'lucide-react';

interface ServiceContractModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packageData: {
    id: string;
    name: string;
    price: number;
    features: string[];
  };
}

export const ServiceContractModal = ({ open, onOpenChange, packageData }: ServiceContractModalProps) => {
  const [step, setStep] = useState<'contract' | 'documents' | 'application'>('contract');
  const [agreed, setAgreed] = useState(false);
  const [contractId, setContractId] = useState<string | null>(null);
  const { toast } = useToast();

  const contractText = `
DIGITAL SERVICE AGREEMENT

This Service Agreement ("Agreement") is entered into as of ${new Date().toLocaleDateString('en-ZA')} between:

IJ LANGA CONSULTING (PTY) LTD
Registration Number: 2020/754266/07
Tax Number: 4540304286
CSD Number: MAAA0988528
Address: 78 Tekatakho, Nelspruit, Mpumalanga, 2350, South Africa
CEO: Mr. Innocent Joseph Langa
("Service Provider")

AND

The Client identified in the Service Application Form
("Client")

1. DIGITAL AGREEMENT ACKNOWLEDGMENT

1.1. This is a legally binding digital agreement entered into in accordance with the Electronic Communications and Transactions Act, 25 of 2002 (ECTA).
1.2. By electronically signing this agreement, both parties acknowledge and accept the terms herein.
1.3. This digital signature has the same legal effect as a handwritten signature under South African law.

2. SERVICE PACKAGE

2.1. The Client subscribes to the "${packageData.name}" package at a monthly fee of R${packageData.price.toFixed(2)} plus VAT.
2.2. This agreement is for a period of TWELVE (12) MONTHS from the date of signing.
2.3. The monthly subscription includes the following services:
${packageData.features.map(f => `   - ${f}`).join('\n')}

3. PAYMENT TERMS (aligned with Terms & Conditions)

3.1. Payment is due within ONE (1) day of invoice issue unless otherwise agreed.
3.2. Late payments after SEVEN (7) days will incur a 10% late payment fee.
3.3. After TWENTY-ONE (21) days without payment, a Letter of Demand will be issued at a cost of R600.
3.4. Failure to settle after demand may result in legal action at the Client's expense.
3.5. All services remain the property of IJ Langa Consulting until full payment is received.

4. CLIENT OBLIGATIONS

4.1. The Client must provide accurate, complete, and timely information as required by the Tax Administration Act, 28 of 2011.
4.2. Failure to provide information may result in penalties from SARS, CIPC, or other regulatory bodies, for which the Client is solely responsible.
4.3. The Client must notify IJ Langa Consulting of any material changes to their business within 7 days.

5. SERVICE PROVIDER OBLIGATIONS

5.1. IJ Langa Consulting will provide services in accordance with:
   - Companies Act, 71 of 2008
   - Income Tax Act, 58 of 1962
   - Value-Added Tax Act, 89 of 1991
   - Tax Administration Act, 28 of 2011
   - All other applicable South African legislation

5.2. Services will be delivered by qualified professionals registered with SAIBA (Registration #16176).

6. REFUND POLICY (in accordance with Consumer Protection Act)

6.1. Refunds are only available where:
   - Services have not yet commenced
   - Payment was made in error
   - Duplicate payment occurred

6.2. No refunds will be granted once professional services have commenced, especially where statutory submissions have been filed.
6.3. Refund requests must be submitted in writing within SEVEN (7) working days of payment.
6.4. Approved refunds will be processed within FOURTEEN (14) business days.

7. TERMINATION

7.1. Either party may terminate this agreement with THIRTY (30) days written notice.
7.2. The Client remains liable for all fees incurred up to the termination date.
7.3. All outstanding invoices must be settled before termination takes effect.
7.4. IJ Langa Consulting reserves the right to terminate immediately in cases of fraud, non-payment, or breach of agreement.

8. PRIVACY & DATA PROTECTION (POPIA Compliance)

8.1. IJ Langa Consulting complies with the Protection of Personal Information Act, 4 of 2013 (POPIA).
8.2. Personal and company information will only be shared with SARS, CIPC, and other regulatory bodies where legally required.
8.3. The Client consents to the collection, processing, and storage of their information for service delivery purposes.
8.4. Information Officer: Mr. Innocent Joseph Langa (privacy@ijlanga.co.za)

9. LEGAL PARTNERSHIP

9.1. Unpaid accounts may be handed over to Daniel Attorneys, our legal partner, in accordance with the Magistrates' Courts Act, 32 of 1944.
9.2. The Client will be liable for all legal costs incurred in debt recovery.

10. GOVERNING LAW

10.1. This Agreement is governed by the laws of the Republic of South Africa.
10.2. Any disputes shall be subject to the jurisdiction of South African courts.

11. ENTIRE AGREEMENT

11.1. This Agreement, together with the Terms & Conditions, Privacy Policy, and all other policies available at https://ijlanga.co.za/policies/, constitutes the entire agreement between the parties.
11.2. No amendments shall be valid unless made in writing and signed by both parties.

BANKING DETAILS FOR PAYMENTS:
Bank: Standard Bank
Branch: Ermelo (2844)
Account Holder: IJ Langa Consulting (Pty) Ltd
Account Number: 10186883984
Account Type: Current Account
SWIFT: SBZAZAJJ

For inquiries:
Email: billings@ijlanga.co.za
Phone: 013 004 0620

SAIBA Registered: #16176
Professional accounting services certified by the South African Institute of Business Accountants

By clicking "I Agree and Sign", you acknowledge that you have read, understood, and agree to be bound by this Service Agreement and all referenced policies.
  `.trim();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Service Contract - IJ Langa Consulting',
          text: contractText,
        });
        toast({ title: "Contract shared successfully" });
      } catch (error) {
        toast({ title: "Unable to share", variant: "destructive" });
      }
    } else {
      navigator.clipboard.writeText(contractText);
      toast({ title: "Contract copied to clipboard" });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([contractText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IJ-Langa-Service-Contract-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Contract downloaded" });
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow?.document.write('<html><head><title>Service Contract</title>');
    printWindow?.document.write('<style>body{font-family:Arial,sans-serif;padding:20px;line-height:1.6}</style>');
    printWindow?.document.write('</head><body>');
    printWindow?.document.write('<pre>' + contractText + '</pre>');
    printWindow?.document.write('</body></html>');
    printWindow?.document.close();
    printWindow?.print();
  };

  const handleAgreeAndProceed = () => {
    if (!agreed) {
      toast({
        title: "Agreement Required",
        description: "Please confirm you have read and agree to the terms",
        variant: "destructive"
      });
      return;
    }
    setStep('documents');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {step === 'contract' && 'Service Agreement - Digital Contract'}
            {step === 'documents' && 'Upload Required Documents'}
            {step === 'application' && 'Service Application Form'}
          </DialogTitle>
        </DialogHeader>

        {step === 'contract' && (
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-sm">
                <strong>12-Month Subscription Notice:</strong> By subscribing to this package, you agree to a 12-month service commitment.
              </p>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
            </div>

            <ScrollArea className="h-[400px] border rounded-lg p-4 bg-muted/30">
              <pre className="whitespace-pre-wrap text-sm font-mono">{contractText}</pre>
            </ScrollArea>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="agree"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked as boolean)}
              />
              <label
                htmlFor="agree"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I have read and agree to the Service Agreement and all referenced policies
              </label>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleAgreeAndProceed} disabled={!agreed}>
                I Agree and Sign
              </Button>
            </div>
          </div>
        )}

        {step === 'documents' && (
          <DocumentUploadStep
            packageId={packageData.id}
            onComplete={(id) => {
              setContractId(id);
              setStep('application');
            }}
            onBack={() => setStep('contract')}
          />
        )}

        {step === 'application' && contractId && (
          <ServiceApplicationForm
            contractId={contractId}
            packageName={packageData.name}
            onComplete={() => {
              toast({
                title: "Application Submitted",
                description: "Your service application has been successfully submitted. We'll contact you shortly."
              });
              onOpenChange(false);
            }}
            onBack={() => setStep('documents')}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};