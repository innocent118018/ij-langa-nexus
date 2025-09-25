import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Receipt {
  id: string;
  user_id: string;
  account_id: string;
  customer_id?: string;
  receipt_number: string;
  reference?: string;
  receipt_date: string;
  amount: number;
  payment_method?: string;
  description: string;
  status: string;
  cleared_date?: string;
  project_id?: string;
  division_id?: string;
  created_at: string;
  updated_at: string;
  customer_accounts?: {
    customer_name: string;
    email: string;
  };
}

export const useReceipts = () => {
  return useQuery({
    queryKey: ['receipts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bank_receipts')
        .select(`
          *
        `)
        .order('receipt_date', { ascending: false });
      
      if (error) throw error;
      return data as Receipt[];
    },
  });
};

export const useCreateReceipt = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (receiptData: Omit<Receipt, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('bank_receipts')
        .insert([receiptData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['receipts'] });
      toast.success('Receipt created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create receipt: ' + error.message);
    },
  });
};

export const useGetNextReceiptNumber = () => {
  return useQuery({
    queryKey: ['next-receipt-number'],
    queryFn: async () => {
      // Generate next receipt number based on highest existing number
      const { data, error } = await supabase
        .from('bank_receipts')
        .select('receipt_number')
        .order('receipt_number', { ascending: false })
        .limit(1);
      
      if (error) throw error;
      
      let nextNumber = '62805419711'; // Default starting number
      if (data && data.length > 0) {
        const lastNumber = parseInt(data[0].receipt_number);
        nextNumber = (lastNumber + 1).toString();
      }
      
      return nextNumber;
    },
  });
};