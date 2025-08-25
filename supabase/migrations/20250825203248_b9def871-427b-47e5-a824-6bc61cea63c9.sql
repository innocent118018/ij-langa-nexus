
-- Add the category column to the documents table if it doesn't exist
ALTER TABLE public.documents 
ADD COLUMN IF NOT EXISTS category text;

-- Set default category for existing documents
UPDATE public.documents 
SET category = 'general' 
WHERE category IS NULL;

-- Make category not null with a default value
ALTER TABLE public.documents 
ALTER COLUMN category SET DEFAULT 'general';
