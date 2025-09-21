import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface SalesInvoice {
  id: string;
  invoice_number: string;
  issue_date: string;
  due_date?: string;
  customer_name?: string;  // This will be populated from joined customers table
  customer_id?: string;
  total_amount: number;
  balance_due: number;
  status: string;
  days_overdue: number;
  days_to_due_date?: number;
  user_id: string;
  subtotal: number;
  vat_amount: number;
  created_at: string;
  updated_at: string;
}

export const useSalesInvoices = () => {
  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ['sales-invoices'],
    queryFn: async () => {
      // First get all sales invoices
      const { data: invoiceData, error: invoiceError } = await supabase
        .from('sales_invoices')
        .select('*')
        .order('issue_date', { ascending: false });
      
      if (invoiceError) throw invoiceError;
      
      // Get all unique customer IDs
      const customerIds = [...new Set(invoiceData.map(invoice => invoice.customer_id).filter(Boolean))];
      
      // Fetch customer names
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .select('id, name')
        .in('id', customerIds);
      
      if (customerError) throw customerError;
      
      // Create a customer name lookup map
      const customerMap = customerData.reduce((acc, customer) => {
        acc[customer.id] = customer.name;
        return acc;
      }, {} as Record<string, string>);
      
      // Transform the data to include customer_name
      return invoiceData.map(invoice => ({
        ...invoice,
        customer_name: customerMap[invoice.customer_id || ''] || 'Unknown Customer'
      }));
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes cache
  });

  return {
    invoices,
    isLoading
  };
};