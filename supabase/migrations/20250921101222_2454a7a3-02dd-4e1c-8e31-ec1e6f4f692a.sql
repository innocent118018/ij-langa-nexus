-- Create comprehensive ERP accounting system tables with strict RLS policies

-- 1. Sales Quotes Table
CREATE TABLE public.sales_quotes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    customer_id uuid,
    quote_number text NOT NULL UNIQUE,
    issue_date date NOT NULL DEFAULT CURRENT_DATE,
    expiry_date date,
    description text,
    subtotal numeric(15,2) NOT NULL DEFAULT 0,
    vat_amount numeric(15,2) NOT NULL DEFAULT 0,
    total_amount numeric(15,2) NOT NULL DEFAULT 0,
    status text NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Accepted', 'Cancelled', 'Expired')),
    line_items jsonb DEFAULT '[]'::jsonb,
    terms_conditions text,
    notes text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- 2. Sales Orders Table
CREATE TABLE public.sales_orders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    customer_id uuid,
    sales_quote_id uuid REFERENCES public.sales_quotes(id),
    order_number text NOT NULL UNIQUE,
    order_date date NOT NULL DEFAULT CURRENT_DATE,
    delivery_date date,
    description text,
    subtotal numeric(15,2) NOT NULL DEFAULT 0,
    vat_amount numeric(15,2) NOT NULL DEFAULT 0,
    total_amount numeric(15,2) NOT NULL DEFAULT 0,
    invoiced_amount numeric(15,2) NOT NULL DEFAULT 0,
    qty_reserved integer DEFAULT 0,
    status text NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Processing', 'Delivered', 'Cancelled')),
    invoice_status text NOT NULL DEFAULT 'Uninvoiced' CHECK (invoice_status IN ('Uninvoiced', 'Partially Invoiced', 'Invoiced', 'Not Applicable')),
    delivery_status text NOT NULL DEFAULT 'Pending' CHECK (delivery_status IN ('Pending', 'Delivered')),
    line_items jsonb DEFAULT '[]'::jsonb,
    is_cancelled boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- 3. Enhanced Sales Invoices (extend existing if needed)
