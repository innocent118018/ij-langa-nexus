import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface SalesInvoice {
  id: string;
  invoice_number: string;
  issue_date: string;
  due_date?: string;
  customer_name?: string;
  customer_id?: string;
  description?: string;
  subtotal: number;
  vat_amount: number;
  total_amount: number;
  balance_due: number;
  status: string;
  days_overdue: number;
  days_to_due_date?: number;
  user_id: string;
  created_at: string;
  updated_at: string;
  customer_accounts?: {
    customer_name: string;
  } | null;
}

export const useSalesInvoices = () => {
  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ['sales-invoices'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sales_invoices')
        .select(`
          *,
          customer_accounts!customer_id (
            customer_name
          )
        `)
        .order('issue_date', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes cache
  });

  return {
    invoices,
    isLoading
  };
};

export const useCreateSalesInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (invoiceData: any) => {
      const { data, error } = await supabase
        .from('sales_invoices')
        .insert(invoiceData)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales-invoices'] });
      toast.success('Sales invoice created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create sales invoice');
    }
  });
};