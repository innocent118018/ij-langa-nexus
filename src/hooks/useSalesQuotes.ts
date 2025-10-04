import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface SalesQuote {
  id: string;
  quote_number: string;
  issue_date: string;
  customer_name?: string;  // This will be populated from joined customers table
  customer_id?: string;
  description: string;
  subtotal: number;
  vat_amount: number;
  total_amount: number;
  status: string;
  user_id: string;
  expiry_date?: string;
  line_items?: any;
  terms_conditions?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export const useSalesQuotes = () => {
  const { data: quotes = [], isLoading } = useQuery({
    queryKey: ['sales-quotes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sales_quotes')
        .select('*')
        .order('issue_date', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes cache
  });

  return {
    quotes,
    isLoading
  };
};

export const useCreateSalesQuote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (quoteData: any) => {
      const { data, error } = await supabase
        .from('sales_quotes')
        .insert(quoteData)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales-quotes'] });
      toast.success('Sales quote created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create sales quote');
    }
  });
};