-- Insert default email templates using correct schema
INSERT INTO public.email_templates (name, template_type, subject, html_content, merge_tags, is_active) VALUES
  ('Customer Statement', 'customer_statement', 'Monthly Customer Statement - IJ Langa Consulting', '<p>Please find attached your account statement.</p>', ARRAY['customer_name', 'total_outstanding', 'statement_date'], true),
  ('Sales Invoice', 'sales_invoice', 'Invoice {{invoice_number}} from IJ Langa Consulting', '<p>Please find attached your invoice.</p>', ARRAY['invoice_number', 'total_amount', 'due_date'], true),
  ('Sales Quote', 'sales_quote', 'Quote {{quote_number}} from IJ Langa Consulting', '<p>Please find attached your quote.</p>', ARRAY['quote_number', 'total_amount', 'valid_until'], true),
  ('Payment Receipt', 'payment_receipt', 'Payment Receipt - Thank You', '<p>Thank you for your payment.</p>', ARRAY['payment_amount', 'payment_date', 'invoice_number'], true),
  ('Order Confirmation', 'order_confirmation', 'Order Confirmation - IJ Langa Consulting', '<p>Your order has been confirmed.</p>', ARRAY['order_number', 'order_date', 'total_amount'], true)
ON CONFLICT DO NOTHING;