-- Create invoice templates and billing information
CREATE TABLE IF NOT EXISTS public.invoice_templates (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_type text NOT NULL, -- 'invoice', 'quote', 'sales_order', 'credit_note', 'statement'
  html_template text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  is_active boolean NOT NULL DEFAULT true
);

-- Insert default invoice template
INSERT INTO public.invoice_templates (template_type, html_template) VALUES 
('invoice', '<table style="padding: 30px; width: 100%">
    <thead>
        <tr>
            <td colspan="99">
                <table style="margin-bottom: 20px; width: 100%"><tr>
                    <td style="font-weight: bold; font-size: 32px; vertical-align: top">@@Title@@</td>
                    <td style="text-align: end"><img src="@@BusinessLogo@@" style="max-height: 150px; max-width: 300px; display: inline" /></td>
                </tr></table>
                
                <table style="margin-bottom: 20px; width: 100%"><tr>
                    <td style="vertical-align: top">
                        <div style="font-weight: bold">@@Customer@@</div>
                        <div>@@CustomerAddress@@</div>
                        <div>@@CustomerIdentifier@@</div>
                    </td>
                    <td style="text-align: end; vertical-align: top">
                        <div style="font-weight: bold">Reference</div>
                        <div style="margin-bottom: 10px">@@Reference@@</div>
                        <div style="font-weight: bold">Date</div>
                        <div style="margin-bottom: 10px">@@Date@@</div>
                        <div style="font-weight: bold">Amount</div>
                        <div style="margin-bottom: 10px">@@InvoiceAmount@@</div>
                    </td>
                    <td style="width: 20px"></td>
                    <td style="width: 1px; border-left-width: 1px; border-left-color: #000; border-left-style: solid"></td>
                    <td style="width: 20px"></td>
                    <td style="width: 1px; white-space: nowrap; vertical-align: top">
                        <div style="font-weight: bold">Ij Langa Consulting (Pty) Ltd</div>
                        <div>Office Address<br>Ermelo, Mpumalanga<br>South Africa</div>
                        <div>Tel: 0130040620</div>
                        <div>Email: info@ijlanga.co.za</div>
                        <div>Web: www.ijlanga.co.za</div>
                    </td>
                </tr></table>

                <div style="font-size: 14px; font-weight: bold; margin-bottom: 20px">@@Description@@</div>
            </td>
        </tr>
        <tr>
            <td style="border: 1px solid #000; text-align: left; font-weight: bold; padding: 5px 10px;">Description</td>
            <td style="border: 1px solid #000; text-align: center; font-weight: bold; padding: 5px 10px; width: 80px;">Qty</td>
            <td style="border: 1px solid #000; text-align: right; font-weight: bold; padding: 5px 10px; width: 80px;">Unit Price</td>
            <td style="border: 1px solid #000; text-align: right; font-weight: bold; padding: 5px 10px; width: 80px;">Total</td>
        </tr>
    </thead>
    <tbody>
        @@LineItems@@
        <tr>
            <td colspan="4" style="border-bottom: 1px solid #000;">&nbsp;</td>
        </tr>
        <tr>
            <td colspan="3" style="text-align: end; padding: 5px 10px">Subtotal</td>
            <td style="border: 1px solid #000; text-align: right; padding: 5px 10px;">@@Subtotal@@</td>
        </tr>
        <tr>
            <td colspan="3" style="text-align: end; padding: 5px 10px">VAT (15%)</td>
            <td style="border: 1px solid #000; text-align: right; padding: 5px 10px;">@@VATAmount@@</td>
        </tr>
        <tr>
            <td colspan="3" style="text-align: end; padding: 5px 10px; font-weight: bold;">Total</td>
            <td style="border: 1px solid #000; text-align: right; padding: 5px 10px; font-weight: bold;">@@InvoiceAmount@@</td>
        </tr>
        <tr>
            <td colspan="4" style="text-align: center; padding-top: 20px">
                <div style="width: 160px; margin: 0 auto;">  
                    <button onclick="window.location.href=''https://pay.ikhokha.com/ij-langa-consultant/buy/payment''" style="width: 100%; height: 48px; background: #FFCD00; color: #1D1D1B; border: none; border-radius: 16px; font-weight: 700; cursor: pointer;">Pay Now</button>
                    <button onclick="navigator.share({url: window.location.href})" style="width: 100%; height: 48px; margin-top: 10px; background: #007BFF; color: white; border: none; border-radius: 16px; font-weight: 700; cursor: pointer;">Share</button>
                    <button onclick="history.back()" style="width: 100%; height: 48px; margin-top: 10px; background: #6C757D; color: white; border: none; border-radius: 16px; font-weight: 700; cursor: pointer;">Return</button>
                </div>
            </td>
        </tr>
        <tr>
            <td colspan="4" style="padding-top: 30px;">
                <h3>Terms and Conditions</h3>
                <p>Hi there @@Customer@@,</p>
                <p>All invoices are due for payment within 01 days @@InvoiceStatus@@ unless otherwise stated.<br>
                If an invoice is not paid within 7 days @@DeliveryStatus@@, a 10% late payment fee will be added.<br>
                If not paid within 21 days, a Letter of Demand will be issued, incurring a fee of R600.<br>
                Failure to settle after multiple requests will result in court action at an additional cost.<br>
                Goods remain the property of Ij Langa Consulting until full payment is received.<br>
                Discrepancies must be reported within 7 days of receipt of this document.<br>
                Please reference the invoice or order number (@@Reference@@) when making payments for the amount @@InvoiceAmount@@.<br>
                All quotes are valid for 07 days from the issue date unless specified otherwise and accepted with a 50% Deposit.</p>
                
                <h4>Payment Details</h4>
                <p>Bank Name: Standard Bank<br>
                Branch Name: Ermelo<br>
                Branch Code: 2844<br>
                Account Holder: The Director Ij Langa Consulting (Pty) Ltd<br>
                Account Number: 10 18 688 398 4<br>
                Account Type: Current<br>
                SWIFT Code: SBZAZAJJ</p>
                
                <p>Thank you for your business. We value your partnership and look forward to continuing to serve you.</p>
                
                <p>Warm regards,<br>
                Automated Billing System<br>
                Ij Langa Consulting<br>
                📞0130040620 | 📧 info@ijlanga.co.za<br>
                🌐 www.ijlanga.co.za</p>
            </td>
        </tr>
    </tbody>
</table>');

-- Create customers table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.customers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text UNIQUE,
  phone text,
  address text,
  status text DEFAULT 'Active',
  accounts_receivable numeric DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  company_registration text,
  tax_number text
);

