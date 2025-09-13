
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface InitiatePaymentParams {
  invoiceId: string;
  amount: number;
  description?: string;
}

interface PaymentResponse {
  success: boolean;
  paymentUrl?: string;
  transactionId?: string;
  error?: string;
}

export const usePayments = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const initiatePayment = async ({ invoiceId, amount, description }: InitiatePaymentParams): Promise<PaymentResponse> => {
    setLoading(true);
    
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      
      // Get current user session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error('Please login to make payments');
      }

      // Call Supabase edge function for payment creation
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          orderId: invoiceId,
          amount: amount,
          description: description || 'Payment',
          customerEmail: session.user.email || '',
          externalTransactionID: `inv-${invoiceId}-${Date.now()}`
        },
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });

      if (error) {
        console.error('Payment creation error:', error);
        throw new Error(error.message || 'Failed to create payment');
      }

      if (!data.success || !data.paylinkUrl) {
        throw new Error('Payment link creation failed');
      }
      
      toast({
        title: "Payment Initiated",
        description: "Redirecting to payment gateway...",
      });

      return {
        success: true,
        paymentUrl: data.paylinkUrl,
        transactionId: data.transactionId
      };

    } catch (error) {
      console.error('Payment initiation error:', error);
      
      toast({
        title: "Payment Failed",
        description: "Unable to initiate payment. Please try again.",
        variant: "destructive",
      });

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    } finally {
      setLoading(false);
    }
  };

  const redirectToPayment = (paymentUrl: string) => {
    // Open iKhokha payment in new tab as required
    window.open(paymentUrl, '_blank');
  };

  return {
    initiatePayment,
    redirectToPayment,
    loading
  };
};
