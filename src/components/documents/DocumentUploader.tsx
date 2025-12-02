import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface DocumentUploaderProps {
  companyId?: string;
  onUploadComplete?: () => void;
}

export default function DocumentUploader({ companyId, onUploadComplete }: DocumentUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    setSuccess(false);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not logged in');
      
      const uuid = crypto.randomUUID();
      const path = `${user.id}/${companyId || 'general'}/${uuid}-${file.name}`;

      const { error: upErr } = await supabase.storage.from('user-files').upload(path, file);
      if (upErr) throw upErr;

      // Insert metadata
      const { error: metaErr } = await supabase.from('company_documents').insert([{
        company_id: companyId || null,
        uploaded_by: user.id,
        storage_path: path,
        filename: file.name,
        mime_type: file.type,
        size: file.size
      }]);
      
      if (metaErr) throw metaErr;

      setSuccess(true);
      toast.success('Document uploaded successfully');
      onUploadComplete?.();
    } catch (err: any) {
      console.error(err);
      toast.error('Upload failed: ' + (err.message || err));
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-4">
      <Label htmlFor="document-upload" className="block text-sm font-medium">
        Upload Document
      </Label>
      <div className="flex items-center gap-4">
        <Input
          id="document-upload"
          type="file"
          onChange={handleFile}
          disabled={uploading}
          className="flex-1"
        />
        {uploading && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
        {success && <CheckCircle className="h-5 w-5 text-green-500" />}
      </div>
      {uploading && (
        <p className="text-sm text-muted-foreground">Uploading document...</p>
      )}
    </div>
  );
}