CREATE TABLE IF NOT EXISTS public.sales_invoices (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    customer_id uuid,
    sales_order_id uuid REFERENCES public.sales_orders(id),
    sales_quote_id uuid REFERENCES public.sales_quotes(id),
    invoice_number text NOT NULL UNIQUE,
    issue_date date NOT NULL DEFAULT CURRENT_DATE,
    due_date date,
    description text,
    subtotal numeric(15,2) NOT NULL DEFAULT 0,
    vat_amount numeric(15,2) NOT NULL DEFAULT 0,
    discount_amount numeric(15,2) DEFAULT 0,
    withholding_tax numeric(15,2) DEFAULT 0,
    total_amount numeric(15,2) NOT NULL DEFAULT 0,
    balance_due numeric(15,2) NOT NULL DEFAULT 0,
    cost_of_sales numeric(15,2) DEFAULT 0,
    status text NOT NULL DEFAULT 'Unpaid' CHECK (status IN ('Unpaid', 'Partially Paid', 'Paid', 'Overdue', 'Cancelled')),
    days_to_due_date integer,
    days_overdue integer DEFAULT 0,
    line_items jsonb DEFAULT '[]'::jsonb,
    project_id uuid,
    division_id uuid,
    acts_as_delivery_note boolean DEFAULT false,
    inventory_location_id uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- 4. Credit Notes Table
CREATE TABLE public.credit_notes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    customer_id uuid,
    sales_invoice_id uuid REFERENCES public.sales_invoices(id),
    credit_note_number text NOT NULL UNIQUE,
    issue_date date NOT NULL DEFAULT CURRENT_DATE,
    description text NOT NULL,
    reason text,
    subtotal numeric(15,2) NOT NULL DEFAULT 0,
    vat_amount numeric(15,2) NOT NULL DEFAULT 0,
    total_amount numeric(15,2) NOT NULL DEFAULT 0,
    cost_of_sales numeric(15,2) DEFAULT 0,
    status text NOT NULL DEFAULT 'Applied' CHECK (status IN ('Applied', 'Pending', 'Cancelled')),
    line_items jsonb DEFAULT '[]'::jsonb,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- 5. Late Payment Fees Table
CREATE TABLE public.late_payment_fees (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    customer_id uuid NOT NULL,
    sales_invoice_id uuid NOT NULL REFERENCES public.sales_invoices(id),
    fee_number text NOT NULL UNIQUE,
    fee_date date NOT NULL DEFAULT CURRENT_DATE,
    days_overdue integer NOT NULL,
    fee_percentage numeric(5,2),
    fee_amount numeric(15,2) NOT NULL,
    status text NOT NULL DEFAULT 'Unpaid' CHECK (status IN ('Unpaid', 'Paid', 'Waived')),
    notes text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- 6. Delivery Notes Table  
CREATE TABLE public.delivery_notes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    customer_id uuid NOT NULL,
    sales_order_id uuid REFERENCES public.sales_orders(id),
    sales_invoice_id uuid REFERENCES public.sales_invoices(id),
    delivery_note_number text NOT NULL UNIQUE,
    delivery_date date NOT NULL DEFAULT CURRENT_DATE,
    order_number text,
    invoice_number text,
    description text,
    qty_delivered integer DEFAULT 0,
    inventory_location_id uuid,
    line_items jsonb DEFAULT '[]'::jsonb,
    delivery_address text,
    special_instructions text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- 7. Billable Time Table
CREATE TABLE public.billable_time (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    customer_id uuid NOT NULL,
    employee_id uuid,
    project_id uuid,
    work_date date NOT NULL DEFAULT CURRENT_DATE,
    description text NOT NULL,
    hours_worked numeric(8,2) NOT NULL,
    hourly_rate numeric(10,2) NOT NULL,
    total_amount numeric(15,2) NOT NULL,
    status text NOT NULL DEFAULT 'Uninvoiced' CHECK (status IN ('Uninvoiced', 'Invoiced', 'Written Off')),
    invoice_date date,
    write_off_date date,
    division_id uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- 8. Withholding Tax Receipts Table
CREATE TABLE public.withholding_tax_receipts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    customer_id uuid NOT NULL,
    sales_invoice_id uuid REFERENCES public.sales_invoices(id),
    receipt_number text NOT NULL UNIQUE,
    receipt_date date NOT NULL DEFAULT CURRENT_DATE,
    description text,
    tax_rate numeric(5,2) NOT NULL,
    invoice_amount numeric(15,2) NOT NULL,
    tax_withheld numeric(15,2) NOT NULL,
    certificate_number text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- 9. Suppliers Table
CREATE TABLE public.suppliers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    supplier_code text UNIQUE,
    name text NOT NULL,
    email text,
    phone text,
    address text,
    postal_address text,
    contact_person text,
    payment_terms text,
    credit_limit numeric(15,2) DEFAULT 0,
    accounts_payable numeric(15,2) DEFAULT 0,
    withholding_tax_payable numeric(15,2) DEFAULT 0,
    status text NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive', 'Suspended')),
    tax_number text,
    registration_number text,
    control_account_id uuid,
    division_id uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- 10. Purchase Quotes Table
CREATE TABLE public.purchase_quotes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    supplier_id uuid NOT NULL REFERENCES public.suppliers(id),
    quote_number text NOT NULL UNIQUE,
    request_date date NOT NULL DEFAULT CURRENT_DATE,
    valid_until date,
    description text,
    subtotal numeric(15,2) NOT NULL DEFAULT 0,
    vat_amount numeric(15,2) NOT NULL DEFAULT 0,
    total_amount numeric(15,2) NOT NULL DEFAULT 0,
    status text NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Received', 'Accepted', 'Rejected', 'Expired')),
    line_items jsonb DEFAULT '[]'::jsonb,
    terms_conditions text,
    notes text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Create indexes for performance optimization
CREATE INDEX idx_sales_quotes_user_id ON public.sales_quotes(user_id);
CREATE INDEX idx_sales_quotes_customer_id ON public.sales_quotes(customer_id);
CREATE INDEX idx_sales_quotes_status ON public.sales_quotes(status);
CREATE INDEX idx_sales_quotes_issue_date ON public.sales_quotes(issue_date);

CREATE INDEX idx_sales_orders_user_id ON public.sales_orders(user_id);
CREATE INDEX idx_sales_orders_customer_id ON public.sales_orders(customer_id);
CREATE INDEX idx_sales_orders_status ON public.sales_orders(status);
CREATE INDEX idx_sales_orders_order_date ON public.sales_orders(order_date);

CREATE INDEX idx_sales_invoices_user_id ON public.sales_invoices(user_id);
CREATE INDEX idx_sales_invoices_customer_id ON public.sales_invoices(customer_id);
CREATE INDEX idx_sales_invoices_status ON public.sales_invoices(status);
CREATE INDEX idx_sales_invoices_due_date ON public.sales_invoices(due_date);

CREATE INDEX idx_suppliers_user_id ON public.suppliers(user_id);
CREATE INDEX idx_suppliers_status ON public.suppliers(status);
CREATE INDEX idx_suppliers_name ON public.suppliers(name);

CREATE INDEX idx_billable_time_user_id ON public.billable_time(user_id);
CREATE INDEX idx_billable_time_customer_id ON public.billable_time(customer_id);
CREATE INDEX idx_billable_time_status ON public.billable_time(status);
CREATE INDEX idx_billable_time_work_date ON public.billable_time(work_date);

-- Enable RLS on all tables
ALTER TABLE public.sales_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_orders ENABLE ROW LEVEL SECURITY;  
ALTER TABLE public.sales_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.late_payment_fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.billable_time ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.withholding_tax_receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchase_quotes ENABLE ROW LEVEL SECURITY;