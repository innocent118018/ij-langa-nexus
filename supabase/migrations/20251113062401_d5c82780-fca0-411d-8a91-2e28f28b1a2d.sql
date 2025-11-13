-- Create contracts storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'contracts',
  'contracts',
  false,
  10485760, -- 10MB
  ARRAY['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for contracts bucket
CREATE POLICY "Users can view their own contracts"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'contracts' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Service role can insert contracts"
ON storage.objects FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'contracts');

CREATE POLICY "Service role can update contracts"
ON storage.objects FOR UPDATE
TO service_role
USING (bucket_id = 'contracts');

-- Add contract document path to service_contracts if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'service_contracts' 
    AND column_name = 'contract_document_path'
  ) THEN
    ALTER TABLE public.service_contracts 
    ADD COLUMN contract_document_path TEXT;
  END IF;
END $$;