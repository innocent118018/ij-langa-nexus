import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, Check, Loader2 } from 'lucide-react';

interface DocumentUploadStepProps {
  packageId: string;
  onComplete: (contractId: string) => void;
  onBack: () => void;
}

export const DocumentUploadStep = ({ packageId, onComplete, onBack }: DocumentUploadStepProps) => {
  const [uploading, setUploading] = useState(false);
  const [uploads, setUploads] = useState({
    selfieWithId: null as File | null,
    idCopy: null as File | null,
    proofOfAddress: null as File | null,
  });
  const [uploaded, setUploaded] = useState({
    selfieWithId: false,
    idCopy: false,
    proofOfAddress: false,
  });
  const { toast } = useToast();

  const handleFileChange = (type: keyof typeof uploads) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive"
        });
        return;
      }
      setUploads(prev => ({ ...prev, [type]: file }));
    }
  };

  const handleSubmit = async () => {
    if (!uploads.selfieWithId || !uploads.idCopy || !uploads.proofOfAddress) {
      toast({
        title: "Missing Documents",
        description: "Please upload all required documents",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Generate contract number
      const { data: contractNumber } = await supabase.rpc('generate_contract_number');
      
      // Create contract
      const { data: contract, error: contractError } = await supabase
        .from('service_contracts')
        .insert({
          user_id: user.id,
          package_id: packageId,
          contract_number: contractNumber,
          contract_text: 'Digital Service Agreement',
          contract_status: 'pending'
        })
        .select()
        .single();

      if (contractError) throw contractError;

      // Upload documents
      const documentTypes = [
        { type: 'selfie_with_id', file: uploads.selfieWithId },
        { type: 'id_copy', file: uploads.idCopy },
        { type: 'proof_of_address', file: uploads.proofOfAddress },
      ];

      for (const { type, file } of documentTypes) {
        if (!file) continue;

        const fileName = `${user.id}/${contract.id}/${type}_${Date.now()}_${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from('documents')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { error: docError } = await supabase
          .from('contract_documents')
          .insert({
            contract_id: contract.id,
            user_id: user.id,
            document_type: type,
            file_path: fileName,
            file_name: file.name
          });

        if (docError) throw docError;

        const key = type.replace(/_/g, '') as keyof typeof uploaded;
        setUploaded(prev => ({ ...prev, [key]: true }));
      }

      toast({
        title: "Documents Uploaded",
        description: "All documents have been successfully uploaded"
      });

      onComplete(contract.id);
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="selfie" className="flex items-center gap-2">
            Selfie Holding ID Document
            {uploaded.selfieWithId && <Check className="w-4 h-4 text-green-500" />}
          </Label>
          <Input
            id="selfie"
            type="file"
            accept="image/*"
            onChange={handleFileChange('selfieWithId')}
            disabled={uploading}
          />
          <p className="text-xs text-muted-foreground">
            Please upload a clear selfie of yourself holding your ID document (Max 10MB)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="id" className="flex items-center gap-2">
            ID Document Copy
            {uploaded.idCopy && <Check className="w-4 h-4 text-green-500" />}
          </Label>
          <Input
            id="id"
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileChange('idCopy')}
            disabled={uploading}
          />
          <p className="text-xs text-muted-foreground">
            Upload a clear copy of your ID document (Max 10MB)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="proof" className="flex items-center gap-2">
            Proof of Address
            {uploaded.proofOfAddress && <Check className="w-4 h-4 text-green-500" />}
          </Label>
          <Input
            id="proof"
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileChange('proofOfAddress')}
            disabled={uploading}
          />
          <p className="text-xs text-muted-foreground">
            Upload a recent utility bill, bank statement, or municipal account (Max 10MB)
          </p>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} disabled={uploading}>
          Back
        </Button>
        <Button onClick={handleSubmit} disabled={uploading}>
          {uploading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {uploading ? 'Uploading...' : 'Next'}
        </Button>
      </div>
    </div>
  );
};