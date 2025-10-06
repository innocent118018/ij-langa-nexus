import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const useServiceContract = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const createContract = async (packageData: any, userData: any) => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Generate contract number
      const { data: contractNumber, error: rpcError } = await supabase.rpc('generate_contract_number');
      if (rpcError) throw rpcError;

      // Create or get client
      let clientId: string;
      const { data: existingClient } = await (supabase
        .from('contract_clients' as any)
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle() as unknown as Promise<{ data: { id: string } | null; error: any }>);

      if (existingClient) {
        clientId = existingClient.id;
      } else {
        const { data: newClient, error: clientError } = await (supabase
          .from('contract_clients' as any)
          .insert({
            user_id: user.id,
            ...userData
          })
          .select('id')
          .single() as unknown as Promise<{ data: { id: string }; error: any }>);

        if (clientError) throw clientError;
        clientId = newClient.id;
      }

      // Create contract
      const startDate = new Date();
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 24);

      const { data: contract, error: contractError } = await supabase
        .from('service_contracts')
        .insert({
          user_id: user.id,
          client_id: clientId,
          product_id: packageData.id,
          contract_number: contractNumber,
          contract_text: '', // Will be generated
          start_date: startDate.toISOString().split('T')[0],
          end_date: endDate.toISOString().split('T')[0],
          contract_status: 'pending',
        })
        .select()
        .single();

      if (contractError) throw contractError;

      toast({
        title: 'Contract Created',
        description: 'Your service contract has been created successfully',
      });

      return contract;
    } catch (error: any) {
      console.error('Error creating contract:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create contract',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    createContract,
    loading,
  };
};
