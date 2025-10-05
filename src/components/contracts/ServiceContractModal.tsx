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
  const { toast } = useToast();

  const startDate = new Date();
  const endDate = addMonths(startDate, 24); // 24 months (2 years)
  
  const packageDescription = packageData.description || packageData.features.join('\n• ');

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const bottom = Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) < 5;
    setScrolledToBottom(bottom);
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

      const userEmail = user.email;

      // Create or get client record
      let newClientId: string;
      const { data: existingClient } = await supabase
        .from('contract_clients')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (existingClient) {
        newClientId = existingClient.id;
      } else {
        const { data: newClient, error: clientError } = await supabase
          .from('contract_clients')
          .insert({
            user_id: user.id,
            name: user.user_metadata?.full_name?.split(' ')[0] || 'Client',
            surname: user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '',
            email: userEmail!,
            phone: user.phone || '',
          })
          .select('id')
          .single();

        if (clientError) throw clientError;
        newClientId = newClient.id;
      }

      // Generate contract text
      const contractText = `
SERVICE AGREEMENT - ${packageData.name}

Contract Number: ${newContractNumber}
Client: ${userEmail}
Package: ${packageData.name}
Monthly Fee: R${packageData.price} + VAT
Total (24 months): R${(packageData.price * 1.15 * 24).toFixed(2)}

Start Date: ${startDate.toLocaleDateString()}
End Date: ${endDate.toLocaleDateString()}

This is a digitally binding 24-month service agreement.
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
          contract_status: 'pending',
          policy_version: '2025.1',
        })
        .select('id')
        .single();

      if (contractError) {
        console.error('Contract Error:', contractError);
        throw contractError;
      }

      setContractId(contract.id);
      setClientId(newClientId);
      setContractNumber(newContractNumber);
      setStep("billing");
      toast({
        title: "Contract Accepted",
        description: "Please provide billing information to complete setup",
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
      description: "You have declined the service agreement"
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
            <div className="h-full flex flex-col">
              {/* Scrollable Contract */}
              <ScrollArea 
                className="flex-1 border rounded-lg p-6 bg-background mb-4"
                onScroll={handleScroll}
              >
                <ContractTemplate
                  clientName="Client Name"
                  businessName=""
                  industry=""
                  email=""
                  phone=""
                  city=""
                  country="South Africa"
                  packageName={packageData.name}
                  price={packageData.price}
                  packageDescription={packageDescription}
                  startDate={startDate}
                  endDate={endDate}
                  contractDate={new Date()}
                  contractNumber={contractNumber || "Will be generated"}
                />
              </ScrollArea>

              {/* Commitment Warning */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded mb-4">
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
                <p className="text-sm text-muted-foreground text-center mb-4">
                  ↓ Please scroll down to read the full contract ↓
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
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
                  disabled={!scrolledToBottom || loading}
                  className="flex-1"
                  size="lg"
                >
                  {loading ? "Creating Contract..." : "Accept Contract"}
                </Button>
              </div>
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
