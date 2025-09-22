import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Customer {
  id: string;
  customer_name: string;
  email: string;
  phone?: string;
  billing_address?: string;
  delivery_address?: string;
  credit_limit: number;
  account_status: string;
  created_at: string;
  updated_at: string;
}

export const useCustomers = () => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customer_accounts')
        .select('*')
        .eq('account_status', 'active')
        .order('customer_name', { ascending: true });
      
      if (error) throw error;
      return data as Customer[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};