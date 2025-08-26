
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
      // TODO: Replace with actual iKhokha API integration
      // For now, simulate the payment flow
      
      // In a real implementation, you would:
      // 1. Call your backend API to create a payment record
      // 2. Your backend calls iKhokha API to create checkout session
      // 3. Return the hosted checkout URL to redirect user
      
      const response = await fetch('/api/payments/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // or however you handle auth
        },
        body: JSON.stringify({
          invoiceId,
          amount,
          description,
          returnUrl: `${window.location.origin}/dashboard/payments/success`,
          cancelUrl: `${window.location.origin}/dashboard/payments/cancel`
        })
      });

      if (!response.ok) {
        throw new Error('Failed to initiate payment');
      }

      const data = await response.json();
      
      toast({
        title: "Payment Initiated",
        description: "Redirecting to payment gateway...",
      });

      return {
        success: true,
        paymentUrl: data.paymentUrl,
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
    // Redirect to iKhokha hosted checkout
    window.location.href = paymentUrl;
  };

  return {
    initiatePayment,
    redirectToPayment,
    loading
  };
};
