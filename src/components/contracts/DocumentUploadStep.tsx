import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle } from "lucide-react";

interface DocumentUploadStepProps {
  contractId: string;
  onComplete: () => void;
  onBack: () => void;
}

export const DocumentUploadStep = ({ contractId, onComplete, onBack }: DocumentUploadStepProps) => {
  const [uploaded, setUploaded] = useState({ selfie: false, id: false, address: false });
  const { toast } = useToast();

  const handleUpload = async (file: File, type: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const fileName = `${contractId}/${type}_${Date.now()}.${file.name.split('.').pop()}`;
      const { error: uploadError } = await supabase.storage.from('documents').upload(fileName, file);
      if (uploadError) throw uploadError;

      await supabase.from('contract_documents').insert({
        contract_id: contractId,
        user_id: user.id,
        document_type: type,
        file_path: fileName,
        file_name: file.name,
      });

      setUploaded(prev => ({ ...prev, [type.split('_')[0]]: true }));
      toast({ title: "Uploaded successfully" });
    } catch (error) {
      toast({ title: "Upload failed", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Selfie with ID {uploaded.selfie && <CheckCircle className="inline h-4 w-4 text-green-500" />}</Label>
        <Input type="file" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], "selfie_with_id")} />
      </div>
      <div className="space-y-2">
        <Label>ID Copy {uploaded.id && <CheckCircle className="inline h-4 w-4 text-green-500" />}</Label>
        <Input type="file" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], "id_copy")} />
      </div>
      <div className="space-y-2">
        <Label>Proof of Address {uploaded.address && <CheckCircle className="inline h-4 w-4 text-green-500" />}</Label>
        <Input type="file" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], "proof_of_address")} />
      </div>
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onComplete} disabled={!uploaded.selfie || !uploaded.id || !uploaded.address}>Continue</Button>
      </div>
    </div>
  );
};
