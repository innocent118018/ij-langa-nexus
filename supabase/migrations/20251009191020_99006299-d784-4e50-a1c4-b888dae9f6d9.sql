-- Add start_date and end_date columns to service_contracts table
ALTER TABLE public.service_contracts 
ADD COLUMN IF NOT EXISTS start_date date DEFAULT CURRENT_DATE,
ADD COLUMN IF NOT EXISTS end_date date;

-- Create a function to automatically set end_date to start_date + 24 months
CREATE OR REPLACE FUNCTION public.set_contract_end_date()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Set end_date to start_date + 24 months if not provided
  IF NEW.end_date IS NULL AND NEW.start_date IS NOT NULL THEN
    NEW.end_date := NEW.start_date + INTERVAL '24 months';
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger to automatically set end_date on insert or update
DROP TRIGGER IF EXISTS set_contract_end_date_trigger ON public.service_contracts;
CREATE TRIGGER set_contract_end_date_trigger
BEFORE INSERT OR UPDATE ON public.service_contracts
FOR EACH ROW
EXECUTE FUNCTION public.set_contract_end_date();

-- Update existing contracts to have proper end dates
UPDATE public.service_contracts
SET end_date = start_date + INTERVAL '24 months'
WHERE end_date IS NULL AND start_date IS NOT NULL;