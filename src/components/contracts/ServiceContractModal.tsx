import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { DocumentUploadStep } from "./DocumentUploadStep";
import { ServiceApplicationForm } from "./ServiceApplicationForm";
import { CheckCircle, Download, Mail, Share2, Printer } from "lucide-react";

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
  const [step, setStep] = useState<"contract" | "documents" | "form" | "complete">("contract");
  const [agreed, setAgreed] = useState(false);
  const [contractId, setContractId] = useState<string | null>(null);
  const { toast } = useToast();

  const contractText = `DIGITAL SERVICE AGREEMENT - ${packageData.name}\n\nThis is a 12-month commitment at R${packageData.price} + VAT per month.\n\nTotal: R${(packageData.price * 1.15 * 12).toFixed(2)} including VAT.\n\nBy accepting, you agree to all terms at https://ijlanga.co.za/policies/terms-conditions`;

  const handleAgree = async () => {
    if (!agreed) {
      toast({ title: "Please agree to terms", variant: "destructive" });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data: contractNumber } = await supabase.rpc('generate_contract_number');
      const { data: contract, error } = await supabase
        .from('service_contracts')
        .insert({
          user_id: user.id,
          package_id: packageData.id,
          contract_number: contractNumber,
          contract_text: contractText,
          contract_status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;
      setContractId(contract.id);
      setStep("documents");
      toast({ title: "Agreement Accepted" });
    } catch (error) {
      toast({ title: "Error creating contract", variant: "destructive" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {step === "contract" && "Digital Service Agreement"}
            {step === "documents" && "Upload Documents"}
            {step === "form" && "Application Form"}
            {step === "complete" && "Complete"}
          </DialogTitle>
        </DialogHeader>

        {step === "contract" && (
          <div className="space-y-4">
            <ScrollArea className="h-[50vh] border rounded p-4">
              <pre className="whitespace-pre-wrap text-sm">{contractText}</pre>
            </ScrollArea>
            <div className="bg-yellow-50 p-4 rounded">
              <p className="text-sm font-semibold">⚠️ 12-Month Commitment</p>
              <p className="text-sm">Total: R{(packageData.price * 1.15 * 12).toFixed(2)} including VAT</p>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
              <label className="text-sm">I agree to 12-month commitment</label>
            </div>
            <Button onClick={handleAgree} disabled={!agreed}>I Agree - Continue</Button>
          </div>
        )}

        {step === "documents" && contractId && (
          <DocumentUploadStep contractId={contractId} onComplete={() => setStep("form")} onBack={() => setStep("contract")} />
        )}

        {step === "form" && contractId && (
          <ServiceApplicationForm contractId={contractId} packageName={packageData.name} onComplete={() => setStep("complete")} onBack={() => setStep("documents")} />
        )}

        {step === "complete" && (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Application Submitted!</h3>
            <Button onClick={() => onOpenChange(false)} className="mt-4">Close</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
