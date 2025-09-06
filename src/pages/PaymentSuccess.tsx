import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Home, FileText } from 'lucide-react';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const transactionId = searchParams.get('transaction_id');
  const amount = searchParams.get('amount');
  const orderId = searchParams.get('order');

  useEffect(() => {
    // Here you could verify the payment with your backend
    // and update the order status
    console.log('Payment successful:', { transactionId, amount, orderId });
  }, [transactionId, amount, orderId]);

  const formatCurrency = (amount: string | null) => {
    if (!amount) return '';
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(parseFloat(amount));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-800">
              Payment Successful!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="text-gray-600">
                Your payment has been processed successfully.
              </p>
              {amount && (
                <p className="text-xl font-semibold text-gray-900">
                  Amount Paid: {formatCurrency(amount)}
                </p>
              )}
              {transactionId && (
                <p className="text-sm text-gray-500">
                  Transaction ID: {transactionId}
                </p>
              )}
              {orderId && (
                <p className="text-sm text-gray-500">
                  Order ID: {orderId}
                </p>
              )}
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800">
                You will receive a confirmation email shortly. Your order has been received
                and we will begin processing it immediately.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => navigate('/')} className="flex items-center">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/services')}
                className="flex items-center"
              >
                <FileText className="h-4 w-4 mr-2" />
                View Services
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccess;