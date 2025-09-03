import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useNavigate } from 'react-router-dom';

export const FloatingCheckoutButton = () => {
  const { cartCount, getTotalAmount } = useCart();
  const navigate = useNavigate();

  if (cartCount === 0) return null;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(amount);
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <Button
        onClick={handleCheckout}
        size="lg"
        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-3 px-6 py-3 rounded-full"
      >
        <ShoppingCart className="h-5 w-5" />
        <span className="font-medium">
          {cartCount} item{cartCount !== 1 ? 's' : ''} • {formatCurrency(getTotalAmount())}
        </span>
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
};