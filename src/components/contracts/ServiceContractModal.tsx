import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { BillingInformationForm } from "./BillingInformationForm";
import { ContractTemplate } from "./ContractTemplate";
import { CheckCircle, FileText, AlertCircle } from "lucide-react";
import { addMonths } from "date-fns";

interface ServiceContractModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packageData: {
    id: string;
    name: string;
    price: number;
    features: string[];
    description?: string;
  };
}

export const ServiceContractModal = ({ open, onOpenChange, packageData }: ServiceContractModalProps) => {
  const [step, setStep] = useState<"contract" | "billing" | "complete">("contract");
  const [contractId, setContractId] = useState<string | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  const [contractNumber, setContractNumber] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const [clientName, setClientName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const scrollAreaRef = useState<HTMLDivElement | null>(null);
  const { toast } = useToast();

  const startDate = new Date();
  const endDate = addMonths(startDate, 24); // 24 months (2 years)
  
  const packageDescription = packageData.description || packageData.features.join('\n• ');

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const bottom = Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) < 5;
    setScrolledToBottom(bottom);
  };

  const scrollToTop = () => {
    const scrollArea = document.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollArea) {
      scrollArea.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToBottom = () => {
    const scrollArea = document.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollArea) {
      scrollArea.scrollTo({ top: scrollArea.scrollHeight, behavior: 'smooth' });
    }
  };

  const handleAccept = async () => {
    if (!scrolledToBottom) {
      toast({
        title: "Please Read Contract",
        description: "Scroll to the bottom of the contract to continue",
        variant: "destructive"
      });
      return;
    }

    if (!clientName || !companyName || !address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all client details",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to continue",
          variant: "destructive"
        });
        return;
      }

      // Generate contract number
      const { data: newContractNumber, error: rpcError } = await supabase.rpc('generate_contract_number');
      if (rpcError) {
        console.error('RPC Error:', rpcError);
        throw new Error('Failed to generate contract number');
      }

      // Create or update client record
      let newClientId: string;
      const { data: existingClient } = await supabase
        .from('contract_clients')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (existingClient) {
        // Update existing client
        await supabase
          .from('contract_clients')
          .update({
            name: clientName,
            company_name: companyName,
            address: address,
            email: user.email!,
            phone: user.phone || ''
          })
          .eq('id', existingClient.id);
        newClientId = existingClient.id;
      } else {
        // Create new client
        const { data: newClient, error: clientError } = await supabase
          .from('contract_clients')
          .insert({
            user_id: user.id,
            name: clientName,
            company_name: companyName,
            address: address,
            email: user.email!,
            phone: user.phone || ''
          })
          .select('id')
          .single();

        if (clientError) throw clientError;
        newClientId = newClient.id;
      }

      // Generate full contract text
      const contractText = `
SERVICE CONTRACT AGREEMENT

Between
IJ Langa Consulting (Pty) Ltd
(Registration No: 2020/754266/07, Tax No: 4540304286, CSD No: MAAA0988528)
of 78 Tekatakho, Nelspruit, Mpumalanga, South Africa
Tel: 013 004 0620 | Email: order@ijlanga.co.za

And
${clientName}
${companyName}
${address}

Contract Number: ${newContractNumber}
Package: ${packageData.name}
Monthly Fee: R${(packageData.price * 1.15).toFixed(2)} (incl. VAT)
Contract Period: ${startDate.toLocaleDateString('en-ZA')} - ${endDate.toLocaleDateString('en-ZA')}

This is a digitally binding 24-month service agreement for professional accounting and compliance services.
      `.trim();

      // Create contract
      const { data: contract, error: contractError } = await supabase
        .from('service_contracts')
        .insert({
          user_id: user.id,
          client_id: newClientId,
          product_id: packageData.id,
          contract_number: newContractNumber,
          contract_text: contractText,
          start_date: startDate.toISOString().split('T')[0],
          end_date: endDate.toISOString().split('T')[0],
          contract_status: 'active',
          policy_version: '2025.1',
        })
        .select('id')
        .single();

      if (contractError) {
        console.error('Contract Error:', contractError);
        throw contractError;
      }

      // Create initial order/invoice
      const monthlyAmount = Math.round(packageData.price * 1.15);
      const { error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          customer_name: clientName,
          customer_email: user.email!,
          customer_phone: user.phone || '',
          customer_address: address,
          subtotal: packageData.price,
          vat_amount: Math.round(packageData.price * 0.15),
          total_amount: monthlyAmount,
          status: 'pending',
          service_id: packageData.id
        });

      if (orderError) console.error('Order error:', orderError);

      // Create notification
      await supabase.from('notifications').insert({
        user_id: user.id,
        title: 'Contract Activated',
        message: `Your ${packageData.name} contract (#${newContractNumber}) has been activated. First payment of R${monthlyAmount} is due now.`,
        type: 'contract'
      });

      setContractId(contract.id);
      setClientId(newClientId);
      setContractNumber(newContractNumber);
      setStep("complete");
      
      toast({
        title: "Contract Accepted & Activated",
        description: "Your service has started. Check your Orders for payment details.",
      });
    } catch (error: any) {
      console.error('Error creating contract:', error);
      toast({
        title: "Error Creating Contract",
        description: error.message || "Please try again or contact support",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDecline = () => {
    onOpenChange(false);
    
    toast({
      title: "Contract Declined",
      description: "Would you like to explore one-time services instead? Visit our Services page to see available options.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-primary" />
            <div>
              <DialogTitle className="text-xl">
                {step === "contract" && "Digital Service Agreement"}
                {step === "billing" && "Billing Information"}
                {step === "complete" && "Contract Submitted"}
              </DialogTitle>
              {step === "contract" && (
                <p className="text-sm text-muted-foreground mt-1">
                  Please review the full contract before accepting
                </p>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          {step === "contract" && (
            <div className="h-full flex flex-col gap-4">
              {/* Client Details Form */}
              <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
                <div>
                  <label className="text-sm font-medium">Client Name</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                    placeholder="Enter client name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Company Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Address</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                    rows={2}
                    placeholder="Enter full address"
                  />
                </div>
              </div>

              {/* Scrollable Contract */}
              <div className="relative flex-1 border rounded-lg overflow-hidden">
                <ScrollArea 
                  className="h-[400px] p-6 bg-background"
                  onScroll={handleScroll}
                >
                  <div className="prose prose-sm max-w-none">
                    <h2 className="text-center font-bold text-xl mb-6">SERVICE CONTRACT AGREEMENT</h2>
                    
                    <div className="mb-6">
                      <p className="font-semibold">Between</p>
                      <p className="font-bold">IJ Langa Consulting (Pty) Ltd</p>
                      <p>(Registration No: 2020/754266/07, Tax No: 4540304286, CSD No: MAAA0988528)</p>
                      <p>of 78 Tekatakho, Nelspruit, Mpumalanga, South Africa</p>
                      <p>Tel: 013 004 0620 | Email: order@ijlanga.co.za</p>
                      
                      <p className="font-semibold mt-4">And</p>
                      <p className="font-semibold">{clientName || "[Client Name]"}</p>
                      <p>{companyName || "[Company Name]"}</p>
                      <p>{address || "[Address]"}</p>
                    </div>

                    <hr className="my-4" />

                    <h3 className="font-bold">1. Purpose</h3>
                    <p>This Service Contract ("Agreement") is entered into for the provision of professional services by IJ Langa Consulting (hereafter "the Service Provider") to the Client as per the terms and conditions set out herein.</p>

                    <h3 className="font-bold mt-4">2. Term</h3>
                    <p>This Agreement shall be valid and enforceable for a period of 2 (two) years commencing on {startDate.toLocaleDateString('en-ZA')}, unless terminated earlier in accordance with the provisions herein.</p>

                    <h3 className="font-bold mt-4">3. Services</h3>
                    <p>The Service Provider shall render the following professional services to the Client:</p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md my-3">
                      <p className="font-bold">{packageData.name}</p>
                      <p className="font-semibold text-blue-600 dark:text-blue-400">R{packageData.price} + VAT/Month</p>
                      <div className="mt-2 space-y-1">
                        {packageData.features.map((feature, idx) => (
                          <p key={idx} className="text-sm">• {feature}</p>
                        ))}
                      </div>
                    </div>

                    <h3 className="font-bold mt-4">4. Payment Terms</h3>
                    <ol className="list-decimal ml-5 space-y-1">
                      <li>The Client agrees to pay for services rendered strictly as invoiced by the Service Provider.</li>
                      <li>All payments shall be made digitally via the Service Provider's chosen digital platforms (including iKhokha, EFT, or other secure payment gateways).</li>
                      <li>Invoices shall be issued monthly on a recurring basis.</li>
                      <li>The agreed reference for this contract's invoices shall be: Sales Invoice Reference: {contractNumber || "[To be generated]"}</li>
                    </ol>

                    <h3 className="font-bold mt-4">5. Confidentiality</h3>
                    <p>Both parties undertake to maintain the confidentiality of all client data, financial information, and business records accessed during the course of this Agreement.</p>

                    <h3 className="font-bold mt-4">6. Termination</h3>
                    <p>Either party may terminate this Agreement with 30 (thirty) days' written notice. However, all outstanding payments for services already rendered shall remain due and payable.</p>

                    <h3 className="font-bold mt-4">7. Governing Law</h3>
                    <p>This Agreement shall be governed by and interpreted in accordance with the laws of the Republic of South Africa.</p>

                    <h3 className="font-bold mt-4">8. Dispute Resolution</h3>
                    <p>In the event of a dispute, both parties agree to first seek amicable resolution. Should the matter remain unresolved, it shall be referred to mediation or arbitration under South African law.</p>

                    <h3 className="font-bold mt-4">9. Signatures</h3>
                    <div className="grid grid-cols-2 gap-6 mt-4">
                      <div>
                        <p className="font-semibold">For IJ Langa Consulting (Pty) Ltd</p>
                        <p className="mt-2">Name: _________________________</p>
                        <p>Designation: ___________________</p>
                        <p>Signature: _____________________</p>
                        <p>Date: {new Date().toLocaleDateString('en-ZA')}</p>
                      </div>
                      <div>
                        <p className="font-semibold">For the Client</p>
                        <p className="mt-2">Name: _________________________</p>
                        <p>Designation: ___________________</p>
                        <p>Signature: _____________________</p>
                        <p>Date: {new Date().toLocaleDateString('en-ZA')}</p>
                      </div>
                    </div>
                  </div>
                </ScrollArea>

                {/* Scroll Buttons */}
                <div className="absolute right-2 top-2 flex flex-col gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={scrollToTop}
                    className="h-8 w-8 p-0"
                  >
                    ↑
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={scrollToBottom}
                    className="h-8 w-8 p-0"
                  >
                    ↓
                  </Button>
                </div>
              </div>

              {/* Commitment Warning */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
                      ⚠️ 24-Month Commitment Required
                    </p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                      Monthly: R{(packageData.price * 1.15).toFixed(2)} • Total Contract Value: R{(packageData.price * 1.15 * 24).toFixed(2)} (incl. VAT)
                    </p>
                  </div>
                </div>
              </div>

              {!scrolledToBottom && (
                <p className="text-sm text-muted-foreground text-center">
                  ↓ Please scroll down to read the full contract ↓
                </p>
              )}

              {/* Scroll indicator */}
              {!scrolledToBottom && (
                <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    ↓ Please scroll to the bottom of the contract to view Accept/Decline options ↓
                  </p>
                </div>
              )}

              {/* Action Buttons - shown after scrolling */}
              {scrolledToBottom && (
                <div className="flex gap-3 animate-in fade-in duration-500">
                  <Button
                    variant="destructive"
                    onClick={handleDecline}
                    className="flex-1"
                    disabled={loading}
                  >
                    Decline Contract
                  </Button>
                  <Button
                    onClick={handleAccept}
                    disabled={!clientName || !companyName || !address || loading}
                    className="flex-1"
                    size="lg"
                  >
                    {loading ? "Creating Contract..." : "Accept & Start Billing"}
                  </Button>
                </div>
              )}
            </div>
          )}

          {step === "billing" && contractId && clientId && (
            <BillingInformationForm
              contractId={contractId}
              clientId={clientId}
              onComplete={() => setStep("complete")}
              onBack={() => setStep("contract")}
            />
          )}

          {step === "complete" && (
            <div className="text-center py-12">
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-3">Contract Submitted Successfully!</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Your contract has been created and is pending activation. You will receive an email with your 
                contract details and first invoice shortly.
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Close
                </Button>
                <Button onClick={() => window.location.href = '/dashboard/orders'}>
                  View My Contracts
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
