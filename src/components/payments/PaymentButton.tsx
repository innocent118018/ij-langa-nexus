
import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, Loader2 } from 'lucide-react';
import { usePayments } from '@/hooks/usePayments';

interface PaymentButtonProps {
  invoiceId: string;
  amount: number;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export const PaymentButton = ({ 
  invoiceId, 
  amount, 
  description, 
  disabled,
  className 
}: PaymentButtonProps) => {
  const { initiatePayment, redirectToPayment, loading } = usePayments();

  const handlePayment = async () => {
    const result = await initiatePayment({
      invoiceId,
      amount,
      description
    });

    if (result.success && result.paymentUrl) {
      redirectToPayment(result.paymentUrl);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(amount);
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={disabled || loading}
      className={`bg-green-600 hover:bg-green-700 text-white ${className}`}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <CreditCard className="h-4 w-4 mr-2" />
          Pay {formatCurrency(amount)}
        </>
      )}
    </Button>
  );
};
