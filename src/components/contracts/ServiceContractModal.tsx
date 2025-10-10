import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, FileText, AlertCircle, Download } from "lucide-react";
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
  } | null;
}

export const ServiceContractModal = ({ open, onOpenChange, packageData }: ServiceContractModalProps) => {
  const [step, setStep] = useState<"contract" | "complete">("contract");
  const [contractId, setContractId] = useState<string | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  const [contractNumber, setContractNumber] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [clientName, setClientName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const { toast } = useToast();

  const startDate = new Date();
  const endDate = addMonths(startDate, 24);

  const handleAccept = async () => {
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

      const { data: newContractNumber, error: rpcError } = await supabase.rpc('generate_contract_number');
      if (rpcError) {
        console.error('RPC Error:', rpcError);
        throw new Error('Failed to generate contract number');
      }

      let newClientId: string;
      const { data: existingClient } = await supabase
        .from('contract_clients')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (existingClient) {
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

      await supabase.from('notifications').insert({
        user_id: user.id,
        title: 'Contract Activated',
        message: `Your ${packageData.name} contract (#${newContractNumber}) has been activated. First payment of R${monthlyAmount} is due now.`,
        type: 'contract'
      });

      setContractId(contract.id);
      setClientId(newClientId);
      setContractNumber(newContractNumber);

      try {
        const contractHTML = generateContractHTML(newContractNumber);
        await supabase.functions.invoke('send-contract-email', {
          body: {
            email: user.email,
            clientName,
            companyName,
            contractNumber: newContractNumber,
            packageName: packageData.name,
            packagePrice: packageData.price,
            startDate: startDate.toLocaleDateString('en-ZA'),
            endDate: endDate.toLocaleDateString('en-ZA'),
            contractHTML,
          },
        });
      } catch (emailError) {
        console.error('Error sending email:', emailError);
      }

      setStep("complete");
      
      toast({
        title: "Contract Accepted & Activated",
        description: "Your service has started. Check your email for contract details.",
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

  const generateContractHTML = (contractNum: string) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Service Contract - ${contractNum}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
          .header { text-align: center; margin-bottom: 30px; }
          h1 { color: #0D1B2A; font-size: 24px; margin-bottom: 10px; }
          h2 { color: #0D1B2A; font-size: 18px; margin-top: 20px; }
          .section { margin-bottom: 20px; }
          .highlight { background: #f0f9ff; padding: 15px; border-radius: 5px; margin: 15px 0; }
          .signatures { display: flex; justify-content: space-between; margin-top: 40px; padding: 20px; background: #f0fdf4; border-radius: 5px; }
          .signature-block { flex: 1; }
          hr { margin: 20px 0; border: 1px solid #e5e7eb; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>SERVICE CONTRACT AGREEMENT</h1>
          <p>Contract Number: ${contractNum}</p>
        </div>

        <div class="section">
          <h2>Between</h2>
          <p><strong>IJ Langa Consulting (Pty) Ltd</strong><br>
          Registration No: 2020/754266/07, Tax No: 4540304286, CSD No: MAAA0988528<br>
          78 Tekatakho, Nelspruit, Mpumalanga, South Africa<br>
          Tel: 013 004 0620 | Email: order@ijlanga.co.za</p>
          
          <p style="margin-top: 15px;"><strong>And</strong><br>
          ${clientName}<br>
          ${companyName}<br>
          ${address}</p>
        </div>

        <hr>

        <div class="section">
          <h2>1. Purpose</h2>
          <p>This Service Contract ("Agreement") is entered into for the provision of professional services by IJ Langa Consulting (hereafter "the Service Provider") to the Client as per the terms and conditions set out herein.</p>
        </div>

        <div class="section">
          <h2>2. Term</h2>
          <p>This Agreement shall be valid and enforceable for a period of 2 (two) years commencing on ${startDate.toLocaleDateString('en-ZA')}, unless terminated earlier in accordance with the provisions herein.</p>
        </div>

          <div class="section">
            <h2>3. Services</h2>
            <p>The Service Provider shall render the following professional services to the Client:</p>
            <div class="highlight">
              <p><strong>${packageData.name}</strong><br>
              <strong style="color: #0D1B2A;">R${packageData.price} + VAT/Month</strong></p>
              <ul>
                ${(packageData.features ?? []).map(f => `<li>${f}</li>`).join('')}
              </ul>
            </div>
          </div>

        <div class="section">
          <h2>4. Payment Terms</h2>
          <ol>
            <li>The Client agrees to pay for services rendered strictly as invoiced by the Service Provider.</li>
            <li>All payments shall be made digitally via the Service Provider's chosen digital platforms.</li>
            <li>Invoices shall be issued monthly on a recurring basis.</li>
            <li>Sales Invoice Reference: ${contractNum}</li>
          </ol>
        </div>

        <div class="section">
          <h2>5. Confidentiality</h2>
          <p>Both parties undertake to maintain the confidentiality of all client data, financial information, and business records.</p>
        </div>

        <div class="section">
          <h2>6. Termination</h2>
          <p>Either party may terminate this Agreement with 30 (thirty) days' written notice. All outstanding payments remain due and payable.</p>
        </div>

        <div class="section">
          <h2>7. Governing Law</h2>
          <p>This Agreement shall be governed by the laws of the Republic of South Africa.</p>
        </div>

        <div class="section">
          <h2>8. Dispute Resolution</h2>
          <p>Disputes shall be referred to mediation or arbitration under South African law.</p>
        </div>

        <div class="section">
          <h2>9. Signatures</h2>
          <div class="signatures">
            <div class="signature-block">
              <p><strong>For IJ Langa Consulting (Pty) Ltd</strong></p>
              <p>Name: IJ Langa</p>
              <p>Designation: Director</p>
              <p style="font-style: italic; font-size: 18px;">Signed Digitally</p>
              <p>Date: ${new Date().toLocaleDateString('en-ZA')}</p>
            </div>
            <div class="signature-block">
              <p><strong>For the Client</strong></p>
              <p>Name: ${clientName}</p>
              <p>Designation: Authorized Representative</p>
              <p style="font-style: italic; font-size: 18px;">Signed Digitally</p>
              <p>Date: ${new Date().toLocaleDateString('en-ZA')}</p>
            </div>
          </div>
          <p style="text-align: center; margin-top: 20px; padding: 15px; background: #dbeafe; border-radius: 5px;">
            <strong>This contract was digitally signed on ${new Date().toLocaleString('en-ZA')}</strong><br>
            <small>Digital signatures are legally binding under the ECT Act, 2002</small>
          </p>
        </div>
      </body>
      </html>
    `;
  };

  const handleDecline = () => {
    onOpenChange(false);
    toast({
      title: "Contract Declined",
      description: "Would you like to explore one-time services instead? Visit our Services page.",
    });
  };

  const downloadContract = () => {
    const contractHTML = generateContractHTML(contractNumber);
    const blob = new Blob([contractHTML], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Contract-${contractNumber}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (!packageData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-xl">
            {step === "contract" && "Digital Service Agreement"}
            {step === "complete" && "Contract Complete"}
          </DialogTitle>
        </DialogHeader>

        {step === "contract" && (
          <>
            <div className="flex-1 overflow-hidden px-6 py-4">
              {/* Client Details Form */}
              <div className="space-y-3 mb-4">
                <div>
                  <label className="text-sm font-medium">Client Name *</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Company Name *</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                    placeholder="Enter company name"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Address *</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                    rows={2}
                    placeholder="Enter full address"
                    required
                  />
                </div>
              </div>

              {/* Contract Content */}
              <ScrollArea className="h-[400px] border rounded-lg p-6 bg-background">
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
                      {(packageData.features ?? []).map((feature, idx) => (
                        <p key={idx} className="text-sm">• {feature}</p>
                      ))}
                    </div>
                  </div>

                  <h3 className="font-bold mt-4">4. Payment Terms</h3>
                  <ol className="list-decimal ml-5 space-y-1">
                    <li>The Client agrees to pay for services rendered strictly as invoiced by the Service Provider.</li>
                    <li>All payments shall be made digitally via the Service Provider's chosen digital platforms.</li>
                    <li>Invoices shall be issued monthly on a recurring basis.</li>
                    <li>Sales Invoice Reference: {contractNumber || "[To be generated]"}</li>
                  </ol>

                  <h3 className="font-bold mt-4">5. Confidentiality</h3>
                  <p>Both parties undertake to maintain the confidentiality of all client data, financial information, and business records.</p>

                  <h3 className="font-bold mt-4">6. Termination</h3>
                  <p>Either party may terminate this Agreement with 30 (thirty) days' written notice. All outstanding payments remain due and payable.</p>

                  <h3 className="font-bold mt-4">7. Governing Law</h3>
                  <p>This Agreement shall be governed by the laws of the Republic of South Africa.</p>

                  <h3 className="font-bold mt-4">8. Dispute Resolution</h3>
                  <p>Disputes shall be referred to mediation or arbitration under South African law.</p>

                  <h3 className="font-bold mt-4">9. Signatures</h3>
                  <div className="grid grid-cols-2 gap-6 mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded">
                    <div>
                      <p className="font-semibold">For IJ Langa Consulting (Pty) Ltd</p>
                      <p className="mt-2">Name: IJ Langa</p>
                      <p>Designation: Director</p>
                      <p className="italic text-lg mt-2">Signed Digitally</p>
                      <p>Date: {new Date().toLocaleDateString('en-ZA')}</p>
                    </div>
                    <div>
                      <p className="font-semibold">For the Client</p>
                      <p className="mt-2">Name: {clientName || "_________"}</p>
                      <p>Designation: Authorized Representative</p>
                      <p className="italic text-lg mt-2">Signed Digitally</p>
                      <p>Date: {new Date().toLocaleDateString('en-ZA')}</p>
                    </div>
                  </div>
                  
                  <div className="text-center mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <p className="font-semibold">This contract will be digitally signed upon acceptance</p>
                    <p className="text-sm mt-1">Digital signatures are legally binding under the ECT Act, 2002</p>
                  </div>
                </div>
              </ScrollArea>

              {/* Warning */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded mt-4">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
                      24-Month Commitment Required
                    </p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                      Monthly: R{(packageData.price * 1.15).toFixed(2)} • Total: R{(packageData.price * 1.15 * 24).toFixed(2)} (incl. VAT)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-6 py-4 border-t bg-muted/30 flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                By accepting, you agree to the terms and conditions above
              </p>
              <div className="flex gap-3">
                <Button onClick={handleDecline} variant="outline">
                  Decline
                </Button>
                <Button 
                  onClick={handleAccept} 
                  disabled={loading || !clientName || !companyName || !address}
                >
                  {loading ? "Processing..." : "Accept"}
                </Button>
              </div>
            </div>
          </>
        )}

        {step === "complete" && (
          <div className="flex-1 px-6 py-8">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
              <div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">Contract Activated!</h3>
                <p className="text-muted-foreground">
                  Contract #{contractNumber} is now active
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg space-y-3">
                <p className="font-semibold">What's Next?</p>
                <ul className="text-sm text-left space-y-2">
                  <li>✓ Contract copy sent to your email</li>
                  <li>✓ First invoice is now due</li>
                  <li>✓ Your dedicated account manager will contact you shortly</li>
                  <li>✓ Access your contract anytime from the Dashboard</li>
                </ul>
              </div>

              <div className="flex gap-3 justify-center">
                <Button onClick={downloadContract} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Contract
                </Button>
                <Button onClick={() => onOpenChange(false)}>
                  Go to Dashboard
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
