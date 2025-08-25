
-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false);

-- Create RLS policies for the documents bucket
CREATE POLICY "Users can upload their own documents" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'documents' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own documents" ON storage.objects
FOR SELECT USING (
  bucket_id = 'documents' AND 
  (auth.uid()::text = (storage.foldername(name))[1] OR 
   get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]))
);

CREATE POLICY "Users can update their own documents" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'documents' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own documents" ON storage.objects
FOR DELETE USING (
  bucket_id = 'documents' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Admins can view all documents" ON storage.objects
FOR SELECT USING (
  bucket_id = 'documents' AND 
  get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text])
);

-- Update documents table to include category field
ALTER TABLE documents ADD COLUMN IF NOT EXISTS category text NOT NULL DEFAULT 'general';

-- Create an enum for document categories
CREATE TYPE document_category AS ENUM (
  'shareholders',
  'invoices', 
  'quotes',
  'statements',
  'tax_clearance',
  'cipc',
  'csd',
  'correspondence'
);

-- Update the category column to use the enum
ALTER TABLE documents ALTER COLUMN category TYPE document_category USING category::document_category;

-- Update RLS policies for documents table to handle correspondence visibility
DROP POLICY IF EXISTS "Users can view own documents" ON documents;

CREATE POLICY "Users can view own documents" ON documents
FOR SELECT USING (
  auth.uid() = user_id OR 
  (category = 'correspondence' AND get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]))
);

-- Allow admins to view correspondence documents uploaded by users
CREATE POLICY "Admins can view correspondence documents" ON documents
FOR SELECT USING (
  category = 'correspondence' AND 
  get_current_user_role() = ANY (ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text])
);