-- Update invoices table structure if needed
ALTER TABLE public.invoices 
ADD COLUMN IF NOT EXISTS due_date date,
ADD COLUMN IF NOT EXISTS subtotal numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS vat_amount numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS line_items jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS invoice_type text DEFAULT 'invoice';

-- Create invoice_line_items table
CREATE TABLE IF NOT EXISTS public.invoice_line_items (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id uuid NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  description text NOT NULL,
  quantity numeric NOT NULL DEFAULT 1,
  unit_price numeric NOT NULL DEFAULT 0,
  line_total numeric NOT NULL DEFAULT 0,
  tax_code text DEFAULT 'VAT',
  tax_amount numeric DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.invoice_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_line_items ENABLE ROW LEVEL SECURITY;

-- RLS policies for invoice_templates
CREATE POLICY "Admins can manage invoice templates" ON public.invoice_templates
FOR ALL USING (get_current_user_role() = ANY(ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

CREATE POLICY "Users can view active templates" ON public.invoice_templates
FOR SELECT USING (is_active = true);

-- RLS policies for customers
CREATE POLICY "Admins can manage customers" ON public.customers
FOR ALL USING (get_current_user_role() = ANY(ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

CREATE POLICY "Users can view customers" ON public.customers
FOR SELECT USING (true);

-- RLS policies for invoice_line_items
CREATE POLICY "Admins can manage invoice line items" ON public.invoice_line_items
FOR ALL USING (get_current_user_role() = ANY(ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text]));

CREATE POLICY "Users can view invoice line items" ON public.invoice_line_items
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.invoices i
    JOIN public.customers c ON i.customer_id = c.id
    WHERE i.id = invoice_line_items.invoice_id
    AND c.email = (auth.jwt() ->> 'email')
  ) OR get_current_user_role() = ANY(ARRAY['admin'::text, 'super_admin'::text, 'accountant'::text, 'consultant'::text])
);

-- Create triggers for updated_at
CREATE OR REPLACE TRIGGER update_customers_updated_at
    BEFORE UPDATE ON public.customers
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE TRIGGER update_invoice_templates_updated_at
    BEFORE UPDATE ON public.invoice_templates
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();